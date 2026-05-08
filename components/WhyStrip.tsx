import { getPriceSnapshot } from '@/lib/pricing';
import { CountUp } from './CountUp';
import { WhyAccordion, type WhyItem } from './WhyAccordion';

// Four-up data strip — uses live snapshot for the kimchi-premium tile.
// Big numbers count up on viewport-enter for editorial gravitas.
export async function WhyStrip() {
  const p = await getPriceSnapshot();
  const kimchiNum = p.kimchiPremiumPct * 100;
  const kimchiSign = kimchiNum >= 0 ? '+' : '−';
  const kimchiAbs = Math.abs(kimchiNum);

  type Item = {
    n: string;
    lbl: string;
    cap: string;
    tone: 'warn' | 'accent';
    render: () => React.ReactNode;
  };

  const items: Item[] = [
    {
      n: 'I',
      lbl: '김치 프리미엄',
      cap: `한국 소매 vs LBMA 국제 현물. ${p.sources.retail === 'live' ? 'LIVE' : 'CACHED'}.`,
      tone: 'warn',
      render: () => (
        <>
          <span>{kimchiSign}</span>
          <CountUp to={kimchiAbs} decimals={1} />
          <span>%</span>
        </>
      ),
    },
    {
      n: 'II',
      lbl: '중앙은행 매입 · 2025 Q3',
      cap: '전 분기 +28% · 누적 634톤 · 4년 연속 1,000톤+ 페이스 · WGC GDT 2025-10.',
      tone: 'accent',
      render: () => (
        <>
          <CountUp to={220} />
          <span>톤</span>
        </>
      ),
    },
    {
      n: 'III',
      lbl: '원화 구매력',
      cap: '2000년 ₩100 = 오늘 ₩55 · World Bank CPI.',
      tone: 'warn',
      render: () => (
        <>
          <span>−</span>
          <CountUp to={45} />
          <span>%</span>
        </>
      ),
    },
    {
      n: 'IV',
      lbl: '금 · 원화 기준 25년',
      cap: '같은 기간 KB 전국 아파트 약 2.4×, 서울 약 3.8× · WGC + ECB FX + KB HPI.',
      tone: 'accent',
      render: () => (
        <>
          <span style={{ marginRight: 8 }}>약</span>
          <CountUp to={20} />
          <span>×</span>
        </>
      ),
    },
  ];

  const accordionItems: WhyItem[] = [
    {
      n: 'I',
      lbl: '김치 프리미엄',
      num: `${kimchiSign}${kimchiAbs.toFixed(1)}%`,
      cap: `한국 소매가 vs LBMA 국제 현물. GoldPath는 국제 현물가 직매입으로 이 프리미엄을 없앱니다. ${p.sources.retail === 'live' ? '실시간 데이터.' : ''}`,
      tone: 'warn',
    },
    {
      n: 'II',
      lbl: '중앙은행 매입 2025 Q3',
      num: '220톤',
      cap: '전 분기 대비 +28% · 누적 634톤. 세계 중앙은행들이 달러 대신 금으로 보유고를 채우고 있습니다.',
      tone: 'accent',
    },
    {
      n: 'III',
      lbl: '원화 구매력',
      num: '−45%',
      cap: '2000년 ₩100은 오늘 ₩55의 가치. World Bank CPI 기준. 금은 같은 기간 원화 기준 약 20배 상승했습니다.',
      tone: 'warn',
    },
    {
      n: 'IV',
      lbl: '금 vs 부동산 · 25년',
      num: '약 20×',
      cap: '원화 기준 금 25년 수익률 약 20×. 같은 기간 KB 전국 아파트 약 2.4×. 세금, 대출 없이.',
      tone: 'accent',
    },
  ];

  return (
    <section
      className="gp-why-strip"
      style={{
        background: 'var(--bg-2)',
        padding: '48px 36px',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <style>{`
        @media (max-width: 900px) and (min-width: 769px) {
          .gp-why-strip [data-mobile="why-grid"] > div:first-child {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 20px !important;
          }
          .gp-why-strip {
            padding: 40px 20px !important;
          }
        }
      `}</style>
      {/* Mobile accordion */}
      <div data-mobile="why-mobile" style={{ display: 'none' }}>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block' }}>§ I · 왜 지금</span>
          <div style={{ fontFamily: 'var(--font-krs)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 8 }}>지금이어야 하는 네 가지 이유.</div>
        </div>
        <WhyAccordion items={accordionItems} />
        <div style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.06em', color: 'rgba(31,26,20,0.35)', lineHeight: 1.7 }}>
          출처: LBMA, World Bank CPI, World Gold Council 2025 Q3 CBT Report, KB 부동산 통계
        </div>
      </div>

      {/* Desktop 4-up grid */}
      <div data-mobile="why-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 20,
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.n}
              className={`gp-fade-up gp-fade-up-delay-${i + 1}`}
              style={{ position: 'relative' }}
            >
              {/* Per-tile ambient glow */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: -8, right: -8, bottom: 0,
                background: it.tone === 'warn'
                  ? 'radial-gradient(ellipse at 30% 80%, rgba(180,60,60,0.06), transparent 65%)'
                  : 'radial-gradient(ellipse at 30% 80%, rgba(201,152,87,0.07), transparent 65%)',
                pointerEvents: 'none', zIndex: 0,
              }} />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  color: 'var(--ink-3)',
                  marginBottom: 8,
                }}
              >
                {it.n} · {it.lbl}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(40px, 4.4vw, 52px)',
                  color: it.tone === 'warn' ? 'var(--red)' : 'var(--accent)',
                  fontWeight: 500,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums oldstyle-nums',
                }}
              >
                {it.render()}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontSize: 13,
                  color: 'var(--ink-2)',
                  marginTop: 10,
                  lineHeight: 1.6,
                }}
              >
                {it.cap}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            margin: '24px 0 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-3)',
            letterSpacing: '0.18em',
            textAlign: 'right',
          }}
        >
          SOURCES · KRX · 한국금거래소 · WGC · BANK OF KOREA · LBMA · UPDATED{' '}
          {new Date(p.timestamp).toLocaleString('ko-KR', { hour12: false })}
        </div>
      </div>
    </section>
  );
}
