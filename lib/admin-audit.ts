// ─────────────────────────────────────────────────────────────────────
// Admin audit log
//
// Phase 1: append-only JSONL at `.data/admin-audit.jsonl`. Mirrors the
// strategy in `lib/db/store.ts` — single source of truth for ops actions
// until Neon Postgres is wired in Phase 2.
//
// Schema reference (lib/db/schema.sql · admin_audit):
//   id BIGSERIAL, admin_user TEXT, action TEXT, target_type TEXT,
//   target_id UUID, payload JSONB, ip_address INET, user_agent TEXT,
//   created_at TIMESTAMPTZ.
//
// Phase 1 exposes a pragmatic subset (id/actor/action/target/meta) that
// maps cleanly onto those columns when we cut over.
// ─────────────────────────────────────────────────────────────────────

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const DATA_DIR = path.join(process.cwd(), '.data');
const AUDIT_FILE = path.join(DATA_DIR, 'admin-audit.jsonl');

export type AdminAuditEntry = {
  id: string;
  createdAt: string; // ISO
  actor: string; // admin identifier (email or "admin" if token-only auth)
  action: string; // e.g. "kyc.approve", "settlement.publish", "signup.export"
  target: string | null; // resource id or external id, optional
  meta: Record<string, unknown> | null; // free-form context
};

// ─── JSONL helpers ────────────────────────────────────────────────────
async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readAllLines(): Promise<AdminAuditEntry[]> {
  try {
    const raw = await fs.readFile(AUDIT_FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as AdminAuditEntry);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw err;
  }
}

async function appendLine(entry: AdminAuditEntry): Promise<void> {
  await ensureDir();
  await fs.appendFile(AUDIT_FILE, JSON.stringify(entry) + '\n', 'utf8');
}

// ─── Public API ──────────────────────────────────────────────────────

export async function recordAdminAction(input: {
  actor: string;
  action: string;
  target?: string | null;
  meta?: Record<string, unknown>;
}): Promise<AdminAuditEntry> {
  const entry: AdminAuditEntry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    actor: input.actor,
    action: input.action,
    target: input.target ?? null,
    meta: input.meta ?? null,
  };

  // Phase 2 — when DATABASE_URL is set, this should INSERT into admin_audit
  // (admin_user, action, target_type, target_id, payload, ip_address,
  //  user_agent, created_at) via @neondatabase/serverless and return the
  // shaped row. Until then, JSONL is the source of truth.
  if (process.env.DATABASE_URL) {
    // TODO(phase-2): wire Neon connector — keep JSONL fallback for parity.
  }

  await appendLine(entry);
  return entry;
}

export async function listAdminAudit(limit = 200): Promise<AdminAuditEntry[]> {
  // Phase 2: SELECT … FROM admin_audit ORDER BY created_at DESC LIMIT $1
  if (process.env.DATABASE_URL) {
    // TODO(phase-2): swap to Postgres query; preserve newest-first ordering.
  }
  const all = await readAllLines();
  return all.slice(-limit).reverse();
}
