type Variant = 'default' | 'referral';

export function ShareCardMockup({
  variant = 'default',
  showHeading = true,
}: {
  variant?: Variant;
  showHeading?: boolean;
}) {
  const card = (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: 460,
        margin: '0 auto',
        background:
          'radial-gradient(ellipse at 30% 20%, var(--accent-bright) 0%, var(--accent) 45%, var(--accent-dim) 100%)',
        color: 'var(--inv-ink)',
        overflow: 'hidden',
        boxShadow:
          'inset 0 0 0 1px color-mix(in srgb, white 14%, transparent), 0 30px 60px -30px color-mix(in srgb, black 40%, transparent)',
      }}
    >
      {/* inset border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 24,
          border: '1px solid color-mix(in srgb, var(--inv-ink) 28%, transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 28% 22%, color-mix(in srgb, white 22%, transparent), transparent 56%)',
          pointerEvents: 'none',
        }}
      />

      {/* top-left */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 40,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.32em',
        }}
      >
        金 · GOLDPATH
      </div>

      {/* center 금 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 200,
            fontSize: 'clamp(96px, 22vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '-0.06em',
            filter: 'drop-shadow(0 4px 24px color-mix(in srgb, black 22%, transparent))',
          }}
        >
          금
        </div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 24,
            marginTop: 4,
          }}
        >
          Au · 999.9
        </div>
        <div
          className="gp-num"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.22em',
            marginTop: 14,
          }}
        >
          #0001 / 5,000
        </div>
        {variant === 'referral' && (
          <div
            lang="ko"
            style={{
              fontFamily: 'var(--font-kr)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.08em',
              marginTop: 10,
              opacity: 0.9,
            }}
          >
            같이 모으면 둘 다 0.23g
          </div>
        )}
      </div>

      {/* bottom row */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.32em',
        }}
      >
        <span>MMXXVI · SGP · ALLOCATED</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="8" cy="8" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );

  if (!showHeading) return card;

  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § VI · 당신의 카드 · YOUR CARD
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 48px',
            color: 'var(--ink)',
          }}
        >
          가입 후, 당신의 카드.
        </h2>
        {card}
      </div>
    </section>
  );
}
