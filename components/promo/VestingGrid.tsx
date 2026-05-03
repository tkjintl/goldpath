export function VestingGrid() {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
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
          § II · 베스팅 · VESTING
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
          12개월에 걸쳐 잠금 해제.
        </h2>

        <div
          className="gp-vesting-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 10,
            marginBottom: 36,
          }}
        >
          {months.map((m, idx) => {
            const delayClass = `gp-fade-up-delay-${(idx % 4) + 1}`;
            const fillPct = (m / 12) * 100;
            return (
              <div
                key={m}
                className={`gp-fade-up ${delayClass}`}
                style={{
                  border: '1px solid var(--rule)',
                  padding: '14px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--bg)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    color: 'var(--ink-3)',
                  }}
                >
                  M{m}
                </span>
                <div
                  style={{
                    width: '100%',
                    height: 64,
                    background: 'var(--rule)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      height: `${fillPct}%`,
                      background:
                        'linear-gradient(180deg, var(--accent-bright) 0%, var(--accent) 100%)',
                    }}
                  />
                </div>
                <span
                  className="gp-num"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--accent)',
                  }}
                >
                  {Math.round(fillPct)}%
                </span>
              </div>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 720px) {
            .gp-vesting-grid {
              grid-template-columns: repeat(6, 1fr) !important;
            }
          }
        `}</style>

        <div
          lang="ko"
          style={{
            border: '1px solid var(--rule)',
            padding: '24px 28px',
            fontFamily: 'var(--font-kr)',
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.85,
            color: 'var(--ink-2)',
            background: 'color-mix(in srgb, var(--accent) 4%, var(--bg))',
          }}
        >
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>솔직한 약속.</strong>{' '}
          베스팅은 자동이체가 들어와야 진행됩니다. 정지하시면 그 시점 베스팅된 그램은
          회원님 것, 미베스팅 분은 회수됩니다. 본인이 매입하신 그램(매달 자동이체로 산
          그램)은 베스팅 무관하게 항상 회원님 것입니다.
        </div>
      </div>
    </section>
  );
}
