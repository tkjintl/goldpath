import { getOpsStats, fmtKRW } from '@/lib/demo-ops';
import { OpsHeader } from '@/components/ops/Queue';

export default function FinancialsPage() {
  const s = getOpsStats();
  // Demo P&L for current month
  const revenue = s.mrr * 0.02; // 2% spread on MRR
  const storageRev = s.aumKrw * 0.0030 / 12; // 30 bps/yr storage
  const grossRev = revenue + storageRev;
  const vault = s.aumKrw * 0.0035 / 12;        // 35 bps/yr vault+insurance
  const hedging = s.aumKrw * 0.0015 / 12;
  const fxPay = s.mrr * 0.018;                 // 1.8% PG + FX on inflow
  const compliance = 12_000_000;
  const tech = 30_000_000;
  const fab = revenue * 0.10;
  const totalCost = vault + hedging + fxPay + compliance + tech + fab;
  const grossProfit = grossRev - totalCost;
  const grossMargin = grossProfit / grossRev;

  return (
    <>
      <OpsHeader
        eyebrow="§ FINANCIALS"
        title="손익 · P&amp;L · 월간"
        subtitle="DEMO DATA · PHASE 2 PULLS FROM DOUBLE-ENTRY LEDGER"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 36 }}>
        <Tile label="AUM" value={fmtKRW(s.aumKrw)} hint={`${s.aumGrams.toLocaleString()} g`} />
        <Tile label="MRR" value={fmtKRW(s.mrr)} />
        <Tile label="GROSS MARGIN" value={(grossMargin * 100).toFixed(0) + '%'} tone="accent" />
        <Tile label="MONTHLY GROSS PROFIT" value={fmtKRW(grossProfit)} tone={grossProfit > 0 ? 'accent' : 'warn'} />
      </div>

      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 18 }}>
        REVENUE
      </h3>
      <Pl rows={[
        { label: 'Monthly buy spread (2% × MRR)', value: revenue },
        { label: 'Storage fees (30 bps/yr × AUM × 1/12)', value: storageRev },
      ]} total={grossRev} totalLabel="GROSS REVENUE" tone="accent" />

      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.32em', color: 'var(--accent)', marginTop: 32, marginBottom: 18 }}>
        COSTS
      </h3>
      <Pl rows={[
        { label: 'Vault + Lloyd\'s insurance (35 bps/yr × AUM × 1/12)', value: -vault },
        { label: 'Hedging carry / unallocated lease (15 bps/yr × AUM × 1/12)', value: -hedging },
        { label: 'PG + FX (1.8% × MRR inflow)', value: -fxPay },
        { label: 'Fabrication amortized (10% of revenue)', value: -fab },
        { label: 'Compliance / KYC vendor / legal (fixed)', value: -compliance },
        { label: 'Tech / staff (fixed)', value: -tech },
      ]} total={-totalCost} totalLabel="TOTAL COSTS" tone="warn" />

      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.32em', color: 'var(--accent)', marginTop: 32, marginBottom: 18 }}>
        NET
      </h3>
      <Pl rows={[]} total={grossProfit} totalLabel="GROSS PROFIT (PRE-TAX)" tone={grossProfit > 0 ? 'accent' : 'warn'} />
    </>
  );
}

function Tile({ label, value, hint, tone = 'ink' }: { label: string; value: string; hint?: string; tone?: 'ink' | 'accent' | 'warn' }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--rule-strong)', padding: 20 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 32,
        color: tone === 'accent' ? 'var(--accent)' : tone === 'warn' ? 'var(--red)' : 'var(--ink)',
        fontWeight: 500,
        lineHeight: 1,
      }}>{value}</div>
      {hint && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 8 }}>{hint}</div>}
    </div>
  );
}

function Pl({
  rows,
  total,
  totalLabel,
  tone,
}: {
  rows: { label: string; value: number }[];
  total: number;
  totalLabel: string;
  tone: 'accent' | 'warn';
}) {
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--rule-strong)' }}>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px dashed var(--rule)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}
        >
          <span style={{ color: 'var(--ink-2)' }}>{r.label}</span>
          <span style={{ color: r.value >= 0 ? 'var(--ink)' : 'var(--red)', fontWeight: 600 }}>{fmtKRW(r.value)}</span>
        </div>
      ))}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '18px',
        background: 'var(--bg-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.18em',
      }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{totalLabel}</span>
        <span style={{
          color: tone === 'accent' ? 'var(--accent)' : 'var(--red)',
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: '0.04em',
        }}>{fmtKRW(total)}</span>
      </div>
    </div>
  );
}
