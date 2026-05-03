import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';

// Four-up data strip — uses live snapshot for the kimchi-premium tile.
export async function WhyStrip() {
  const p = await getPriceSnapshot();

  const items = [
    {
      n: 'I',
      lbl: '김치 프리미엄',
      v: fmtPct(p.kimchiPremiumPct),
      cap: `한국 소매 vs LBMA 국제 현물. ${p.sources.retail === 'live' ? 'LIVE' : 'CACHED'}.`,
      tone: 'warn' as const,
    },
    {
      n: 'II',
      lbl: '중앙은행 매입 Q3',
      v: '220t',
      cap: '2008년 이후 분기 최고치. 중국 · 인도 · 폴란드 · 터키.',
      tone: 'accent' as const,
    },
    {
      n: 'III',
      lbl: '원화 구매력',
      v: '−45%',
      cap: '2000년 ₩100 = 오늘 ₩55. CPI 기준.',
      tone: 'warn' as const,
    },
    {
      n: 'IV',
      lbl: '금 · 2000년 이후',
      v: '23×',
      cap: '같은 기간 한국 부동산보다 더 올랐습니다.',
      tone: 'accent' as const,
    },
  ];

  return (
    <section
      style={{
        background: 'var(--bg-2)',
        padding: '48px 36px',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28,
        }}
      >
        {items.map((it) => (
          <div key={it.n}>
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
              }}
            >
              {it.v}
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
          maxWidth: 1280,
          margin: '24px auto 0',
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
    </section>
  );
}
