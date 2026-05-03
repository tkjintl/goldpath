import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhyStrip } from '@/components/WhyStrip';
import { Stub } from '@/components/Stub';

export const metadata = { title: '왜 지금 · GoldPath' };

export default function WhyPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ I · 왜 지금 · WHY NOW"
        title="네 개의 수치가 같은 방향을 가리키고 있습니다."
        body="김치 프리미엄, 중앙은행 매입, 원화 구매력, 금의 장기 복리 — 각각의 지렛대를 한 페이지에서 자세히 다룹니다."
      />
      <WhyStrip />
      <Footer />
    </>
  );
}
