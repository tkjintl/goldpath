import Link from 'next/link';
import { Mark } from './Mark';

const links = [
  { href: '/why', label: '왜 지금' },
  { href: '/how', label: '방법' },
  { href: '/tiers', label: '등급' },
  { href: '/trust', label: '트러스트' },
  { href: '/heritage', label: '유산' },
  { href: '/faq', label: 'FAQ' },
];

export function Nav() {
  return (
    <nav
      className="gp-nav"
      style={{
        background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--rule)',
        padding: '18px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
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
                fontFamily: 'var(--font-kr)',
                fontSize: 14,
                color: 'var(--ink-2)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signup"
            data-mobile="nav-cta"
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
