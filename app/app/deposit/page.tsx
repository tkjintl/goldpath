import { requireSession } from '@/lib/auth';
import { buildDemoAccount } from '@/lib/demo';
import { fmtKRW } from '@/lib/pricing';
import { PortalSection, PortalCard } from '@/components/portal/Section';
import { TIERS } from '@/components/TierLadder';

export const dynamic = 'force-dynamic';

export default async function DepositPage() {
  const session = await requireSession();
  const acct = buildDemoAccount(session.email);

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 적립 · DEPOSIT
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          매달 자동으로 <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>한 그램.</em>
        </h1>
      </header>

      <PortalSection eyebrow="§ I · 현재 구독" title="현재 자동이체">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <PortalCard label="MONTHLY DEBIT">
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 48, color: 'var(--accent)', fontWeight: 500, lineHeight: 1 }}>
              {fmtKRW(acct.monthlyKRW)}
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>
              매월 5일 · 토스페이먼츠 CMS
            </div>
          </PortalCard>
          <PortalCard label="현재 등급">
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 48, color: 'var(--accent)', fontWeight: 500, lineHeight: 1 }}>
              {acct.tier.n}
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>
              {acct.tier.ko} · {acct.tier.en}
            </div>
          </PortalCard>
          <PortalCard label="SPREAD">
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 48, color: 'var(--accent)', fontWeight: 500, lineHeight: 1 }}>
              {acct.tier.spread}
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>
              LBMA 픽스 + 등급별 마진
            </div>
          </PortalCard>
        </div>
      </PortalSection>

      <PortalSection eyebrow="§ II · 등급 변경" title="다른 등급으로 이동">
        <PortalCard>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <Th>TIER</Th>
                <Th>NAME</Th>
                <Th align="right">MIN MONTHLY</Th>
                <Th align="right">SPREAD</Th>
                <Th align="right">STORAGE</Th>
                <Th align="right">GIFT</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((t) => {
                const isCurrent = t.n === acct.tier.n;
                return (
                  <tr key={t.n} style={{ borderBottom: '1px dashed var(--rule)', background: isCurrent ? 'color-mix(in srgb, var(--accent) 6%, transparent)' : 'transparent' }}>
                    <Td>
                      <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--accent)', fontWeight: 500 }}>
                        {t.n}
                      </span>
                    </Td>
                    <Td>
                      <div style={{ fontFamily: 'var(--font-kr)', fontWeight: 500 }}>{t.ko}</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12, color: 'var(--ink-3)' }}>{t.en}</div>
                    </Td>
                    <Td align="right" mono>{t.min}</Td>
                    <Td align="right" mono>{t.spread}</Td>
                    <Td align="right" mono>{t.storage.replace('까지 무료', '').replace('무제한 무료', '∞')}</Td>
                    <Td align="right">
                      <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 18, fontWeight: 500 }}>{t.gift}</span>
                    </Td>
                    <Td align="right">
                      {isCurrent ? (
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.18em' }}>현재</span>
                      ) : (
                        <button
                          disabled
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            letterSpacing: '0.16em',
                            color: 'var(--ink-3)',
                            border: '1px solid var(--rule)',
                            padding: '6px 12px',
                            borderRadius: 2,
                            cursor: 'not-allowed',
                          }}
                        >
                          PHASE 2
                        </button>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: 18, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7 }}>
            등급 상승은 즉시 적용, 하락은 다음 결제일부터. 누적 GMV가 다음 게이트를 넘으면 자동으로 승급되고 추가 크레딧이 지급됩니다.
          </div>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ III · 일회성 추가 입금" title="추가 매입">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 18 }}>
            정기 자동이체 외에 일회성 추가 매입이 가능합니다. 입금 즉시 다음 LBMA 픽스에 매입되며, 매입가는 확정되어 원장에 기록됩니다.
          </div>
          <button
            disabled
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              background: 'var(--accent)',
              color: 'var(--inv-ink)',
              padding: '12px 20px',
              borderRadius: 2,
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          >
            PHASE 2 · 일회성 입금 →
          </button>
        </PortalCard>
      </PortalSection>
    </>
  );
}

function Th({ children, align = 'left' }: { children?: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th style={{ textAlign: align, padding: '14px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>
      {children}
    </th>
  );
}
function Td({ children, align = 'left', mono = false }: { children: React.ReactNode; align?: 'left' | 'right'; mono?: boolean }) {
  return (
    <td style={{ textAlign: align, padding: '14px 8px', fontFamily: mono ? 'var(--font-mono)' : 'inherit', color: 'var(--ink)' }}>
      {children}
    </td>
  );
}
