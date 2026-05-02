import { TrustPage } from '@/components/TrustPage';

export default function BankruptcyPage() {
  return (
    <TrustPage
      title="Bankruptcy posture"
      subtitle="What happens to your gold if Aurum dissolves."
      status="in-progress"
      items={[
        { label: 'Trustee', value: 'Singapore-licensed trust company (Equiom / Vistra under evaluation)' },
        { label: 'Allocation model', value: 'Per-customer segregation outside Aurum\'s estate' },
        { label: 'Successor operator', value: 'Custody contract assignable to successor; bars transfer with title' },
      ]}
      paragraphs={[
        'This is the most important page on this site. If Aurum becomes insolvent, the question is not whether a court will be sympathetic — it is whether your gold is, as a matter of structure, separated from Aurum\'s creditors. The answer for a properly-structured allocated product is yes; the answer for a poorly-structured one is no.',
        'Aurum\'s structure: customer title to specific bars sits with a Singapore-licensed trust company, not with Aurum. Aurum is the operator and beneficiary of fees, not the owner of the metal. The trust company\'s fiduciary obligation is to the customers; it is contractually independent of Aurum\'s parent and cannot be claimed by Aurum\'s creditors in an insolvency event.',
        'In a wind-down, the trustee transfers each customer\'s allocated bars either to a successor operator (preferred), to Malca-Amit direct custody under the customer\'s own name (next-best), or, if requested, ships physical to the customer. Operating-company creditors do not touch the metal.',
        'We are publishing this page first, before Phase 2 launches, because if we cannot describe the failure mode honestly, we should not be taking customer money.',
      ]}
    />
  );
}
