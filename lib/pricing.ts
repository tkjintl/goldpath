// ─────────────────────────────────────────────────────────────────────
// GoldPath pricing oracle
//
// Three numbers we need:
//   1. LBMA / international gold (USD/oz)        — what GoldPath actually buys at
//   2. FX rate (KRW per USD)                     — to express gold in KRW
//   3. Korea Gold Exchange retail (KRW/g)        — for kimchi-premium comparison
//
// Approach (Phase 1):
//   - FX:    Frankfurter.app — open, no key, ECB rates
//   - Gold:  Stooq daily quote (XAUUSD index) — open CSV, no key
//   - Retail: weekly-updated seed in code; Phase 2 ops portal lets staff
//            update this manually until we license a real feed
//
// Cached 5 min via Next's unstable_cache. Falls back to honest seed
// values when any feed misbehaves; surfaces `LIVE` vs `CACHED` in UI.
// ─────────────────────────────────────────────────────────────────────

import { unstable_cache } from 'next/cache';

export type FeedStatus = 'live' | 'seed';

export type PriceSnapshot = {
  // KRW per gram
  retailKrwPerGram: number;
  aurumKrwPerGram: number;
  lbmaKrwPerGram: number;
  // Reference
  lbmaUsdPerOz: number;
  fxKrwPerUsd: number;
  // Compatibility (kept so existing components keep working)
  krxKrwPerGram: number;
  // Derived
  kimchiPremiumPct: number; // (retail − lbma_in_krw) / lbma_in_krw
  aurumDiscountPct: number; // (aurum − retail) / retail (negative is good)
  // Meta
  timestamp: string;
  retailAsOf: string;
  sources: { gold: FeedStatus; fx: FeedStatus; retail: FeedStatus };
};

const OZ_TO_G = 31.1034768;
const AURUM_SPREAD_PCT = 0.02;

// ─── Honest seeds (update on each weekly check) ───────────────────────
// Last updated: 2026-05-02 — gold rally context, late KRW weakness.
const SEED_LBMA_USD_OZ = 4842.10;
const SEED_FX = 1440.20;
const SEED_RETAIL_KRW_G = 269_500;        // ~20% kimchi premium snapshot
const SEED_RETAIL_AS_OF = '2026-05-02';

// ─── FX — Frankfurter (ECB, free, no key) ─────────────────────────────
async function fetchFx(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=KRW', {
      cache: 'no-store',
      next: { revalidate: 300 },
    });
    if (!res.ok) return { value: 0, ok: false };
    const data = (await res.json()) as { rates?: { KRW?: number } };
    const v = Number(data.rates?.KRW);
    if (!isFinite(v) || v <= 0) return { value: 0, ok: false };
    return { value: v, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── Gold — Stooq XAUUSD daily close (free, no key, CSV) ──────────────
async function fetchGoldUsdOz(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch('https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv', {
      cache: 'no-store',
      next: { revalidate: 300 },
      headers: { 'User-Agent': 'GoldPathPricer/0.1' },
    });
    if (!res.ok) return { value: 0, ok: false };
    const csv = await res.text();
    // Header line + one data line: Symbol,Date,Time,Open,High,Low,Close,Volume
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return { value: 0, ok: false };
    const cols = lines[1].split(',');
    const close = Number(cols[6]);
    if (!isFinite(close) || close <= 0) return { value: 0, ok: false };
    return { value: close, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── Composer ─────────────────────────────────────────────────────────
async function fetchSnapshot(): Promise<PriceSnapshot> {
  const [gold, fx] = await Promise.all([fetchGoldUsdOz(), fetchFx()]);

  const lbmaUsdPerOz = gold.ok ? gold.value : SEED_LBMA_USD_OZ;
  const fxKrwPerUsd = fx.ok ? fx.value : SEED_FX;
  const lbmaKrwPerGram = (lbmaUsdPerOz * fxKrwPerUsd) / OZ_TO_G;

  const retailKrwPerGram = SEED_RETAIL_KRW_G;
  const aurumKrwPerGram = Math.round(lbmaKrwPerGram * (1 + AURUM_SPREAD_PCT));

  const kimchiPremiumPct = (retailKrwPerGram - lbmaKrwPerGram) / lbmaKrwPerGram;
  const aurumDiscountPct = (aurumKrwPerGram - retailKrwPerGram) / retailKrwPerGram;

  return {
    retailKrwPerGram,
    aurumKrwPerGram,
    lbmaKrwPerGram: Math.round(lbmaKrwPerGram),
    krxKrwPerGram: Math.round(lbmaKrwPerGram), // KRX gold market trades very close to LBMA in KRW
    lbmaUsdPerOz,
    fxKrwPerUsd,
    kimchiPremiumPct,
    aurumDiscountPct,
    timestamp: new Date().toISOString(),
    retailAsOf: SEED_RETAIL_AS_OF,
    sources: {
      gold: gold.ok ? 'live' : 'seed',
      fx: fx.ok ? 'live' : 'seed',
      retail: 'seed', // licensed feed wires in Phase 2
    },
  };
}

export const getPriceSnapshot = unstable_cache(
  fetchSnapshot,
  ['gp-price-snapshot-v2'],
  { revalidate: 300, tags: ['pricing'] },
);

// ─── Helpers ──────────────────────────────────────────────────────────
export function fmtKRW(n: number): string {
  return '₩' + Math.round(n).toLocaleString('ko-KR');
}
export function fmtPct(n: number, digits = 1): string {
  return (n >= 0 ? '+' : '') + (n * 100).toFixed(digits) + '%';
}
