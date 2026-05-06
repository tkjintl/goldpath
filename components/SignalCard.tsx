'use client';

import { useEffect, useState } from 'react';
import type { SignalPost } from '@/lib/signal-store';

export type { SignalPost };

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  if (hrs < 24) return `${hrs}시간 전`;
  if (days < 7) return `${days}일 전`;
  return new Date(iso).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

const CATEGORY_KO: Record<SignalPost['category'], string> = {
  'Price Action':       '가격 동향',
  'Geopolitics':        '지정학',
  'Central Banks':      '중앙은행',
  'Physical Market':    '실물 시장',
  'Portfolio Strategy': '포트폴리오',
  'Korea & Asia':       '한국·아시아',
};

const SENTIMENT: Record<SignalPost['sentiment'], { ko: string; color: string; border: string }> = {
  bullish: { ko: '강세',  color: '#15803d', border: '#16a34a' },
  bearish: { ko: '약세',  color: '#b91c1c', border: '#dc2626' },
  neutral: { ko: '중립',  color: '#92400e', border: '#A67C3F' },
};

let twitterScriptLoaded = false;

function useTwitterWidgets(hasEmbed: boolean) {
  useEffect(() => {
    if (!hasEmbed || twitterScriptLoaded) return;
    twitterScriptLoaded = true;
    const s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js';
    s.async = true;
    s.charset = 'utf-8';
    document.body.appendChild(s);
  }, [hasEmbed]);
}

export function SignalCard({ post }: { post: SignalPost }) {
  const s = SENTIMENT[post.sentiment];
  const [embedOpen, setEmbedOpen] = useState(false);
  const hasEmbed = Boolean(post.embed_html);

  useTwitterWidgets(hasEmbed && embedOpen);

  return (
    <>
      <style>{CSS}</style>
      <article
        className="sc-card"
        style={{ '--border-color': s.border } as React.CSSProperties}
      >

        {/* top meta */}
        <div className="sc-meta">
          <span className="sc-category">{CATEGORY_KO[post.category]}</span>
          {post.tags.slice(0, 2).map((t) => (
            <span key={t} className="sc-tag">{t}</span>
          ))}
          <span className="sc-sentiment" style={{ color: s.color }}>
            {s.ko}
          </span>
        </div>

        {/* Korean headline */}
        <h2 className="sc-headline">{post.headline_ko}</h2>

        {/* Korean summary */}
        <p className="sc-summary">{post.summary_ko}</p>

        {/* footer */}
        <div className="sc-footer">
          <time className="sc-time" dateTime={post.created_at}>
            {relativeTime(post.created_at)}
          </time>
          <div className="sc-actions">
            {hasEmbed && (
              <button
                className="sc-expand-btn"
                onClick={() => setEmbedOpen((v) => !v)}
                aria-expanded={embedOpen}
              >
                {embedOpen ? '접기' : '원문 보기 →'}
              </button>
            )}
            {!hasEmbed && post.source_url && (
              <a
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-source-link"
              >
                원문 보기 →
              </a>
            )}
          </div>
        </div>

        {/* embed — collapsed by default */}
        {hasEmbed && embedOpen && (
          <div className="sc-embed" dangerouslySetInnerHTML={{ __html: post.embed_html! }} />
        )}

      </article>
    </>
  );
}

const CSS = `
  .sc-card {
    position: relative;
    padding: 20px 20px 20px 28px;
    background: transparent;
    transition: background 150ms;
    border-left: 3px solid var(--border-color, var(--accent));
    margin-left: 0;
  }
  .sc-card:hover {
    background: color-mix(in srgb, var(--ink) 3%, transparent);
  }

  /* meta row */
  .sc-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
  .sc-category {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--accent);
    text-transform: uppercase;
  }
  .sc-tag {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.08em;
    color: var(--ink-3);
    background: color-mix(in srgb, var(--ink) 7%, transparent);
    padding: 2px 7px;
    border-radius: 3px;
  }
  .sc-sentiment {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    margin-left: auto;
  }

  /* headline */
  .sc-headline {
    font-family: var(--font-kr);
    font-size: clamp(17px, 2.2vw, 20px);
    font-weight: 700;
    line-height: 1.4;
    color: var(--ink);
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  /* summary */
  .sc-summary {
    font-family: var(--font-kr);
    font-size: 14px;
    line-height: 1.75;
    color: var(--ink-2);
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }

  /* footer */
  .sc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .sc-time {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--ink-3);
  }
  .sc-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sc-expand-btn {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 120ms;
  }
  .sc-expand-btn:hover { opacity: 0.75; }
  .sc-source-link {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--accent);
    transition: opacity 120ms;
  }
  .sc-source-link:hover { opacity: 0.75; }

  /* embed */
  .sc-embed {
    margin-top: 16px;
    border-radius: 6px;
    overflow: hidden;
  }
  .sc-embed iframe {
    max-width: 100% !important;
  }

  @media (max-width: 480px) {
    .sc-card {
      padding: 16px 16px 16px 20px;
    }
    .sc-headline {
      font-size: 17px;
    }
    .sc-summary {
      font-size: 13px;
    }
  }
`;
