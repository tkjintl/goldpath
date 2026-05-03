import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '감사 · GoldPath' };

export default function AuditsPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="신뢰 · AUDITS"
        title="분기별 Brink's 실물 검수."
        body="시리얼 번호, 무게, 정련소까지 일치 확인. 결과는 인장이 찍힌 PDF로 매 분기 대시보드에 업로드되며 누구나 다운로드 가능."
      />
      <Footer />
    </>
  );
}
