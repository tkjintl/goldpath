const GATES: Array<{ gmv: string; label: string }> = [
  { gmv: '₩2.4M', label: '등급 I 베스팅 완료' },
  { gmv: '₩7.2M', label: '등급 II 승급 · +0.5g 보너스' },
  { gmv: '₩18M', label: '등급 III 승급 · +2g 보너스' },
  { gmv: '₩60M', label: '등급 IV 승급 · +5g 보너스' },
];

export function TierUpTimeline() {
  return (
    <section style={{ padding: '96px 36px', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § VIII · 승급 · TIER-UP
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 56px',
            color: 'var(--ink)',
          }}
        >
          오래 쌓을수록, 더 받습니다.
        </h2>

        <div
          className="gp-tierup"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
        >
          {/* horizontal line */}
          <div
            aria-hidden="true"
            className="gp-tierup-line"
            style={{
              position: 'absolute',
              top: 11,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background:
                'linear-gradient(90deg, var(--accent) 0%, var(--accent-dim) 100%)',
            }}
          />
          {GATES.map((g, i) => (
            <div
              key={g.gmv}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  border: '3px solid var(--bg)',
                  boxShadow: '0 0 0 1px var(--accent)',
                  zIndex: 1,
                  marginBottom: 18,
                }}
                aria-hidden="true"
              />
              <span
                className="gp-num"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'var(--accent)',
                  marginBottom: 8,
                }}
              >
                {g.gmv}
              </span>
              <span
                lang="ko"
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 500,
                  fontSize: 13,
                  color: 'var(--ink-2)',
                  lineHeight: 1.5,
                }}
              >
                {g.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-3)',
                  marginTop: 6,
                }}
              >
                STAGE {i + 1}
              </span>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .gp-tierup { grid-template-columns: 1fr !important; gap: 28px !important; }
            .gp-tierup-line { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
