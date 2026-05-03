import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';

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
  apex?: boolean;
};

// Shared placeholder until cohort signup data is wired in (Phase 2).
const COHORT_STATUS = '정원 1,000 · 사전 등록 진행';

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
  },
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
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--accent)',
                  fontWeight: 400,
                }}
              >
                이 라운드의 가격은 다시 오지 않습니다.
              </em>
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
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--accent-dim)',
              letterSpacing: '0.2em',
            }}
          >
            {founders.toLocaleString()} / {FOUNDERS_CAP.toLocaleString()}
          </div>
        </div>

        <div
          data-mobile="tier-grid"
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
              className="gp-tier-card"
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
                  RECOMMENDED · 추천
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
                {COHORT_STATUS}
              </div>
            </article>
          ))}
        </div>

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
