'use client';

import { useState, useMemo } from 'react';
import { SignalCard } from './SignalCard';
import type { SignalPost } from '@/lib/signal-store';

// Canonical filter pills shown in the header.
// "All" is always first; remaining map to tag values in the data.
const FILTER_PILLS = [
  { label: 'All · 전체', value: '' },
  { label: 'Macro', value: 'Macro' },
  { label: 'Central Banks', value: 'Central Banks' },
  { label: 'KRW', value: 'KRW' },
  { label: 'Geopolitics', value: 'Geopolitics' },
] as const;

type FilterValue = (typeof FILTER_PILLS)[number]['value'];

interface SignalFeedProps {
  posts: SignalPost[];
}

export function SignalFeed({ posts }: SignalFeedProps) {
  const [active, setActive] = useState<FilterValue>('');

  const visible = useMemo(() => {
    if (!active) return posts;
    return posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === active.toLowerCase())
    );
  }, [posts, active]);

  return (
    <>
      <style>{FEED_CSS}</style>

      {/* ── Filter pills ── */}
      <div className="sig-filters" role="group" aria-label="Filter by topic">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.value}
            className="sig-filter-pill"
            data-active={active === pill.value ? 'true' : 'false'}
            onClick={() => setActive(pill.value as FilterValue)}
            aria-pressed={active === pill.value}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* ── Feed ── */}
      {visible.length === 0 ? (
        <div className="sig-empty" role="status" aria-live="polite">
          <div className="sig-empty__icon" aria-hidden="true">◈</div>
          <p className="sig-empty__ko">시그널이 곧 시작됩니다</p>
          <p className="sig-empty__en">Signal launching soon.</p>
        </div>
      ) : (
        <ol className="sig-feed" aria-label="Gold market signals">
          {visible.map((post) => (
            <li key={post.id} className="sig-feed__item">
              <SignalCard post={post} />
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

const FEED_CSS = `
  /* Filter pills row */
  .sig-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-width: 680px;
    margin: 0 auto 28px;
  }
  .sig-filter-pill {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    padding: 7px 16px;
    border-radius: 999px;
    border: 1px solid var(--rule-strong, var(--rule));
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    color: var(--ink-3);
    cursor: pointer;
    transition: background 140ms, color 140ms, border-color 140ms;
    min-height: 36px; /* touch target */
    white-space: nowrap;
  }
  .sig-filter-pill:hover {
    background: color-mix(in srgb, var(--accent) 10%, var(--bg));
    color: var(--ink);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }
  .sig-filter-pill[data-active="true"] {
    background: var(--accent);
    color: var(--inv-ink, #F5EEDC);
    border-color: var(--accent);
    font-weight: 600;
  }
  .sig-filter-pill:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Feed list — semantic ol, no list styling */
  .sig-feed {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sig-feed__item {
    /* stretch card to full column width */
    display: flex;
    flex-direction: column;
  }

  /* Empty state */
  .sig-empty {
    max-width: 680px;
    margin: 0 auto;
    text-align: center;
    padding: 72px 24px;
    border: 1px dashed var(--rule-strong, var(--rule));
    border-radius: 12px;
    background: color-mix(in srgb, var(--bg) 60%, transparent);
  }
  .sig-empty__icon {
    font-size: 36px;
    color: color-mix(in srgb, var(--accent) 40%, transparent);
    margin-bottom: 20px;
    line-height: 1;
  }
  .sig-empty__ko {
    font-family: var(--font-kr);
    font-size: 18px;
    font-weight: 500;
    color: var(--ink-2);
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .sig-empty__en {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    color: var(--ink-3);
  }

  @media (max-width: 480px) {
    .sig-filters {
      gap: 6px;
      margin-bottom: 20px;
    }
    .sig-filter-pill {
      font-size: 10px;
      padding: 6px 13px;
    }
    .sig-feed {
      gap: 12px;
    }
  }
`;
