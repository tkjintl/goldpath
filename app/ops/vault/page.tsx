import { getOpsStats, fmtKRW } from '@/lib/demo-ops';
import { OpsHeader } from '@/components/ops/Queue';

export default function VaultPage() {
  const s = getOpsStats();
  // Demo data: mock vault statement vs internal ledger reconciliation
  const lots = [
    { ref: 'LOT-2025-Q4-001', refiner: 'PAMP', size: '1kg', count: 14, totalGrams: 14_000, custodyDate: '2025-10-12' },
    { ref: 'LOT-2025-Q4-002', refiner: 'Heraeus', size: '1kg', count: 22, totalGrams: 22_000, custodyDate: '2025-11-04' },
    { ref: 'LOT-2026-Q1-001', refiner: 'PAMP', size: '100g', count: 38, totalGrams: 3_800, custodyDate: '2026-01-08' },
    { ref: 'LOT-2026-Q1-002', refiner: 'Argor-Heraeus', size: '1kg', count: 18, totalGrams: 18_000, custodyDate: '2026-02-14' },
    { ref: 'LOT-2026-Q1-003', refiner: 'PAMP', size: '100g', count: 78, totalGrams: 7_800, custodyDate: '2026-03-04' },
    { ref: 'LOT-2026-Q2-001', refiner: 'Heraeus', size: '1kg', count: 10, totalGrams: 10_000, custodyDate: '2026-04-08' },
  ];
  const vaultTotal = lots.reduce((a, b) => a + b.totalGrams, 0);
  const ledgerTotal = s.aumGrams;
  const variance = vaultTotal - ledgerTotal;

  return (
    <>
      <OpsHeader
        eyebrow="§ VAULT"
        title="Malca-Amit 재고 대조"
        subtitle="EVERY MONTH: PHYSICAL STATEMENT vs INTERNAL LEDGER · DRIFT &gt; 0.01% BLOCKS TRADING"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 36,
        }}
      >
        <Stat label="VAULT TOTAL · MALCA-AMIT" value={`${vaultTotal.toLocaleString()} g`} />
        <Stat label="LEDGER TOTAL · INTERNAL" value={`${ledgerTotal.toLocaleString()} g`} />
        <Stat label="VARIANCE" value={(variance >= 0 ? '+' : '') + variance.toLocaleString() + ' g'} tone={Math.abs(variance) > vaultTotal * 0.0001 ? 'warn' : 'ok'} />
        <Stat label="VARIANCE %" value={(((variance / ledgerTotal) || 0) * 100).toFixed(4) + '%'} />
      </div>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--rule-strong)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--bg-2)' }}>
              <Th>LOT REF</Th>
              <Th>REFINER</Th>
              <Th>BAR SIZE</Th>
              <Th align="right">COUNT</Th>
              <Th align="right">TOTAL g</Th>
              <Th>CUSTODY DATE</Th>
            </tr>
          </thead>
          <tbody>
            {lots.map((l) => (
              <tr key={l.ref} style={{ borderBottom: '1px dashed var(--rule)' }}>
                <Td>{l.ref}</Td>
                <Td>{l.refiner}</Td>
                <Td>{l.size}</Td>
                <Td align="right">{l.count}</Td>
                <Td align="right">{l.totalGrams.toLocaleString()}</Td>
                <Td>{l.custodyDate}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ label, value, tone = 'ok' }: { label: string; value: string; tone?: 'ok' | 'warn' }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--rule-strong)', padding: 20 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 32, color: tone === 'warn' ? 'var(--red)' : 'var(--ink)', fontWeight: 500, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th style={{ textAlign: align, padding: '12px 14px', borderBottom: '1px solid var(--rule-strong)', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>
      {children}
    </th>
  );
}
function Td({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <td style={{ textAlign: align, padding: '12px 14px', color: 'var(--ink)' }}>{children}</td>;
}
