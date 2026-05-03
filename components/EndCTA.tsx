import Link from 'next/link';

export function EndCTA() {
  return (
    <section
      style={{
        padding: '140px 36px',
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--inv-accent) 18%, transparent), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: 'var(--inv-accent)',
            marginBottom: 32,
          }}
        >
          파운더스 · 5,000명에서 영원히 마감
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 200,
            fontSize: 'clamp(64px, 10vw, 140px)',
            lineHeight: 0.96,
            letterSpacing: '-0.04em',
            marginBottom: 24,
          }}
        >
          한 그램.
          <br />
          <em
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--inv-accent)',
              fontWeight: 300,
            }}
          >
            지금.
          </em>
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 24,
            color: 'color-mix(in srgb, var(--inv-ink) 65%, transparent)',
            marginBottom: 48,
          }}
        >
          조용히 쌓이고, 영원히 남는다.
        </div>
        <Link
          href="/signup"
          style={{
            display: 'inline-block',
            background: 'var(--inv-accent)',
            color: 'var(--inv-bg)',
            padding: '18px 32px',
            fontFamily: 'var(--font-kr)',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.06em',
          }}
        >
          ₩200K로 시작 →
        </Link>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'color-mix(in srgb, var(--inv-ink) 45%, transparent)',
            letterSpacing: '0.28em',
            marginTop: 36,
          }}
        >
          MALCA-AMIT SGP · LLOYD'S · BRINK'S · MAS PSPM 2019
        </div>
      </div>
    </section>
  );
}
