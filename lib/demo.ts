// ─────────────────────────────────────────────────────────────────────
// Phase 1 demo data
//
// Deterministic mock account derived from a session email. Phase 2 reads
// real ledger entries from Postgres via lib/db.ts — same shape, same call sites.
// ─────────────────────────────────────────────────────────────────────

import { TIERS } from '@/components/TierLadder';

export type DemoAccount = {
  founderNumber: number;
  tier: typeof TIERS[number];
  gramsOwned: number;
  monthlyKRW: number;
  streakMonths: number;
  joinDate: string;
  nextDebitDate: string;
  cumulativeKRW: number;
  pendingCreditKRW: number;
  recent: { date: string; type: string; grams: number; krw: number }[];
};

// Derive a consistent founder number from the email so the dashboard is
// stable across page loads.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function buildDemoAccount(email: string): DemoAccount {
  const h = hash(email);
  const founderNumber = (h % 5000) + 1;
  // Tier picked from email — most users land in Bronze/Silver
  const tierBuckets: number[] = [0, 0, 0, 0, 1, 1, 2, 2, 3, 4]; // weighted
  const tier = TIERS[tierBuckets[h % tierBuckets.length]];
  const monthlyKRW =
    tier.n === 'I' ? 200_000 :
    tier.n === 'II' ? 500_000 :
    tier.n === 'III' ? 1_000_000 :
    tier.n === 'IV' ? 2_000_000 :
    5_000_000;
  const streakMonths = (h % 18) + 3; // 3–20 months
  const gramsOwned = (monthlyKRW * streakMonths) / 165_000; // ~₩165K/g recent
  const cumulativeKRW = monthlyKRW * streakMonths;

  // Next debit on the 5th of next month
  const now = new Date();
  const nextDebit = new Date(now.getFullYear(), now.getMonth() + 1, 5);

  // Recent ledger entries
  const recent = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    d.setDate(5);
    const krw = monthlyKRW;
    const grams = krw / 165_000;
    return {
      date: d.toISOString().slice(0, 10),
      type: i === 0 ? 'AUTO-DEBIT · 매입 대기' : 'AUTO-DEBIT · 매입 완료',
      grams,
      krw,
    };
  });

  return {
    founderNumber,
    tier,
    gramsOwned,
    monthlyKRW,
    streakMonths,
    joinDate: new Date(now.getFullYear() - 1, now.getMonth() - streakMonths + 1, 5)
      .toISOString().slice(0, 10),
    nextDebitDate: nextDebit.toISOString().slice(0, 10),
    cumulativeKRW,
    pendingCreditKRW: parseFloat(tier.gift.replace(/[₩K M]/g, (m) =>
      m === 'K' ? '000' : m === 'M' ? '000000' : '',
    )) || 0,
    recent,
  };
}
