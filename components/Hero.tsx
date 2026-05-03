import Link from 'next/link';
import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';
import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount } from '@/lib/founders';
import { FlakeParticles } from './FlakeParticles';
import { CountUp } from './CountUp';

// Hero — B2 magazine layout, GP brass-gold palette.
// Left: editorial-issue eyebrow → giant Korean serif headline → Pretendard accent →
//   bilingual lede → CTAs. Right: dimensional specimen card with depth + ambient breath.
export async function Hero() {
  const [p, signupCount] = await Promise.all([getPriceSnapshot(), getSignupCount()]);
  const founderNumber = foundersDisplayCount(signupCount) + 1;

  return (
    <section
      className="gp-hero"
      style={{
        padding: '80px 36px 100px',
        borderBottom: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FlakeParticles count={4} />
      <div
        data-mobile="hero-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 64,
          alignItems: 'end',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT — editorial */}
        <div className="gp-fade-up">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              color: 'var(--accent)',
              borderBottom: '1px solid var(--rule)',
              paddingBottom: 18,
              marginBottom: 36,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <span>VOL. I · ISSUE 001 · MMXXVI</span>
            <span>
              LBMA{' '}
              <span className="gp-num" style={{ color: 'var(--ink)' }}>
                <CountUp to={p.lbmaUsdPerOz} prefix="$" />
              </span>{' '}
              · SINGAPORE
            </span>
          </div>

          <h1
            data-mobile="hero-headline"
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(56px, 8vw, 120px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 16,
              color: 'var(--ink)',
            }}
          >
            매달
            <br />
            <span
              style={{
                fontFamily: 'var(--font-krs)',
                fontWeight: 600,
                color: 'var(--accent)',
              }}
            >
              한 그램.
            </span>
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 400,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              color: 'var(--ink-2)',
              lineHeight: 1.4,
              marginTop: 24,
              marginBottom: 36,
              maxWidth: 560,
            }}
          >
            조용히 쌓이고,
            <br />
            영원히 남는다.
          </div>

          <p
            style={{
              fontFamily: 'var(--font-kr)',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.85,
              color: 'var(--ink-2)',
              maxWidth: 540,
              marginBottom: 36,
            }}
          >
            <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
              오늘 1g. 한국 소매 vs GoldPath.
            </strong>{' '}
            한국 소매 {fmtKRW(p.retailKrwPerGram)} vs GoldPath {fmtKRW(p.aurumKrwPerGram)}{' '}
            ({fmtPct(p.aurumDiscountPct)}). 싱가포르는 IPM(투자용 귀금속)에 부가세를
            면제하고, MinLaw가 딜러를 등록·감독합니다. 같은 1g, 한국 소매보다 약 18%
            낮게 매입할 수 있는 이유입니다. 매달 자동이체로 999.9 실물 금이 싱가포르
            금고에 회원님 이름으로 쌓입니다. 약정 없음. 5분 가입.
          </p>

          <div data-mobile="hero-ctas" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/signup"
              className="gp-cta-primary"
              style={{
                background: 'var(--accent)',
                color: 'var(--inv-ink)',
                padding: '18px 30px',
                fontFamily: 'var(--font-kr)',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.06em',
                borderRadius: 2,
              }}
            >
              ₩200K로 시작 →
            </Link>
            <Link
              href="/why"
              className="gp-cta-ghost"
              style={{
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                padding: '18px 30px',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 16,
                borderRadius: 2,
              }}
            >
              읽어보기 ↓
            </Link>
          </div>
        </div>

        {/* RIGHT — product card / specimen */}
        <div style={{ position: 'relative' }}>
          {/* ambient breath glow */}
          <div
            aria-hidden="true"
            className="gp-breathe"
            style={{
              position: 'absolute',
              inset: -24,
              borderRadius: 4,
              boxShadow: '0 0 80px color-mix(in srgb, var(--accent) 40%, transparent)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div
            data-mobile="hero-card"
            className="gp-card-lift"
            style={{
              position: 'relative',
              zIndex: 1,
              aspectRatio: '3 / 4',
              background:
                'linear-gradient(170deg, var(--accent-bright) 0%, var(--accent) 50%, var(--accent-dim) 100%)',
              color: 'var(--inv-ink)',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              boxShadow:
                'inset 0 0 0 1px color-mix(in srgb, white 14%, transparent), inset 0 -16px 24px -8px color-mix(in srgb, black 18%, transparent), 0 30px 60px -30px color-mix(in srgb, black 40%, transparent)',
              transition:
                'transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 320ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* specular highlight overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 30% 22%, color-mix(in srgb, white 22%, transparent), transparent 56%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 18,
                border: '1px solid color-mix(in srgb, var(--inv-ink) 22%, transparent)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-krs)',
                fontWeight: 300,
                fontSize: 14,
                letterSpacing: '0.32em',
                position: 'relative',
                zIndex: 3,
              }}
            >
              金 · GOLDPATH
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontWeight: 200,
                  fontSize: 'clamp(96px, 16vw, 160px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.06em',
                  filter:
                    'drop-shadow(0 4px 24px color-mix(in srgb, black 22%, transparent))',
                }}
              >
                금
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 32,
                  fontWeight: 400,
                  marginTop: 6,
                }}
              >
                Au · 999.9
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.32em',
                position: 'relative',
                zIndex: 3,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>#{founderNumber.toString().padStart(4, '0')}</span>
              <span>1g · MMXXVI</span>
              <span>SGP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
