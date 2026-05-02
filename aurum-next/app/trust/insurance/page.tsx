import { TrustPage } from '@/components/TrustPage';

export default function InsurancePage() {
  return (
    <TrustPage
      title="Insurance"
      subtitle="Lloyd's of London specie cover, with the exclusions stated honestly."
      status="planned"
      statusNote="Specie placement is being scoped via Price Forbes / Lockton. Binder targets Phase 2 launch. Until then, Aurum holds no customer assets."
      items={[
        { label: 'Class', value: 'Specie — vault static + transit' },
        { label: 'Underwriter', value: 'Lloyd\'s syndicate(s) — to be named at binding' },
        { label: 'Broker', value: 'Price Forbes (proposed)' },
        { label: 'Coverage limit', value: 'Up to USD 250M per location, scaling with AUM' },
        { label: 'Deductible', value: 'USD 50K (initial — subject to syndicate terms)' },
      ]}
      paragraphs={[
        'Specie insurance covers the physical metal against theft, robbery, fire, and damage while in vault custody and in transit. It does not cover market price movement, and it does not cover Aurum\'s own balance sheet — those are different problems with different answers.',
        'Standard exclusions to be aware of: war and nuclear events, mysterious disappearance above contractual thresholds, employee infidelity unless added by endorsement, cyber theft of records (which is separately covered by our cyber liability policy). We will publish the binder summary with the actual numbers once placement closes.',
        'Lloyd\'s specie capacity tightened materially through 2025 as gold prices rose. We are budgeting 25–40 bps of insured value at MVP and 12–18 bps at scale. If we cannot bind reasonable terms, we will say so publicly and pause onboarding until we do.',
      ]}
    />
  );
}
