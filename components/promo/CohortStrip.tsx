import { CohortBar } from '../CohortBar';

export function CohortStrip({ joined, cap }: { joined: number; cap: number }) {
  const remaining = Math.max(0, cap - joined);
  return (
    <section
      style={{
        background: 'color-mix(in srgb, var(--accent) 8%, var(--bg))',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: '20px 36px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
          }}
        >
          FOUNDERS · MMXXVI
        </div>
        <div style={{ justifySelf: 'center', width: '100%' }}>
          <CohortBar joined={joined} cap={cap} />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'var(--ink-3)',
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            LIVE · 30초마다 갱신
          </div>
        </div>
        <div
          lang="ko"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--ink-2)',
            justifySelf: 'end',
          }}
        >
          남은 자리 ·{' '}
          <span className="gp-num" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {remaining.toLocaleString('en-US')}
          </span>
        </div>
      </div>
    </section>
  );
}
