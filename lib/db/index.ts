// ─────────────────────────────────────────────────────────────────────
// Database adapter
//
// Phase 1: stub. If DATABASE_URL is set, throws "not yet wired" — Phase 2
// implements the real Neon connector. Until then, all data flows through
// lib/demo.ts and lib/demo-ops.ts with deterministic seeded values.
//
// This file exists to lock in the public API now so swapping demo → real
// data is one PR per surface, not a rewrite.
// ─────────────────────────────────────────────────────────────────────

export type DbStatus = 'unset' | 'configured-not-wired' | 'live';

export function dbStatus(): DbStatus {
  if (!process.env.DATABASE_URL) return 'unset';
  // Phase 2 swaps this to actual connection check via @neondatabase/serverless
  return 'configured-not-wired';
}

export async function ping(): Promise<{ ok: boolean; status: DbStatus; message: string }> {
  const status = dbStatus();
  if (status === 'unset') {
    return {
      ok: false,
      status,
      message: 'DATABASE_URL not set — running on demo seed data',
    };
  }
  return {
    ok: false,
    status,
    message: 'DATABASE_URL set but Phase 2 connector not yet wired (lib/db/index.ts)',
  };
}
