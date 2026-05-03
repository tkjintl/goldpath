import { getWithdrawalQueue } from '@/lib/demo-ops';
import { fmtKRW } from '@/lib/pricing';
import { OpsHeader, OpsTable, OpsTh, OpsTd, StatusPill } from '@/components/ops/Queue';

const STATUS_TONE: Record<string, 'pending' | 'warn' | 'ok' | 'critical' | 'info'> = {
  pending_review: 'pending',
  maker_approved: 'pending',
  checker_approved: 'pending',
  in_progress: 'info',
  completed: 'ok',
  flagged: 'critical',
};

const TYPE_LABEL: Record<string, string> = {
  sellback: '매도 (KRW)',
  physical_100g: '실물 100g',
  physical_1kg: '실물 1kg',
  physical_10g: '실물 10g',
  heritage: '유산 이전',
};

export default function WithdrawalsPage() {
  const items = getWithdrawalQueue();
  return (
    <>
      <OpsHeader
        eyebrow="§ WITHDRAWALS"
        title="인출 승인 큐"
        subtitle="MAKER/CHECKER DUAL CONTROL · &gt;$10K REQUIRES BOTH SIGNATURES"
      />
      <OpsTable>
        <thead>
          <tr>
            <OpsTh>WD ID</OpsTh>
            <OpsTh>CUSTOMER</OpsTh>
            <OpsTh>FOUNDER</OpsTh>
            <OpsTh>TYPE</OpsTh>
            <OpsTh align="right">GRAMS</OpsTh>
            <OpsTh align="right">KRW</OpsTh>
            <OpsTh>STATUS</OpsTh>
            <OpsTh>SUBMITTED</OpsTh>
            <OpsTh align="right">ACTION</OpsTh>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => (
            <tr key={w.id}>
              <OpsTd>{w.id}</OpsTd>
              <OpsTd>{w.customerInitials}</OpsTd>
              <OpsTd>#{w.founderNumber}</OpsTd>
              <OpsTd>
                <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13 }}>{TYPE_LABEL[w.type]}</span>
              </OpsTd>
              <OpsTd align="right">{w.grams.toFixed(0)} g</OpsTd>
              <OpsTd align="right">{fmtKRW(w.krw)}</OpsTd>
              <OpsTd><StatusPill status={w.status.replace('_', ' ')} tone={STATUS_TONE[w.status]} /></OpsTd>
              <OpsTd>{w.submitted}</OpsTd>
              <OpsTd align="right">
                <button disabled style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', opacity: 0.6 }}>
                  {w.status === 'pending_review' ? 'APPROVE' : w.status === 'maker_approved' ? 'CHECK' : 'VIEW'}
                </button>
              </OpsTd>
            </tr>
          ))}
        </tbody>
      </OpsTable>
    </>
  );
}
