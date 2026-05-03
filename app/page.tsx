import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { WhyStrip } from '@/components/WhyStrip';
import { Mechanism } from '@/components/Mechanism';
import { TierLadder } from '@/components/TierLadder';
import { EndCTA } from '@/components/EndCTA';
import { Footer } from '@/components/Footer';

export default async function HomePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Hero />
      <WhyStrip />
      <Mechanism />
      <TierLadder />
      <EndCTA />
      <Footer />
    </>
  );
}
