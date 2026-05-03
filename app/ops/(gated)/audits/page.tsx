import { OpsHeader } from '@/components/ops/Queue';

export default function AuditsPage() {
  const docs = [
    { quarter: '2026 Q1', auditor: "Brink's Singapore", status: 'pending_upload', date: '2026-04-30 (DUE)' },
    { quarter: '2025 Q4', auditor: "Brink's Singapore", status: 'published', date: '2026-01-22' },
    { quarter: '2025 Q3', auditor: "Brink's Singapore", status: 'published', date: '2025-10-18' },
    { quarter: '2025 Q2', auditor: "Brink's Singapore", status: 'published', date: '2025-07-21' },
  ];

  return (
    <>
      <OpsHeader
        eyebrow="§ AUDITS"
        title="감사 보고서 발행"
        subtitle="UPLOAD BRINK'S PDF → PUBLISH TO ALL CUSTOMER STATEMENTS + PUBLIC /AUDITS PAGE"
      />

      <section style={{ background: 'var(--bg-2)', border: '1px solid var(--accent)', padding: 24, marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 12 }}>
          UPLOAD NEW AUDIT
        </div>
        <div style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 16 }}>
          Brink's가 발행한 PDF를 업로드하면 자동으로 (a) 전 회원 명세서에 첨부, (b) 공개 /audits 페이지에 발행, (c) 분기 변경 알림을 회원에게 발송합니다.
        </div>
        <button
          disabled
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            background: 'var(--accent)',
            color: 'var(--inv-ink)',
            padding: '12px 18px',
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
        >
          PHASE 2 · UPLOAD PDF →
        </button>
      </section>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--rule-strong)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <thead>
            <tr style={{ background: 'var(--bg-2)' }}>
              <Th>QUARTER</Th>
              <Th>AUDITOR</Th>
              <Th>DATE</Th>
              <Th>STATUS</Th>
              <Th align="right">ACTION</Th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.quarter} style={{ borderBottom: '1px dashed var(--rule)' }}>
                <Td>{d.quarter}</Td>
                <Td>{d.auditor}</Td>
                <Td>{d.date}</Td>
                <Td>
                  <span style={{
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    color: d.status === 'published' ? 'var(--green)' : 'var(--accent-dim)',
                  }}>
                    {d.status.replace('_', ' ').toUpperCase()}
                  </span>
                </Td>
                <Td align="right">
                  <button disabled style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', opacity: 0.6 }}>
                    {d.status === 'pending_upload' ? 'UPLOAD' : 'VIEW'}
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <th style={{ textAlign: align, padding: '12px 14px', borderBottom: '1px solid var(--rule-strong)', fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>{children}</th>;
}
function Td({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <td style={{ textAlign: align, padding: '12px 14px', color: 'var(--ink)' }}>{children}</td>;
}
