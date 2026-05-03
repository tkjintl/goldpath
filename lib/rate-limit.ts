// ─────────────────────────────────────────────────────────────────────
// In-memory sliding-window rate limiter.
//
// Per-instance only — Fluid Compute reuses instances, so this works
// well within a single warm function instance. Multi-instance
// deployments need a shared store (Upstash/Redis) for fairness.
// Acceptable for Phase 1: signup volume is bounded (5,000 founders),
// and the worst case of "one abuser hits a fresh instance" is bounded
// by per-instance cold-start frequency.
// ─────────────────────────────────────────────────────────────────────

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; retryAfterSec: number; resetAt: number };

// Per-key timestamp lists (ms epoch). Module-scope so it survives
// across requests on the same warm instance.
const buckets: Map<string, number[]> = new Map();
let callCount = 0;

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowSec: number;
}): RateLimitResult {
  const { key, limit, windowSec } = opts;
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const cutoff = now - windowMs;

  const existing = buckets.get(key) ?? [];
  const fresh = existing.filter((t) => t > cutoff);

  // Periodic GC to keep the Map bounded under abuse.
  callCount++;
  if (buckets.size > 5000 && callCount % 64 === 0) {
    for (const [k, v] of buckets) {
      const kept = v.filter((t) => t > cutoff);
      if (kept.length === 0) buckets.delete(k);
      else buckets.set(k, kept);
    }
  }

  if (fresh.length < limit) {
    fresh.push(now);
    buckets.set(key, fresh);
    // Window resets when the oldest timestamp falls off.
    const resetAt = fresh[0] + windowMs;
    return { ok: true, remaining: limit - fresh.length, resetAt };
  }

  // Limit hit: keep the existing window untouched, report retry-after
  // based on when the oldest timestamp expires.
  buckets.set(key, fresh);
  const oldest = fresh[0];
  const resetAt = oldest + windowMs;
  const retryAfterSec = Math.max(1, Math.ceil((resetAt - now) / 1000));
  return { ok: false, retryAfterSec, resetAt };
}

// ─── Key helper ──────────────────────────────────────────────────────
// Deterministic, fast hash of IP + UA short prefix, scoped by caller.
// Not cryptographic — just to keep keys bounded and avoid raw UA in
// memory. djb2 is sufficient for bucket-keying.

function djb2(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  // Unsigned hex
  return (h >>> 0).toString(36);
}

export function keyFromRequest(req: Request, scope: string): string {
  const h = req.headers;
  const xff = h.get('x-forwarded-for') ?? '';
  const ip = (xff.split(',')[0] ?? '').trim() || h.get('x-real-ip') || 'unknown';
  const ua = (h.get('user-agent') ?? '').slice(0, 64);
  return `${scope}:${ip}:${djb2(ua)}`;
}
