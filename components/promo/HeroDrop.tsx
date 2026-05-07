import Link from 'next/link';
import type { PriceSnapshot } from '@/lib/pricing';
import { CountUp } from '../CountUp';
import { FlakeParticles } from '../FlakeParticles';

// Founders Drop hero — bilingual editorial layout, specimen card right.
export function HeroDrop({
  joined,
  cap,
  snapshot,
}: {
  joined: number;
  cap: number;
  snapshot: PriceSnapshot;
}) {
  const founderNumber = joined + 1;
  void snapshot; // present for parity / future live tags
  return (
    <section
      style={{
        padding: '72px 36px 96px',
        borderBottom: '1px solid var(--rule)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FlakeParticles count={4} />
      <div
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
        {/* LEFT — copy */}
        <div className="gp-fade-up" style={{ order: 2 }}>
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
            <span>VOL. I · ISSUE 001 · MMXXVI · FOUNDERS DROP</span>
            <span className="gp-num" style={{ color: 'var(--accent)' }}>
              <CountUp to={joined} /> / {cap.toString().padStart(5, '0')}
            </span>
          </div>

          <h1
            lang="ko"
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(52px, 7.4vw, 108px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            매달 한 그램.
            <br />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--accent)',
              }}
            >
              첫 그램은 우리가.
            </span>
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: 'var(--ink-2)',
              lineHeight: 1.4,
              marginTop: 22,
              marginBottom: 32,
            }}
          >
            One gram a month. The first one&rsquo;s on us.
          </div>

          <p
            lang="ko"
            style={{
              fontFamily: 'var(--font-kr)',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.85,
              color: 'var(--ink-2)',
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            LBMA 국제 시세 + 2.0%로 매달 자동 적립. 가입 즉시 등급별 파운더스 그램이
            잔고에 잡힙니다 — 12개월 자동이체로 베스팅. 같은 가격은 두 번 오지 않습니다.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
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
              href="#how"
              className="gp-cta-ghost"
              style={{
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                padding: '18px 30px',
                fontFamily: 'var(--font-kr)',
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.06em',
                borderRadius: 2,
              }}
            >
              작동 방식 보기 ↓
            </Link>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ink-3)',
            }}
          >
            MAS 등록 · LLOYD&apos;S 100% · BRINK&apos;S 분기 감사
          </div>
        </div>

        {/* RIGHT — specimen card */}
        <div style={{ position: 'relative', order: 1 }}>
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
            className="gp-card-lift"
            style={{
              position: 'relative',
              zIndex: 1,
              aspectRatio: '3 / 4',
              maxWidth: 460,
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
            }}
          >
            <FlakeParticles count={3} tone="inv-accent" />
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
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.32em',
                position: 'relative',
                zIndex: 3,
              }}
            >
              金 · GOLDPATH · FOUNDERS
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
                lang="ko"
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontWeight: 200,
                  fontSize: 'clamp(96px, 18vw, 144px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.06em',
                  filter: 'drop-shadow(0 4px 24px color-mix(in srgb, black 22%, transparent))',
                }}
              >
                금
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 28,
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
              <span>SGP · MMXXVI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
