// ─────────────────────────────────────────────────────────────────────
// Domain types — what the database stores.
//
// Mirrors lib/db/schema.sql exactly. Demo functions in lib/demo.ts and
// lib/demo-ops.ts conform to these shapes so swapping is mechanical.
// ─────────────────────────────────────────────────────────────────────

export type Tier = 'I' | 'II' | 'III' | 'IV' | 'V';

export type Customer = {
  id: string;
  email: string;
  name: string;
  initials: string;
  founderNumber: number | null;
  phoneE164: string | null;
  residenceIso: string | null;
  status: 'active' | 'paused' | 'closed' | 'frozen';
  createdAt: string;
  updatedAt: string;
};

export type Kyc = {
  id: string;
  customerId: string;
  vendor: string;
  vendorRef: string | null;
  status: 'pending' | 'in_review' | 'edd_required' | 'approved' | 'rejected';
  flags: string[];
  pepCheck: boolean;
  sanctionsCheck: boolean;
  decisionAt: string | null;
  decisionBy: string | null;
  createdAt: string;
};

export type Subscription = {
  id: string;
  customerId: string;
  tier: Tier;
  monthlyKrw: number;
  debitDay: number;
  status: 'active' | 'paused' | 'cancelled';
  createdAt: string;
  cancelledAt: string | null;
};

export type LedgerEntryType =
  | 'debit_received'
  | 'fx_executed'
  | 'buy_executed'
  | 'allocate'
  | 'credit_grant'
  | 'credit_vest'
  | 'credit_reverse'
  | 'sellback'
  | 'physical_withdrawal'
  | 'heritage_transfer'
  | 'storage_fee'
  | 'reversal';

export type LedgerEntry = {
  id: string;
  customerId: string;
  entryType: LedgerEntryType;
  gramsDelta: number;
  krwDelta: number;
  fxRate: number | null;
  fixPriceKrw: number | null;
  reference: string | null;
  notes: string | null;
  idempotencyKey: string | null;
  postedBy: string;
  createdAt: string;
};

export type AccountBalance = {
  customerId: string;
  gramsOwned: number;
  krwBalance: number;
  entryCount: number;
  lastEntryAt: string;
};

export type SettlementBatch = {
  id: string;
  batchDate: string;
  customerCount: number;
  totalKrw: number;
  estimatedGrams: number;
  status: 'pending' | 'fix_taken' | 'ledger_posted' | 'failed';
  fixPriceKrw: number | null;
  fixTakenAt: string | null;
  postedAt: string | null;
  bullionBankTicket: string | null;
};

export type Withdrawal = {
  id: string;
  customerId: string;
  type: 'sellback' | 'physical_100g' | 'physical_1kg' | 'physical_10g' | 'physical_1g' | 'heritage';
  grams: number;
  krwEstimate: number | null;
  status: 'pending_review' | 'maker_approved' | 'checker_approved' | 'in_progress' | 'completed' | 'flagged' | 'cancelled';
  makerUser: string | null;
  checkerUser: string | null;
  shipTo: Record<string, unknown> | null;
  beneficiaryId: string | null;
  flags: string[];
  createdAt: string;
  completedAt: string | null;
};

export type HeritageDesignation = {
  id: string;
  customerId: string;
  beneficiaryName: string;
  beneficiaryRelation: string | null;
  beneficiaryContact: { email?: string; phone?: string };
  beneficiaryKycId: string | null;
  triggerType: 'date' | 'age' | 'manual' | 'estate';
  triggerValue: string | null;
  partialGrams: number | null;
  status: 'pending_setup' | 'active' | 'triggered' | 'completed' | 'cancelled';
  triggeredAt: string | null;
  completedAt: string | null;
  createdAt: string;
};

export type VaultLot = {
  id: string;
  lotRef: string;
  refiner: string;
  barSize: string;
  barCount: number;
  totalGrams: number;
  custodyDate: string;
  vault: string;
  trusteeRef: string | null;
  retiredAt: string | null;
};

export type ComplianceHit = {
  id: string;
  customerId: string | null;
  rule: string;
  severity: 'info' | 'warn' | 'critical';
  description: string;
  payload: Record<string, unknown> | null;
  status: 'open' | 'investigating' | 'cleared' | 'reported';
  clearedBy: string | null;
  clearedAt: string | null;
  createdAt: string;
};

export type AuditAttestation = {
  id: string;
  quarter: string;
  auditor: string;
  attestationPdf: string | null;
  totalGramsAttested: number;
  varianceGrams: number;
  publishedAt: string | null;
  createdAt: string;
};

export type PricingSnapshot = {
  id: number;
  takenAt: string;
  krxKrwPerG: number | null;
  retailKrwPerG: number | null;
  aurumKrwPerG: number | null;
  lbmaUsdPerOz: number | null;
  fxKrwPerUsd: number | null;
  source: Record<string, unknown> | null;
};

export type AdminAuditEntry = {
  id: number;
  adminUser: string;
  action: string;
  targetType: string | null;
  targetId: string | null;
  payload: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
};
