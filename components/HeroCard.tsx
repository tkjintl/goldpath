'use client';

import { useRef } from 'react';

interface HeroCardProps {
  founderNumber: number;
}

export function HeroCard({ founderNumber }: HeroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(x: number, y: number) {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg) scale(1.02)`;
  }

  function handleReset() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 400ms cubic-bezier(0.2,0.8,0.2,1)';
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
  }

  function handleEnter() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 80ms ease';
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const t = e.touches[0];
    handleMove((t.clientX - rect.left) / rect.width, (t.clientY - rect.top) / rect.height);
  }

  const founderLabel = `#${founderNumber.toString().padStart(4, '0')} · 5,000`;

  return (
    <div style={{ padding: '20px 24px 0' }}>
      {/* Card */}
      <div
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={handleEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={handleReset}
        onTouchStart={handleEnter}
        onTouchMove={onTouchMove}
        onTouchEnd={handleReset}
      >
        <div
          ref={cardRef}
          style={{
            width: '100%',
            aspectRatio: '1.586',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #0d0b08 0%, #1a1410 40%, #0f0d0a 70%, #1e1508 100%)',
            border: '1px solid rgba(201,152,87,0.25)',
            boxShadow: '0 1px 0 rgba(201,152,87,0.15) inset, 0 -1px 0 rgba(0,0,0,0.5) inset, 0 8px 32px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 80ms ease',
          }}
        >
          {/* Gold foil shimmer band */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '35%',
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,152,87,0.08) 30%, rgba(201,152,87,0.18) 50%, rgba(201,152,87,0.08) 70%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Metallic grain texture */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              mixBlendMode: 'multiply',
              pointerEvents: 'none',
            }}
          />

          {/* Specular highlight — tracks touch/mouse via CSS vars */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at var(--gx, 50%) var(--gy, 25%), rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Large 金 watermark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              fontFamily: 'var(--font-krs)',
              fontSize: 96,
              color: 'rgba(201,152,87,0.04)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -54%)',
              letterSpacing: '-0.05em',
              pointerEvents: 'none',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            金
          </div>

          {/* Horizontal rule at 50% */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              left: 24,
              right: 24,
              height: 1,
              background: 'rgba(201,152,87,0.12)',
              pointerEvents: 'none',
            }}
          />

          {/* Card content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {/* Au mark */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: '1.5px solid rgba(201,152,87,0.6)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 14,
                    color: 'rgba(201,152,87,0.9)',
                    lineHeight: 1,
                  }}
                >
                  Au
                </span>
              </div>

              {/* Purity */}
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'rgba(201,152,87,0.5)',
                    letterSpacing: '0.1em',
                  }}
                >
                  PURITY
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'rgba(201,152,87,0.9)',
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  999.9‰
                </span>
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.22em',
                  color: 'rgba(201,152,87,0.75)',
                  fontWeight: 500,
                }}
              >
                GOLDPATH
              </span>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 8,
                    color: 'rgba(201,152,87,0.4)',
                    letterSpacing: '0.12em',
                  }}
                >
                  FOUNDER SERIES
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'rgba(201,152,87,0.8)',
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  {founderLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vault tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '0 2px' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-2)', flexShrink: 0 }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--accent-2)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Singapore Vault · LBMA Certified · 실물 보관
        </span>
      </div>
    </div>
  );
}
