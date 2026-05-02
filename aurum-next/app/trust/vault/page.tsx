import { TrustPage } from '@/components/TrustPage';

export default function VaultPage() {
  return (
    <TrustPage
      title="Vault"
      subtitle="Malca-Amit Singapore Free Trade Zone."
      status="in-progress"
      statusNote="Operational details below describe the Phase 2 launch posture. Phase 1 (waitlist) holds no customer assets."
      items={[
        { label: 'Operator', value: 'Malca-Amit Global Logistics Pte. Ltd.' },
        { label: 'Facility', value: 'Singapore FreePort, Changi Airport FTZ' },
        { label: 'Allocation', value: 'Per-customer allocated via SG-licensed trustee' },
        { label: 'Bar standard', value: 'LBMA Good Delivery + accredited 1kg / 100g kinebars' },
        { label: 'Audit cadence', value: 'Brink\'s — quarterly physical reconciliation' },
      ]}
      paragraphs={[
        'Aurum customers do not own a claim against Aurum. They own bars — identified by serial number, weight, and refiner — held in segregated allocation under a Singapore-licensed trust company that sits between Aurum and Malca-Amit. If Aurum dissolves tomorrow, the bars are not part of Aurum\'s estate.',
        'Singapore was chosen for three reasons: jurisdictional separation from Korean custody (which is the actual point of the product), GST-exempt treatment of investment precious metals under IRAS rules, and the operational maturity of the Changi-adjacent FTZ corridor — Malca-Amit, Brink\'s, and Loomis all run institutional vaults within minutes of each other.',
        'We use Malca-Amit specifically because their per-customer allocation model is operationally honest. Many "allocated" gold products from other operators are pooled at the vault and segregated only on the operator\'s books — meaning the customer is, in fact, an unsecured creditor of the operator. That is not the model we run.',
      ]}
    />
  );
}
