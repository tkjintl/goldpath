export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--canvas)',
        color: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        padding: '40px',
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '48px',
          color: 'var(--accent)',
          letterSpacing: '0.08em',
        }}
      >
        §
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 'min(360px, 80vw)' }}>
        <span className="gp-loading-shimmer" style={{ width: '100%' }} />
        <span className="gp-loading-shimmer" style={{ width: '78%' }} />
        <span className="gp-loading-shimmer" style={{ width: '54%' }} />
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
        }}
      >
        불러오는 중…
      </p>
    </div>
  );
}
