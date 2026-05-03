import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '보험 · GoldPath' };

export default function InsurancePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="신뢰 · INSURANCE"
        title="Lloyd's of London 스페시 보험."
        body="볼트 정적 보관 + 운송 모두 커버. 면책 조항은 정직하게 명시. 바인더 요약은 가입 후 대시보드에서 열람 가능."
      />
      <Footer />
    </>
  );
}
