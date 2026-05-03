import Link from 'next/link';
import { getOpsStats, fmtKRW } from '@/lib/demo-ops';
import { OpsHeader } from '@/components/ops/Queue';

export default async function OpsOverview() {
  const s = getOpsStats();
  return (
    <>
      <OpsHeader
        eyebrow="§ OVERVIEW"
        title="Operator dashboard"
        subtitle="REAL-TIME · DEMO DATA · PHASE 2 SWAPS TO POSTGRES"
      />

      {/* Headline numbers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 36,
        }}
      >
        <Card label="AUM · KRW" value={fmtKRW(s.aumKrw)} hint={`${s.aumGrams.toLocaleString()} g · 999.9`} />
        <Card label="MRR" value={fmtKRW(s.mrr)} hint="recurring debits / month" />
        <Card label="ACTIVE CUSTOMERS" value={s.activeCustomers.toLocaleString()} hint={`${s.capRemaining.toLocaleString()} cohort spots remaining`} />
        <Card label="GROSS MARGIN" value={(s.grossMarginPct * 100).toFixed(0) + '%'} hint="bps spread net of cost stack" />
        <Card label="CAC" value={fmtKRW(s.cacKrw)} hint="trailing 90 days" />
        <Card label="12mo RETENTION" value={(s.monthly12RetentionPct * 100).toFixed(0) + '%'} hint="active 12mo+ cohort" />
      </div>

      {/* Queues */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        <Queue href="/ops/kyc" label="KYC QUEUE" count={s.pendingKyc} desc="대기 + 검토 + EDD 요청" />
        <Queue href="/ops/settlement" label="SETTLEMENT" count={s.pendingSettlement} desc="다음 월간 배치 픽스 대기" />
        <Queue href="/ops/withdrawals" label="WITHDRAWALS" count={s.pendingWithdrawals} desc="maker/checker 검토 대기" />
        <Queue href="/ops/compliance" label="COMPLIANCE" count={s.flaggedComplianceHits} desc="조사 진행 중" tone="critical" />
      </div>

      <section style={{ marginTop: 56 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 14 }}>
          QUICK ACTIONS
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <ActionLink href="/ops/audits">UPLOAD BRINK'S AUDIT PDF</ActionLink>
          <ActionLink href="/ops/vault">RUN VAULT RECONCILIATION</ActionLink>
          <ActionLink href="/ops/customers">SEARCH CUSTOMERS</ActionLink>
          <ActionLink href="/ops/financials">EXPORT MONTHLY P&amp;L</ActionLink>
        </div>
      </section>
    </>
  );
}

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--rule-strong)', padding: 20 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 36, color: 'var(--ink)', fontWeight: 500, lineHeight: 1 }}>
        {value}
      </div>
      {hint && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 8 }}>{hint}</div>}
    </div>
  );
}

function Queue({ href, label, count, desc, tone = 'info' }: { href: string; label: string; count: number; desc: string; tone?: 'info' | 'critical' }) {
  const accent = tone === 'critical' ? 'var(--red)' : 'var(--accent)';
  return (
    <Link href={href as any} style={{ display: 'block', background: 'var(--bg)', border: `1px solid ${accent}`, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: accent }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 32, color: accent, fontWeight: 500 }}>{count}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)', marginTop: 12 }}>{desc}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.18em', marginTop: 14 }}>OPEN →</div>
    </Link>
  );
}

function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href as any}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.18em',
        color: 'var(--accent)',
        border: '1px solid var(--accent)',
        padding: '10px 14px',
      }}
    >
      {children}
    </Link>
  );
}
