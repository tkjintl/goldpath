import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { T } from '@/lib/tokens';

export const metadata = {
  title: 'Korean residents · Aurum',
};

export default function KoreaDisclosure() {
  return (
    <>
      <Nav />
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
            }}
          >
            FOR KOREAN RESIDENTS
          </div>
          <h1
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.15,
              marginBottom: 32,
              letterSpacing: '-0.01em',
            }}
          >
            Aurum is not currently
            <br />
            available in Korea.
          </h1>

          <div
            style={{
              display: 'grid',
              gap: 20,
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.85,
            }}
          >
            <p style={{ fontFamily: T.serifKr }}>
              현재 Aurum은 대한민국 거주자를 대상으로 영업하지 않습니다. 자본시장법상
              해외 금융투자상품의 권유는 라이선스 또는 국내 등록 업체와의 제휴를
              요구합니다. 저희는 그 절차를 마치기 전까지 한국 거주자에게 가입을
              권유하지 않습니다.
            </p>
            <p>
              We do not currently solicit, market to, or onboard residents of South
              Korea. The Financial Investment Services and Capital Markets Act treats
              foreign solicitation of recurring physical-gold investment products to
              Korean residents as a licensed activity, and Aurum does not yet hold the
              required Korean license or domestic partnership.
            </p>
            <p style={{ fontFamily: T.serifKr }}>
              한국 거주자가 아닌 해외 동포 — 미국, 캐나다, 싱가포르, 홍콩 거주자 — 는
              저희 클로즈드 베타에 신청하실 수 있습니다.
            </p>
            <p>
              If you are a Korean diaspora resident in the US, Canada, Singapore, or
              Hong Kong, you are welcome to apply. If you are a Korean resident and
              would like to be notified when Aurum becomes available in Korea, please
              email <span style={{ color: T.gold }}>kr@aurum.example</span> — we will
              keep your address on a separate, non-marketing list and write to you only
              when there is something to say.
            </p>
            <p
              style={{
                fontFamily: T.mono,
                fontSize: 12,
                color: T.muted,
                letterSpacing: '0.18em',
                paddingTop: 24,
                borderTop: `1px solid ${T.border}`,
                marginTop: 12,
              }}
            >
              FISA · 자본시장법 444조 · MMXXVI
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
