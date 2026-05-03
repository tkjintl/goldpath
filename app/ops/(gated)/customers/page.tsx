import { getCustomers } from '@/lib/demo-ops';
import { fmtKRW } from '@/lib/pricing';
import { OpsHeader, OpsTable, OpsTh, OpsTd, StatusPill } from '@/components/ops/Queue';

const STATUS_TONE: Record<string, 'ok' | 'warn' | 'critical' | 'info'> = {
  active: 'ok',
  paused: 'warn',
  closed: 'info',
  frozen: 'critical',
};

export default function CustomersPage() {
  const list = getCustomers(20);
  return (
    <>
      <OpsHeader
        eyebrow="§ CUSTOMERS"
        title="회원 관리"
        subtitle={`${list.length} SHOWN · SEARCH + FILTER · PHASE 2`}
        rightSlot={
          <input
            placeholder="initials · founder # · email"
            disabled
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              padding: '8px 12px',
              border: '1px solid var(--rule-strong)',
              background: 'var(--bg)',
              color: 'var(--ink)',
              minWidth: 280,
              opacity: 0.6,
            }}
          />
        }
      />
      <OpsTable>
        <thead>
          <tr>
            <OpsTh>FOUNDER</OpsTh>
            <OpsTh>INITIALS</OpsTh>
            <OpsTh>TIER</OpsTh>
            <OpsTh>JOIN</OpsTh>
            <OpsTh align="right">MONTHLY</OpsTh>
            <OpsTh align="right">GRAMS</OpsTh>
            <OpsTh align="right">CUMULATIVE</OpsTh>
            <OpsTh>STATUS</OpsTh>
            <OpsTh>KYC</OpsTh>
            <OpsTh align="right">ACTION</OpsTh>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.founderNumber}>
              <OpsTd>#{c.founderNumber}</OpsTd>
              <OpsTd>{c.initials}</OpsTd>
              <OpsTd><span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 16, fontWeight: 500 }}>{c.tier}</span></OpsTd>
              <OpsTd>{c.joinDate}</OpsTd>
              <OpsTd align="right">{fmtKRW(c.monthlyKRW)}</OpsTd>
              <OpsTd align="right">{c.gramsOwned.toFixed(2)} g</OpsTd>
              <OpsTd align="right">{fmtKRW(c.cumulativeKRW)}</OpsTd>
              <OpsTd><StatusPill status={c.status} tone={STATUS_TONE[c.status]} /></OpsTd>
              <OpsTd><StatusPill status={c.kycStatus} tone={c.kycStatus === 'verified' ? 'ok' : c.kycStatus === 'pending' ? 'pending' : 'critical'} /></OpsTd>
              <OpsTd align="right">
                <button disabled style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', opacity: 0.6 }}>
                  OPEN
                </button>
              </OpsTd>
            </tr>
          ))}
        </tbody>
      </OpsTable>
    </>
  );
}
