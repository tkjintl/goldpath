export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        maxWidth: '960px',
        margin: '0 auto',
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink-3)',
        }}
      >
        대시보드 준비 중…
      </p>
      <span className="gp-loading-shimmer" style={{ width: '40%', height: '28px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
        <span className="gp-loading-shimmer" style={{ width: '100%', height: '64px' }} />
        <span className="gp-loading-shimmer" style={{ width: '92%', height: '64px' }} />
        <span className="gp-loading-shimmer" style={{ width: '85%', height: '64px' }} />
        <span className="gp-loading-shimmer" style={{ width: '70%', height: '64px' }} />
      </div>
    </div>
  );
}
