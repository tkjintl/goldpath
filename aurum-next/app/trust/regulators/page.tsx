import { TrustPage } from '@/components/TrustPage';

export default function RegulatorsPage() {
  return (
    <TrustPage
      title="Regulators"
      subtitle="Where Aurum operates, and where it does not."
      status="in-progress"
      items={[
        { label: 'Singapore', value: 'MinLaw ACD — PSPM Act 2019 registration (in progress)' },
        { label: 'Singapore', value: 'IRAS — Investment Precious Metals exemption' },
        { label: 'United States', value: 'State-level money transmitter posture under review (counsel-led)' },
        { label: 'Canada', value: 'FINTRAC registration scoped' },
        { label: 'Hong Kong', value: 'HKMA / SFC — under review for retail offering' },
        { label: 'South Korea', value: 'Not soliciting Korean residents — see disclosure' },
      ]}
      paragraphs={[
        'Aurum is incorporated as a Singapore private limited company and registered with the Singapore Ministry of Law\'s Anti-Money Laundering Division under the Precious Stones and Precious Metals (Prevention of Money Laundering and Terrorism Financing) Act 2019. Investment precious metals — gold of 99.5% purity or higher — are exempt from Singapore GST under IRAS rules.',
        'Aurum does not currently solicit or accept business from residents of South Korea. The Financial Investment Services and Capital Markets Act (FISA) treats foreign solicitation of recurring investment products to Korean residents as a licensed activity, and Aurum holds no Korean license. We will not market in Korean to Korean residents until a Korean partnership or licensed counterparty is in place. Korean diaspora residents abroad are unaffected.',
        'In the United States, the regulatory posture for offshore physical gold dealers is state-by-state. Counsel is mapping money transmitter, precious metals dealer, and FinCEN dealer-in-precious-metals obligations on a state-of-residence basis. Until that work concludes, we onboard from a defined list of states only.',
      ]}
    />
  );
}
