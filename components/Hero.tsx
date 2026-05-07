import Link from 'next/link';
import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';
import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';
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
        padding: 'clamp(48px, 6vh, 80px) 36px clamp(60px, 7vh, 100px)',
        borderBottom: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FlakeParticles count={4} />

      {/* ── Mobile-only card-first layout ── */}
      <div data-mobile="hero-mobile-block" style={{ display: 'none' }}>
        {/* Gold credit card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1.586',
              borderRadius: 16,
              background: 'linear-gradient(170deg, var(--accent-bright) 0%, var(--accent) 50%, var(--accent-dim) 100%)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(122,90,44,0.12), 0 12px 40px rgba(122,90,44,0.30), 0 1px 0 rgba(255,255,255,0.18) inset, 0 -1px 0 rgba(0,0,0,0.25) inset',
            }}
          >
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px)' }} />
            <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)', borderRadius: '16px 16px 0 0' }} />
            <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: 'rgba(255,255,255,0.95)', lineHeight: 1, letterSpacing: '-0.02em' }}>Au</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', display: 'block' }}>PURITY</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: 500, letterSpacing: '0.04em', display: 'block', marginTop: 2 }}>999.9‰</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-krs)', fontSize: 15, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>GoldPath</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textAlign: 'right' }}>
                  FOUNDER SERIES
                  <span style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500, marginTop: 2 }}>#{founderNumber.toString().padStart(4, '0')} / 5,000</span>
                </div>
              </div>
            </div>
          </div>
          {/* Vault tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '0 2px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-2)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent-2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Singapore Vault · LBMA Certified · 실물 보관</span>
          </div>
        </div>

        {/* Editorial + price table + founder bar */}
        <div style={{ padding: '20px 24px 0' }}>
          <span style={{ fontFamily: 'var(--font-krs)', fontSize: 34, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, letterSpacing: '-0.02em', display: 'block' }}>매달 한 그램.</span>
          <span style={{ fontFamily: 'var(--font-krs)', fontSize: 13, fontWeight: 300, color: 'var(--accent-dim)', lineHeight: 1.5, marginTop: 6, display: 'block' }}>조용히 쌓이고, 영원히 남는다.</span>

          {/* Price comparison */}
          <div style={{ margin: '16px 0 0', border: '1px solid var(--rule)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: 'color-mix(in srgb, var(--bg-2) 60%, var(--bg))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(31,26,20,0.2)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>Korea Retail 1g</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--ink-3)', textDecoration: 'line-through', letterSpacing: '-0.02em' }}>{fmtKRW(p.retailKrwPerGram)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderTop: '1px solid var(--rule)', background: 'var(--bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: 'linear-gradient(135deg, var(--accent-bright), var(--accent-dim))', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>GoldPath 1g</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{fmtKRW(p.aurumKrwPerGram)}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, padding: '3px 7px', borderRadius: 4, background: 'rgba(123,149,131,0.15)', color: 'var(--green)', letterSpacing: '0.04em' }}>▼{fmtPct(p.aurumDiscountPct)}</span>
              </div>
            </div>
          </div>

          {/* Founder bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '14px 0 20px' }}>
            <div style={{ flex: 1, height: 3, background: 'var(--rule)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (founderNumber / FOUNDERS_CAP) * 100).toFixed(2)}%`, background: 'linear-gradient(90deg, var(--accent-bright), var(--accent))', borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>#{founderNumber.toString().padStart(4, '0')} / {FOUNDERS_CAP.toLocaleString()} 창립 멤버</span>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ padding: '0 24px 40px' }}>
          <Link
            href="/signup"
            className="gp-cta-primary"
            style={{
              display: 'block',
              width: '100%',
              padding: 16,
              background: 'linear-gradient(170deg, var(--accent-bright) 0%, var(--accent) 50%, var(--accent-dim) 100%)',
              color: 'var(--inv-ink)',
              fontFamily: 'var(--font-krs)',
              fontSize: 16,
              fontWeight: 600,
              textAlign: 'center',
              letterSpacing: '0.02em',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(122,90,44,0.25)',
            }}
          >
            ₩200K로 시작 →
          </Link>
          <Link
            href="/why"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              opacity: 0.7,
            }}
          >
            읽어보기 ↓
          </Link>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div
        data-mobile="hero-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 64,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT — editorial */}
        <div className="gp-fade-up">
          <div
            className="gp-hero-eyebrow"
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
              fontSize: 'clamp(56px, 6.5vw, 96px)',
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
              aspectRatio: '4 / 5',
              maxHeight: 520,
              margin: '0 auto',
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
