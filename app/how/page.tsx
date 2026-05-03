import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Mechanism } from '@/components/Mechanism';
import { Stub } from '@/components/Stub';

export const metadata = { title: '방법 · GoldPath' };

export default function HowPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ II · 방법 · MECHANISM"
        title="가입에서 인출까지, 네 단계."
        body="가입 → 자동이체 → 매입 → 금고. 각 단계의 정확한 순간, 누가 무엇을 하는지, 시간이 얼마 걸리는지."
      />
      <Mechanism />
      <Footer />
    </>
  );
}
