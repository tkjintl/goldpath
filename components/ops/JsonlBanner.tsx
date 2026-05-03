import { storageBackend } from '@/lib/db/store';

export async function JsonlBanner() {
  if (storageBackend() !== 'jsonl') return null;

  return (
    <aside
      role="status"
      style={{
        width: '100%',
        background: 'color-mix(in srgb, var(--accent) 14%, var(--bg-2))',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: '12px 28px',
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          STORAGE · JSONL · EPHEMERAL
        </span>
        <span
          lang="ko"
          style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 13,
            color: 'var(--ink-2)',
            lineHeight: 1.55,
            flex: 1,
            minWidth: 240,
          }}
        >
          현재 회원 데이터는 함수 임시 디스크에 기록됩니다. 배포 시마다 초기화됩니다. Phase 2 — DATABASE_URL 설정 시 Neon Postgres로 자동 전환.
        </span>
        <a
          href="/api/health"
          lang="ko"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--accent)',
            borderBottom: '1px solid var(--accent-dim)',
            paddingBottom: 1,
            whiteSpace: 'nowrap',
          }}
        >
          상태 확인 →
        </a>
      </div>
    </aside>
  );
}
