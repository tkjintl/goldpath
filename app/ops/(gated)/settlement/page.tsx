import { getSettlementQueue, fmtKRW } from '@/lib/demo-ops';
import { OpsHeader, OpsTable, OpsTh, OpsTd, StatusPill } from '@/components/ops/Queue';
import { publishSettlementAction } from './actions';

const STATUS_TONE: Record<string, 'pending' | 'ok' | 'critical'> = {
  pending: 'pending',
  fix_taken: 'pending',
  ledger_posted: 'ok',
  failed: 'critical',
};

export default function SettlementPage() {
  const batches = getSettlementQueue();
  return (
    <>
      <OpsHeader
        eyebrow="§ SETTLEMENT"
        title="월간 매입 배치"
        subtitle="WORKFLOW: COLLECT KRW → FX TO USD → LBMA FIX → BULLION BANK ALLOCATE → POST LEDGER"
      />
      <OpsTable>
        <thead>
          <tr>
            <OpsTh>BATCH ID</OpsTh>
            <OpsTh>DATE</OpsTh>
            <OpsTh align="right">CUSTOMERS</OpsTh>
            <OpsTh align="right">KRW TOTAL</OpsTh>
            <OpsTh align="right">EST. GRAMS</OpsTh>
            <OpsTh align="right">FIX PRICE</OpsTh>
            <OpsTh>STATUS</OpsTh>
            <OpsTh align="right">ACTION</OpsTh>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <OpsTd>{b.id}</OpsTd>
              <OpsTd>{b.date}</OpsTd>
              <OpsTd align="right">{b.customerCount.toLocaleString()}</OpsTd>
              <OpsTd align="right">{fmtKRW(b.totalKRW)}</OpsTd>
              <OpsTd align="right">{b.estimatedGrams.toLocaleString()} g</OpsTd>
              <OpsTd align="right">{b.fixPrice ? fmtKRW(b.fixPrice) + '/g' : '—'}</OpsTd>
              <OpsTd><StatusPill status={b.status.replace('_', ' ')} tone={STATUS_TONE[b.status]} /></OpsTd>
              <OpsTd align="right">
                {b.status === 'ledger_posted' ? (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-3)' }}>—</span>
                ) : (
                  <form action={publishSettlementAction} style={{ display: 'inline' }}>
                    <input type="hidden" name="id" value={b.id} />
                    <button type="submit" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', background: 'transparent', cursor: 'pointer' }}>
                      발행 · PUBLISH
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

      <section style={{ marginTop: 36, padding: 24, background: 'var(--bg-2)', border: '1px solid var(--rule)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 14 }}>
          NEXT BATCH WORKFLOW
        </div>
        <ol style={{ paddingLeft: 18, fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85 }}>
          <li>토스페이먼츠 자동이체 트리거 — 월 5일 09:00 KST</li>
          <li>실패 건 처리 (재시도, 알림, 일시정지 표시)</li>
          <li>총액 KRW → USD via Wise/Airwallex</li>
          <li>USD → 비배분 금속 계정 (StoneX / ICBC Standard) at LBMA PM Fix</li>
          <li>비배분 → 배분 — Malca-Amit 시리얼 할당, 라이선스 신탁 명의</li>
          <li>원장 포스팅 — 회원별 그램 적립, 알림 발송</li>
        </ol>
      </section>
    </>
  );
}
