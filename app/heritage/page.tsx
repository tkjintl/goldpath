import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = { title: '상속과 기록 · GoldPath' };

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
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
  letterSpacing: '-0.01em',
  margin: '0 0 1rem',
  lineHeight: 1.2,
};

const body: React.CSSProperties = {
  fontFamily: 'var(--font-kr)',
  fontWeight: 300,
  fontSize: '1rem',
  lineHeight: 1.8,
  opacity: 0.85,
  margin: 0,
};

const section: React.CSSProperties = {
  borderTop: '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
  padding: '3rem 0',
};

export default function HeritagePage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
          color: 'var(--ink)',
        }}
      >
        {/* 1. Headline */}
        <header style={{ marginBottom: '4rem' }}>
          <p style={eyebrow}>§ V · HERITAGE</p>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem',
            }}
          >
            상속과 기록
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
            한국이 금과 맺어온 관계의, 디지털 형식.
          </p>
        </header>

        {/* 2. Why */}
        <section style={section}>
          <p style={eyebrow}>WHY</p>
          <h2 style={sectionTitle}>금은 시점을 기록하는 도구였습니다.</h2>
          <p style={body}>
            돌잔치 — 아이의 첫 돌. 결혼. 회갑. 졸업. 한국 가정에서
            금은 자산이기 이전에 시점을 기록하는 형식이었습니다.
            누가, 언제, 누구에게. GoldPath은 그 형식을 그대로
            이어받아 디지털 잔고와 봉인 증서로 옮깁니다.
          </p>
        </section>

        {/* 3. Mechanic */}
        <section style={section}>
          <p style={eyebrow}>MECHANIC · 작동</p>
          <h2 style={sectionTitle}>지정. 트리거. 봉인. 이전.</h2>
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 200px) 1fr',
              gap: '0.9rem 2rem',
              margin: 0,
              fontFamily: 'var(--font-kr)',
              fontWeight: 300,
              fontSize: '0.95rem',
              lineHeight: 1.75,
            }}
          >
            <dt style={{ fontFamily: 'var(--font-krs)', opacity: 0.7 }}>
              수혜자 지정
            </dt>
            <dd style={{ margin: 0, opacity: 0.85 }}>
              한 명 또는 다수의 beneficiary를 잔고에 연결합니다.
            </dd>

            <dt style={{ fontFamily: 'var(--font-krs)', opacity: 0.7 }}>
              트리거
            </dt>
            <dd style={{ margin: 0, opacity: 0.85 }}>
              날짜 · 연령 · 이벤트(결혼·졸업·사망 확인) 중 선택.
            </dd>

            <dt style={{ fontFamily: 'var(--font-krs)', opacity: 0.7 }}>
              봉인 증서
            </dt>
            <dd style={{ margin: 0, opacity: 0.85 }}>
              조건 충족 시 증서가 자동 발송됩니다 — 한국어·영문 병기,
              시리얼, 보관소 위치, 트리거 조건 명시.
            </dd>

            <dt style={{ fontFamily: 'var(--font-krs)', opacity: 0.7 }}>
              그램 이전
            </dt>
            <dd style={{ margin: 0, opacity: 0.85 }}>
              잔고가 수혜자 명의로 이전됩니다. 수혜자는 보유·환매·인출
              중 선택할 수 있습니다.
            </dd>
          </dl>
        </section>

        {/* 4. Use cases */}
        <section style={section}>
          <p style={eyebrow}>USE CASES · 사례</p>
          <h2 style={sectionTitle}>세 가지 시점.</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
            }}
          >
            <Card
              k="돌잡이"
              en="First birthday"
              text="출생 시 1g 시작 → 18세 트리거에 누적 그램 + 기념바 발송."
            />
            <Card
              k="결혼"
              en="Wedding"
              text="파트너 지정 → 결혼일 트리거에 양쪽 잔고 합산 옵션."
            />
            <Card
              k="회갑"
              en="60th"
              text="자녀가 부모를 지정 → 60세 트리거에 봉인 증서 발송."
            />
          </div>
        </section>

        {/* 5. Cert sample */}
        <section style={section}>
          <p style={eyebrow}>CERT SAMPLE · 증서</p>
          <h2 style={sectionTitle}>봉인되어 도착합니다.</h2>
          <figure
            style={{
              margin: '1.5rem 0 0',
              padding: '3.5rem 2rem',
              border: '1px solid color-mix(in oklab, var(--accent) 38%, transparent)',
              background:
                'color-mix(in oklab, var(--accent) 5%, transparent)',
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.6rem',
                margin: '0 0 0.6rem',
                color: 'var(--accent)',
              }}
            >
              봉인 증서 샘플
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                opacity: 0.65,
                margin: 0,
              }}
            >
              Phase 2 공개 예정
            </p>
            <figcaption
              style={{
                marginTop: '1.4rem',
                fontFamily: 'var(--font-kr)',
                fontWeight: 300,
                fontSize: '0.85rem',
                lineHeight: 1.7,
                opacity: 0.75,
              }}
            >
              한국어 + 영문 병기 · 시리얼 번호 · 트리거 조건 ·
              보관소 위치(Malca-Amit Singapore FreePort) 명시.
            </figcaption>
          </figure>
        </section>

        {/* 6. Pricing */}
        <section style={section}>
          <p style={eyebrow}>PRICING · 비용</p>
          <h2 style={sectionTitle}>1g.</h2>
          <p style={body}>
            엔그레이빙(각인) 비용은 그램 잔고에서 차감됩니다 — 표준
            1g. 추가 KRW 수수료 없음.
          </p>
        </section>

        {/* 7. Disclosure */}
        <section style={section}>
          <p style={eyebrow}>DISCLOSURE · 고지</p>
          <p
            style={{
              ...body,
              fontSize: '0.85rem',
              opacity: 0.65,
            }}
          >
            상속 효력은 회원의 거주국 법률을 따릅니다. GoldPath은
            법률 자문이 아닙니다. 본인의 변호사와 사전 검토를
            권장합니다.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Card({ k, en, text }: { k: string; en: string; text: string }) {
  return (
    <div
      style={{
        padding: '1.6rem 1.4rem',
        border: '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-krs)',
          fontSize: '1.1rem',
          margin: 0,
        }}
      >
        {k}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '0.85rem',
          opacity: 0.55,
          margin: 0,
        }}
      >
        {en}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-kr)',
          fontWeight: 300,
          fontSize: '0.92rem',
          lineHeight: 1.7,
          opacity: 0.85,
          margin: '0.4rem 0 0',
        }}
      >
        {text}
      </p>
    </div>
  );
}
