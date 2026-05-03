import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '법적 고지 · GoldPath' };

export default function LegalPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="법적 고지 · LEGAL"
        title="이용약관 · 개인정보처리방침 · 공시."
        body="GoldPath은 TACC Pte. Ltd. (싱가포르) 가 제공하는 귀금속 적립 서비스입니다. 자세한 약관과 개인정보 처리는 가입 시 명시됩니다."
      />
      <Footer />
    </>
  );
}
