// ─────────────────────────────────────────────────────────────────────
// GoldPath pricing oracle
//
// Three feeds:
//   1. KRX gold market spot (KRW/g)            — institutional Korean spot
//   2. LBMA / international (USD/oz → KRW/g)   — Aurum's actual buy price
//   3. Korea Gold Exchange retail (KRW/g)      — kimchi-premium comparison
//
// All fetches are server-side only, cached for 5 minutes via unstable_cache.
// Phase 1 falls back to seeded values if any feed is down — surface latency
// in the UI rather than throwing.
// ─────────────────────────────────────────────────────────────────────

import { unstable_cache } from 'next/cache';

export type PriceSnapshot = {
  // KRW per gram
  krxKrwPerGram: number;
  retailKrwPerGram: number;
  aurumKrwPerGram: number;
  // Reference
  lbmaUsdPerOz: number;
  fxKrwPerUsd: number;
  // Derived
  kimchiPremiumPct: number;       // (retail - lbma_in_krw) / lbma_in_krw
  aurumDiscountPct: number;       // (aurum - retail) / retail (negative)
  // Meta
  timestamp: string;
  sources: { krx: 'live' | 'cached' | 'seed'; retail: 'live' | 'cached' | 'seed'; lbma: 'live' | 'cached' | 'seed' };
};

const OZ_TO_G = 31.1034768;
const AURUM_SPREAD_PCT = 0.02;       // GoldPath spot+2% headline
const SEED_LBMA_USD_OZ = 2401.85;
const SEED_FX = 1438.20;
const SEED_RETAIL_KRW_G = 186_800;   // Korea Gold Exchange retail benchmark

// ─── KRX gold market — KOFIA / KRX public daily ──────────────────────
// http://data.krx.co.kr publishes daily gold close. Free, no key.
// We hit the public JSON endpoint used by the data.krx.co.kr web UI.
async function fetchKrxKrwPerGram(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch(
      'http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'GoldPathPricer/0.1',
          'Referer': 'http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/',
        },
        body: new URLSearchParams({
          bld: 'dbms/MDC/STAT/standard/MDCSTAT13701',
          mktId: 'GD',
          locale: 'ko_KR',
          isuCd: 'KRD040200000',         // 99.99K 1g spot
          // KRX returns trailing days; we just want the last close
          strtDd: yyyymmdd(daysAgo(7)),
          endDd: yyyymmdd(new Date()),
        }).toString(),
        // KRX caching is short — let Next.js cache at the unstable_cache layer
        cache: 'no-store',
      },
    );
    if (!res.ok) return { value: 0, ok: false };
    const data = (await res.json()) as { output?: Array<{ TDD_CLSPRC?: string }> };
    const rows = data.output ?? [];
    const last = rows[0]?.TDD_CLSPRC;
    if (!last) return { value: 0, ok: false };
    const value = Number(String(last).replace(/[, ]/g, ''));
    if (!isFinite(value) || value <= 0) return { value: 0, ok: false };
    return { value, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── LBMA / international gold — exchangerate.host or similar free feed ──
// We use a metals-prices public feed. Phase 2 swaps to LBMA AM/PM fix via
// our bullion bank's API.
async function fetchLbmaUsdPerOz(): Promise<{ value: number; fx: number; ok: boolean }> {
  try {
    // exchangerate.host serves XAU and KRW from the same endpoint
    const res = await fetch(
      'https://api.exchangerate.host/live?source=USD&currencies=KRW,XAU',
      { cache: 'no-store' },
    );
    if (!res.ok) return { value: 0, fx: 0, ok: false };
    const data = (await res.json()) as {
      success?: boolean;
      quotes?: { USDKRW?: number; USDXAU?: number };
    };
    const fx = data.quotes?.USDKRW ?? 0;
    const xau = data.quotes?.USDXAU ?? 0;
    if (!fx || !xau) return { value: 0, fx: 0, ok: false };
    // USDXAU is troy ounces of gold per USD → invert for USD/oz
    const usdPerOz = 1 / xau;
    if (!isFinite(usdPerOz) || usdPerOz <= 0) return { value: 0, fx: 0, ok: false };
    return { value: usdPerOz, fx, ok: true };
  } catch {
    return { value: 0, fx: 0, ok: false };
  }
}

// ─── Korea Gold Exchange retail — scrape current 1g sell price ─────────
// 한국금거래소 publishes today's retail buy/sell prices. Free, public.
// Phase 1 uses the daily-snapshot endpoint; Phase 2 ingests via partner API.
async function fetchRetailKrwPerGram(): Promise<{ value: number; ok: boolean }> {
  try {
    const res = await fetch('https://www.koreagoldx.co.kr/api/today-price', {
      headers: { 'User-Agent': 'GoldPathPricer/0.1' },
      cache: 'no-store',
    });
    if (!res.ok) return { value: 0, ok: false };
    const data = (await res.json()) as { sell_per_gram?: number };
    const value = Number(data.sell_per_gram);
    if (!isFinite(value) || value <= 0) return { value: 0, ok: false };
    return { value, ok: true };
  } catch {
    return { value: 0, ok: false };
  }
}

// ─── Composer — runs every feed in parallel, falls back gracefully ────
async function fetchSnapshot(): Promise<PriceSnapshot> {
  const [krx, lbma, retail] = await Promise.all([
    fetchKrxKrwPerGram(),
    fetchLbmaUsdPerOz(),
    fetchRetailKrwPerGram(),
  ]);

  const lbmaUsdPerOz = lbma.ok ? lbma.value : SEED_LBMA_USD_OZ;
  const fxKrwPerUsd = lbma.ok && lbma.fx ? lbma.fx : SEED_FX;
  const lbmaKrwPerGram = (lbmaUsdPerOz * fxKrwPerUsd) / OZ_TO_G;

  const krxKrwPerGram = krx.ok ? krx.value : Math.round(lbmaKrwPerGram);
  const retailKrwPerGram = retail.ok ? retail.value : SEED_RETAIL_KRW_G;
  const aurumKrwPerGram = Math.round(lbmaKrwPerGram * (1 + AURUM_SPREAD_PCT));

  const kimchiPremiumPct = (retailKrwPerGram - lbmaKrwPerGram) / lbmaKrwPerGram;
  const aurumDiscountPct = (aurumKrwPerGram - retailKrwPerGram) / retailKrwPerGram;

  return {
    krxKrwPerGram,
    retailKrwPerGram,
    aurumKrwPerGram,
    lbmaUsdPerOz,
    fxKrwPerUsd,
    kimchiPremiumPct,
    aurumDiscountPct,
    timestamp: new Date().toISOString(),
    sources: {
      krx: krx.ok ? 'live' : 'seed',
      retail: retail.ok ? 'live' : 'seed',
      lbma: lbma.ok ? 'live' : 'seed',
    },
  };
}

// 5-minute server cache via Next's unstable_cache.
// Tag for on-demand revalidation when we add a manual override admin tool.
export const getPriceSnapshot = unstable_cache(
  fetchSnapshot,
  ['gp-price-snapshot-v1'],
  { revalidate: 300, tags: ['pricing'] },
);

// ─── Helpers ──────────────────────────────────────────────────────────
export function fmtKRW(n: number): string {
  return '₩' + Math.round(n).toLocaleString('ko-KR');
}
export function fmtPct(n: number, digits = 1): string {
  return (n >= 0 ? '+' : '') + (n * 100).toFixed(digits) + '%';
}

function yyyymmdd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}
function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
