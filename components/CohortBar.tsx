// Cohort progress bar — hairline track, brass fill, mono labels, tick marks.
// Server-renderable; CSS-only animation.
export function CohortBar({ joined, cap }: { joined: number; cap: number }) {
  const pct = Math.min(100, Math.max(0, (joined / cap) * 100));
  const remaining = Math.max(0, cap - joined);
  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          color: 'var(--ink-3)',
          marginBottom: 8,
        }}
      >
        <span style={{ color: 'var(--accent)' }}>
          {joined.toLocaleString()} / {cap.toLocaleString()}
        </span>
        <span>{remaining.toLocaleString()} 남음</span>
      </div>
      <div
        style={{
          position: 'relative',
          height: 1,
          background: 'var(--rule)',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-dim))',
            animation: 'gp-fade-up 1400ms cubic-bezier(0.16, 1, 0.3, 1) both',
            transformOrigin: 'left center',
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 6,
          marginTop: 2,
        }}
      >
        {[25, 50, 75].map((t) => (
          <span
            key={t}
            style={{
              position: 'absolute',
              left: `${t}%`,
              top: 0,
              width: 1,
              height: 6,
              background: 'var(--rule)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
