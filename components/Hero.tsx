import Link from 'next/link';
import { getPriceSnapshot, fmtKRW, fmtPct } from '@/lib/pricing';
import { getSignupCount } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';
import { FlakeParticles } from './FlakeParticles';
import { CountUp } from './CountUp';
import { HeroCard } from './HeroCard';

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
        borderBottom: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FlakeParticles count={4} />

      {/* ── Mobile-only card-first layout ── */}
      <div data-mobile="hero-mobile-block" style={{ display: 'none', minHeight: 'calc(100dvh - 97px)', boxSizing: 'border-box' }}>
        <HeroCard founderNumber={founderNumber} logoAbove />

        {/* Editorial + price table + founder bar */}
        <div style={{ padding: '28px 24px 0' }}>
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
          padding: 'clamp(48px, 6vh, 80px) 36px clamp(60px, 7vh, 100px)',
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

        {/* RIGHT — obsidian product card */}
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            className="gp-breathe"
            style={{
              position: 'absolute',
              inset: -24,
              borderRadius: 4,
              boxShadow: '0 0 80px rgba(201,152,87,0.25)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <HeroCard founderNumber={founderNumber} desktop />
          </div>
        </div>
      </div>
    </section>
  );
}
