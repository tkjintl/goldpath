import type { Metadata } from 'next';
import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { HeroDrop } from '@/components/promo/HeroDrop';
import { CohortStrip } from '@/components/promo/CohortStrip';
import { CreditsLadder } from '@/components/promo/CreditsLadder';
import { MathCalc } from '@/components/promo/MathCalc';
import { VestingGrid } from '@/components/promo/VestingGrid';
import { ReferralBlock } from '@/components/promo/ReferralBlock';
import { TrustGrid } from '@/components/promo/TrustGrid';
import { Leaderboard } from '@/components/promo/Leaderboard';
import { ShareCardMockup } from '@/components/promo/ShareCardMockup';
import { SkepticBlock } from '@/components/promo/SkepticBlock';
import { TierUpTimeline } from '@/components/promo/TierUpTimeline';
import { PromoFAQ } from '@/components/promo/PromoFAQ';
import { PromoFinal } from '@/components/promo/PromoFinal';
import { PromoDisclosure } from '@/components/promo/PromoDisclosure';
import { getPriceSnapshot } from '@/lib/pricing';
import { getSignupCount, getRecentSignups } from '@/lib/db/store';
import { foundersDisplayCount, FOUNDERS_CAP } from '@/lib/founders';

// 30s ISR keeps the founders cap counter live without thrashing the data feeds.
export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Founders Drop · MMXXVI · GoldPath',
  description: '5,000명. 첫 그램은 우리가.',
};

export default async function PromoPage() {
  const [snapshot, signupCount, recent] = await Promise.all([
    getPriceSnapshot(),
    getSignupCount(),
    getRecentSignups(8),
  ]);
  const joined = foundersDisplayCount(signupCount);
  const cap = FOUNDERS_CAP;

  return (
    <>
      <Ticker />
      <Nav />
      <main>
        <HeroDrop joined={joined} cap={cap} snapshot={snapshot} />
        <CohortStrip joined={joined} cap={cap} />
        <section id="how">
          <CreditsLadder snapshot={snapshot} />
        </section>
        <MathCalc snapshot={snapshot} />
        <VestingGrid />
        <ReferralBlock />
        <TrustGrid />
        <Leaderboard recentSignups={recent} />
        <ShareCardMockup />
        <SkepticBlock />
        <TierUpTimeline />
        <PromoFAQ />
        <PromoFinal joined={joined} cap={cap} />
        <PromoDisclosure />
      </main>
      <Footer />
    </>
  );
}
