import Link from 'next/link';
import { Mark } from './Mark';
import { MobilePolishStyles } from './MobilePolishStyles';

export function Footer() {
  return (
    <footer
      className="gp-footer"
      style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--rule)',
        padding: '60px 28px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* watermark — pure visual signature, never interactive */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Mark size={120} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 12,
          }}
        >
          <a
            href="#main"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
          >
            위로 ↑
          </a>
        </div>

        <div
          data-mobile="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            gap: 28,
            marginBottom: 36,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Mark size={28} />
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
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 13,
                color: 'var(--ink-3)',
                lineHeight: 1.6,
              }}
            >
              조용히 쌓이고, 영원히 남는다.
            </div>
          </div>

          <FCol
            title="제품"
            links={[
              { href: '/why', label: '왜 지금' },
              { href: '/how', label: '방법' },
              { href: '/tiers', label: '등급' },
              { href: '/calculator', label: '계산기' },
            ]}
          />
          <FCol
            title="신뢰"
            links={[
              { href: '/trust', label: '트러스트' },
              { href: '/vault', label: '금고' },
              { href: '/insurance', label: '보험' },
              { href: '/audits', label: '감사' },
              { href: '/regulators', label: '규제' },
            ]}
          />
          <FCol
            title="회사"
            links={[
              { href: '/about', label: 'TACC' },
              { href: '/why-singapore', label: '왜 싱가포르' },
              { href: '/tax', label: '세금' },
              { href: '/contact', label: '문의' },
            ]}
          />
          <FCol
            title="지원"
            links={[
              { href: '/faq', label: 'FAQ' },
              { href: '/heritage', label: '유산' },
              { href: '/changelog', label: '변경 기록' },
              { href: '/legal', label: '법적 고지' },
            ]}
          />
        </div>

        <div
          data-mobile="footer-legal"
          style={{
            paddingTop: 24,
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-3)',
            letterSpacing: '0.18em',
          }}
        >
          <span>© MMXXVI TACC PTE. LTD.</span>
          <span>SGP · MinLaw PSPM 2019 · IRAS IPM</span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 13,
              letterSpacing: '0.04em',
              color: 'var(--accent-dim)',
            }}
          >
            Quietly · Forever
          </span>
        </div>
      </div>
      <MobilePolishStyles />
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--accent)',
          letterSpacing: '0.24em',
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href as any}
              style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)' }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
