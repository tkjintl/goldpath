import Link from 'next/link';
import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '회사 · About · GoldPath' };

const eyebrowStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.32em',
  color: 'var(--accent)',
  marginBottom: 18,
} as const;

const h2Style = {
  fontFamily: 'var(--font-krs)',
  fontWeight: 300,
  fontSize: 'clamp(26px, 3vw, 36px)',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'var(--ink)',
  marginBottom: 18,
} as const;

const enLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.28em',
  color: 'var(--accent)',
  marginBottom: 10,
} as const;

const bodyStyle = {
  fontFamily: 'var(--font-kr)',
  fontWeight: 300,
  fontSize: 16,
  lineHeight: 1.85,
  color: 'var(--ink-2)',
  maxWidth: 720,
} as const;

const sectionWrap = {
  padding: 'clamp(40px, 5vw, 64px) clamp(16px, 4vw, 36px)',
  borderBottom: '1px solid var(--rule)',
} as const;

const inner = { maxWidth: 880, margin: '0 auto' } as const;

const dlStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(90px, auto) 1fr',
  gap: '14px 28px',
  padding: '24px 0',
  borderTop: '1px solid var(--rule)',
  borderBottom: '1px solid var(--rule)',
  marginTop: 12,
} as const;

const dtStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.22em',
  color: 'var(--accent)',
  alignSelf: 'baseline',
  paddingTop: 2,
  wordBreak: 'break-all',
} as const;

const ddStyle = {
  fontFamily: 'var(--font-kr)',
  fontSize: 14,
  color: 'var(--ink)',
  lineHeight: 1.6,
  margin: 0,
  wordBreak: 'break-word',
} as const;

export default function AboutPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section style={{ padding: 'clamp(48px, 8vw, 100px) clamp(16px, 4vw, 36px) 60px', borderBottom: '1px solid var(--rule)' }}>
        <div style={inner}>
          <div style={eyebrowStyle}>§ ABOUT · 회사</div>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: 20,
            }}
          >
            TACC Pte. Ltd.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              color: 'var(--ink-2)',
              maxWidth: 720,
              lineHeight: 1.4,
            }}
            lang="ko"
          >
            싱가포르 등록 귀금속 딜러. GoldPath의 모회사.
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="about-identity">
        <div style={inner}>
          <div style={enLabel}>I · IDENTITY</div>
          <h2 id="about-identity" style={h2Style} lang="ko">법인 정보</h2>
          <dl style={dlStyle}>
            <dt style={dtStyle}>SINGAPORE UEN</dt>
            <dd style={ddStyle} lang="ko">등록 진행 중 · bizfile.gov.sg</dd>
            <dt style={dtStyle}>등기이사</dt>
            <dd style={ddStyle} lang="ko">Phase 2 공개</dd>
            <dt style={dtStyle}>MINLAW ACD №</dt>
            <dd style={ddStyle} lang="ko">Phase 2 공개</dd>
            <dt style={dtStyle}>한국 통신판매업</dt>
            <dd style={ddStyle} lang="ko">신고 진행 중</dd>
          </dl>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="about-why-sg">
        <div style={inner}>
          <div style={enLabel}>II · WHY SINGAPORE</div>
          <h2 id="about-why-sg" style={h2Style} lang="ko">왜 싱가포르인가</h2>
          <p style={bodyStyle} lang="ko">
            싱가포르는 IPM(Investment Precious Metals)에 부가세를 면제합니다 (IRAS). MinLaw ACD가
            PSPMD법(2019)에 따라 귀금속 딜러를 등록·감독하며, FreePort는 관세·부가세가 유보되는
            자유무역지대입니다. 한국·일본 어느 한쪽으로도 기울지 않는 중립적 보관지로서, 한국 회원의
            자산을 정치·법역 리스크로부터 분리합니다.{' '}
            <Link
              href="/why-singapore"
              style={{
                color: 'var(--accent)',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
              lang="ko"
            >
              자세히
            </Link>
            .
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="about-founders">
        <div style={inner}>
          <div style={enLabel}>III · FOUNDERS</div>
          <h2 id="about-founders" style={h2Style} lang="ko">대표자</h2>
          <p style={bodyStyle} lang="ko">
            대표자 소개는 정식 가입 개시 시점에 공개됩니다.
          </p>
          <dl style={dlStyle}>
            <dt style={dtStyle}>NAME</dt>
            <dd style={ddStyle} lang="ko">— Phase 2</dd>
            <dt style={dtStyle}>ROLE</dt>
            <dd style={ddStyle} lang="ko">— Phase 2</dd>
            <dt style={dtStyle}>PRIOR</dt>
            <dd style={ddStyle} lang="ko">— Phase 2</dd>
          </dl>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="about-korea">
        <div style={inner}>
          <div style={enLabel}>IV · KOREA STATUS</div>
          <h2 id="about-korea" style={h2Style} lang="ko">한국 운영 상태</h2>
          <p style={bodyStyle} lang="ko">
            현재 사전 등록 단계입니다. 한국 자본시장법 절차 완료 후 정식 가입을 개시합니다.
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="about-contact">
        <div style={inner}>
          <div style={enLabel}>V · CONTACT</div>
          <h2 id="about-contact" style={h2Style} lang="ko">문의</h2>
          <p style={bodyStyle}>
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.18em',
                color: 'var(--accent)',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
              lang="ko"
            >
              문의 페이지로 이동 → /contact
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
