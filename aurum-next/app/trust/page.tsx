import Link from 'next/link';
import { T } from '@/lib/tokens';

const links = [
  { href: '/trust/vault', label: 'Vault', desc: 'Where the gold lives.' },
  { href: '/trust/insurance', label: 'Insurance', desc: "What Lloyd's covers and excludes." },
  { href: '/trust/audits', label: 'Audits', desc: "Brink's quarterly attestations." },
  { href: '/trust/regulators', label: 'Regulators', desc: 'Who oversees Aurum, and where.' },
  { href: '/trust/team', label: 'Team', desc: 'The people, the backgrounds.' },
  {
    href: '/trust/bankruptcy',
    label: 'Bankruptcy posture',
    desc: 'What happens to your gold if Aurum dissolves.',
  },
];

export default function TrustIndex() {
  return (
    <div style={{ maxWidth: 760 }}>
      <div
        style={{
          fontFamily: T.serif,
          fontSize: 16,
          color: T.sub,
          lineHeight: 1.85,
          marginBottom: 36,
        }}
      >
        Six pages. Read them in any order. Every claim on the rest of the site links
        back here.
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href as any}
              style={{
                display: 'block',
                padding: '20px 22px',
                background: T.bg1,
                border: `1px solid ${T.goldBorder}`,
              }}
            >
              <div
                style={{
                  fontFamily: T.serif,
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: T.gold,
                  marginBottom: 4,
                  fontWeight: 500,
                }}
              >
                {l.label} →
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.sub }}>{l.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
