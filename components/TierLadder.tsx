// Tier ladder — 5 tiers with launch credit + spread + storage cap.
// Magazine-style table feel with editorial accent on the apex (Gold · III).
export type Tier = {
  n: string;
  ko: string;
  en: string;
  min: string;
  gift: string;
  spread: string;
  storage: string;
  streak12: string;
  joined: number;
  apex?: boolean;
};

export const TIERS: readonly Tier[] = [
  {
    n: 'I',
    ko: '브론즈',
    en: 'Bronze',
    min: '₩200K+',
    gift: '₩50K',
    spread: '2.0%',
    storage: '50g까지 무료',
    streak12: '1g 기념 바',
    joined: 2112,
  },
  {
    n: 'II',
    ko: '실버',
    en: 'Silver',
    min: '₩500K+',
    gift: '₩150K',
    spread: '1.8%',
    storage: '100g까지 무료',
    streak12: '5g 기념 바',
    joined: 486,
  },
  {
    n: 'III',
    ko: '골드',
    en: 'Gold · APEX',
    min: '₩1M+',
    gift: '₩400K',
    spread: '1.5%',
    storage: '250g까지 무료',
    streak12: '10g + 각인',
    joined: 184,
    apex: true,
  },
  {
    n: 'IV',
    ko: '플래티넘',
    en: 'Platinum',
    min: '₩2M+',
    gift: '₩1M',
    spread: '1.2%',
    storage: '500g까지 무료',
    streak12: '25g + 맞춤',
    joined: 54,
  },
  {
    n: 'V',
    ko: '소브린',
    en: 'Sovereign',
    min: '₩5M+',
    gift: '₩2.5M',
    spread: '1.0%',
    storage: '무제한 무료',
    streak12: '연간 프라이빗 바',
    joined: 12,
  },
];

export function TierLadder() {
  return (
    <section
      style={{
        padding: '100px 36px',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--accent)',
                letterSpacing: '0.32em',
                marginBottom: 14,
              }}
            >
              §III · 등급 · TIERS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-krs)',
                fontWeight: 300,
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                maxWidth: 720,
              }}
            >
              5,000명.{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--accent)',
                  fontWeight: 400,
                }}
              >
                그다음은 없다.
              </em>
            </h2>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--accent-dim)',
              letterSpacing: '0.2em',
            }}
          >
            2,848 / 5,000
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 0,
            border: '1px solid var(--ink)',
          }}
        >
          {TIERS.map((t, i) => (
            <article
              key={t.n}
              style={{
                padding: '32px 22px 28px',
                borderRight:
                  i < TIERS.length - 1 ? '1px solid var(--rule)' : 'none',
                background: t.apex ? 'color-mix(in srgb, var(--accent) 8%, var(--bg))' : 'var(--bg)',
                position: 'relative',
              }}
            >
              {t.apex && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    background: 'var(--accent)',
                    color: 'var(--inv-ink)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    padding: '4px 10px',
                  }}
                >
                  MOST PICKED
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 48,
                  color: t.apex ? 'var(--accent)' : 'var(--ink)',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {t.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontWeight: 500,
                  fontSize: 18,
                  marginTop: 14,
                }}
              >
                {t.ko}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'var(--ink-3)',
                  marginBottom: 24,
                }}
              >
                {t.en}
              </div>

              <Row label="MIN MONTHLY" value={t.min} />
              <Row label="FOUNDERS GIFT" value={t.gift} accent emphasized={t.apex} />
              <Row label="SPREAD" value={t.spread} />
              <Row label="STORAGE" value={t.storage} />
              <Row label="12개월 STREAK" value={t.streak12} />

              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--rule)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  color: 'var(--ink-3)',
                }}
              >
                {t.joined.toLocaleString()} JOINED
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  accent,
  emphasized,
}: {
  label: string;
  value: string;
  accent?: boolean;
  emphasized?: boolean;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.22em',
          color: accent ? 'var(--accent)' : 'var(--ink-3)',
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: emphasized ? 'var(--font-serif)' : 'var(--font-mono)',
          fontStyle: emphasized ? 'italic' : 'normal',
          fontSize: emphasized ? 24 : 13,
          fontWeight: emphasized ? 500 : 500,
          color: accent ? 'var(--accent)' : 'var(--ink)',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
    </div>
  );
}
