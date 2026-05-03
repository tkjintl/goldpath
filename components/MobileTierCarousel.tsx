'use client';

import { useEffect, useRef, useState } from 'react';
import { TIERS, type Tier } from './TierLadder';

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
          fontWeight: 500,
          color: accent ? 'var(--accent)' : 'var(--ink)',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

const NUMERALS = [36, 42, 56, 48, 52] as const;

export function MobileTierCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2); // start at index 2 (Gold · APEX)

  // Scroll to card index without animation on mount, animated on nav
  const scrollTo = (index: number, smooth: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    card.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'nearest', inline: 'center' });
  };

  // On mount jump to card III (index 2) instantly
  useEffect(() => {
    // rAF so the layout has painted before we measure
    const id = requestAnimationFrame(() => scrollTo(2, false));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep active dot in sync with scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handler = () => {
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
      const idx = Math.round(track.scrollLeft / cardWidth);
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
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' as never,
          gap: 0,
          border: '1px solid var(--ink)',
        } as React.CSSProperties}
        className="gp-carousel-track"
      >
        {TIERS.map((t: Tier, i: number) => {
          const numeral = NUMERALS[i];
          return (
            <article
              key={t.n}
              style={{
                scrollSnapAlign: 'center',
                flex: '0 0 calc(100vw - 32px)',
                minWidth: 0,
                padding: '32px 22px',
                background: t.apex
                  ? 'color-mix(in srgb, var(--accent) 8%, var(--bg))'
                  : 'var(--bg)',
                position: 'relative',
                boxShadow: t.apex
                  ? '0 -8px 32px -16px color-mix(in srgb, var(--accent) 40%, transparent), 0 24px 60px -32px color-mix(in srgb, var(--accent) 22%, transparent)'
                  : undefined,
              }}
            >
              {t.apex && (
                <div
                  aria-hidden="true"
                  className="gp-breathe"
                  style={{
                    position: 'absolute',
                    inset: -16,
                    borderRadius: 4,
                    boxShadow: '0 0 56px color-mix(in srgb, var(--accent) 30%, transparent)',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              )}
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
                    zIndex: 3,
                    whiteSpace: 'nowrap',
                  }}
                >
                  RECOMMENDED · 추천
                </div>
              )}

              {/* Tier counter */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  color: 'var(--ink-3)',
                  marginBottom: 16,
                }}
              >
                {i + 1} / {TIERS.length}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: numeral,
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
                  fontWeight: 600,
                  fontSize: 18,
                  marginTop: 14,
                  color: t.apex ? 'var(--accent)' : 'var(--ink)',
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
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        {/* Prev arrow */}
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous tier"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 18,
            color: active === 0 ? 'var(--ink-3)' : 'var(--accent)',
            opacity: active === 0 ? 0.35 : 1,
            padding: '8px 12px',
            minHeight: 44,
            minWidth: 44,
            transition: 'opacity 200ms ease, color 200ms ease',
            cursor: active === 0 ? 'default' : 'pointer',
          }}
        >
          ←
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {TIERS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); scrollTo(i, true); }}
              aria-label={`Go to tier ${i + 1}`}
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? 'var(--accent)' : 'var(--ink-3)',
                opacity: i === active ? 1 : 0.4,
                padding: 0,
                minHeight: 0,
                transition: 'width 260ms cubic-bezier(0.4,0,0.2,1), background 260ms ease, opacity 260ms ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => go(1)}
          disabled={active === TIERS.length - 1}
          aria-label="Next tier"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 18,
            color: active === TIERS.length - 1 ? 'var(--ink-3)' : 'var(--accent)',
            opacity: active === TIERS.length - 1 ? 0.35 : 1,
            padding: '8px 12px',
            minHeight: 44,
            minWidth: 44,
            transition: 'opacity 200ms ease, color 200ms ease',
            cursor: active === TIERS.length - 1 ? 'default' : 'pointer',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
