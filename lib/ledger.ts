// ─────────────────────────────────────────────────────────────────────
// Ledger primitive
//
// Phase 1 in-memory shim that conforms to the Phase 2 Postgres call sites.
// Every gram or KRW movement goes through `postEntry()` with an idempotency
// key. Phase 2 swaps the inner store; the public API does not change.
// ─────────────────────────────────────────────────────────────────────

import { randomUUID } from 'node:crypto';
import type { LedgerEntry, LedgerEntryType } from './db/types';

export type PostEntryInput = {
  customerId: string;
  entryType: LedgerEntryType;
  gramsDelta?: number;
  krwDelta?: number;
  fxRate?: number;
  fixPriceKrw?: number;
  reference?: string;
  notes?: string;
  idempotencyKey?: string;
  postedBy?: string;
};

// In-memory store keyed by idempotency key. Replaced by Postgres in Phase 2.
const _entries: LedgerEntry[] = [];
const _idemMap = new Map<string, string>();

export async function postEntry(input: PostEntryInput): Promise<LedgerEntry> {
  // Idempotency — same key returns the existing entry
  if (input.idempotencyKey) {
    const existingId = _idemMap.get(input.idempotencyKey);
    if (existingId) {
      const existing = _entries.find((e) => e.id === existingId);
      if (existing) return existing;
    }
  }

  const entry: LedgerEntry = {
    id: randomUUID(),
    customerId: input.customerId,
    entryType: input.entryType,
    gramsDelta: input.gramsDelta ?? 0,
    krwDelta: input.krwDelta ?? 0,
    fxRate: input.fxRate ?? null,
    fixPriceKrw: input.fixPriceKrw ?? null,
    reference: input.reference ?? null,
    notes: input.notes ?? null,
    idempotencyKey: input.idempotencyKey ?? null,
    postedBy: input.postedBy ?? 'system',
    createdAt: new Date().toISOString(),
  };

  _entries.push(entry);
  if (input.idempotencyKey) _idemMap.set(input.idempotencyKey, entry.id);

  return entry;
}

export async function getCustomerEntries(
  customerId: string,
  limit = 100,
): Promise<LedgerEntry[]> {
  return _entries
    .filter((e) => e.customerId === customerId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function getCustomerBalance(
  customerId: string,
): Promise<{ gramsOwned: number; krwBalance: number; entryCount: number }> {
  const rows = _entries.filter((e) => e.customerId === customerId);
  return {
    gramsOwned: rows.reduce((s, e) => s + e.gramsDelta, 0),
    krwBalance: rows.reduce((s, e) => s + e.krwDelta, 0),
    entryCount: rows.length,
  };
}

// Reversal helper — never mutate, always post a counter-entry.
export async function reverseEntry(
  originalId: string,
  reason: string,
  postedBy: string,
): Promise<LedgerEntry> {
  const original = _entries.find((e) => e.id === originalId);
  if (!original) {
    throw new Error(`ledger entry not found: ${originalId}`);
  }
  return postEntry({
    customerId: original.customerId,
    entryType: 'reversal',
    gramsDelta: -original.gramsDelta,
    krwDelta: -original.krwDelta,
    reference: originalId,
    notes: reason,
    postedBy,
    idempotencyKey: `reversal:${originalId}`,
  });
}

// ─── Composite operations — used by settlement workflow ──────────────

export type RecordMonthlyDebitInput = {
  customerId: string;
  batchId: string;
  krwAmount: number;
  fxRate: number;
  fixPriceKrw: number;
};

// Posts the four-step ledger sequence for one customer's monthly buy:
// debit_received → fx_executed → buy_executed → allocate.
// All four share an idempotency prefix derived from batchId+customerId,
// so re-running the workflow is safe.
export async function recordMonthlyDebit(
  input: RecordMonthlyDebitInput,
): Promise<LedgerEntry[]> {
  const grams = input.krwAmount / input.fixPriceKrw;
  const idem = `${input.batchId}:${input.customerId}`;

  const debit = await postEntry({
    customerId: input.customerId,
    entryType: 'debit_received',
    krwDelta: input.krwAmount,
    reference: input.batchId,
    idempotencyKey: `${idem}:debit`,
  });
  const fx = await postEntry({
    customerId: input.customerId,
    entryType: 'fx_executed',
    krwDelta: -input.krwAmount,
    fxRate: input.fxRate,
    reference: input.batchId,
    idempotencyKey: `${idem}:fx`,
  });
  const buy = await postEntry({
    customerId: input.customerId,
    entryType: 'buy_executed',
    fixPriceKrw: input.fixPriceKrw,
    reference: input.batchId,
    idempotencyKey: `${idem}:buy`,
  });
  const alloc = await postEntry({
    customerId: input.customerId,
    entryType: 'allocate',
    gramsDelta: grams,
    reference: input.batchId,
    idempotencyKey: `${idem}:allocate`,
  });

  return [debit, fx, buy, alloc];
}
