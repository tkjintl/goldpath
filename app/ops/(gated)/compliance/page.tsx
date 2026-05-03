import { getComplianceHits } from '@/lib/demo-ops';
import { OpsHeader, OpsTable, OpsTh, OpsTd, StatusPill } from '@/components/ops/Queue';

const SEVERITY_TONE: Record<string, 'critical' | 'warn' | 'info'> = {
  critical: 'critical',
  warn: 'warn',
  info: 'info',
};
const STATUS_TONE: Record<string, 'pending' | 'critical' | 'ok' | 'info'> = {
  open: 'pending',
  investigating: 'critical',
  cleared: 'ok',
  reported: 'info',
};

export default function CompliancePage() {
  const hits = getComplianceHits();
  return (
    <>
      <OpsHeader
        eyebrow="§ COMPLIANCE"
        title="규제 알림 · OFAC · KFIU · 자체 룰"
        subtitle={`${hits.filter((h) => h.status === 'open' || h.status === 'investigating').length} ACTIVE · ${hits.filter((h) => h.severity === 'critical').length} CRITICAL`}
      />
      <OpsTable>
        <thead>
          <tr>
            <OpsTh>HIT ID</OpsTh>
            <OpsTh>CUSTOMER</OpsTh>
            <OpsTh>RULE</OpsTh>
            <OpsTh>SEVERITY</OpsTh>
            <OpsTh>DESCRIPTION</OpsTh>
            <OpsTh>DETECTED</OpsTh>
            <OpsTh>STATUS</OpsTh>
            <OpsTh align="right">ACTION</OpsTh>
          </tr>
        </thead>
        <tbody>
          {hits.map((h) => (
            <tr key={h.id}>
              <OpsTd>{h.id}</OpsTd>
              <OpsTd>{h.customerInitials}</OpsTd>
              <OpsTd>{h.rule}</OpsTd>
              <OpsTd><StatusPill status={h.severity} tone={SEVERITY_TONE[h.severity]} /></OpsTd>
              <OpsTd>
                <span style={{ fontFamily: 'var(--font-kr)', fontSize: 13, color: 'var(--ink-2)' }}>{h.description}</span>
              </OpsTd>
              <OpsTd>{h.detected}</OpsTd>
              <OpsTd><StatusPill status={h.status} tone={STATUS_TONE[h.status]} /></OpsTd>
              <OpsTd align="right">
                <button disabled style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '5px 10px', opacity: 0.6 }}>
                  REVIEW
                </button>
              </OpsTd>
            </tr>
          ))}
        </tbody>
      </OpsTable>
    </>
  );
}
