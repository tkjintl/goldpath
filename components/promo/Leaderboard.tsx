import Link from 'next/link';

type Row = { initial: string; tier: string; daysAgo: number };

const PLACEHOLDER: Row[] = [
  { initial: 'K.J.H', tier: 'I', daysAgo: 6 },
  { initial: 'C.S.M', tier: 'II', daysAgo: 7 },
  { initial: 'P.M.S', tier: 'III', daysAgo: 9 },
  { initial: 'L.D.W', tier: 'I', daysAgo: 11 },
  { initial: 'J.H.Y', tier: 'IV', daysAgo: 12 },
  { initial: 'S.B.K', tier: 'II', daysAgo: 14 },
  { initial: 'O.J.N', tier: 'III', daysAgo: 17 },
  { initial: 'H.S.J', tier: 'I', daysAgo: 19 },
];

function relTime(days: number): string {
  if (days <= 0) return '오늘';
  if (days === 1) return '어제';
  if (days < 7) return `${days}일 전`;
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  return `${Math.floor(days / 30)}개월 전`;
}

export function Leaderboard({ recentSignups }: { recentSignups: Row[] }) {
  const rows = recentSignups.length > 0 ? recentSignups : PLACEHOLDER;
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § V · 코호트 · COHORT
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 48px',
            color: 'var(--ink)',
          }}
        >
          혼자 시작하지 않습니다.
        </h2>

        <div
          style={{
            border: '1px solid var(--rule)',
            background: 'var(--bg)',
            overflowX: 'auto',
          }}
        >
          <div
            className="gp-lb-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 80px 100px 1fr',
              gap: 12,
              padding: '14px 22px',
              minWidth: 460,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'var(--ink-3)',
              borderBottom: '1px solid var(--rule)',
              background: 'color-mix(in srgb, var(--accent) 4%, var(--bg))',
            }}
          >
            <span>RANK</span>
            <span>INITIAL</span>
            <span>TIER</span>
            <span>STREAK</span>
            <span style={{ textAlign: 'right' }}>JOINED</span>
          </div>

          {rows.map((r, idx) => (
            <div
              key={idx}
              className="gp-lb-row gp-leaderboard-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 80px 100px 1fr',
                gap: 12,
                padding: '16px 22px',
                minWidth: 460,
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--ink)',
                borderBottom: '1px solid var(--rule)',
                alignItems: 'center',
              }}
            >
              <span className="gp-num" style={{ color: 'var(--ink-3)' }}>
                #{(idx + 1).toString().padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--ink)' }}>{r.initial}</span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: 'var(--accent)',
                }}
              >
                {r.tier}
              </span>
              <span className="gp-num" style={{ color: 'var(--ink-2)' }}>
                0d
              </span>
              <span
                lang="ko"
                className="gp-num"
                style={{ textAlign: 'right', color: 'var(--ink-2)' }}
              >
                {relTime(r.daysAgo)}
              </span>
            </div>
          ))}

          <Link
            href="/signup"
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 80px 100px 1fr',
              gap: 12,
              padding: '20px 22px',
              minWidth: 460,
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--ink-3)',
              alignItems: 'center',
              background: 'color-mix(in srgb, var(--accent) 6%, var(--bg))',
              textDecoration: 'none',
              transition: 'background 200ms ease, color 200ms ease',
            }}
          >
            <span>#{(rows.length + 1).toString().padStart(2, '0')}</span>
            <span lang="ko" style={{ color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              당신의 자리 →
            </span>
            <span />
            <span />
            <span style={{ textAlign: 'right', color: 'var(--accent)' }}>JOIN</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
