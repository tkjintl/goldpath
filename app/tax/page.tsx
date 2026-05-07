import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '세금 안내 · GoldPath' };

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  margin: '0 0 0.8rem',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-krs)',
  fontWeight: 300,
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  letterSpacing: '-0.01em',
  margin: '0 0 1rem',
  lineHeight: 1.2,
};

const body: React.CSSProperties = {
  fontFamily: 'var(--font-kr)',
  fontWeight: 300,
  fontSize: '0.98rem',
  lineHeight: 1.85,
  opacity: 0.85,
  margin: 0,
};

const section: React.CSSProperties = {
  borderTop: '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
  padding: '2.6rem 0',
};

const cite: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  opacity: 0.55,
  marginTop: '0.8rem',
  display: 'block',
};

export default function TaxPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
          color: 'var(--ink)',
        }}
      >
        {/* 1. Headline */}
        <header style={{ marginBottom: '3rem' }}>
          <p style={eyebrow}>§ VIII · TAX</p>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem',
            }}
          >
            세금 안내
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-kr)',
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              opacity: 0.75,
              margin: 0,
            }}
          >
            일반 안내. 세무 자문이 아닙니다.
          </p>
        </header>

        {/* 2. Disclosure first */}
        <aside
          style={{
            padding: '1.4rem 1.6rem',
            border: '1px solid color-mix(in oklab, var(--accent) 38%, transparent)',
            background: 'color-mix(in oklab, var(--accent) 5%, transparent)',
            borderRadius: 2,
            marginBottom: '2rem',
          }}
        >
          <p style={eyebrow}>DISCLOSURE · 고지</p>
          <p style={{ ...body, fontSize: '0.92rem' }}>
            이 페이지는 일반 안내이며 개별 세무 자문이 아닙니다.
            본인의 세무사 또는 관할 세무 당국에 반드시 확인하시기
            바랍니다.
          </p>
        </aside>

        {/* 3. 해외금융계좌신고 */}
        <section style={section}>
          <p style={eyebrow}>해외금융계좌신고 · FBAR(KR)</p>
          <h2 style={sectionTitle}>연중 한 시점이라도 ₩5억 초과 시.</h2>
          <p style={body}>
            한국 거주자가 연중 어느 시점이라도 해외 금융계좌(현금성
            자산 포함) 합계 ₩5억을 초과하면 다음 해 6월에 국세청에
            신고할 의무가 있습니다. GoldPath의 그램 잔고가 해외
            금융계좌 신고 대상에 해당하는지에 대해서는 외부
            회계법인과 자문이 진행 중이며, 결과는 회원 포털에
            공시됩니다.
          </p>
          <span style={cite}>출처 — 국세청 해외금융계좌 신고제도.</span>
        </section>

        {/* 4. 양도소득세 */}
        <section style={section}>
          <p style={eyebrow}>양도소득세 · CAPITAL GAINS</p>
          <h2 style={sectionTitle}>실물 금 양도.</h2>
          <p style={body}>
            현행 한국 세법상 개인이 보유한 실물 금의 양도는 일반
            양도소득세 비과세 대상에 해당합니다. 단, 사업적 거래
            또는 반복적 매매는 사업소득으로 분류될 수 있으며, 이
            경우 종합소득세 신고 의무가 발생합니다.
          </p>
          <span style={cite}>참고 — 소득세법 제94조 (양도소득의 범위).</span>
        </section>

        {/* 5. Founders Credit / Streak */}
        <section style={section}>
          <p style={eyebrow}>FOUNDERS · STREAK</p>
          <h2 style={sectionTitle}>프로모션성 적립 처리.</h2>
          <p style={body}>
            Founders Credit, 스트릭 보너스 그램, 기념바 등
            프로모션성 적립은 일반 소득으로 분류될 수 있습니다.
            첫 결제 후 회원에게 신고 안내를 별도 발송합니다.
          </p>
        </section>

        {/* 6. FATCA */}
        <section style={section}>
          <p style={eyebrow}>FATCA · 미국 시민/영주권자</p>
          <h2 style={sectionTitle}>W-9 협력.</h2>
          <p style={body}>
            미국 시민 및 영주권자는 FATCA 보고 대상입니다. GoldPath은
            회원이 W-9를 제출하는 경우 협력하며, 관련 보고 의무
            이행을 지원합니다.
          </p>
        </section>

        {/* 7. Singapore IPM */}
        <section style={section}>
          <p style={eyebrow}>SINGAPORE · IPM</p>
          <h2 style={sectionTitle}>회원 부담 SG 세금 없음.</h2>
          <p style={body}>
            싱가포르 IRAS는 IPM(Investment Precious Metal)에 대해
            부가세(GST)를 면제합니다. 회원이 직접 부담하는 싱가포르
            세금은 발생하지 않습니다.
          </p>
          <span style={cite}>출처 — IRAS e-Tax Guide, GST: Investment Precious Metals.</span>
        </section>

        {/* 8. Records */}
        <section style={section}>
          <p style={eyebrow}>RECORDS · 기록</p>
          <h2 style={sectionTitle}>회원 포털에서 다운로드.</h2>
          <p style={body}>
            매월 매입 명세, 분기 감사 결과, 인출 및 환매 기록은
            회원 포털에서 PDF로 다운로드할 수 있습니다 — 신고 시
            증빙으로 활용 가능합니다.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
