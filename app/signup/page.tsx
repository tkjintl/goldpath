import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '가입 · GoldPath' };

export default function SignupPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="가입 · SIGN UP"
        title="5분. 신분증, 계좌 연결. 끝."
        body="휴대폰 본인인증 (KFTC) → 거주 확인 → 자금 출처 → 자동이체 설정. KYC 통과 후 첫 매입은 다음 LBMA 픽스에 실행됩니다."
        primary={{ label: '곧 공개됩니다 — 대기열 합류', href: '/' }}
      />
      <Footer />
    </>
  );
}
