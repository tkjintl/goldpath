'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in dev console; prod telemetry will pick this up later.
    // eslint-disable-next-line no-console
    console.error('[GoldPath error.tsx]', error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--canvas)',
        color: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 28px',
      }}
    >
      <div style={{ maxWidth: 640, width: '100%', textAlign: 'left' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          § ERROR · 오류
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 4.4vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          예상치 못한 오류가 발생했습니다.
        </h1>
        <p
          style={{
            marginTop: 20,
            fontFamily: 'var(--font-krs)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--ink-2, rgba(31,26,20,0.7))',
          }}
        >
          잠시 후 다시 시도해 주세요. 문제가 지속되면{' '}
          <a
            href="mailto:hello@goldpath.kr"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            hello@goldpath.kr
          </a>
          {' '}로 알려주세요.
        </p>

        {error.digest && (
          <div
            style={{
              marginTop: 24,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-3, rgba(31,26,20,0.5))',
              letterSpacing: '0.12em',
            }}
          >
            digest: {error.digest}
          </div>
        )}

        <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--canvas)',
              background: 'var(--accent)',
              border: '1px solid var(--accent)',
              padding: '12px 22px',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              background: 'transparent',
              border: '1px solid var(--ink)',
              padding: '12px 22px',
              textDecoration: 'none',
            }}
          >
            홈으로
          </a>
        </div>
      </div>
    </main>
  );
}
