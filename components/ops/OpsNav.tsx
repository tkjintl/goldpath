import Link from 'next/link';
import { Mark } from '@/components/Mark';

const links: { href: string; label: string }[] = [
  { href: '/ops', label: 'OVERVIEW' },
  { href: '/ops/kyc', label: 'KYC' },
  { href: '/ops/settlement', label: 'SETTLEMENT' },
  { href: '/ops/withdrawals', label: 'WITHDRAWALS' },
  { href: '/ops/customers', label: 'CUSTOMERS' },
  { href: '/ops/vault', label: 'VAULT' },
  { href: '/ops/audits', label: 'AUDITS' },
  { href: '/ops/compliance', label: 'COMPLIANCE' },
  { href: '/ops/financials', label: 'FINANCIALS' },
];

export function OpsNav({ active }: { active: string }) {
  return (
    <nav
      style={{
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
        borderBottom: '1px solid color-mix(in srgb, var(--inv-ink) 12%, transparent)',
        padding: '14px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <Link href="/ops" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--inv-ink)' }}>
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
              color: 'var(--inv-accent)',
              letterSpacing: '0.22em',
              borderLeft: '1px solid color-mix(in srgb, var(--inv-ink) 18%, transparent)',
              paddingLeft: 12,
            }}
          >
            OPS · INTERNAL ONLY
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', alignItems: 'center' }}>
          {links.map((l) => {
            const isActive = active === l.href || (l.href !== '/ops' && active.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href as any}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: isActive ? 'var(--inv-accent)' : 'color-mix(in srgb, var(--inv-ink) 70%, transparent)',
                  padding: '8px 12px',
                  borderBottom: isActive ? '2px solid var(--inv-accent)' : '2px solid transparent',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/ops/logout"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'color-mix(in srgb, var(--inv-ink) 60%, transparent)',
            border: '1px solid color-mix(in srgb, var(--inv-ink) 22%, transparent)',
            padding: '6px 12px',
          }}
        >
          LOGOUT
        </Link>
      </div>
    </nav>
  );
}
