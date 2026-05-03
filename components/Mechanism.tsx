export function Mechanism() {
  const steps = [
    { n: '01', ko: '가입', en: 'Sign up · 5 min', body: '신분증 + 계좌 연결. KFTC 본인인증.' },
    { n: '02', ko: '자동이체', en: 'Auto-debit', body: '매달 ₩200K~ 원하는 날. 토스페이먼츠 CMS.' },
    { n: '03', ko: '매입', en: 'Buy at fix', body: '결제일 D+0~D+1 LBMA 오후 픽스, 999.9 직매입. 그램 단위 소수점 4자리까지 적립. 픽스 사이의 가격 변동은 GoldPath 마진(2%)이 흡수합니다.' },
    { n: '04', ko: '금고', en: 'Vault', body: 'Malca-Amit 싱가포르 FTZ 배분 보관.' },
  ];
  return (
    <section
      className="gp-mechanism"
      style={{
        padding: '100px 36px',
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              maxWidth: 720,
            }}
          >
            네 단계.{' '}
            <em
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--accent)',
                fontWeight: 400,
              }}
            >
              레버리지 없이.
            </em>
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--accent)',
              letterSpacing: '0.32em',
            }}
          >
            §II · MECHANISM
          </span>
        </div>
        <div
          data-mobile="mech-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            background: 'var(--bg)',
            borderTop: '1px solid var(--ink)',
            border: '1px solid var(--rule)',
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                padding: '28px 24px 32px',
                borderRight: i < steps.length - 1 ? '1px solid var(--rule)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--accent)',
                  letterSpacing: '0.24em',
                  marginBottom: 16,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 30,
                  color: 'var(--ink)',
                  fontWeight: 500,
                  marginBottom: 4,
                  lineHeight: 1.05,
                }}
              >
                {s.ko}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'var(--ink-3)',
                  marginBottom: 14,
                }}
              >
                {s.en}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontSize: 14,
                  color: 'var(--ink-2)',
                  lineHeight: 1.7,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
