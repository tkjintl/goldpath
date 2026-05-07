'use client';

import { useRef, useEffect, useState } from 'react';

interface HeroCardProps {
  founderNumber: number;
  logoAbove?: boolean;
  /** desktop mode: wider aspect, no outer padding */
  desktop?: boolean;
}

export function HeroCard({ founderNumber, logoAbove = false, desktop = false }: HeroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const particleId = useRef(0);

  function handleMove(x: number, y: number) {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
    const tiltX = desktop ? (y - 0.5) * -10 : (y - 0.5) * -12;
    const tiltY = desktop ? (x - 0.5) * 10 : (x - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;

    // spawn micro-particle on move (throttled by id)
    if (particleId.current % 6 === 0) {
      const id = particleId.current;
      setParticles(p => [...p.slice(-8), { x: x * 100, y: y * 100, id }]);
      setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 800);
    }
    particleId.current++;
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
    // trigger scan line
    const scan = scanRef.current;
    if (scan) {
      scan.style.transition = 'none';
      scan.style.top = '-4px';
      requestAnimationFrame(() => {
        if (scan) {
          scan.style.transition = 'top 700ms cubic-bezier(0.4,0,0.2,1)';
          scan.style.top = '104%';
        }
      });
    }
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

  const outerPad = desktop ? '0' : '20px 24px 0';

  return (
    <div style={{ padding: outerPad }}>

      {/* ── Logo lockup above card ── */}
      {logoAbove && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
            paddingLeft: 2,
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Animated Au mark */}
          <div
            style={{
              width: 36,
              height: 36,
              border: `1.5px solid rgba(201,152,87,${logoHovered ? 0.9 : 0.55})`,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease',
              boxShadow: logoHovered
                ? '0 0 18px rgba(201,152,87,0.35), inset 0 0 8px rgba(201,152,87,0.12)'
                : '0 0 0 rgba(201,152,87,0)',
              transform: logoHovered ? 'rotate(8deg) scale(1.08)' : 'rotate(0deg) scale(1)',
              background: logoHovered ? 'rgba(201,152,87,0.07)' : 'transparent',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 16,
                fontWeight: 600,
                color: `rgba(201,152,87,${logoHovered ? 1 : 0.75})`,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                transition: 'color 300ms ease',
              }}
            >
              Au
            </span>
          </div>

          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: '0.22em',
                color: `rgba(201,152,87,${logoHovered ? 0.95 : 0.7})`,
                transition: 'color 300ms ease, letter-spacing 300ms ease',
                letterSpacing: logoHovered ? '0.28em' : '0.22em',
              } as React.CSSProperties}
            >
              GOLDPATH
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                letterSpacing: '0.14em',
                color: 'rgba(201,152,87,0.35)',
                transition: 'opacity 300ms ease',
                opacity: logoHovered ? 0.8 : 0.5,
              }}
            >
              SINGAPORE · 999.9 FINE GOLD
            </span>
          </div>

          {/* Ambient pulse dot */}
          <div
            style={{
              marginLeft: 'auto',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(123,149,131,0.8)',
              boxShadow: logoHovered ? '0 0 10px rgba(123,149,131,0.6)' : 'none',
              animation: 'gp-logo-pulse 2.4s ease-in-out infinite',
              transition: 'box-shadow 300ms ease',
            }}
          />
        </div>
      )}

      {/* ── Card ── */}
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
            aspectRatio: desktop ? '4 / 5' : '1.586',
            maxHeight: desktop ? 520 : undefined,
            borderRadius: desktop ? 0 : 18,
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
              animation: 'gp-foil-drift 6s ease-in-out infinite alternate',
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

          {/* Scan line sweep on hover/touch */}
          <div
            ref={scanRef}
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-4px',
              height: 2,
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,152,87,0.6) 30%, rgba(255,255,255,0.5) 50%, rgba(201,152,87,0.6) 70%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 5,
              filter: 'blur(0.5px)',
            }}
          />

          {/* Particle sparks */}
          {particles.map(pt => (
            <div
              key={pt.id}
              aria-hidden
              style={{
                position: 'absolute',
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'rgba(201,152,87,0.8)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 6,
                animation: 'gp-spark 800ms ease-out forwards',
              }}
            />
          ))}

          {/* Large 金 watermark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              fontFamily: 'var(--font-krs)',
              fontSize: desktop ? 140 : 96,
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

          {/* Corner accent dots */}
          {[
            { top: 14, left: 14 },
            { top: 14, right: 14 },
            { bottom: 14, left: 14 },
            { bottom: 14, right: 14 },
          ].map((pos, i) => (
            <div
              key={i}
              aria-hidden
              style={{
                position: 'absolute',
                ...pos,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(201,152,87,0.3)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          ))}

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
              padding: desktop ? '28px 32px' : '22px 24px',
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
                  width: 36,
                  height: 36,
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
                    fontSize: 15,
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
                    fontSize: desktop ? 15 : 13,
                    color: 'rgba(201,152,87,0.9)',
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  999.9‰
                </span>
              </div>
            </div>

            {/* Centre — desktop only big 금 display */}
            {desktop && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-krs)',
                    fontWeight: 200,
                    fontSize: 'clamp(72px, 10vw, 120px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.06em',
                    color: 'rgba(201,152,87,0.85)',
                    filter: 'drop-shadow(0 4px 32px rgba(201,152,87,0.3))',
                    userSelect: 'none',
                  }}
                >
                  금
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'rgba(201,152,87,0.6)',
                    marginTop: 8,
                    letterSpacing: '0.1em',
                  }}
                >
                  Au · 999.9
                </div>
              </div>
            )}

            {/* Bottom row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: desktop ? 13 : 12,
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
                    fontSize: desktop ? 12 : 11,
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

      {/* Vault tag — mobile only */}
      {!desktop && (
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
      )}

      {/* Keyframe injection */}
      <style>{`
        @keyframes gp-foil-drift {
          from { top: 32%; opacity: 0.8; }
          to   { top: 38%; opacity: 1; }
        }
        @keyframes gp-spark {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
        }
        @keyframes gp-logo-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
