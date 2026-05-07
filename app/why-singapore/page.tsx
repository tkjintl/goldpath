import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '왜 싱가포르 · Why Singapore · GoldPath' };

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

const sourceStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.18em',
  color: 'var(--ink-2)',
  marginTop: 14,
  opacity: 0.75,
} as const;

const sectionWrap = {
  padding: '64px 36px',
  borderBottom: '1px solid var(--rule)',
} as const;

const inner = { maxWidth: 880, margin: '0 auto' } as const;

export default function WhySingaporePage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section style={{ padding: '100px 36px 60px', borderBottom: '1px solid var(--rule)' }}>
        <div style={inner}>
          <div style={eyebrowStyle}>§ WHY SINGAPORE · 왜 싱가포르</div>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: 24,
            }}
          >
            <span lang="ko">왜 싱가포르?</span> · WHY SINGAPORE
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              color: 'var(--ink-2)',
              maxWidth: 640,
              lineHeight: 1.4,
            }}
            lang="ko"
          >
            세금, 감독, 중립성.
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="ws-tax">
        <div style={inner}>
          <div style={enLabel}>I · TAX</div>
          <h2 id="ws-tax" style={h2Style} lang="ko">세금</h2>
          <p style={bodyStyle} lang="ko">
            IPM(Investment Precious Metals) 부가세 면제. IRAS 고시. 한국 KRX 소매가에 자동 포함되는
            10% VAT가 발생하지 않습니다. 같은 1g, 약 18% 낮게 매입할 수 있는 구조적 이유입니다.
          </p>
          <div style={sourceStyle}>· Source: IRAS e-Tax Guide</div>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="ws-oversight">
        <div style={inner}>
          <div style={enLabel}>II · OVERSIGHT</div>
          <h2 id="ws-oversight" style={h2Style} lang="ko">감독</h2>
          <p style={bodyStyle} lang="ko">
            MinLaw ACD가 PSPMD법(2019)에 따라 모든 귀금속 딜러를 등록·감독합니다. 통상 알려진
            &lsquo;MAS 감독&rsquo;은 결제·자본시장에 한정 — 귀금속 거래는 MinLaw 관할입니다.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            <a
              href="https://acd.mlaw.gov.sg/"
              target="_blank"
              rel="noopener noreferrer"
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
              MinLaw ACD 공식 페이지
            </a>
          </p>
          <div style={sourceStyle}>· Source: Ministry of Law, Anti-Money Laundering / Countering the Financing of Terrorism Division</div>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="ws-vault">
        <div style={inner}>
          <div style={enLabel}>III · VAULT &amp; FREEPORT</div>
          <h2 id="ws-vault" style={h2Style} lang="ko">금고와 FreePort</h2>
          <p style={bodyStyle} lang="ko">
            Singapore FreePort는 관세·부가세가 유보되는 자유무역지대. Malca-Amit이 운영하는 시설을
            사용합니다.
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="ws-route">
        <div style={inner}>
          <div style={enLabel}>IV · KOREA ROUTE</div>
          <h2 id="ws-route" style={h2Style} lang="ko">한국 경로</h2>
          <p style={bodyStyle} lang="ko">
            KRW로 자동이체 → SGD 환전 → LBMA 오후 픽스 매입 → 회원 명의 배분 보관 → 인출 시 100g
            바 단위 또는 KRW 환매 (T+72h).
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="ws-meaning">
        <div style={inner}>
          <div style={enLabel}>V · WHAT THIS MEANS FOR YOU</div>
          <h2 id="ws-meaning" style={h2Style} lang="ko">회원에게 의미하는 것</h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 0',
              fontFamily: 'var(--font-kr)',
              fontSize: 16,
              lineHeight: 1.85,
              color: 'var(--ink)',
            }}
          >
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              낮은 매입가
            </li>
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative', marginTop: 8 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              자산 분리
            </li>
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative', marginTop: 8 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              환매 유동성
            </li>
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative', marginTop: 8 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              상속 도구
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
