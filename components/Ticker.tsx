import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';
import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';

// Live ticker strip. Server-rendered, refreshes every 5 min via cache.
export async function Ticker() {
  const [p, signupCount] = await Promise.all([getPriceSnapshot(), getSignupCount()]);
  const founders = foundersDisplayCount(signupCount);
  const items = [
    { l: 'LBMA USD/oz', v: '$' + p.lbmaUsdPerOz.toFixed(2), tone: '' as const, status: p.sources.gold },
    { l: 'KRW/USD', v: p.fxKrwPerUsd.toFixed(2), tone: '' as const, status: p.sources.fx },
    { l: 'LBMA 1g · KRW', v: fmtKRW(p.lbmaKrwPerGram), tone: '' as const, status: p.sources.gold },
    { l: 'KOREA RETAIL 1g', v: fmtKRW(p.retailKrwPerGram), tone: 'warn' as const, status: p.sources.retail },
    { l: 'GOLDPATH 1g', v: fmtKRW(p.aurumKrwPerGram), tone: 'good' as const, status: 'live' as const },
    { l: '김치 프리미엄', v: fmtPct(p.kimchiPremiumPct), tone: 'warn' as const },
    { l: 'GP vs RETAIL', v: fmtPct(p.aurumDiscountPct), tone: 'good' as const },
    { l: 'FOUNDERS', v: `${founders.toLocaleString()} / ${FOUNDERS_CAP.toLocaleString()}`, tone: '' as const },
  ];

  const allLive = p.sources.gold === 'live' && p.sources.fx === 'live';

  return (
    <div
      className="gp-ticker"
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
      <div data-mobile="ticker-items" style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {items.map((it) => (
          <span
            key={it.l}
            style={{
              display: 'inline-flex',
              gap: 8,
              alignItems: 'baseline',
              color:
                it.tone === 'good'
                  ? 'var(--green)'
                  : it.tone === 'warn'
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
        title={`gold:${p.sources.gold} fx:${p.sources.fx} retail:${p.sources.retail} (as of ${p.retailAsOf})`}
        style={{
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
          color: allLive ? 'var(--inv-accent)' : 'var(--accent-dim)',
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
        {allLive ? 'LIVE' : 'PARTIAL'}
      </span>
    </div>
  );
}
