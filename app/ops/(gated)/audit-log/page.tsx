import { listAdminAudit } from '@/lib/admin-audit';
import { OpsHeader, OpsTable, OpsTh, OpsTd } from '@/components/ops/Queue';

// Auth is enforced upstream by `app/ops/(gated)/layout.tsx` via
// `requireAdmin()`. This page is a read-only listing of admin actions.

function fmtCreated(iso: string): string {
  // Stable, locale-neutral: YYYY-MM-DD HH:mm UTC
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(
    d.getUTCHours(),
  )}:${pad(d.getUTCMinutes())} UTC`;
}

function fmtMeta(meta: Record<string, unknown> | null): string {
  if (!meta) return '';
  try {
    const json = JSON.stringify(meta, null, 0);
    // Truncate aggressively — full payload should land in a detail view later.
    return json.length > 220 ? json.slice(0, 217) + '…' : json;
  } catch {
    return '[unserializable]';
  }
}

export default async function AuditLogPage() {
  const entries = await listAdminAudit(200);

  return (
    <>
      <OpsHeader
        eyebrow="§ ADMIN AUDIT"
        title="감사 로그 · ADMIN AUDIT"
        subtitle={`${entries.length} ENTRIES · NEWEST FIRST`}
      />
      {entries.length === 0 ? (
        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--rule-strong)',
            padding: '40px 24px',
            fontFamily: 'var(--font-krs)',
            fontSize: 16,
            color: 'var(--ink-2)',
            textAlign: 'center',
          }}
        >
          기록된 감사 항목이 없습니다.
        </div>
      ) : (
        <OpsTable>
          <thead>
            <tr>
              <OpsTh>시각 · TIME</OpsTh>
              <OpsTh>행위자 · ACTOR</OpsTh>
              <OpsTh>행위 · ACTION</OpsTh>
              <OpsTh>대상 · TARGET</OpsTh>
              <OpsTh>META</OpsTh>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <OpsTd>{fmtCreated(e.createdAt)}</OpsTd>
                <OpsTd>{e.actor}</OpsTd>
                <OpsTd>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      color: 'var(--accent)',
                    }}
                  >
                    {e.action}
                  </span>
                </OpsTd>
                <OpsTd>{e.target ?? '—'}</OpsTd>
                <OpsTd>
                  {e.meta ? (
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        lineHeight: 1.5,
                        color: 'var(--ink-2)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        maxWidth: 420,
                      }}
                    >
                      {fmtMeta(e.meta)}
                    </pre>
                  ) : (
                    '—'
                  )}
                </OpsTd>
              </tr>
            ))}
          </tbody>
        </OpsTable>
      )}
    </>
  );
}
