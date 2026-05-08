import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SignupForm } from './SignupForm';
import { getSignupCount } from '@/lib/db/store';

export const metadata = { title: '가입 · GoldPath' };
export const dynamic = 'force-dynamic';

export default async function SignupPage() {
  const joined = await getSignupCount();
  const remaining = 5000 - joined;

  return (
    <>
      <Ticker />
      <Nav />
      <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(16px, 4vw, 36px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.32em',
              color: 'var(--accent)',
              marginBottom: 14,
              textAlign: 'center',
            }}
          >
            파운더스 · {joined.toLocaleString()} / 5,000 · {remaining.toLocaleString()} 남음
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-krs)',
              fontWeight: 300,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            매달{' '}
            <em
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--accent)',
                fontWeight: 400,
              }}
            >
              한 그램.
            </em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'var(--ink-2)',
              textAlign: 'center',
              maxWidth: 560,
              margin: '0 auto 24px',
            }}
          >
            5분이면 끝납니다. 본인인증과 자동이체 설정은 가입 후 안내됩니다.
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(20px, 3vw, 24px) clamp(16px, 3vw, 24px) 80px' }}>
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: 'var(--bg-2)',
            border: '1px solid var(--rule)',
            padding: 'clamp(24px, 4vw, 48px)',
          }}
        >
          <SignupForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
