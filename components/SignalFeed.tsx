'use client';

import { useState, useMemo } from 'react';
import { SignalCard } from './SignalCard';
import type { SignalPost, SignalCategory } from '@/lib/signal-store';

const FILTERS: { label: string; value: SignalCategory | '' }[] = [
  { label: '전체',       value: '' },
  { label: '가격 동향',  value: 'Price Action' },
  { label: '지정학',     value: 'Geopolitics' },
  { label: '중앙은행',   value: 'Central Banks' },
  { label: '실물 시장',  value: 'Physical Market' },
  { label: '포트폴리오', value: 'Portfolio Strategy' },
  { label: '한국·아시아', value: 'Korea & Asia' },
];

export function SignalFeed({ posts }: { posts: SignalPost[] }) {
  const [active, setActive] = useState<SignalCategory | ''>('');

  const visible = useMemo(
    () => (active ? posts.filter((p) => p.category === active) : posts),
    [posts, active]
  );

  const countFor = (v: SignalCategory | '') =>
    v ? posts.filter((p) => p.category === v).length : posts.length;

  return (
    <>
      <style>{CSS}</style>

      <div className="sf-root">

        {/* ── Sidebar ── */}
        <aside className="sf-sidebar">
          <div className="sf-logo">
            <span className="sf-logo__en">SIGNAL</span>
            <span className="sf-logo__ko">시그널</span>
          </div>
          <p className="sf-tagline">실시간 금 시장 인사이트</p>

          <nav className="sf-nav" aria-label="카테고리 필터">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className="sf-nav-item"
                data-active={active === f.value ? 'true' : 'false'}
                onClick={() => setActive(f.value)}
              >
                <span className="sf-nav-item__label">{f.label}</span>
                <span className="sf-nav-item__count">{countFor(f.value)}</span>
              </button>
            ))}
          </nav>

          <div className="sf-sidebar-footer">
            GoldPath 큐레이션
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="sf-main">

          {/* mobile tab strip */}
          <div className="sf-tabs" role="group" aria-label="카테고리 필터">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className="sf-tab"
                data-active={active === f.value ? 'true' : 'false'}
                onClick={() => setActive(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* feed */}
          {visible.length === 0 ? (
            <div className="sf-empty">
              <div className="sf-empty__glyph">◈</div>
              <p className="sf-empty__text">시그널이 곧 시작됩니다</p>
            </div>
          ) : (
            <ol className="sf-feed">
              {visible.map((post) => (
                <li key={post.id}>
                  <SignalCard post={post} />
                </li>
              ))}
            </ol>
          )}
        </main>

      </div>
    </>
  );
}

const CSS = `
  /* ── Root layout ── */
  .sf-root {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: flex-start;
  }

  /* ── Sidebar ── */
  .sf-sidebar {
    width: 216px;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid var(--rule);
    padding: 44px 0 40px;
    display: flex;
    flex-direction: column;
    background: color-mix(in srgb, var(--bg) 94%, var(--ink) 6%);
  }

  .sf-logo {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 24px;
    margin-bottom: 6px;
  }
  .sf-logo__en {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: var(--accent);
  }
  .sf-logo__ko {
    font-family: var(--font-kr);
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .sf-tagline {
    font-family: var(--font-kr);
    font-size: 11px;
    color: var(--ink-3);
    padding: 0 24px;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .sf-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 12px;
    flex: 1;
  }
  .sf-nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 12px;
    border-radius: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: background 120ms, color 120ms;
    text-align: left;
  }
  .sf-nav-item__label {
    font-family: var(--font-kr);
    font-size: 14px;
    font-weight: 500;
    color: var(--ink-2);
    letter-spacing: -0.01em;
  }
  .sf-nav-item__count {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-3);
    letter-spacing: 0.06em;
  }
  .sf-nav-item:hover {
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .sf-nav-item:hover .sf-nav-item__label {
    color: var(--ink);
  }
  .sf-nav-item[data-active="true"] {
    background: color-mix(in srgb, var(--accent) 14%, transparent);
  }
  .sf-nav-item[data-active="true"] .sf-nav-item__label {
    color: var(--ink);
    font-weight: 700;
  }
  .sf-nav-item[data-active="true"] .sf-nav-item__count {
    color: var(--accent);
  }

  .sf-sidebar-footer {
    padding: 20px 24px 0;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.16em;
    color: var(--ink-3);
    opacity: 0.6;
  }

  /* ── Main ── */
  .sf-main {
    flex: 1;
    min-width: 0;
    padding: 40px clamp(24px, 4vw, 56px) 80px;
  }

  /* mobile tabs — hidden on desktop */
  .sf-tabs {
    display: none;
    overflow-x: auto;
    gap: 6px;
    padding-bottom: 20px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .sf-tabs::-webkit-scrollbar { display: none; }
  .sf-tab {
    flex-shrink: 0;
    font-family: var(--font-kr);
    font-size: 13px;
    font-weight: 500;
    padding: 7px 16px;
    border-radius: 999px;
    border: 1px solid var(--rule);
    background: transparent;
    color: var(--ink-3);
    cursor: pointer;
    white-space: nowrap;
    transition: background 120ms, color 120ms, border-color 120ms;
  }
  .sf-tab:hover {
    color: var(--ink);
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  }
  .sf-tab[data-active="true"] {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--inv-ink, #1F1A14);
    font-weight: 700;
  }

  /* feed list */
  .sf-feed {
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .sf-feed li {
    border-bottom: 1px solid var(--rule);
  }
  .sf-feed li:last-child {
    border-bottom: none;
  }

  /* empty state */
  .sf-empty {
    max-width: 480px;
    margin: 80px auto;
    text-align: center;
    padding: 56px 32px;
    border: 1px dashed color-mix(in srgb, var(--rule) 80%, transparent);
    border-radius: 12px;
  }
  .sf-empty__glyph {
    font-size: 32px;
    color: color-mix(in srgb, var(--accent) 35%, transparent);
    margin-bottom: 16px;
  }
  .sf-empty__text {
    font-family: var(--font-kr);
    font-size: 17px;
    font-weight: 500;
    color: var(--ink-2);
    letter-spacing: -0.01em;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .sf-root {
      flex-direction: column;
    }
    .sf-sidebar {
      display: none;
    }
    .sf-main {
      padding: 20px 16px 60px;
      width: 100%;
    }
    .sf-tabs {
      display: flex;
    }
    .sf-feed {
      max-width: 100%;
    }
  }
`;
