export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--canvas)',
        color: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 28px',
      }}
    >
      <div style={{ maxWidth: 640, width: '100%', textAlign: 'left' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          § 404 · NOT FOUND
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 4.4vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          요청하신 페이지를 찾을 수 없습니다.
        </h1>
        <p
          style={{
            marginTop: 20,
            fontFamily: 'var(--font-krs)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--ink-2, rgba(31,26,20,0.7))',
          }}
        >
          URL을 확인하시거나 홈으로 돌아가세요.
        </p>

        <div style={{ marginTop: 36 }}>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--canvas)',
              background: 'var(--accent)',
              border: '1px solid var(--accent)',
              padding: '12px 22px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            홈으로
          </a>
        </div>
      </div>
    </main>
  );
}
