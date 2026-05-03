import { redirect } from 'next/navigation';
import Link from 'next/link';
import { setAdminCookie } from '@/lib/admin';
import { Mark } from '@/components/Mark';

async function loginAction(formData: FormData) {
  'use server';
  const token = String(formData.get('token') || '');
  const ok = await setAdminCookie(token);
  if (ok) redirect('/ops');
  redirect('/ops/login?error=1');
}

export default async function OpsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const showError = sp.error === '1';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'color-mix(in srgb, var(--inv-ink) 4%, var(--inv-bg))',
          border: '1px solid color-mix(in srgb, var(--inv-ink) 18%, transparent)',
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
              GOLDPATH OPS
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--inv-accent)',
                letterSpacing: '0.22em',
              }}
            >
              INTERNAL ONLY · MMXXVI
            </div>
          </div>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 32,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: 8,
          }}
        >
          Admin sign in
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 14,
            color: 'color-mix(in srgb, var(--inv-ink) 60%, transparent)',
            marginBottom: 28,
          }}
        >
          Enter the operator token to continue.
        </p>

        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                color: 'var(--inv-accent)',
                textTransform: 'uppercase',
              }}
            >
              ADMIN TOKEN
            </span>
            <input
              name="token"
              type="password"
              required
              autoFocus
              autoComplete="off"
              style={{
                background: 'var(--inv-bg)',
                border: '1px solid color-mix(in srgb, var(--inv-ink) 22%, transparent)',
                color: 'var(--inv-ink)',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '0.06em',
              }}
            />
          </label>

          {showError && (
            <div
              style={{
                background: 'color-mix(in srgb, var(--red) 16%, transparent)',
                color: 'var(--red)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                padding: '10px 14px',
                letterSpacing: '0.12em',
              }}
            >
              INVALID TOKEN OR ADMIN_TOKEN NOT CONFIGURED
            </div>
          )}

          <button
            type="submit"
            style={{
              background: 'var(--inv-accent)',
              color: 'var(--inv-bg)',
              padding: '14px 24px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.18em',
              marginTop: 10,
            }}
          >
            SIGN IN →
          </button>
        </form>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid color-mix(in srgb, var(--inv-ink) 12%, transparent)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 12,
            color: 'color-mix(in srgb, var(--inv-ink) 50%, transparent)',
            lineHeight: 1.7,
          }}
        >
          Phase 1: ADMIN_TOKEN env var. Phase 2: SSO + IP allowlist + role-based access on top of customer auth provider.
        </div>

        <div style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em' }}>
          <Link href="/" style={{ color: 'var(--inv-accent)' }}>
            ← BACK TO PUBLIC SITE
          </Link>
        </div>
      </div>
    </main>
  );
}
