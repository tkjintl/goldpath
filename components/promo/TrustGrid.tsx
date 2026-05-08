import Link from 'next/link';
import type { Route } from 'next';

const CELLS: Array<{
  title: string;
  body: string;
  href: Route;
}> = [
  {
    title: 'MAS PSPM 2019 등록',
    body: '싱가포르 금융당국 등록 귀금속 사업자.',
    href: '/regulators',
  },
  {
    title: 'Malca-Amit · 배분 보관',
    body: '풀이 아니라 회원님 이름으로. 분기마다 감사.',
    href: '/vault',
  },
  {
    title: 'Lloyd’s of London · 100% 보험',
    body: '보관 중인 모든 그램에 만기 가치 기준 보험.',
    href: '/insurance',
  },
  {
    title: 'Brink’s 분기 감사 보고서',
    body: '매 분기 PDF 공개. 이상 시 12시간 내 회원 알림.',
    href: '/audits',
  },
  {
    title: '싱가포르 IPM 면세',
    body: '투자용 귀금속은 GST 0%. 김치 프리미엄을 우회하는 진짜 이유.',
    href: '/why-singapore',
  },
];

export function TrustGrid() {
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § IV · 신뢰 · TRUST
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 48px',
            color: 'var(--ink)',
          }}
        >
          무료로 주는 데 이유가 있어야겠죠.
        </h2>

        <div
          className="gp-trust-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {CELLS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="gp-card-lift"
              style={{
                position: 'relative',
                border: '1px solid var(--rule)',
                padding: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background: 'var(--bg)',
                color: 'var(--ink)',
                textDecoration: 'none',
                minHeight: 180,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 16,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--ink-3)',
                }}
              >
                ↗
              </span>
              <div
                lang="ko"
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 600,
                  fontSize: 17,
                  color: 'var(--ink)',
                  letterSpacing: '-0.005em',
                }}
              >
                {c.title}
              </div>
              <div
                lang="ko"
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: 'var(--ink-2)',
                }}
              >
                {c.body}
              </div>
            </Link>
          ))}
        </div>

        <style>{`
          @media (max-width: 1000px) {
            .gp-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .gp-trust-grid a:last-child:nth-child(odd) { grid-column: 1 / -1 !important; }
          }
          @media (max-width: 600px) {
            .gp-trust-grid { grid-template-columns: 1fr !important; }
            .gp-trust-grid a:last-child:nth-child(odd) { grid-column: auto !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
