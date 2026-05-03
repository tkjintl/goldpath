import { requireSession } from '@/lib/auth';
import { buildDemoAccount } from '@/lib/demo';
import { fmtKRW } from '@/lib/pricing';
import { PortalSection, PortalCard } from '@/components/portal/Section';

export const dynamic = 'force-dynamic';

export default async function StatementsPage() {
  const session = await requireSession();
  const acct = buildDemoAccount(session.email);

  // Generate 12 months of demo statements
  const months = Array.from({ length: Math.min(12, acct.streakMonths) }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      ym: d.toISOString().slice(0, 7),
      label: d.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }),
      krw: acct.monthlyKRW,
      grams: acct.monthlyKRW / 165_000,
    };
  });

  return (
    <>
      <header style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--accent)', marginBottom: 10 }}>
          § 명세서 · STATEMENTS
        </div>
        <h1 style={{ fontFamily: 'var(--font-krs)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          매월 명세서.
        </h1>
      </header>

      <PortalSection eyebrow="§ I · 월별 명세서" title="모든 거래의 기록">
        <PortalCard>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <Th>MONTH</Th>
                <Th align="right">DEPOSIT</Th>
                <Th align="right">GRAMS</Th>
                <Th align="right">PDF</Th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.ym} style={{ borderBottom: '1px dashed var(--rule)' }}>
                  <Td>
                    <span style={{ fontFamily: 'var(--font-kr)', fontSize: 14 }}>{m.label}</span>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
                      {m.ym}
                    </div>
                  </Td>
                  <Td align="right" mono>{fmtKRW(m.krw)}</Td>
                  <Td align="right" mono>{m.grams.toFixed(3)} g</Td>
                  <Td align="right">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        color: 'var(--accent)',
                        borderBottom: '1px solid var(--accent)',
                      }}
                    >
                      DOWNLOAD
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ II · 분기별 감사 · BRINK'S" title="실물 검수 보고서">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 16 }}>
            매 분기 Brink's가 회원님 이름의 바를 실물 검수합니다. 시리얼 번호, 무게, 정련소까지 일치 확인. 인장이 찍힌 PDF로 누구나 다운로드 가능.
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)' }}>
            <span style={{ borderBottom: '1px solid var(--accent)' }}>2026 Q1 →</span>
            <span style={{ borderBottom: '1px solid var(--accent)' }}>2025 Q4 →</span>
            <span style={{ borderBottom: '1px solid var(--accent)' }}>2025 Q3 →</span>
            <span style={{ borderBottom: '1px solid var(--accent)' }}>2025 Q2 →</span>
          </div>
        </PortalCard>
      </PortalSection>

      <PortalSection eyebrow="§ III · 연간 세무 자료" title="국세청 신고 도우미">
        <PortalCard>
          <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 720 }}>
            한국 거주자가 해외 금고에 보유한 금은 잔액이 ₩5억을 초과할 경우 해외금융계좌 신고 (KFIU/NTS) 대상입니다. 매년 6월 신고 기한 전에 GoldPath이 신고용 자료를 자동 생성합니다. 세무 상담은 별도 전문가에게.
          </div>
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
