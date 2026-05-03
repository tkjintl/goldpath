import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Stub } from '@/components/Stub';

export const metadata = { title: '금고 · GoldPath' };

export default function VaultPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <Stub
        eyebrow="§ IV · 금고 · VAULT"
        title="싱가포르 Malca-Amit FTZ. 회원님 이름으로 배분 보관."
        body="MAS PSPM 2019 등록, Lloyd's 보험, Brink's 분기 감사. 라이선스된 신탁이 회원님과 GoldPath 사이에 위치하여 권리를 보장합니다."
        sections={[
          { label: '운영자', value: 'Malca-Amit Global Logistics Pte. Ltd.' },
          { label: '시설', value: 'Singapore FreePort · Changi Airport FTZ' },
          { label: '배분 모델', value: '회원별 배분 · SG-라이선스 신탁 경유' },
          { label: '바 표준', value: 'LBMA Good Delivery + 1kg / 100g 키네바' },
          { label: '감사', value: 'Brink\'s · 분기별 실물 검수' },
          { label: '보험', value: "Lloyd's of London · 정련소부터 인출까지" },
        ]}
      />
      <Footer />
    </>
  );
}
