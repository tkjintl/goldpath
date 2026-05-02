import { notFound } from 'next/navigation';
import { readAll, type StoredEntry } from '@/lib/waitlist';
import { T } from '@/lib/tokens';

// /ops · token-gated waitlist console (Phase 1).
// Phase 2 swaps the querystring token for Clerk session auth.
// On unauthorized we render notFound() — never reveal what's behind the gate.

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

type SearchParams = Promise<{ token?: string | string[] }>;

export default async function OpsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const tokenParam = Array.isArray(sp.token) ? sp.token[0] : sp.token;
  const expected = process.env.ADMIN_TOKEN;

  if (!expected || !tokenParam || tokenParam !== expected) {
    notFound();
  }

  const all = await readAll();
  const sorted = [...all].sort((a, b) => {
    if (a.flags.highIntent !== b.flags.highIntent) {
      return a.flags.highIntent ? -1 : 1;
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  const stats = {
    total: all.length,
    eligible: all.filter((e) => e.flags.eligible).length,
    highIntent: all.filter((e) => e.flags.highIntent).length,
    heritagePrimary: all.filter((e) => e.flags.heritagePrimary).length,
    krResident: all.filter((e) => e.flags.krResident).length,
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: T.bg,
        color: T.text,
        padding: '40px 24px 80px',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <header style={{ marginBottom: 36 }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 10,
            }}
          >
            §OPS · WAITLIST CONSOLE
          </div>
          <h1
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 40,
              fontWeight: 400,
              color: T.text,
              letterSpacing: '-0.01em',
            }}
          >
            Inbound — sorted by intent.
          </h1>
        </header>

        <Stats stats={stats} />

        <Table entries={sorted} />

        {sorted.length === 0 && (
          <div
            style={{
              marginTop: 40,
              padding: 40,
              border: `1px dashed ${T.border}`,
              textAlign: 'center',
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 16,
              color: T.muted,
            }}
          >
            No entries yet.
          </div>
        )}
      </div>
    </main>
  );
}

function Stats({
  stats,
}: {
  stats: {
    total: number;
    eligible: number;
    highIntent: number;
    heritagePrimary: number;
    krResident: number;
  };
}) {
  const items: { lbl: string; val: number; tone?: 'gold' | 'red' }[] = [
    { lbl: 'TOTAL', val: stats.total },
    { lbl: 'ELIGIBLE', val: stats.eligible },
    { lbl: 'HIGH-INTENT', val: stats.highIntent, tone: 'gold' },
    { lbl: 'HERITAGE PRIMARY', val: stats.heritagePrimary, tone: 'gold' },
    { lbl: 'KR-RESIDENT', val: stats.krResident, tone: 'red' },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 0,
        border: `1px solid ${T.goldBorder}`,
        background: T.bg1,
        marginBottom: 36,
      }}
    >
      {items.map((it, i) => (
        <div
          key={it.lbl}
          style={{
            padding: '24px 22px',
            borderRight: i < items.length - 1 ? `1px solid ${T.border}` : 'none',
          }}
        >
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.goldD,
              letterSpacing: '0.24em',
              marginBottom: 10,
            }}
          >
            {it.lbl}
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 36,
              fontWeight: 500,
              color:
                it.tone === 'gold'
                  ? T.gold
                  : it.tone === 'red'
                    ? T.red
                    : T.text,
              lineHeight: 1,
            }}
          >
            {it.val}
          </div>
        </div>
      ))}
    </div>
  );
}

function Table({ entries }: { entries: StoredEntry[] }) {
  const cellStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: `1px solid ${T.border}`,
    fontFamily: T.sans,
    fontSize: 12,
    color: T.text,
    verticalAlign: 'top',
    textAlign: 'left',
  };
  const headStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: `1px solid ${T.goldBorder}`,
    fontFamily: T.mono,
    fontSize: 9,
    color: T.gold,
    letterSpacing: '0.22em',
    textAlign: 'left',
    background: T.bg1,
    position: 'sticky',
    top: 0,
  };
  return (
    <div
      style={{
        border: `1px solid ${T.goldBorder}`,
        background: T.bg1,
        overflowX: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1200 }}>
        <thead>
          <tr>
            <th style={headStyle}>CREATED</th>
            <th style={headStyle}>NAME</th>
            <th style={headStyle}>EMAIL</th>
            <th style={headStyle}>RESIDENCE</th>
            <th style={headStyle}>HERITAGE</th>
            <th style={headStyle}>INITIAL</th>
            <th style={headStyle}>MONTHLY</th>
            <th style={headStyle}>HER. INTEREST</th>
            <th style={headStyle}>MOTIVATION</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const truncated =
              e.motivation.length > 200
                ? e.motivation.slice(0, 200) + '…'
                : e.motivation;
            const rowBg = e.flags.highIntent
              ? 'rgba(197,165,114,0.04)'
              : 'transparent';
            return (
              <tr key={e.id} style={{ background: rowBg }}>
                <td style={{ ...cellStyle, fontFamily: T.mono, fontSize: 10, color: T.muted, whiteSpace: 'nowrap' }}>
                  {formatDate(e.createdAt)}
                </td>
                <td style={cellStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span>{e.fullName}</span>
                    {e.flags.highIntent && (
                      <span
                        style={{
                          fontFamily: T.mono,
                          fontSize: 8,
                          color: T.gold,
                          letterSpacing: '0.2em',
                        }}
                      >
                        HIGH-INTENT
                      </span>
                    )}
                    {e.flags.heritagePrimary && (
                      <span
                        style={{
                          fontFamily: T.mono,
                          fontSize: 8,
                          color: T.goldD,
                          letterSpacing: '0.2em',
                        }}
                      >
                        HERITAGE
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ ...cellStyle, fontFamily: T.mono, fontSize: 11 }}>
                  {e.email}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: T.mono,
                    fontSize: 11,
                    color: e.flags.krResident ? T.red : T.text,
                  }}
                >
                  {e.residence}
                </td>
                <td style={{ ...cellStyle, fontFamily: T.mono, fontSize: 11 }}>
                  {e.koreanHeritage}
                </td>
                <td style={{ ...cellStyle, fontFamily: T.mono, fontSize: 11 }}>
                  {e.initialDeposit}
                </td>
                <td style={{ ...cellStyle, fontFamily: T.mono, fontSize: 11 }}>
                  {e.monthlyContribution}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: T.mono,
                    fontSize: 11,
                    color: e.flags.heritagePrimary ? T.gold : T.text,
                  }}
                >
                  {e.heritageInterest}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    fontFamily: T.serif,
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: T.sub,
                    maxWidth: 360,
                    lineHeight: 1.55,
                    cursor: 'help',
                  }}
                  title={e.motivation}
                >
                  {truncated}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const hh = String(d.getUTCHours()).padStart(2, '0');
    const mi = String(d.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}Z`;
  } catch {
    return iso;
  }
}
