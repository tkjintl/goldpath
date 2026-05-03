export function SkepticBlock() {
  return (
    <section
      style={{
        padding: '96px 36px',
        borderBottom: '1px solid var(--rule)',
        background: 'var(--bg-2)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § VII · 솔직히 · STRAIGHT TALK
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 600,
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.2,
            margin: '0 0 32px',
            color: 'var(--ink)',
          }}
        >
          왜 무료로 줘요?
        </h2>

        <div
          lang="ko"
          style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.85,
            color: 'var(--ink-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <p style={{ margin: 0 }}>
            첫 5,000명이 12개월 자동이체로 남으면 우리는 안정적인 매출 베이스를
            얻습니다. 그래서 첫 그램은 우리가 부담합니다 — 마케팅비 대신.
          </p>
          <p style={{ margin: 0 }}>
            광고 한 번 누르는 게 한 사람 가입 비용보다 비쌉니다. 광고 살 돈으로
            그램을 사서 회원님께 드리는 게 더 저렴하다는 계산이 끝났습니다.
          </p>
          <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 500 }}>
            정해놓고 무한히 안 줍니다 — 5,000명 후에는 정가입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
