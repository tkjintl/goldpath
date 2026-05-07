import Link from 'next/link';
import { CountUp } from '../CountUp';
import { FlakeParticles } from '../FlakeParticles';

export function PromoFinal({ joined, cap }: { joined: number; cap: number }) {
  const remaining = Math.max(0, cap - joined);
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
        padding: '120px 36px',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <FlakeParticles count={6} tone="inv-accent" />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 880, margin: '0 auto' }}>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(64px, 9vw, 132px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--inv-ink)',
          }}
        >
          한 그램.{' '}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--inv-accent)',
            }}
          >
            지금.
          </span>
        </h2>

        <div
          lang="ko"
          style={{
            fontFamily: 'var(--font-kr)',
            fontWeight: 400,
            fontSize: 'clamp(18px, 2.4vw, 24px)',
            color: 'color-mix(in srgb, var(--inv-ink) 80%, transparent)',
            marginTop: 28,
            marginBottom: 24,
          }}
        >
          5,000명. 마감 후엔 정가.
        </div>

        <div
          className="gp-num"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.28em',
            color: 'var(--inv-accent)',
            marginBottom: 40,
          }}
        >
          <CountUp to={joined} /> / {cap.toString().padStart(5, '0')} · 남은 자리{' '}
          {remaining.toLocaleString('en-US')}
        </div>

        <Link
          href="/signup"
          className="gp-cta-primary"
          style={{
            display: 'inline-block',
            background: 'var(--inv-accent)',
            color: 'var(--inv-bg)',
            padding: '20px 36px',
            fontFamily: 'var(--font-kr)',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.06em',
            borderRadius: 2,
          }}
        >
          ₩200K로 시작 →
        </Link>

        <div
          style={{
            marginTop: 56,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'color-mix(in srgb, var(--inv-ink) 60%, transparent)',
          }}
        >
          MALCA-AMIT SGP · LLOYD&apos;S 100% · BRINK&apos;S Q-AUDIT · MAS PSPM 2019
        </div>
      </div>
    </section>
  );
}
