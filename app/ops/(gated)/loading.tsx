export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--ink)',
        padding: '40px 32px',
        fontFamily: 'var(--font-mono)',
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          color: 'var(--ink-3)',
          marginBottom: '24px',
        }}
      >
        OPS · LOADING
      </p>
      <div
        style={{
          border: '1px solid var(--rule)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '12px',
            padding: '14px 16px',
            background: 'var(--bg-2)',
            borderBottom: '1px solid var(--rule)',
          }}
        >
          <span className="gp-loading-shimmer" style={{ height: '10px' }} />
          <span className="gp-loading-shimmer" style={{ height: '10px' }} />
          <span className="gp-loading-shimmer" style={{ height: '10px' }} />
          <span className="gp-loading-shimmer" style={{ height: '10px' }} />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '12px',
              padding: '16px',
              borderBottom: i === 4 ? 'none' : '1px solid var(--rule)',
            }}
          >
            <span className="gp-loading-shimmer" />
            <span className="gp-loading-shimmer" />
            <span className="gp-loading-shimmer" />
            <span className="gp-loading-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
