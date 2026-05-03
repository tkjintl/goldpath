import Link from 'next/link';
import { Mark } from '@/components/Mark';
import type { Session } from '@/lib/auth';

const links: { href: string; label: string }[] = [
  { href: '/app', label: '대시보드' },
  { href: '/app/deposit', label: '적립' },
  { href: '/app/withdraw', label: '인출' },
  { href: '/app/heritage', label: '유산' },
  { href: '/app/referrals', label: '추천' },
  { href: '/app/statements', label: '명세서' },
  { href: '/app/settings', label: '설정' },
];

export function PortalNav({
  session,
  active,
}: {
  session: Session;
  active: string;
}) {
  return (
    <nav
      style={{
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--rule)',
        padding: '14px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
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
        <Link href="/app" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mark size={28} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              letterSpacing: '0.18em',
              fontSize: 13,
            }}
          >
            GOLDPATH
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--accent-dim)',
              letterSpacing: '0.22em',
              borderLeft: '1px solid var(--rule)',
              paddingLeft: 12,
            }}
          >
            MEMBER
          </span>
        </Link>

        <div
          style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <Link
                key={l.href}
                href={l.href as any}
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--ink-2)',
                  padding: '6px 12px',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-kr)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ink)',
              }}
            >
              {session.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink-3)',
                letterSpacing: '0.14em',
              }}
            >
              {session.email}
            </div>
          </div>
          <Link
            href="/logout"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-3)',
              letterSpacing: '0.14em',
              borderLeft: '1px solid var(--rule)',
              paddingLeft: 12,
            }}
          >
            로그아웃
          </Link>
        </div>
      </div>
    </nav>
  );
}
