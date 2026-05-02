import Link from 'next/link';
import { T } from '@/lib/tokens';
import { AUSquare } from './AUSquare';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${T.goldBorder}`,
        background: T.deepBlack,
        padding: '60px 24px 40px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <AUSquare size={32} />
              <span style={{ fontFamily: T.sans, fontWeight: 700, letterSpacing: '0.04em' }}>
                AURUM
              </span>
            </div>
            <div
              style={{
                fontFamily: T.serif,
                fontStyle: 'italic',
                fontSize: 13,
                color: T.goldD,
                lineHeight: 1.6,
              }}
            >
              Quietly compounds.
              <br />
              Permanently stays.
            </div>
          </div>

          <FooterCol
            title="Product"
            links={[
              { href: '/heritage', label: 'Heritage gifting' },
              { href: '/calculator', label: 'Calculator' },
              { href: '/waitlist', label: 'Waitlist' },
            ]}
          />
          <FooterCol
            title="Trust"
            links={[
              { href: '/trust/vault', label: 'Vault' },
              { href: '/trust/insurance', label: 'Insurance' },
              { href: '/trust/audits', label: 'Audits' },
              { href: '/trust/regulators', label: 'Regulators' },
              { href: '/trust/team', label: 'Team' },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { href: '/legal/terms', label: 'Terms' },
              { href: '/legal/privacy', label: 'Privacy' },
              { href: '/legal/disclosures', label: 'Disclosures' },
            ]}
          />
        </div>

        <div
          style={{
            borderTop: `1px solid ${T.border}`,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.muted,
            letterSpacing: '0.18em',
          }}
        >
          <span>© MMXXVI AURUM PTE. LTD.</span>
          <span>SINGAPORE · MAS-REGISTERED PSPM</span>
          <span style={{ color: T.goldD }}>QUIETLY · FOREVER</span>
        </div>

        <div
          style={{
            marginTop: 18,
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 11,
            color: T.muted,
            lineHeight: 1.7,
            maxWidth: 720,
          }}
        >
          Aurum is a Singapore-incorporated precious metals dealer registered with the
          Singapore Ministry of Law (Anti-Money Laundering Division) under the PSPM Act
          2019. Aurum does not solicit or accept business from residents of jurisdictions
          where such offering would require additional licensing. Korean residents:
          please see our <Link href="/disclosure-kr" style={{ color: T.gold }}>cross-border disclosure</Link>.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.gold,
          letterSpacing: '0.24em',
          marginBottom: 14,
        }}
      >
        {title.toUpperCase()}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href as any}
              style={{
                fontFamily: T.serif,
                fontSize: 13,
                color: T.sub,
                fontStyle: 'italic',
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
