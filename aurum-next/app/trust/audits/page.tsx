import { TrustPage } from '@/components/TrustPage';

export default function AuditsPage() {
  return (
    <TrustPage
      title="Audits"
      subtitle="Quarterly physical reconciliation by an independent third party."
      status="planned"
      statusNote="The first quarterly attestation is scheduled for the end of the quarter following Phase 2 launch. Customer dashboards link to the live PDF once published."
      items={[
        { label: 'Auditor', value: 'Brink\'s Singapore — physical bar count' },
        { label: 'Cadence', value: 'Quarterly' },
        { label: 'Method', value: 'Random sample serial verification + total weight reconciliation' },
        { label: 'Publication', value: 'Customer dashboard + /trust/audits archive' },
      ]}
      paragraphs={[
        'Each quarter, Brink\'s Singapore receives a customer-aggregated allocation report from Aurum and reconciles it against the physical bar inventory at Malca-Amit. The result is a signed attestation that the bars exist, match the serials, and weigh what Aurum says they weigh.',
        'Attestation is not a financial audit of Aurum — that is a separate annual engagement performed by a Singapore-licensed audit firm. Both sets of documents are published here when they exist.',
        'Until Phase 2 launches, this page is a placeholder. We are not pretending otherwise.',
      ]}
    />
  );
}
