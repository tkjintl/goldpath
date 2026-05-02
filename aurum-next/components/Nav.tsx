import Link from 'next/link';
import { T } from '@/lib/tokens';
import { AUSquare } from './AUSquare';

export function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${T.border}`,
        padding: '14px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AUSquare size={28} />
          <span
            style={{
              fontFamily: T.sans,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            AURUM
          </span>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: T.goldD,
              letterSpacing: '0.22em',
              marginLeft: 4,
            }}
          >
            MMXXVI
          </span>
        </Link>

        <div
          style={{
            display: 'flex',
            gap: 28,
            alignItems: 'center',
          }}
        >
          <Link
            href="/heritage"
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 14,
              color: T.sub,
            }}
          >
            Heritage
          </Link>
          <Link
            href="/trust"
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 14,
              color: T.sub,
            }}
          >
            Trust
          </Link>
          <Link
            href="/waitlist"
            style={{
              fontFamily: T.sans,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: T.bg,
              background: T.gold,
              padding: '10px 18px',
              borderRadius: 2,
            }}
          >
            JOIN WAITLIST →
          </Link>
        </div>
      </div>
    </nav>
  );
}
