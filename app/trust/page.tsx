import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '트러스트 · GoldPath' };

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
  color: 'var(--ink-3, var(--ink-2))',
  marginTop: 12,
  opacity: 0.7,
} as const;

const sectionWrap = {
  padding: '64px 36px',
  borderBottom: '1px solid var(--rule)',
} as const;

const inner = { maxWidth: 880, margin: '0 auto' } as const;

export default function TrustPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section style={{ padding: '100px 36px 60px', borderBottom: '1px solid var(--rule)' }}>
        <div style={inner}>
          <div style={eyebrowStyle}>§ TRUST · 트러스트</div>
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
            <span lang="ko">트러스트</span> · TRUST
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
          >
            <span lang="ko">말이 아니라 증거로.</span>
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-vault">
        <div style={inner}>
          <div style={enLabel}>I · VAULT</div>
          <h2 id="trust-vault" style={h2Style} lang="ko">금고</h2>
          <p style={bodyStyle} lang="ko">
            Malca-Amit Singapore FreePort. 회원의 골드는 회원 명의로 배분 보관(allocated)되며,
            싱가포르 라이선스 신탁을 통해 GoldPath의 대차대조표로부터 분리됩니다 (bankruptcy-remote).
          </p>
          <figure
            aria-label="Malca-Amit Singapore FreePort vault"
            style={{ margin: '28px 0 0', padding: 0 }}
          >
            <div
              style={{
                background: 'var(--rule)',
                border: '1px solid var(--rule)',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.28em',
                color: 'var(--ink-2)',
                opacity: 0.8,
              }}
            >
              <span lang="ko">사진 추가 예정 — Phase 2</span>
            </div>
          </figure>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-audit">
        <div style={inner}>
          <div style={enLabel}>II · AUDIT</div>
          <h2 id="trust-audit" style={h2Style} lang="ko">감사</h2>
          <p style={bodyStyle} lang="ko">
            Brink&rsquo;s가 분기마다 실물 검수를 수행합니다. 각 보고서는 봉인된 PDF로 발행되며,
            보관 중인 모든 골드바의 시리얼이 포함됩니다.
          </p>
          <p style={{ ...bodyStyle, marginTop: 18 }}>
            <a
              href="#"
              aria-disabled="true"
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
              샘플 감사 보고서 보기 (PDF, 곧 공개)
            </a>
          </p>
          <div style={sourceStyle}>· Source: Brink&rsquo;s Singapore quarterly inventory</div>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-insurance">
        <div style={inner}>
          <div style={enLabel}>III · INSURANCE</div>
          <h2 id="trust-insurance" style={h2Style} lang="ko">보험</h2>
          <p style={bodyStyle} lang="ko">
            Lloyd&rsquo;s of London specie 바인더. 정련소 출고부터 회원 인출까지 전 구간을 커버합니다.
          </p>
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '14px 28px',
              padding: '24px 0',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
              marginTop: 24,
            }}
          >
            <dt style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)' }}>
              POLICY №
            </dt>
            <dd style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink)' }} lang="ko">
              Phase 2 공개
            </dd>
            <dt style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)' }}>
              COVER LIMIT
            </dt>
            <dd style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink)' }} lang="ko">
              Phase 2 공개
            </dd>
            <dt style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)' }}>
              UNDERWRITER
            </dt>
            <dd style={{ fontFamily: 'var(--font-kr)', fontSize: 14, color: 'var(--ink)' }}>
              Lloyd&rsquo;s of London syndicate
            </dd>
          </dl>
          <div style={sourceStyle}>· Source: Lloyd&rsquo;s specie binder</div>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-bars">
        <div style={inner}>
          <div style={enLabel}>IV · BAR LIST</div>
          <h2 id="trust-bars" style={h2Style} lang="ko">바 목록</h2>
          <p style={bodyStyle} lang="ko">
            현재 코호트 보유 골드바: 표 (시리얼 / 정련소 / 무게 / 주조일).
          </p>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: 24,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px', letterSpacing: '0.18em', color: 'var(--accent)' }}>SERIAL</th>
                <th style={{ padding: '12px 8px', letterSpacing: '0.18em', color: 'var(--accent)' }}>REFINER</th>
                <th style={{ padding: '12px 8px', letterSpacing: '0.18em', color: 'var(--accent)' }}>WEIGHT</th>
                <th style={{ padding: '12px 8px', letterSpacing: '0.18em', color: 'var(--accent)' }}>CAST</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--ink)' }}>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <td style={{ padding: '12px 8px' }}>RFB-2025-0001</td>
                <td style={{ padding: '12px 8px' }}>Argor-Heraeus</td>
                <td style={{ padding: '12px 8px' }}>1000g</td>
                <td style={{ padding: '12px 8px' }}>2025-09</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <td style={{ padding: '12px 8px' }}>RFB-2025-0002</td>
                <td style={{ padding: '12px 8px' }}>Metalor</td>
                <td style={{ padding: '12px 8px' }}>1000g</td>
                <td style={{ padding: '12px 8px' }}>2025-10</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <td style={{ padding: '12px 8px' }}>RFB-2025-0003</td>
                <td style={{ padding: '12px 8px' }}>PAMP Suisse</td>
                <td style={{ padding: '12px 8px' }}>100g</td>
                <td style={{ padding: '12px 8px' }}>2025-10</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                <td style={{ padding: '12px 8px' }}>RFB-2025-0004</td>
                <td style={{ padding: '12px 8px' }}>Valcambi</td>
                <td style={{ padding: '12px 8px' }}>100g</td>
                <td style={{ padding: '12px 8px' }}>2025-11</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 8px' }}>RFB-2025-0005</td>
                <td style={{ padding: '12px 8px' }}>Argor-Heraeus</td>
                <td style={{ padding: '12px 8px' }}>1000g</td>
                <td style={{ padding: '12px 8px' }}>2025-11</td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              color: 'var(--ink-2)',
              marginTop: 16,
              opacity: 0.8,
            }}
            lang="ko"
          >
            목록은 매분기 갱신됩니다.
          </p>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-reg">
        <div style={inner}>
          <div style={enLabel}>V · REGISTRATION</div>
          <h2 id="trust-reg" style={h2Style} lang="ko">등록</h2>
          <p style={bodyStyle} lang="ko">
            MinLaw ACD 등록번호 PM2025-XXXX (등록 진행 중). 싱가포르 법무부 산하 ACD가
            PSPMD법(2019)에 따라 모든 귀금속 딜러를 등록·감독합니다.
          </p>
          <p style={{ ...bodyStyle, marginTop: 16 }}>
            <a
              href="https://acd.mlaw.gov.sg/list-of-registered-dealers/"
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
              MinLaw 공식 명단에서 확인
            </a>
          </p>
          <div style={sourceStyle}>· Source: MinLaw Anti-Money Laundering / Countering the Financing of Terrorism Division</div>
        </div>
      </section>

      <section style={sectionWrap} aria-labelledby="trust-structure">
        <div style={inner}>
          <div style={enLabel}>VI · TRUST STRUCTURE</div>
          <h2 id="trust-structure" style={h2Style} lang="ko">신탁 구조</h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '8px 0 24px',
              fontFamily: 'var(--font-kr)',
              fontSize: 16,
              lineHeight: 1.85,
              color: 'var(--ink)',
            }}
          >
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              회원 → SG 라이선스 신탁 → Malca-Amit 금고
            </li>
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative', marginTop: 10 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              신탁이 회원과 GoldPath 사이의 법적 계층으로 작동
            </li>
            <li lang="ko" style={{ paddingLeft: 18, position: 'relative', marginTop: 10 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              실물 골드는 항상 회원 명의로 배분(allocated) 보관
            </li>
          </ul>
          <p
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: 'var(--ink)',
              borderLeft: '2px solid var(--accent)',
              paddingLeft: 18,
              lineHeight: 1.5,
            }}
            lang="ko"
          >
            회원의 그램은 GoldPath의 대차대조표에 들어가지 않습니다 (bankruptcy-remote).
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
