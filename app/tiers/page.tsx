import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { TierLadder } from '@/components/TierLadder';
import { Stub } from '@/components/Stub';

export const metadata = { title: '등급 · GoldPath' };

export default function TiersPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ III · 등급 · TIERS"
        title="5,000명. 그다음은 없다."
        body="브론즈에서 소브린까지. 가입 즉시 받는 파운더스 크레딧, 누적 GMV로 올라가는 등급, 매월 적립되는 그램."
      />
      <TierLadder />
      <Footer />
    </>
  );
}
