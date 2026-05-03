// ─────────────────────────────────────────────────────────────────────
// Founders cohort count — single source of truth.
//
// Real signups come from getSignupCount() in lib/db/store.ts.
// FOUNDERS_BASELINE is an env-controlled offset for demos / staged launches
// where you want the count to start above zero (e.g., showing momentum to
// early visitors). Default 0 = honest count.
// ─────────────────────────────────────────────────────────────────────

export const FOUNDERS_CAP = 5000;
export const FOUNDERS_BASELINE = parseInt(process.env.FOUNDERS_BASELINE ?? '0', 10) || 0;

export function foundersDisplayCount(actual: number): number {
  return Math.min(FOUNDERS_CAP, FOUNDERS_BASELINE + actual);
}
export function foundersRemaining(actual: number): number {
  return Math.max(0, FOUNDERS_CAP - foundersDisplayCount(actual));
}
