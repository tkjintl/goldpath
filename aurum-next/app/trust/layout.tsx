import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { T } from '@/lib/tokens';

const sections = [
  { href: '/trust/vault', label: 'Vault' },
  { href: '/trust/insurance', label: 'Insurance' },
  { href: '/trust/audits', label: 'Audits' },
  { href: '/trust/regulators', label: 'Regulators' },
  { href: '/trust/team', label: 'Team' },
  { href: '/trust/bankruptcy', label: 'Bankruptcy posture' },
];

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <section style={{ padding: '60px 24px 24px', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            §V · TRUST
          </div>
          <h1
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.1,
              marginBottom: 12,
              letterSpacing: '-0.01em',
            }}
          >
            Every claim, with its receipt.
          </h1>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.7,
              maxWidth: 720,
              fontWeight: 400,
            }}
          >
            We do not ask you to trust us. We ask you to read the documents we publish
            here — and to keep us honest about any gap between what we promise and what
            we hold.
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 24px' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 56,
            alignItems: 'start',
          }}
        >
          <nav style={{ position: 'sticky', top: 80 }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {sections.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href as any}
                    style={{
                      fontFamily: T.serif,
                      fontStyle: 'italic',
                      fontSize: 15,
                      color: T.sub,
                      borderLeft: `1px solid ${T.border}`,
                      paddingLeft: 12,
                      display: 'block',
                    }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>{children}</div>
        </div>
      </section>

      <Footer />
    </>
  );
}
