'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Mark } from './Mark';

const links = [
  { href: '/promo', label: 'DROP', live: true },
  { href: '/why', label: '왜 지금' },
  { href: '/how', label: '방법' },
  { href: '/tiers', label: '등급' },
  { href: '/trust', label: '트러스트' },
  { href: '/faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
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
            시작 →
          </Link>
        </div>
      </div>
    </nav>
  );
}
