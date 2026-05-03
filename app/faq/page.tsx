import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: 'FAQ · GoldPath' };

export default function FaqPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ VI · FAQ"
        title="질문은 솔직하게."
        body="금이 정말 있는지, 사기가 아닌지, 언제든 매도할 수 있는지, 5,000명이 왜 이렇게 적은지 — 회원님이 이미 의심하고 있는 모든 것."
      />
      <Footer />
    </>
  );
}
