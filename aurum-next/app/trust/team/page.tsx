import { TrustPage } from '@/components/TrustPage';

export default function TeamPage() {
  return (
    <TrustPage
      title="Team"
      subtitle="Real names, real backgrounds, real LinkedIn."
      status="in-progress"
      statusNote="Founding team profiles will be published here before Phase 2 launch. Diaspora customers will Google us — we make that easy on purpose."
      paragraphs={[
        'When you wire money offshore to a new brand, the first thing you should do is type the founders\' names into a search engine. We will not hide behind a logo. Every founder, every senior hire, every advisor on this product will appear on this page with full name, prior work, and a LinkedIn link.',
        'If a member of Aurum\'s team contacts you in any capacity — DM, email, phone — and they are not listed on this page, treat the contact as fraudulent and email security@aurum.example so we can investigate.',
      ]}
    />
  );
}
