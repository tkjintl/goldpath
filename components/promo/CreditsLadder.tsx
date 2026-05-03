import type { PriceSnapshot } from '@/lib/pricing';

type Tier = {
  roman: 'I' | 'II' | 'III' | 'IV' | 'V';
  name: string;
  monthlyKrw: number;
  monthlyLabel: string;
  foundersGram: number;
  spread: string;
  storageFree: string;
  streakGift: string;
  height: number;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    roman: 'I',
    name: '브론즈',
    monthlyKrw: 200_000,
    monthlyLabel: '₩200K',
    foundersGram: 0.23,
    spread: '2.0%',
    storageFree: '50g',
    streakGift: '1g 기념 바',
    height: 200,
  },
  {
    roman: 'II',
    name: '실버',
    monthlyKrw: 500_000,
    monthlyLabel: '₩500K',
    foundersGram: 0.7,
    spread: '1.8%',
    storageFree: '100g',
    streakGift: '5g 기념 바',
    height: 240,
  },
  {
    roman: 'III',
    name: '골드',
    monthlyKrw: 1_000_000,
    monthlyLabel: '₩1M',
    foundersGram: 1.86,
    spread: '1.5%',
    storageFree: '250g',
    streakGift: '10g + 각인',
    height: 320,
    featured: true,
  },
  {
    roman: 'IV',
    name: '플래티넘',
    monthlyKrw: 2_000_000,
    monthlyLabel: '₩2M',
    foundersGram: 4.65,
    spread: '1.2%',
    storageFree: '500g',
    streakGift: '25g + 맞춤',
    height: 280,
  },
  {
    roman: 'V',
    name: '소브린',
    monthlyKrw: 5_000_000,
    monthlyLabel: '₩5M',
    foundersGram: 11.6,
    spread: '1.0%',
    storageFree: '무제한',
    streakGift: '연간 프라이빗 바',
    height: 300,
  },
];

function fmtManFromKrw(krw: number): string {
  // Round to 만원 unit
  const man = Math.round(krw / 10_000);
  return `≈ ₩${man.toLocaleString('en-US')}만`;
}

export function CreditsLadder({ snapshot }: { snapshot: PriceSnapshot }) {
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
          § I · 파운더스 그램 · FOUNDERS GRAMS
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            color: 'var(--ink)',
          }}
        >
          5,000명에게만 주는 첫 그램.
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--accent)',
            marginBottom: 56,
          }}
        >
          The first gram, on the house.
        </div>

        <div
          className="gp-credits-ladder"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(200px, 1fr))',
            gap: 16,
            alignItems: 'end',
          }}
        >
          {TIERS.map((t) => {
            const wonValue = t.foundersGram * snapshot.aurumKrwPerGram;
            return (
              <article
                key={t.roman}
                className="gp-card-lift"
                style={{
                  position: 'relative',
                  border: '1px solid var(--rule)',
                  background: t.featured
                    ? 'color-mix(in srgb, var(--accent) 6%, var(--bg))'
                    : 'var(--bg)',
                  padding: 22,
                  minHeight: t.height,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  transform: t.featured ? 'translateY(-12px)' : undefined,
                  boxShadow: t.featured
                    ? '0 24px 60px color-mix(in srgb, var(--accent) 22%, transparent)'
                    : undefined,
                  borderColor: t.featured ? 'var(--accent)' : 'var(--rule)',
                }}
              >
                {t.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent)',
                      color: 'var(--inv-ink)',
                      padding: '4px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    RECOMMENDED · 추천
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 56,
                    lineHeight: 1,
                    color: 'var(--accent)',
                  }}
                >
                  {t.roman}
                </div>
                <div
                  lang="ko"
                  style={{
                    fontFamily: 'var(--font-kr)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: 'var(--ink)',
                  }}
                >
                  {t.name}
                </div>
                <div
                  className="gp-num"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--ink-2)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {t.monthlyLabel} / 월
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--rule)',
                    paddingTop: 12,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: 'var(--ink-3)',
                      marginBottom: 6,
                    }}
                  >
                    파운더스 그램
                  </div>
                  <div
                    className="gp-num"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      fontSize: 32,
                      lineHeight: 1,
                      color: 'var(--accent)',
                    }}
                  >
                    {t.foundersGram.toFixed(2)}g
                  </div>
                  <div
                    className="gp-num"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--ink-3)',
                      marginTop: 4,
                    }}
                  >
                    {fmtManFromKrw(wonValue)}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    marginTop: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--ink-2)',
                    letterSpacing: '0.06em',
                  }}
                >
                  <Row k="스프레드" v={t.spread} />
                  <Row k="보관 무료" v={t.storageFree} />
                  <Row k="12개월 선물" v={t.streakGift} />
                </div>
              </article>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .gp-credits-ladder {
              grid-template-columns: repeat(5, 78%) !important;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              padding-bottom: 16px;
              gap: 14px !important;
            }
            .gp-credits-ladder > article {
              scroll-snap-align: start;
              min-height: 280px !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span lang="ko" style={{ color: 'var(--ink-3)' }}>
        {k}
      </span>
      <span style={{ color: 'var(--ink)' }}>{v}</span>
    </div>
  );
}
