import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { T } from '@/lib/tokens';
import { WaitlistForm } from './WaitlistForm';

export const metadata: Metadata = {
  title: 'Waitlist · Aurum',
  description:
    'Request access to Aurum. Closed beta for Korean diaspora residents in the US, Canada, Singapore, and Hong Kong.',
};

export default function WaitlistPage() {
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
            CLOSED BETA · MMXXVI
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
            Request access.
          </h1>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.75,
              textAlign: 'center',
              maxWidth: 560,
              margin: '0 auto 8px',
              fontWeight: 400,
            }}
          >
            We are onboarding the first hundred members. Tell us a little about who you
            are and what you are solving — we read every application personally.
          </div>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.goldD,
              letterSpacing: '0.22em',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 48,
            }}
          >
            US · CA · SG · HK · KOREAN-DIASPORA RESIDENTS
          </div>
        </div>
      </section>

      <section style={{ padding: '0 24px 100px' }}>
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            background: T.bg1,
            border: `1px solid ${T.goldBorder}`,
            padding: 'clamp(28px, 5vw, 48px)',
          }}
        >
          <WaitlistForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
