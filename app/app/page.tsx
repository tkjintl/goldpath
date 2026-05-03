import { requireSession } from '@/lib/auth';
import { buildDemoAccount } from '@/lib/demo';
import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';
import { PortalSection, PortalCard, StatBig } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function PortalDashboard() {
  const session = await requireSession();
  const acct = buildDemoAccount(session.email);
  const price = await getPriceSnapshot();

  const krwValue = Math.round(acct.gramsOwned * price.aurumKrwPerGram);
  const totalReturn = krwValue - acct.cumulativeKRW;
  const returnPct = acct.cumulativeKRW > 0 ? totalReturn / acct.cumulativeKRW : 0;

  return (
    <>
      {/* Greeting */}
      <header style={{ marginBottom: 40 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            marginBottom: 10,
          }}
        >
          파운더 · #{acct.founderNumber.toLocaleString()} / 5,000
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 4.6vw, 56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          안녕하세요,{' '}
          <em
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--accent)',
              fontWeight: 400,
            }}
          >
            {session.name}.
          </em>
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 17,
            color: 'var(--ink-3)',
            marginTop: 8,
          }}
        >
          {acct.tier.ko} · {acct.tier.en}
        </div>
      </header>

      {/* Headline numbers */}
      <PortalSection eyebrow="§ I · 보유 · HOLDINGS" title="현재 잔액">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          <PortalCard label="GRAMS 보유">
            <StatBig
              value={`${acct.gramsOwned.toFixed(3)} g`}
              hint={`999.9 · ${(acct.gramsOwned / 31.1035).toFixed(3)} oz`}
            />
          </PortalCard>
          <PortalCard label="KRW 가치">
            <StatBig
              value={fmtKRW(krwValue)}
              hint={`@ ${fmtKRW(price.aurumKrwPerGram)}/g`}
            />
          </PortalCard>
          <PortalCard label="누적 적립">
            <StatBig value={fmtKRW(acct.cumulativeKRW)} hint={`${acct.streakMonths}개월간`} />
          </PortalCard>
          <PortalCard label="누적 수익">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 56,
                  color: totalReturn >= 0 ? 'var(--accent)' : 'var(--red)',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {totalReturn >= 0 ? '+' : ''}
                {fmtKRW(totalReturn)}
              </div>
              <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>
                {fmtPct(returnPct)} · 평가 기준
              </div>
            </div>
          </PortalCard>
        </div>
      </PortalSection>

      {/* Streak + next debit */}
      <PortalSection eyebrow="§ II · 스트릭 + 다음 이체" title="진행 상황">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          <PortalCard label="MY STREAK">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 88,
                  color: 'var(--accent)',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {acct.streakMonths}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--accent-dim)',
                  letterSpacing: '0.12em',
                }}
              >
                MONTHS
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 4,
                marginBottom: 16,
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: 1,
                    background:
                      i < acct.streakMonths
                        ? 'linear-gradient(135deg, var(--accent-bright), var(--accent-dim))'
                        : 'color-mix(in srgb, var(--ink) 6%, transparent)',
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-kr)',
                fontSize: 13,
                color: 'var(--ink-2)',
                lineHeight: 1.6,
                borderLeft: '2px solid var(--accent)',
                paddingLeft: 12,
              }}
            >
              12개월 연속에 <strong style={{ color: 'var(--accent)' }}>{acct.tier.streak12}</strong> 도착.
            </div>
          </PortalCard>

          <PortalCard label="NEXT AUTO-DEBIT">
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 48,
                color: 'var(--accent)',
                fontWeight: 500,
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {acct.nextDebitDate}
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink)', marginBottom: 6 }}>
              {fmtKRW(acct.monthlyKRW)} → 약{' '}
              <strong style={{ color: 'var(--accent)' }}>
                {(acct.monthlyKRW / price.aurumKrwPerGram).toFixed(3)} g
              </strong>
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 12, color: 'var(--ink-3)', marginBottom: 14 }}>
              매입 가격은 LBMA 오후 픽스에 확정됩니다.
            </div>
            <a
              href="/app/deposit"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--accent)',
                borderBottom: '1px solid var(--accent)',
              }}
            >
              조정하기 →
            </a>
          </PortalCard>

          <PortalCard label="파운더스 크레딧">
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 48,
                color: 'var(--accent)',
                fontWeight: 500,
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {acct.tier.gift}
            </div>
            <div style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 14 }}>
              가입 크레딧, 12개월 자동이체 이행 시 최종 베스팅. 현재 진행: {Math.min(acct.streakMonths, 12)} / 12.
            </div>
            <div
              style={{
                height: 4,
                background: 'color-mix(in srgb, var(--ink) 8%, transparent)',
                position: 'relative',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, (acct.streakMonths / 12) * 100)}%`,
                  background: 'linear-gradient(90deg, var(--accent-bright), var(--accent))',
                  transition: 'width 1s',
                }}
              />
            </div>
          </PortalCard>
        </div>
      </PortalSection>

      {/* Recent activity */}
      <PortalSection eyebrow="§ III · 최근 거래" title="원장 · LEDGER">
        <PortalCard>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <Th>DATE</Th>
                <Th>TYPE</Th>
                <Th align="right">GRAMS</Th>
                <Th align="right">KRW</Th>
              </tr>
            </thead>
            <tbody>
              {acct.recent.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px dashed var(--rule)' }}>
                  <Td>{r.date}</Td>
                  <Td>
                    <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13 }}>{r.type}</span>
                  </Td>
                  <Td align="right" mono>{r.grams.toFixed(3)} g</Td>
                  <Td align="right" mono>{fmtKRW(r.krw)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <a
              href="/app/statements"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--accent)',
                borderBottom: '1px solid var(--accent)',
              }}
            >
              모든 명세서 →
            </a>
          </div>
        </PortalCard>
      </PortalSection>
    </>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      style={{
        textAlign: align,
        padding: '14px 8px',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.22em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  align = 'left',
  mono = false,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  mono?: boolean;
}) {
  return (
    <td
      style={{
        textAlign: align,
        padding: '14px 8px',
        fontFamily: mono ? 'var(--font-mono)' : 'inherit',
        color: 'var(--ink)',
      }}
    >
      {children}
    </td>
  );
}
