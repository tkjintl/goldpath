import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '계산기 · GoldPath' };

export default function CalculatorPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ VII · 계산기 · CALCULATOR"
        title="매달 얼마. 몇 년 뒤 얼마."
        body="원화 자동이체 금액과 기간을 입력하면 누적 그램과 가능 인출 시점이 계산됩니다. 일러스트레이티브 · 가격 예측 아님."
      />
      <Footer />
    </>
  );
}
