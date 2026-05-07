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

const TIER_PALETTE = [
  { from: '#2a1f0e', mid: '#3d2c10', glow: 'rgba(180,110,40,0.35)', accent: 'rgba(180,110,40,0.85)', border: 'rgba(180,110,40,0.30)' },
  { from: '#141414', mid: '#1e1e22', glow: 'rgba(192,192,200,0.25)', accent: 'rgba(200,200,210,0.85)', border: 'rgba(200,200,210,0.28)' },
  { from: '#0d0b08', mid: '#1a1410', glow: 'rgba(201,152,87,0.45)', accent: 'rgba(201,152,87,0.95)', border: 'rgba(201,152,87,0.35)' },
  { from: '#0b1018', mid: '#131c28', glow: 'rgba(140,180,230,0.25)', accent: 'rgba(150,190,240,0.85)', border: 'rgba(140,180,230,0.28)' },
  { from: '#12090d', mid: '#1c0f16', glow: 'rgba(180,130,200,0.25)', accent: 'rgba(185,140,210,0.85)', border: 'rgba(180,130,200,0.28)' },
] as const;

function fmtManFromKrw(krw: number): string {
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
            margin: '0 0 56px',
            color: 'var(--ink)',
          }}
        >
          5,000명에게만 주는 첫 그램.
        </h2>

        <div
          className="gp-credits-ladder"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(200px, 1fr))',
            gap: 16,
            alignItems: 'end',
          }}
        >
          {TIERS.map((t, i) => {
            const wonValue = t.foundersGram * snapshot.aurumKrwPerGram;
            const pal = TIER_PALETTE[i];
            return (
              <article
                key={t.roman}
                className="gp-card-lift"
                style={{
                  position: 'relative',
                  background: `linear-gradient(145deg, ${pal.from} 0%, ${pal.mid} 60%, ${pal.from} 100%)`,
                  border: `1px solid ${pal.border}`,
                  borderRadius: 4,
                  padding: 22,
                  minHeight: t.height,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  overflow: 'hidden',
                  transform: t.featured ? 'translateY(-12px)' : undefined,
                  boxShadow: t.featured
                    ? `0 0 40px ${pal.glow}, 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${pal.border}`
                    : `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 ${pal.border}`,
                }}
              >
                {/* Metallic grain */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  mixBlendMode: 'screen', pointerEvents: 'none', opacity: 0.8,
                }} />

                {/* RECOMMENDED badge — top strip, no overflow */}
                {t.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    background: `linear-gradient(90deg, ${pal.mid}, ${pal.accent.replace('0.95', '0.15')}, ${pal.mid})`,
                    borderBottom: `1px solid ${pal.border}`,
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 8,
                    letterSpacing: '0.28em',
                    color: pal.accent,
                    padding: '7px 0 6px',
                    zIndex: 4,
                  }}>
                    RECOMMENDED · 추천
                  </div>
                )}

                <div style={{ position: 'relative', zIndex: 2, paddingTop: t.featured ? 28 : 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 56,
                      lineHeight: 1,
                      color: pal.accent,
                      filter: `drop-shadow(0 2px 12px ${pal.glow})`,
                    }}
                  >
                    {t.roman}
                  </div>
                  <div
                    lang="ko"
                    style={{
                      fontFamily: 'var(--font-krs)',
                      fontWeight: 600,
                      fontSize: 18,
                      color: 'rgba(255,255,255,0.92)',
                      marginTop: 10,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="gp-num"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.06em',
                      marginTop: 4,
                    }}
                  >
                    {t.monthlyLabel} / 월
                  </div>

                  <div
                    style={{
                      borderTop: `1px solid ${pal.border}`,
                      paddingTop: 12,
                      marginTop: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.22em',
                        color: 'rgba(255,255,255,0.35)',
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
                        color: pal.accent,
                      }}
                    >
                      {t.foundersGram.toFixed(2)}g
                    </div>
                    <div
                      className="gp-num"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.35)',
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
                      paddingTop: 12,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                    }}
                  >
                    <Row k="스프레드" v={t.spread} accentColor={pal.accent} />
                    <Row k="보관 무료" v={t.storageFree} accentColor={pal.accent} />
                    <Row k="12개월 선물" v={t.streakGift} accentColor={pal.accent} />
                  </div>
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

function Row({ k, v, accentColor }: { k: string; v: string; accentColor: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
      <span lang="ko" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {k}
      </span>
      <span style={{ color: accentColor }}>{v}</span>
    </div>
  );
}
