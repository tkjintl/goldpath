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
      lbl: '중앙은행 매입 · 2025 Q3',
      v: '220톤',
      cap: '전 분기 +28% · 누적 634톤 · 4년 연속 1,000톤+ 페이스 · WGC GDT 2025-10.',
      tone: 'accent' as const,
    },
    {
      n: 'III',
      lbl: '원화 구매력',
      v: '−45%',
      cap: '2000년 ₩100 = 오늘 ₩55 · World Bank CPI.',
      tone: 'warn' as const,
    },
    {
      n: 'IV',
      lbl: '금 · 원화 기준 25년',
      v: '약 20×',
      cap: '같은 기간 KB 전국 아파트 약 2.4×, 서울 약 3.8× · WGC + ECB FX + KB HPI.',
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
