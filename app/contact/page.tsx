import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '문의 · GoldPath' };

export default function ContactPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="문의 · CONTACT"
        title="천천히, 정중하게 답합니다."
        body="hello@goldpath.example 또는 카카오 채널. 영업 시간 한국 시간 09:00–18:00. 회원 문의는 대시보드 내 메시지 시스템으로 우선 처리됩니다."
      />
      <Footer />
    </>
  );
}
