import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getPriceSnapshot } from '@/lib/pricing';
import { Calculator } from './Calculator';

export const metadata = { title: '계산기 · Calculator · GoldPath' };

export default async function CalculatorPage() {
  const snapshot = await getPriceSnapshot();

  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
          color: 'var(--ink)',
        }}
      >
        <section style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              color: 'var(--accent)',
              margin: '0 0 1.2rem',
              textTransform: 'uppercase',
            }}
          >
            § VII · 계산기 · CALCULATOR
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem',
              color: 'var(--ink)',
            }}
          >
            매달 얼마.
            <br />
            <em
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--accent)',
                fontWeight: 400,
              }}
            >
              몇 년 뒤 얼마.
            </em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-krs)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              maxWidth: 620,
              margin: '0 0 2.4rem',
            }}
          >
            월 자동이체 금액과 기간을 움직여 보세요. 누적 그램과 명목 가치가 즉시 계산됩니다.
            예시 계산이며, 가격 예측이 아닙니다.
          </p>
        </section>

        <Calculator initialSnapshot={snapshot} />
      </main>
      <Footer />
    </>
  );
}
