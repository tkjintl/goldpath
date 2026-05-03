import Link from 'next/link';

// Reusable section header for routes that share components but need their own
// hero. Phase 1 stub — each page gets a real fleshed-out body in the next pass.
export function Stub(props: {
  eyebrow: string;
  title: string;
  body: string;
  sections?: { label: string; value: string }[];
  primary?: { label: string; href: string };
}) {
  return (
    <section
      className="gp-stub"
      style={{
        padding: '100px 36px 80px',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          {props.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: 28,
          }}
        >
          {props.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.85,
            color: 'var(--ink-2)',
            maxWidth: 720,
            marginBottom: props.sections || props.primary ? 36 : 0,
          }}
        >
          {props.body}
        </p>

        {props.sections && (
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '14px 28px',
              padding: '24px 0',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            {props.sections.map((s) => (
              <div key={s.label} style={{ display: 'contents' }}>
                <dt
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'var(--accent)',
                    alignSelf: 'baseline',
                    paddingTop: 2,
                  }}
                >
                  {s.label}
                </dt>
                <dd
                  style={{
                    fontFamily: 'var(--font-kr)',
                    fontSize: 14,
                    color: 'var(--ink)',
                    lineHeight: 1.6,
                  }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {props.primary && (
          <div style={{ marginTop: 28 }}>
            <Link
              href={props.primary.href as any}
              style={{
                background: 'var(--accent)',
                color: 'var(--inv-ink)',
                padding: '16px 26px',
                fontFamily: 'var(--font-kr)',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.06em',
              }}
            >
              {props.primary.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
