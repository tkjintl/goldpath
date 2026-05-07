'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Mark } from './Mark';

const links = [
  { href: '/signal', label: 'SIGNAL', live: true },
  { href: '/promo', label: 'DROP', live: true },
  { href: '/why', label: '왜 지금' },
  { href: '/how', label: '방법' },
  { href: '/tiers', label: '등급' },
  { href: '/trust', label: '트러스트' },
  { href: '/faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="gp-nav"
        data-scrolled={scrolled ? 'true' : 'false'}
        style={{
          background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(14px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(14px)',
          borderBottom: '1px solid var(--rule)',
          padding: scrolled ? '12px 28px' : '18px 28px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          transition: 'padding 220ms ease, backdrop-filter 220ms ease',
        }}
      >
        <div
          className="gp-nav-row"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="gp-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Mark size={32} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                letterSpacing: '0.18em',
                fontSize: 14,
              }}
            >
              GOLDPATH
            </span>
            <span
              data-mobile="nav-tagline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--accent-dim)',
                letterSpacing: '0.22em',
                borderLeft: '1px solid var(--rule)',
                paddingLeft: 14,
              }}
            >
              A TACC COMPANY
            </span>
          </Link>

          {/* Desktop links */}
          <div data-mobile="nav-links" style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href as any}
                style={{
                  fontFamily: l.live ? 'var(--font-mono)' : 'var(--font-kr)',
                  fontSize: l.live ? 11 : 14,
                  color: l.live ? 'var(--accent)' : 'var(--ink-2)',
                  letterSpacing: l.live ? '0.18em' : 'normal',
                  fontWeight: l.live ? 700 : 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: l.live ? 6 : 0,
                }}
              >
                {l.live && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent)',
                      animation: 'pulse 1.6s ease-in-out infinite',
                    }}
                  />
                )}
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Link
              href="/signup"
              data-mobile="nav-cta"
              className="gp-cta-primary"
              style={{
                background: 'var(--accent)',
                color: 'var(--inv-ink)',
                padding: '10px 18px',
                fontFamily: 'var(--font-kr)',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.04em',
                borderRadius: 2,
              }}
            >
              시작→
            </Link>

            {/* Hamburger — mobile only, hidden on desktop via CSS */}
            <button
              data-mobile="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: 5,
                padding: '4px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                minHeight: 'auto',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  background: 'var(--ink)',
                  transition: 'all 180ms ease',
                  transformOrigin: 'center',
                  transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  background: 'var(--ink)',
                  transition: 'opacity 180ms ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  background: 'var(--ink)',
                  transition: 'all 180ms ease',
                  transformOrigin: 'center',
                  transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer — mobile only, hidden on desktop via CSS */}
      <div
        data-mobile="nav-drawer"
        style={{
          background: 'var(--bg)',
          borderBottom: menuOpen ? '1px solid var(--rule)' : 'none',
          maxHeight: menuOpen ? 360 : 0,
          overflow: 'hidden',
          transition: 'max-height 260ms ease',
          position: 'sticky',
          top: scrolled ? 53 : 65,
          zIndex: 39,
          display: 'none',
        }}
      >
        <div
          style={{
            padding: '12px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href as any}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 0',
                borderBottom: i < links.length - 1 ? '1px solid rgba(31,26,20,0.07)' : 'none',
                fontFamily: l.live ? 'var(--font-mono)' : 'var(--font-kr)',
                fontSize: l.live ? 11 : 15,
                color: l.live ? 'var(--accent)' : 'var(--ink)',
                letterSpacing: l.live ? '0.16em' : 'normal',
                fontWeight: l.live ? 700 : 'inherit',
              }}
            >
              {l.live && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px #4ade80',
                    flexShrink: 0,
                  }}
                />
              )}
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
