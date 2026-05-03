// ─────────────────────────────────────────────────────────────────────
// Storage layer
//
// Phase 1: append-only JSONL files in `.data/`. Persists across requests
// in dev and on long-running serverless instances; survives a deploy on
// platforms with persistent disk; ephemeral on Vercel Functions (which
// is fine for the first hundred signups, terrible for production).
//
// Phase 2: when DATABASE_URL is set, this file's functions delegate to
// Postgres queries via @neondatabase/serverless. Call sites stay
// identical — single source of truth for "what's stored."
//
// Today the public API supports the data we collect at signup:
//   - createSignup(input)
//   - listSignups()
//   - getSignupById(id)
//   - getSignupCount()
// And it pre-defines the shape we'll move to Neon next.
// ─────────────────────────────────────────────────────────────────────

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), '.data');
const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.jsonl');

export const SignupSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(1).max(120),
  // Permissive in Phase 1 — Phase 2 KFTC 본인인증 normalizes to E.164.
  phoneE164: z.string().min(0).max(30).optional(),
  residenceIso: z.enum(['KR', 'US', 'CA', 'SG', 'HK', 'JP', 'OTHER']),
  tier: z.enum(['I', 'II', 'III', 'IV', 'V']),
  monthlyKrw: z.number().int().positive(),
  motivation: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
});
export type SignupInput = z.infer<typeof SignupSchema>;

export type Signup = SignupInput & {
  id: string;
  founderNumber: number;
  status: 'waitlist' | 'kyc_required' | 'active' | 'cancelled';
  createdAt: string;
  ip?: string;
  userAgent?: string;
};

// ─── JSONL helpers ────────────────────────────────────────────────────
async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readAllLines(): Promise<Signup[]> {
  try {
    const raw = await fs.readFile(SIGNUPS_FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Signup);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw err;
  }
}

async function appendLine(s: Signup): Promise<void> {
  await ensureDir();
  await fs.appendFile(SIGNUPS_FILE, JSON.stringify(s) + '\n', 'utf8');
}

// ─── Public API ──────────────────────────────────────────────────────

export async function getSignupCount(): Promise<number> {
  // Phase 2: SELECT count(*) FROM customers WHERE founder_number IS NOT NULL
  if (process.env.DATABASE_URL) {
    // Connector wires here once Neon is live.
    return (await readAllLines()).length;
  }
  return (await readAllLines()).length;
}

export async function listSignups(limit = 200): Promise<Signup[]> {
  const all = await readAllLines();
  return all.slice(-limit).reverse();
}

export async function getSignupByEmail(email: string): Promise<Signup | null> {
  const all = await readAllLines();
  return all.find((s) => s.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getSignupById(id: string): Promise<Signup | null> {
  const all = await readAllLines();
  return all.find((s) => s.id === id) ?? null;
}

export type CreateSignupResult =
  | { ok: true; signup: Signup }
  | { ok: false; error: string };

export async function createSignup(
  input: SignupInput,
  meta: { ip?: string; userAgent?: string } = {},
): Promise<CreateSignupResult> {
  // Reject duplicates by email
  const existing = await getSignupByEmail(input.email);
  if (existing) {
    return { ok: false, error: '이미 등록된 이메일입니다 — already registered' };
  }

  const count = await getSignupCount();
  if (count >= 5000) {
    return { ok: false, error: '파운더스 5,000명이 모두 마감되었습니다' };
  }

  const signup: Signup = {
    ...input,
    id: randomUUID(),
    founderNumber: count + 1,
    status: 'kyc_required',
    createdAt: new Date().toISOString(),
    ip: meta.ip,
    userAgent: meta.userAgent,
  };

  await appendLine(signup);
  return { ok: true, signup };
}

// Storage backend status for the health probe and ops dashboard.
export function storageBackend(): 'postgres' | 'jsonl' {
  return process.env.DATABASE_URL ? 'postgres' : 'jsonl';
}

// ─── Recent signups (anonymized for /promo leaderboard) ─────────────
function deriveInitial(name: string): string {
  const tokens = name.trim().split(/\s+/).slice(0, 3);
  if (tokens.length === 0) return '—';
  if (tokens.every((t) => /^[a-zA-Z]/.test(t))) {
    return tokens.map((t) => t[0]!.toUpperCase()).join('.');
  }
  return tokens.map((t) => t[0]!).join('.');
}

export async function getRecentSignups(
  limit: number = 8,
): Promise<Array<{ initial: string; tier: string; daysAgo: number }>> {
  const all = await listSignups(100);
  const sorted = [...all].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sorted.slice(0, limit).map((s) => ({
    initial: deriveInitial(s.name),
    tier: s.tier ?? 'I',
    daysAgo: Math.max(
      0,
      Math.floor((Date.now() - new Date(s.createdAt).getTime()) / 86_400_000),
    ),
  }));
}

// ─── Admin audit re-exports ──────────────────────────────────────────
// Convenience so call sites can `import { recordAdminAction } from
// '@/lib/db/store'`. The canonical implementation lives in
// `lib/admin-audit.ts`; types stay there to avoid colliding with the
// Phase-2 Postgres-shaped `AdminAuditEntry` already declared in
// `lib/db/types.ts`.
export { recordAdminAction, listAdminAudit } from '../admin-audit';
