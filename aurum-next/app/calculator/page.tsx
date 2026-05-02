import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { T } from '@/lib/tokens';
import { CalculatorForm } from './CalculatorForm';

export const metadata: Metadata = {
  title: 'Calculator · Aurum',
  description:
    'Illustrative deposit projection — grams of gold accumulated at a placeholder price. Not a forecast.',
};

export default function CalculatorPage() {
  return (
    <>
      <Nav />
      <section style={{ padding: '80px 24px 40px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.gold,
              letterSpacing: '0.32em',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            §V · CALCULATOR
          </div>
          <h1
            style={{
              fontFamily: T.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 400,
              color: T.text,
              lineHeight: 1.1,
              textAlign: 'center',
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            How many grams,
            <br />
            over how many years.
          </h1>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 16,
              color: T.sub,
              lineHeight: 1.75,
              textAlign: 'center',
              maxWidth: 560,
              margin: '0 auto 12px',
              fontWeight: 400,
            }}
          >
            A simple projection. We hold gold price flat at a placeholder so you can see
            grams accumulated, not a price forecast.
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.goldD,
              letterSpacing: '0.22em',
              textAlign: 'center',
              marginTop: 18,
              marginBottom: 48,
            }}
          >
            ILLUSTRATIVE ONLY · NOT A FORECAST
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 60px' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: T.bg1,
            border: `1px solid ${T.goldBorder}`,
            padding: 'clamp(28px, 5vw, 48px)',
          }}
        >
          <CalculatorForm />
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 13,
            color: T.muted,
            lineHeight: 1.7,
          }}
        >
          Placeholder gold price: USD 2,400 / troy ounce, or roughly USD 77.16 per gram.
          We do not adjust for spread, custody fees, or price movement. Real returns
          depend on the LBMA fix at the time of each purchase, plus a small spread, and
          gold can decline as well as rise. Past performance is not predictive.
        </div>
      </section>

      <Footer />
    </>
  );
}
