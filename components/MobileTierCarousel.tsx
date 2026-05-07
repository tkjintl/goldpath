'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TIERS, type Tier } from './tiers-data';

// Tier-specific palette — bronze → silver → gold → platinum → sovereign
const TIER_PALETTE = [
  { from: '#2a1f0e', mid: '#3d2c10', glow: 'rgba(180,110,40,0.35)', accent: 'rgba(180,110,40,0.85)', border: 'rgba(180,110,40,0.30)' },   // Bronze
  { from: '#141414', mid: '#1e1e22', glow: 'rgba(192,192,200,0.25)', accent: 'rgba(200,200,210,0.85)', border: 'rgba(200,200,210,0.28)' }, // Silver
  { from: '#0d0b08', mid: '#1a1410', glow: 'rgba(201,152,87,0.45)', accent: 'rgba(201,152,87,0.95)', border: 'rgba(201,152,87,0.35)' },    // Gold (apex)
  { from: '#0b1018', mid: '#131c28', glow: 'rgba(140,180,230,0.25)', accent: 'rgba(150,190,240,0.85)', border: 'rgba(140,180,230,0.28)' }, // Platinum
  { from: '#12090d', mid: '#1c0f16', glow: 'rgba(180,130,200,0.25)', accent: 'rgba(185,140,210,0.85)', border: 'rgba(180,130,200,0.28)' }, // Sovereign
] as const;

const NUMERALS = [36, 42, 56, 48, 52] as const;

function Row({ label, value, accent, emphasized, accentColor }: {
  label: string;
  value: string;
  accent?: boolean;
  emphasized?: boolean;
  accentColor: string;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 8,
        letterSpacing: '0.22em',
        color: accent ? accentColor : 'rgba(255,255,255,0.35)',
        marginBottom: 3,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: emphasized ? 'var(--font-serif)' : 'var(--font-mono)',
        fontStyle: emphasized ? 'italic' : 'normal',
        fontSize: emphasized ? 26 : 13,
        fontWeight: 500,
        color: accent ? accentColor : 'rgba(255,255,255,0.85)',
        lineHeight: 1.2,
      }}>
        {value}
      </div>
    </div>
  );
}

export function MobileTierCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);

  const scrollTo = (index: number, smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    card.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'nearest', inline: 'center' });
  };

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => scrollTo(2, false));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return;
      // card width + 12px gap between cards
      const stride = card.offsetWidth + 12;
      const idx = Math.round((track.scrollLeft - 4) / stride);
      setActive(Math.max(0, Math.min(TIERS.length - 1, idx)));
    };
    track.addEventListener('scroll', handler, { passive: true });
    return () => track.removeEventListener('scroll', handler);
  }, []);

  const go = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(TIERS.length - 1, active + dir));
    setActive(next);
    scrollTo(next, true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        .gp-carousel-track::-webkit-scrollbar { display: none; }
        @keyframes gp-tier-glow-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes gp-tier-foil {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
      `}</style>

      {/* Track */}
      <div
        ref={trackRef}
        className="gp-carousel-track"
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          gap: 12,
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 10,
          paddingBottom: 10,
        } as React.CSSProperties}
      >
        {TIERS.map((t: Tier, i: number) => {
          const numeral = NUMERALS[i];
          const pal = TIER_PALETTE[i];
          const isActive = i === active;

          return (
            <article
              key={t.n}
              style={{
                scrollSnapAlign: 'center',
                flex: '0 0 calc(100% - 8px)',
                minWidth: 0,
                background: `linear-gradient(145deg, ${pal.from} 0%, ${pal.mid} 60%, ${pal.from} 100%)`,
                border: `1px solid ${pal.border}`,
                borderRadius: 16,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 300ms ease, box-shadow 300ms ease',
                transform: isActive ? 'scale(1.01)' : 'scale(0.97)',
                boxShadow: isActive
                  ? `0 0 40px ${pal.glow}, 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 ${pal.border}`
                  : `0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 ${pal.border}`,
              }}
            >
              {/* Metallic grain */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                mixBlendMode: 'screen', pointerEvents: 'none', opacity: 0.8,
              }} />

              {/* Shimmer band */}
              <div aria-hidden style={{
                position: 'absolute', top: '40%', left: 0, right: 0, height: '22%',
                background: `linear-gradient(90deg, transparent 0%, ${pal.border} 40%, rgba(255,255,255,0.06) 50%, ${pal.border} 60%, transparent 100%)`,
                pointerEvents: 'none',
              }} />

              {/* Specular top-left glow */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 20% 15%, ${pal.glow.replace('0.', '0.0')}4 0%, transparent 55%)`,
                pointerEvents: 'none',
              }} />

              {/* Corner accent dots */}
              {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, ci) => (
                <div key={ci} aria-hidden style={{
                  position: 'absolute', ...pos,
                  width: 3, height: 3, borderRadius: '50%',
                  background: pal.accent.replace('0.95', '0.4').replace('0.85', '0.3'),
                  pointerEvents: 'none',
                }} />
              ))}

              {/* RECOMMENDED badge — inside card, no bleeding */}
              {t.apex && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  background: `linear-gradient(90deg, ${pal.mid}, ${pal.accent.replace('0.95', '0.15')}, ${pal.mid})`,
                  borderBottom: `1px solid ${pal.border}`,
                  width: '100%',
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

              {/* Card content */}
              <div style={{
                position: 'relative', zIndex: 2,
                padding: t.apex ? '44px 24px 28px' : '28px 24px',
              }}>
                {/* Counter */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)',
                  marginBottom: 16,
                }}>
                  {i + 1} / {TIERS.length}
                </div>

                {/* Big numeral */}
                <div style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: numeral, color: pal.accent, fontWeight: 500, lineHeight: 1,
                  filter: `drop-shadow(0 2px 16px ${pal.glow})`,
                }}>
                  {t.n}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: 'var(--font-krs)', fontWeight: 600, fontSize: 18,
                  marginTop: 12, color: 'rgba(255,255,255,0.92)',
                }}>
                  {t.ko}
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12,
                  color: 'rgba(255,255,255,0.4)', marginBottom: 24,
                }}>
                  {t.en}
                </div>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: `linear-gradient(90deg, ${pal.border}, transparent)`,
                  marginBottom: 20,
                }} />

                <Row label="MIN MONTHLY" value={t.min} accentColor={pal.accent} />
                <Row label="FOUNDERS GIFT" value={t.gift} accent emphasized={t.apex} accentColor={pal.accent} />
                <Row label="SPREAD" value={t.spread} accentColor={pal.accent} />
                <Row label="STORAGE" value={t.storage} accentColor={pal.accent} />
                <Row label="12개월 STREAK" value={t.streak12} accentColor={pal.accent} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16, paddingLeft: 4, paddingRight: 4,
      }}>
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous tier"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 18,
            color: active === 0 ? 'var(--ink-3)' : 'var(--accent)',
            opacity: active === 0 ? 0.3 : 1,
            padding: '8px 12px', minHeight: 44, minWidth: 44,
            transition: 'opacity 200ms ease',
            cursor: active === 0 ? 'default' : 'pointer',
          }}
        >←</button>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {TIERS.map((_, i) => {
            const pal = TIER_PALETTE[i];
            return (
              <button
                key={i}
                onClick={() => { setActive(i); scrollTo(i, true); }}
                aria-label={`Go to tier ${i + 1}`}
                style={{
                  width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                  background: i === active ? pal.accent : 'var(--ink-3)',
                  opacity: i === active ? 1 : 0.35, padding: 0, minHeight: 0,
                  transition: 'width 260ms cubic-bezier(0.4,0,0.2,1), background 260ms ease',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => go(1)}
          disabled={active === TIERS.length - 1}
          aria-label="Next tier"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 18,
            color: active === TIERS.length - 1 ? 'var(--ink-3)' : 'var(--accent)',
            opacity: active === TIERS.length - 1 ? 0.3 : 1,
            padding: '8px 12px', minHeight: 44, minWidth: 44,
            transition: 'opacity 200ms ease',
            cursor: active === TIERS.length - 1 ? 'default' : 'pointer',
          }}
        >→</button>
      </div>
    </div>
  );
}
