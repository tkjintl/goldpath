// ─────────────────────────────────────────────────────────────────────
// Phase 1 demo ops data
//
// Deterministic seed data for operator queues so the admin portal looks
// real without a database. Phase 2 swaps each function to a real Postgres
// query — same shape, same call sites.
// ─────────────────────────────────────────────────────────────────────

import { fmtKRW } from './pricing';

export type KycEntry = {
  id: string;
  customerInitials: string;
  founderNumber: number;
  tier: 'I' | 'II' | 'III' | 'IV' | 'V';
  status: 'pending' | 'in_review' | 'edd_required' | 'approved' | 'rejected';
  submitted: string;
  flags: string[];
  monthlyKRW: number;
};

export type SettlementBatch = {
  id: string;
  date: string;
  customerCount: number;
  totalKRW: number;
  estimatedGrams: number;
  status: 'pending' | 'fix_taken' | 'ledger_posted' | 'failed';
  fixPrice?: number;
};

export type WithdrawalReq = {
  id: string;
  customerInitials: string;
  founderNumber: number;
  type: 'sellback' | 'physical_100g' | 'physical_1kg' | 'physical_10g' | 'heritage';
  grams: number;
  krw: number;
  submitted: string;
  status: 'pending_review' | 'maker_approved' | 'checker_approved' | 'in_progress' | 'completed' | 'flagged';
};

export type ComplianceHit = {
  id: string;
  customerInitials: string;
  rule: string;
  severity: 'info' | 'warn' | 'critical';
  description: string;
  detected: string;
  status: 'open' | 'investigating' | 'cleared' | 'reported';
};

export type Customer = {
  initials: string;
  founderNumber: number;
  tier: string;
  joinDate: string;
  monthlyKRW: number;
  gramsOwned: number;
  cumulativeKRW: number;
  status: 'active' | 'paused' | 'closed' | 'frozen';
  kycStatus: 'verified' | 'pending' | 'rejected';
};

// ─── KYC queue ────────────────────────────────────────────────────────
export function getKycQueue(): KycEntry[] {
  return [
    { id: 'KYC-2026-00482', customerInitials: 'KIM.JH', founderNumber: 2849, tier: 'III', status: 'pending', submitted: '2026-05-02 14:22', flags: [], monthlyKRW: 1_000_000 },
    { id: 'KYC-2026-00481', customerInitials: 'PARK.SY', founderNumber: 2848, tier: 'V', status: 'edd_required', submitted: '2026-05-02 11:08', flags: ['SOF_REQUIRED', 'TIER_V'], monthlyKRW: 5_000_000 },
    { id: 'KYC-2026-00480', customerInitials: 'LEE.HJ', founderNumber: 2847, tier: 'II', status: 'in_review', submitted: '2026-05-02 09:46', flags: [], monthlyKRW: 500_000 },
    { id: 'KYC-2026-00479', customerInitials: 'CHOI.MK', founderNumber: 2846, tier: 'IV', status: 'in_review', submitted: '2026-05-01 22:14', flags: ['ADDRESS_MISMATCH'], monthlyKRW: 2_000_000 },
    { id: 'KYC-2026-00478', customerInitials: 'JEONG.YS', founderNumber: 2845, tier: 'I', status: 'pending', submitted: '2026-05-01 19:33', flags: [], monthlyKRW: 200_000 },
    { id: 'KYC-2026-00477', customerInitials: 'YOON.HW', founderNumber: 2844, tier: 'III', status: 'approved', submitted: '2026-05-01 16:02', flags: [], monthlyKRW: 1_000_000 },
    { id: 'KYC-2026-00476', customerInitials: 'KANG.JY', founderNumber: 2843, tier: 'II', status: 'approved', submitted: '2026-05-01 14:48', flags: [], monthlyKRW: 500_000 },
    { id: 'KYC-2026-00475', customerInitials: 'NA.SK', founderNumber: 2842, tier: 'I', status: 'rejected', submitted: '2026-05-01 11:12', flags: ['SANCTIONS_HIT'], monthlyKRW: 200_000 },
  ];
}

// ─── Settlement queue ─────────────────────────────────────────────────
export function getSettlementQueue(): SettlementBatch[] {
  return [
    { id: 'BATCH-2026-05-05', date: '2026-05-05', customerCount: 2848, totalKRW: 1_842_000_000, estimatedGrams: 11_163, status: 'pending' },
    { id: 'BATCH-2026-04-05', date: '2026-04-05', customerCount: 2611, totalKRW: 1_687_500_000, estimatedGrams: 10_228, status: 'ledger_posted', fixPrice: 165_006 },
    { id: 'BATCH-2026-03-05', date: '2026-03-05', customerCount: 2395, totalKRW: 1_540_750_000, estimatedGrams: 9_338, status: 'ledger_posted', fixPrice: 165_022 },
    { id: 'BATCH-2026-02-05', date: '2026-02-05', customerCount: 2188, totalKRW: 1_402_500_000, estimatedGrams: 8_499, status: 'ledger_posted', fixPrice: 165_011 },
  ];
}

// ─── Withdrawal queue ────────────────────────────────────────────────
export function getWithdrawalQueue(): WithdrawalReq[] {
  return [
    { id: 'WD-2026-00128', customerInitials: 'PARK.SY', founderNumber: 2848, type: 'physical_1kg', grams: 1000, krw: 165_000_000, submitted: '2026-05-02 13:14', status: 'pending_review' },
    { id: 'WD-2026-00127', customerInitials: 'LEE.HC', founderNumber: 2840, type: 'sellback', grams: 50, krw: 8_250_000, submitted: '2026-05-02 10:08', status: 'maker_approved' },
    { id: 'WD-2026-00126', customerInitials: 'KIM.SH', founderNumber: 2832, type: 'physical_100g', grams: 100, krw: 16_500_000, submitted: '2026-05-02 08:44', status: 'in_progress' },
    { id: 'WD-2026-00125', customerInitials: 'CHO.YJ', founderNumber: 2820, type: 'heritage', grams: 200, krw: 33_000_000, submitted: '2026-05-01 22:30', status: 'flagged' },
    { id: 'WD-2026-00124', customerInitials: 'KANG.MS', founderNumber: 2811, type: 'sellback', grams: 12, krw: 1_980_000, submitted: '2026-05-01 18:22', status: 'completed' },
    { id: 'WD-2026-00123', customerInitials: 'YIM.HW', founderNumber: 2802, type: 'physical_100g', grams: 100, krw: 16_500_000, submitted: '2026-05-01 14:15', status: 'completed' },
  ];
}

// ─── Compliance hits ─────────────────────────────────────────────────
export function getComplianceHits(): ComplianceHit[] {
  return [
    { id: 'CMP-2026-00042', customerInitials: 'NA.SK', rule: 'OFAC_SDN_PARTIAL_MATCH', severity: 'critical', description: '주민번호 일치 없음, 한글 이름 부분 일치. 수동 검토 필요.', detected: '2026-05-01 11:10', status: 'investigating' },
    { id: 'CMP-2026-00041', customerInitials: 'PARK.SY', rule: 'TIER_V_SOF', severity: 'warn', description: '소브린 등급 가입 — 자금 출처 자료 요청.', detected: '2026-05-02 11:08', status: 'open' },
    { id: 'CMP-2026-00040', customerInitials: 'CHO.YJ', rule: 'HERITAGE_LARGE_GIFT', severity: 'warn', description: '단일 수혜자에게 200g 이전 — 한국 증여세 안내 필요.', detected: '2026-05-01 22:30', status: 'open' },
    { id: 'CMP-2026-00039', customerInitials: 'CHOI.MK', rule: 'ADDRESS_DOC_MISMATCH', severity: 'info', description: '신분증 주소와 입력 주소 불일치 — 추가 서류 요청 자동 발송.', detected: '2026-05-01 22:14', status: 'open' },
  ];
}

// ─── Customer list ────────────────────────────────────────────────────
export function getCustomers(limit = 20): Customer[] {
  const tiers = ['I', 'II', 'III', 'IV', 'V'];
  const initials = ['KIM.JH', 'PARK.SY', 'LEE.HJ', 'CHOI.MK', 'JEONG.YS', 'YOON.HW', 'KANG.JY', 'NA.SK', 'JANG.MS', 'HAN.SJ', 'JO.HW', 'CHO.YJ', 'YIM.HW', 'OH.KS', 'SHIN.JE', 'BAEK.HG', 'GO.MS', 'YANG.SH', 'WOO.JY', 'MOON.HK'];
  return Array.from({ length: limit }, (_, i) => {
    const tier = tiers[i % tiers.length];
    const monthlyKRW = tier === 'I' ? 200_000 : tier === 'II' ? 500_000 : tier === 'III' ? 1_000_000 : tier === 'IV' ? 2_000_000 : 5_000_000;
    const months = 12 - (i % 11);
    const cumulativeKRW = monthlyKRW * months;
    return {
      initials: initials[i % initials.length],
      founderNumber: 2848 - i,
      tier,
      joinDate: '2025-' + String(((11 - (i % 11)) % 12) + 1).padStart(2, '0') + '-05',
      monthlyKRW,
      gramsOwned: cumulativeKRW / 165_000,
      cumulativeKRW,
      status: i % 17 === 0 ? 'paused' : i % 23 === 0 ? 'frozen' : 'active',
      kycStatus: i % 11 === 0 ? 'pending' : 'verified',
    };
  });
}

// ─── Aggregate stats — derived from queue arrays so counts always match ──
export function getOpsStats() {
  const kyc = getKycQueue();
  const settlement = getSettlementQueue();
  const withdrawals = getWithdrawalQueue();
  const compliance = getComplianceHits();
  const customers = getCustomers(20);

  const pendingKyc = kyc.filter((k) =>
    k.status === 'pending' || k.status === 'in_review' || k.status === 'edd_required',
  ).length;
  const pendingSettlement = settlement.filter((s) =>
    s.status === 'pending' || s.status === 'fix_taken',
  ).length;
  const pendingWithdrawals = withdrawals.filter((w) => w.status !== 'completed').length;
  const flaggedComplianceHits = compliance.filter((c) =>
    c.severity === 'critical' && (c.status === 'open' || c.status === 'investigating'),
  ).length;

  // Aggregate AUM/MRR from the customer demo list
  const activeCustomers = customers.filter((c) => c.status === 'active').length;
  const aumKrw = customers.reduce((s, c) => s + c.cumulativeKRW, 0);
  const aumGrams = customers.reduce((s, c) => s + c.gramsOwned, 0);
  const mrr = customers.filter((c) => c.status === 'active').reduce((s, c) => s + c.monthlyKRW, 0);

  return {
    aumKrw,
    aumGrams: Math.round(aumGrams),
    activeCustomers,
    capRemaining: 5000 - activeCustomers,
    mrr,
    pendingKyc,
    pendingSettlement,
    pendingWithdrawals,
    flaggedComplianceHits,
    grossMarginPct: 0.61,        // Phase 2: derive from financials ledger
    cacKrw: 28_500,              // Phase 2: track marketing spend
    monthly12RetentionPct: 0.94, // Phase 2: cohort analysis
  };
}
export { fmtKRW };
