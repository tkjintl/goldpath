import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';
import { CohortBar } from './CohortBar';
import { MobileTierCarousel } from './MobileTierCarousel';
import { TIERS, type Tier } from './tiers-data';

export type { Tier };
export { TIERS };

// Per-tier visual config
type TierVisual = {
  numeral: number;
  translateY: number;
  pal: { from: string; mid: string; glow: string; accent: string; border: string };
};

const TIER_VISUALS: TierVisual[] = [
  { numeral: 36, translateY: 0,   pal: { from: '#2a1f0e', mid: '#3d2c10', glow: 'rgba(180,110,40,0.3)',  accent: 'rgba(180,110,40,0.85)',  border: 'rgba(180,110,40,0.28)'  } }, // Bronze
  { numeral: 42, translateY: 0,   pal: { from: '#141414', mid: '#1e1e22', glow: 'rgba(192,192,200,0.2)', accent: 'rgba(200,200,210,0.85)', border: 'rgba(200,200,210,0.25)' } }, // Silver
  { numeral: 56, translateY: -12, pal: { from: '#0d0b08', mid: '#1a1410', glow: 'rgba(201,152,87,0.4)',  accent: 'rgba(201,152,87,0.95)',  border: 'rgba(201,152,87,0.32)'  } }, // Gold
  { numeral: 48, translateY: 0,   pal: { from: '#0b1018', mid: '#131c28', glow: 'rgba(140,180,230,0.2)', accent: 'rgba(150,190,240,0.85)', border: 'rgba(140,180,230,0.25)' } }, // Platinum
  { numeral: 52, translateY: -4,  pal: { from: '#12090d', mid: '#1c0f16', glow: 'rgba(180,130,200,0.2)', accent: 'rgba(185,140,210,0.85)', border: 'rgba(180,130,200,0.25)' } }, // Sovereign
];


export async function TierLadder() {
  const signupCount = await getSignupCount();
  const founders = foundersDisplayCount(signupCount);
  return (
    <section
      className="gp-tiers"
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
              첫 코호트 · 5,000명.{' '}
              <span
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontWeight: 600,
                  color: 'var(--accent)',
                }}
              >
                이 라운드의 가격은 다시 오지 않습니다.
              </span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-krs)',
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--ink-2)',
                maxWidth: 640,
                marginTop: 22,
              }}
            >
              첫 라운드는 50kg를 LBMA 픽스에 선매입해 보관소에 배정합니다. 평균
              누적 10g/회원 기준으로 약 5,000명이 한도입니다. 이 한도가 채워지면
              다음 라운드는 새 픽스에 시작합니다 — 같은 가격은 두 번 오지
              않습니다.
            </p>
          </div>
          <CohortBar joined={founders} cap={FOUNDERS_CAP} />
        </div>

        {/* Mobile carousel — hidden on desktop via .gp-tier-mobile CSS class */}
        <div className="gp-tier-mobile">
          <MobileTierCarousel />
        </div>

        {/* Desktop grid — hidden on mobile via .gp-tier-desktop CSS class */}
        <div className="gp-tier-desktop">
        <div
          data-mobile="tier-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 0,
            border: 'none',
            alignItems: 'stretch',
          }}
        >
          {TIERS.map((t, i) => {
            const vis = TIER_VISUALS[i];
            const pal = vis.pal;
            return (
              <article
                key={t.n}
                className={`gp-tier-card gp-card-lift gp-fade-up gp-fade-up-delay-${i + 1}`}
                style={{
                  padding: t.apex ? '0 0 26px' : '26px 20px',
                  borderRight: i < TIERS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  background: `linear-gradient(160deg, ${pal.from} 0%, ${pal.mid} 55%, ${pal.from} 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: vis.translateY ? `translateY(${vis.translateY}px)` : undefined,
                  boxShadow: t.apex
                    ? `0 0 48px ${pal.glow}, inset 0 1px 0 ${pal.border}`
                    : `0 0 20px ${pal.glow.replace(/[\d.]+\)$/, '0.08)')}, inset 0 1px 0 ${pal.border}`,
                  zIndex: t.apex ? 2 : 1,
                  transition: 'box-shadow 300ms ease',
                }}
              >
                {/* Metallic grain */}
                <div aria-hidden style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='5'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.03 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  mixBlendMode: 'screen', pointerEvents: 'none',
                }} />

                {/* Apex glow breathe */}
                {t.apex && (
                  <div aria-hidden className="gp-breathe" style={{
                    position: 'absolute', inset: -16,
                    boxShadow: `0 0 56px ${pal.glow}`,
                    pointerEvents: 'none', zIndex: -1,
                  }} />
                )}

                {/* RECOMMENDED — top strip, no bleed */}
                {t.apex && (
                  <div style={{
                    width: '100%', textAlign: 'center',
                    background: `linear-gradient(90deg, ${pal.from}, ${pal.border.replace('0.32', '0.18')}, ${pal.from})`,
                    borderBottom: `1px solid ${pal.border}`,
                    fontFamily: 'var(--font-mono)', fontSize: 8,
                    letterSpacing: '0.28em', color: pal.accent,
                    padding: '7px 0 6px',
                  }}>
                    RECOMMENDED · 추천
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: t.apex ? '20px 20px 0' : '0' }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: vis.numeral, color: pal.accent, fontWeight: 500, lineHeight: 1,
                    filter: `drop-shadow(0 2px 12px ${pal.glow})`,
                  }}>
                    {t.n}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-krs)', fontWeight: 600, fontSize: 16,
                    marginTop: 12, color: 'rgba(255,255,255,0.9)',
                  }}>
                    {t.ko}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12,
                    color: 'rgba(255,255,255,0.38)', marginBottom: 20,
                  }}>
                    {t.en}
                  </div>
                  <div style={{ height: 1, background: `linear-gradient(90deg, ${pal.border}, transparent)`, marginBottom: 16 }} />
                  <Row label="MIN MONTHLY" value={t.min} />
                  <Row label="FOUNDERS GIFT" value={t.gift} accent emphasized={t.apex} />
                  <Row label="SPREAD" value={t.spread} />
                  <Row label="STORAGE" value={t.storage} />
                  <Row label="12개월 STREAK" value={t.streak12} />
                </div>
              </article>
            );
          })}
        </div>
        </div>{/* end gp-tier-desktop */}

        <div
          data-mobile="tier-footnotes"
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
          }}
        >
          <Footnote
            label="FOUNDERS GIFT · 베스팅 · 세무"
            body="가입 즉시 그램으로 환산되어 잔고에 적립. 12개월 자동이체 유지 시 베스팅 완료. 한국 세법상 일반 소득으로 분류 — 첫 결제 후 신고 안내 발송."
          />
          <Footnote
            label="12개월 STREAK · 기념바"
            body="12개월 연속 자동이체 유지 시 기념바 발송. 발송 비용은 회원 부담, 무게는 자동이체 누적 그램에서 차감. 기념바 가치는 일반 소득으로 분류될 수 있습니다."
          />
        </div>
      </div>
    </section>
  );
}

function Footnote({ label, body }: { label: string; body: string }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--rule)',
        paddingTop: 16,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'var(--accent)',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-krs)',
          fontWeight: 300,
          fontSize: 12,
          lineHeight: 1.7,
          color: 'var(--ink-3)',
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
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
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 8,
        letterSpacing: '0.22em',
        color: accent ? 'var(--accent)' : 'rgba(255,255,255,0.32)',
        marginBottom: 3,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: emphasized ? 'var(--font-serif)' : 'var(--font-mono)',
        fontStyle: emphasized ? 'italic' : 'normal',
        fontSize: emphasized ? 22 : 12,
        fontWeight: 500,
        color: accent ? 'var(--accent)' : 'rgba(255,255,255,0.82)',
        lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  );
}
