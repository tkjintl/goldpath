import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '규제 · GoldPath' };

export default function RegulatorsPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="신뢰 · REGULATORS"
        title="MinLaw · IRAS — 싱가포르 등록."
        body="현재 사전 등록(베타) 단계입니다. 정식 가입은 한국 자본시장법 신고 완료 후 개시됩니다. PSPM Act 2019 등록 (MinLaw ACD), Investment Precious Metals 면제 (IRAS), AML/CFT 의무 준수. 한국 거주자 영업은 자본시장법 절차 완료 시 개시."
      />
      <Footer />
    </>
  );
}
