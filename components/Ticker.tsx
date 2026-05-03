import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';

// Live KRX + retail + Aurum strip. Server-rendered, refreshes every 5 min via
// Next's unstable_cache. The ornament is the same across themes — only colors
// and fonts change via CSS variables.
export async function Ticker() {
  const p = await getPriceSnapshot();
  const items = [
    { l: 'KRX 1g', v: fmtKRW(p.krxKrwPerGram), s: '' },
    { l: 'KOREA RETAIL 1g', v: fmtKRW(p.retailKrwPerGram), s: 'tone-warn' },
    { l: 'GOLDPATH 1g', v: fmtKRW(p.aurumKrwPerGram), s: 'tone-good' },
    { l: '김치 프리미엄', v: fmtPct(p.kimchiPremiumPct), s: 'tone-warn' },
    { l: 'GOLDPATH vs RETAIL', v: fmtPct(p.aurumDiscountPct), s: 'tone-good' },
    { l: 'LBMA USD/oz', v: '$' + p.lbmaUsdPerOz.toFixed(2), s: '' },
    { l: 'FX KRW/USD', v: p.fxKrwPerUsd.toFixed(2), s: '' },
    { l: 'FOUNDERS', v: '2,848 / 5,000', s: '' },
  ];

  const stale =
    p.sources.krx === 'seed' || p.sources.lbma === 'seed' || p.sources.retail === 'seed';

  return (
    <div
      style={{
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
        borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
        padding: '8px 16px',
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {items.map((it) => (
          <span
            key={it.l}
            style={{
              display: 'inline-flex',
              gap: 8,
              alignItems: 'baseline',
              color:
                it.s === 'tone-good'
                  ? 'var(--green)'
                  : it.s === 'tone-warn'
                  ? 'var(--red)'
                  : 'var(--inv-ink)',
            }}
          >
            <span style={{ opacity: 0.55, color: 'var(--inv-ink)' }}>{it.l}</span>
            <span style={{ fontWeight: 600 }}>{it.v}</span>
          </span>
        ))}
      </div>
      <span
        style={{
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
          color: stale ? 'var(--red)' : 'var(--inv-accent)',
          opacity: 0.85,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'currentColor',
            animation: 'pulse 1.6s ease-in-out infinite',
          }}
        />
        {stale ? 'CACHED' : 'LIVE'}
      </span>
    </div>
  );
}
