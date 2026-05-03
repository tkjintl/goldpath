import { listSignups, getSignupCount } from '@/lib/db/store';
import type { Signup } from '@/lib/db/store';
import { OpsHeader, OpsTable, OpsTh, OpsTd } from '@/components/ops/Queue';

function fmtCreated(iso: string): string {
  // Stable, locale-neutral: YYYY-MM-DD HH:mm UTC
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(
    d.getUTCHours(),
  )}:${pad(d.getUTCMinutes())} UTC`;
}

export default async function SignupsPage() {
  const [rows, total] = await Promise.all([listSignups(100), getSignupCount()]);
  // listSignups already returns newest-first via .slice(-limit).reverse(),
  // but defensive sort for Phase 2 swap-in.
  const sorted: Signup[] = [...rows].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0,
  );

  return (
    <>
      <OpsHeader
        eyebrow="§ SIGNUPS"
        title="사전 등록 · SIGNUPS"
        subtitle={`${sorted.length} SHOWN · ${total} TOTAL · NEWEST FIRST`}
      />
      {sorted.length === 0 ? (
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
          아직 사전 등록이 없습니다.
        </div>
      ) : (
        <OpsTable>
          <thead>
            <tr>
              <OpsTh>생성 시각 · CREATED</OpsTh>
              <OpsTh>이름 · NAME</OpsTh>
              <OpsTh>이메일 · EMAIL</OpsTh>
              <OpsTh>티어 · TIER</OpsTh>
              <OpsTh>전화 · PHONE</OpsTh>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.id}>
                <OpsTd>{fmtCreated(s.createdAt)}</OpsTd>
                <OpsTd>{s.name}</OpsTd>
                <OpsTd>{s.email}</OpsTd>
                <OpsTd>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      color: 'var(--accent)',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {s.tier}
                  </span>
                </OpsTd>
                <OpsTd>{s.phoneE164 ?? '—'}</OpsTd>
              </tr>
            ))}
          </tbody>
        </OpsTable>
      )}
    </>
  );
}
