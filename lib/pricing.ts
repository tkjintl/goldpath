// GoldPath pricing oracle
//
// Three numbers we need:
//   1. LBMA / international gold (USD/oz)  — what GoldPath actually buys at
//   2. FX rate (KRW per USD)               — to express gold in KRW
//   3. Korea retail KRW/g                  — for kimchi-premium comparison
//
// Gold source priority:
//   1. Yahoo Finance GC=F (gold futures front-month, COMEX) — reliable JSON, no key
//   2. Stooq XAUUSD CSV                                     — backup, no key
//   3. Seed constant                                         — honest last-known value
//
// FX: Frankfurter (ECB rates, open, no key)
// Retail: weekly seed; Phase 2 ops portal lets staff update until live feed licensed
//
// Cached 5 min. Surfaces LIVE vs SEED status in UI.

import { unstable_cache } from 'next/cache';

export type FeedStatus = 'live' | 'seed';

export type PriceSnapshot = {
  retailKrwPerGram: number;
  aurumKrwPerGram: number;
  lbmaKrwPerGram: number;
  lbmaUsdPerOz: number;
  fxKrwPerUsd: number;
  krxKrwPerGram: number; // kept for component compatibility — same as lbmaKrwPerGram
  kimchiPremiumPct: number; // (retail − lbma_in_krw) / lbma_in_krw
  aurumDiscountPct: number; // (aurum − retail) / retail — negative = cheaper than retail
  timestamp: string;
  retailAsOf: string;
  sources: { gold: FeedStatus; fx: FeedStatus; retail: FeedStatus };
};

const OZ_TO_G = 31.1034768;
const AURUM_SPREAD_PCT = 0.02;

// Sanity bounds — reject any feed value outside this range
const GOLD_MIN_USD = 2_000;
const GOLD_MAX_USD = 12_000;

// ─── Seeds — update weekly ──────────────────────────────────────────────
// Last updated: 2026-05-03 (confirmed via Yahoo Finance GC=F: $4,644 · Stooq: $4,610)
const SEED_LBMA_USD_OZ   = 4_644.50;
const SEED_FX            = 1_440.20;
const SEED_RETAIL_KRW_G  = 258_000;  // ~20% kimchi premium at current spot
const SEED_RETAIL_AS_OF  = '2026-05-03';

// ─── Yahoo Finance GC=F (primary gold source) ───────────────────────────
// GC=F = gold futures front-month (COMEX). Tracks spot very closely.
// Endpoint returns JSON with chart.result[0].meta.regularMarketPrice
type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: { regularMarketPrice?: number };
    }>;
  };
};

async function fetchGoldYahoo(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch(
      'https://query2.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=1d',
      {
        cache: 'no-store',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; GoldPathPricer/1.0)',
          Accept: 'application/json',
        },
      }
    );
    if (!res.ok) return { value: 0, ok: false };
    const data = (await res.json()) as YahooChartResponse;
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    const v = Number(price);
    if (!isFinite(v) || v < GOLD_MIN_USD || v > GOLD_MAX_USD) return { value: 0, ok: false };
    return { value: v, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── Stooq XAUUSD CSV (fallback gold source) ────────────────────────────
// CSV columns: Symbol, Date, Time, Open, High, Low, Close, Volume
// cols[6] = Close
async function fetchGoldStooq(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch(
      'https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv',
      {
        cache: 'no-store',
        headers: { 'User-Agent': 'GoldPathPricer/1.0' },
      }
    );
    if (!res.ok) return { value: 0, ok: false };
    const csv = await res.text();
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return { value: 0, ok: false };
    const cols = lines[1].split(',');
    const v = Number(cols[6]);
    if (!isFinite(v) || v < GOLD_MIN_USD || v > GOLD_MAX_USD) return { value: 0, ok: false };
    return { value: v, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── FX — Frankfurter (ECB, free, no key) ──────────────────────────────
async function fetchFx(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=KRW', {
      cache: 'no-store',
    });
    if (!res.ok) return { value: 0, ok: false };
    const data = (await res.json()) as { rates?: { KRW?: number } };
    const v = Number(data.rates?.KRW);
    if (!isFinite(v) || v < 500 || v > 3000) return { value: 0, ok: false };
    return { value: v, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── Composer ────────────────────────────────────────────────────────────
async function fetchSnapshot(): Promise<PriceSnapshot> {
  // Gold: try Yahoo first, fall back to Stooq, then seed
  const [yahooGold, fx] = await Promise.all([fetchGoldYahoo(), fetchFx()]);

  let goldResult = yahooGold;
  if (!goldResult.ok) {
    goldResult = await fetchGoldStooq();
  }

  const lbmaUsdPerOz  = goldResult.ok ? goldResult.value : SEED_LBMA_USD_OZ;
  const fxKrwPerUsd   = fx.ok ? fx.value : SEED_FX;
  const lbmaKrwPerGram = (lbmaUsdPerOz * fxKrwPerUsd) / OZ_TO_G;

  const retailKrwPerGram = SEED_RETAIL_KRW_G;
  const aurumKrwPerGram  = Math.round(lbmaKrwPerGram * (1 + AURUM_SPREAD_PCT));

  return {
    retailKrwPerGram,
    aurumKrwPerGram,
    lbmaKrwPerGram:  Math.round(lbmaKrwPerGram),
    krxKrwPerGram:   Math.round(lbmaKrwPerGram),
    lbmaUsdPerOz,
    fxKrwPerUsd,
    kimchiPremiumPct: (retailKrwPerGram - lbmaKrwPerGram) / lbmaKrwPerGram,
    aurumDiscountPct: (aurumKrwPerGram - retailKrwPerGram) / retailKrwPerGram,
    timestamp:   new Date().toISOString(),
    retailAsOf:  SEED_RETAIL_AS_OF,
    sources: {
      gold:   goldResult.ok ? 'live' : 'seed',
      fx:     fx.ok ? 'live' : 'seed',
      retail: 'seed',
    },
  };
}

// Cache key bumped to v4 to bust any stale values from previous deployments
export const getPriceSnapshot = unstable_cache(
  fetchSnapshot,
  ['gp-price-snapshot-v4'],
  { revalidate: 300, tags: ['pricing'] },
);

// ─── Helpers ─────────────────────────────────────────────────────────────
export function fmtKRW(n: number): string {
  return '₩' + Math.round(n).toLocaleString('ko-KR');
}
export function fmtPct(n: number, digits = 1): string {
  return (n >= 0 ? '+' : '') + (n * 100).toFixed(digits) + '%';
}
