import { getKycQueue } from '@/lib/demo-ops';
import { OpsHeader, OpsTable, OpsTh, OpsTd, StatusPill } from '@/components/ops/Queue';
import { fmtKRW } from '@/lib/pricing';
import { approveKycAction } from './actions';

const STATUS_TONE: Record<string, 'pending' | 'warn' | 'critical' | 'ok' | 'info'> = {
  pending: 'pending',
  in_review: 'pending',
  edd_required: 'warn',
  approved: 'ok',
  rejected: 'critical',
};

export default function KycQueuePage() {
  const items = getKycQueue();
  return (
    <>
      <OpsHeader
        eyebrow="§ KYC QUEUE"
        title="신원 검증 큐"
        subtitle={`${items.filter(i => i.status === 'pending' || i.status === 'in_review' || i.status === 'edd_required').length} ACTIVE / ${items.length} TOTAL`}
      />
      <OpsTable>
        <thead>
          <tr>
            <OpsTh>KYC ID</OpsTh>
            <OpsTh>CUSTOMER</OpsTh>
            <OpsTh>FOUNDER</OpsTh>
            <OpsTh>TIER</OpsTh>
            <OpsTh align="right">MONTHLY</OpsTh>
            <OpsTh>STATUS</OpsTh>
            <OpsTh>FLAGS</OpsTh>
            <OpsTh>SUBMITTED</OpsTh>
            <OpsTh align="right">ACTION</OpsTh>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <OpsTd>{it.id}</OpsTd>
              <OpsTd>{it.customerInitials}</OpsTd>
              <OpsTd>#{it.founderNumber}</OpsTd>
              <OpsTd><span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 16, fontWeight: 500 }}>{it.tier}</span></OpsTd>
              <OpsTd align="right">{fmtKRW(it.monthlyKRW)}</OpsTd>
              <OpsTd><StatusPill status={it.status.replace('_', ' ')} tone={STATUS_TONE[it.status]} /></OpsTd>
              <OpsTd>
                {it.flags.length === 0 ? (
                  <span style={{ color: 'var(--ink-3)' }}>—</span>
                ) : (
                  <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {it.flags.map((f) => (
                      <span key={f} style={{ background: 'color-mix(in srgb, var(--accent-dim) 14%, transparent)', color: 'var(--accent-dim)', fontSize: 10, padding: '2px 6px', letterSpacing: '0.14em' }}>
                        {f}
                      </span>
                    ))}
                  </span>
                )}
              </OpsTd>
              <OpsTd>{it.submitted}</OpsTd>
              <OpsTd align="right">
                {it.status === 'approved' || it.status === 'rejected' ? (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-3)' }}>—</span>
                ) : (
                  <form action={approveKycAction} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={it.id} />
                    <button type="submit" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', background: 'transparent', cursor: 'pointer' }}>
                      승인 · APPROVE
                    </button>
                  </form>
                )}
              </OpsTd>
            </tr>
          ))}
        </tbody>
      </OpsTable>
      <p style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-3)' }}>
        시연 데이터 — 새로고침 시 초기화. 감사 로그는 영구 기록.
      </p>
    </>
  );
}
