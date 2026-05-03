import { redirect } from 'next/navigation';
import Link from 'next/link';
import { setSession } from '@/lib/auth';
import { Mark } from '@/components/Mark';

async function loginAction(formData: FormData) {
  'use server';
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const name = String(formData.get('name') || '').trim() || email.split('@')[0];
  if (!email || !email.includes('@')) return;
  await setSession(email, name);
  redirect('/app');
}

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--bg-2)',
          border: '1px solid var(--rule)',
          padding: '40px 36px',
        }}
      >
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Mark size={36} />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                letterSpacing: '0.18em',
                fontSize: 14,
              }}
            >
              GOLDPATH
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--accent-dim)',
                letterSpacing: '0.22em',
              }}
            >
              A TACC COMPANY
            </div>
          </div>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 36,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          로그인
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'var(--ink-3)',
            marginBottom: 32,
          }}
        >
          Sign in to your member account.
        </p>

        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Field label="이메일 · Email" name="email" type="email" required placeholder="you@domain.com" />
          <Field label="이름 · Name (optional)" name="name" type="text" placeholder="홍길동" />

          <button
            type="submit"
            style={{
              background: 'var(--accent)',
              color: 'var(--inv-ink)',
              padding: '16px 24px',
              fontFamily: 'var(--font-kr)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.06em',
              borderRadius: 2,
              marginTop: 10,
            }}
          >
            로그인 · Sign in →
          </button>
        </form>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid var(--rule)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 13,
            color: 'var(--ink-3)',
            lineHeight: 1.7,
          }}
        >
          이메일로 진행합니다. 비밀번호 없이 매직링크 — 베타 단계.
        </div>

        <div style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em' }}>
          <Link href="/" style={{ color: 'var(--accent)' }}>
            ← BACK TO GOLDPATH
          </Link>
        </div>
      </div>
    </main>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <input
        {...rest}
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--rule-strong)',
          color: 'var(--ink)',
          padding: '12px 14px',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          borderRadius: 2,
        }}
      />
    </label>
  );
}
