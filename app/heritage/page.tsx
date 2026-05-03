import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '유산 · GoldPath' };

export default function HeritagePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ V · 유산 · HERITAGE"
        title="금은 늘 가장 긴 편지였습니다."
        body="수혜자 지정, 트리거 설정, 전달일에 봉인된 증서와 함께 금이 도착합니다. 돌잡이 · 결혼 · 회갑 · 졸업 — 한국이 금과 맺어온 관계의 디지털 형식."
      />
      <Footer />
    </>
  );
}
