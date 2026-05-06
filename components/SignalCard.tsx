'use client';

import { useEffect } from 'react';
import type { SignalPost } from '@/lib/signal-store';

// Re-export so the page/feed can import it from one place
export type { SignalPost };

// ─── Relative time ────────────────────────────────────────────────────────────

function relativeTime(iso: string): { en: string; ko: string } {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hrs = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1) return { en: 'just now', ko: '방금 전' };
  if (mins < 60) return { en: `${mins}m ago`, ko: `${mins}분 전` };
  if (hrs < 24) return { en: `${hrs}h ago`, ko: `${hrs}시간 전` };
  if (days < 7) return { en: `${days}d ago`, ko: `${days}일 전` };
  const date = new Date(iso);
  const label = date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  return { en: label, ko: label };
}

// ─── Sentiment config ─────────────────────────────────────────────────────────

const SENTIMENT: Record<
  SignalPost['sentiment'],
  { label: string; ko: string; color: string; bg: string }
> = {
  bullish: {
    label: 'BULLISH',
    ko: '강세',
    color: '#15803d',
    bg: 'rgba(21,128,61,0.10)',
  },
  bearish: {
    label: 'BEARISH',
    ko: '약세',
    color: '#b91c1c',
    bg: 'rgba(185,28,28,0.10)',
  },
  neutral: {
    label: 'NEUTRAL',
    ko: '중립',
    color: '#92400e',
    bg: 'rgba(146,64,14,0.10)',
  },
};

// ─── Twitter widget loader ────────────────────────────────────────────────────
// Loaded once per page when at least one card has embed_html.

let twitterScriptLoaded = false;

function useTwitterWidgets(hasEmbed: boolean) {
  useEffect(() => {
    if (!hasEmbed || twitterScriptLoaded) return;
    twitterScriptLoaded = true;
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);
  }, [hasEmbed]);
}

// ─── SignalCard ───────────────────────────────────────────────────────────────

export function SignalCard({ post }: { post: SignalPost }) {
  const sentiment = SENTIMENT[post.sentiment];
  const time = relativeTime(post.created_at);
  const hasEmbed = Boolean(post.embed_html);

  useTwitterWidgets(hasEmbed);

  return (
    <>
      <style>{CARD_CSS}</style>
      <article className="sig-card" aria-label={post.headline_en}>
        {/* ── Top row: sentiment + tags ── */}
        <div className="sig-meta-row">
          <span
            className="sig-pill sig-pill--sentiment"
            style={{ color: sentiment.color, background: sentiment.bg }}
          >
            {sentiment.label}
            <span className="sig-pill__ko">{sentiment.ko}</span>
          </span>
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="sig-pill sig-pill--tag">
              {tag}
            </span>
          ))}
        </div>

        {/* ── Headlines ── */}
        <h2 className="sig-headline-en">{post.headline_en}</h2>
        <h3 className="sig-headline-ko">{post.headline_ko}</h3>

        {/* ── Summaries ── */}
        <p className="sig-summary-en">{post.summary_en}</p>
        <p className="sig-summary-ko">{post.summary_ko}</p>

        {/* ── Divider ── */}
        <hr className="sig-rule" />

        {/* ── Embed or source link ── */}
        {hasEmbed ? (
          <div
            className="sig-embed"
            dangerouslySetInnerHTML={{ __html: post.embed_html! }}
          />
        ) : post.source_url ? (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="sig-source-link"
          >
            View source →
          </a>
        ) : null}

        {/* ── Footer row ── */}
        <div className="sig-footer">
          <time
            className="sig-timestamp"
            dateTime={post.created_at}
            title={new Date(post.created_at).toLocaleString('ko-KR')}
          >
            {time.en} · {time.ko}
          </time>
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="sig-source-footer"
            >
              Source →
            </a>
          )}
        </div>
      </article>
    </>
  );
}

// ─── Scoped styles — no globals.css touch ────────────────────────────────────

const CARD_CSS = `
  .sig-card {
    background: var(--bg);
    border: 1px solid var(--rule);
    border-radius: 10px;
    padding: clamp(18px, 4vw, 24px);
    box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    transition: box-shadow 180ms ease, transform 180ms ease;
    width: 100%;
    display: block;
  }
  .sig-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.09), 0 8px 28px rgba(0,0,0,0.07);
    transform: translateY(-1px);
  }

  /* Meta row */
  .sig-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
    align-items: center;
  }

  /* Pills */
  .sig-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    line-height: 1.4;
    white-space: nowrap;
  }
  .sig-pill--sentiment {
    font-weight: 600;
    letter-spacing: 0.16em;
  }
  .sig-pill__ko {
    font-family: var(--font-kr);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0;
    opacity: 0.8;
  }
  .sig-pill--tag {
    color: var(--ink-3);
    background: color-mix(in srgb, var(--ink) 6%, transparent);
    letter-spacing: 0.06em;
  }

  /* Headlines */
  .sig-headline-en {
    font-family: var(--font-sans);
    font-size: clamp(16px, 2.4vw, 19px);
    font-weight: 600;
    line-height: 1.35;
    color: var(--ink);
    margin-bottom: 5px;
    letter-spacing: -0.01em;
  }
  .sig-headline-ko {
    font-family: var(--font-kr);
    font-size: clamp(14px, 2vw, 16px);
    font-weight: 500;
    line-height: 1.4;
    color: var(--ink-2);
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }

  /* Summaries */
  .sig-summary-en {
    font-family: var(--font-sans);
    font-size: 13px;
    line-height: 1.65;
    color: var(--ink-3);
    margin-bottom: 6px;
  }
  .sig-summary-ko {
    font-family: var(--font-kr);
    font-size: 12px;
    line-height: 1.7;
    color: var(--ink-3);
    margin-bottom: 0;
  }

  /* Rule */
  .sig-rule {
    border: none;
    border-top: 1px solid var(--rule);
    margin: 16px 0;
  }

  /* Embed */
  .sig-embed {
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 14px;
    container-type: inline-size;
  }
  /* Prevent Twitter iframe from exceeding card width on mobile */
  .sig-embed iframe {
    max-width: 100% !important;
  }

  /* Source link (no embed fallback) */
  .sig-source-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--accent);
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
    padding-bottom: 1px;
    margin-bottom: 14px;
    transition: border-color 140ms;
  }
  .sig-source-link:hover {
    border-color: var(--accent);
  }

  /* Footer */
  .sig-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 2px;
  }
  .sig-timestamp {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-3);
    letter-spacing: 0.08em;
  }
  .sig-source-footer {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--accent);
    opacity: 0.75;
    transition: opacity 140ms;
  }
  .sig-source-footer:hover {
    opacity: 1;
  }

  @media (max-width: 480px) {
    .sig-card {
      border-radius: 8px;
    }
    .sig-headline-en {
      font-size: 16px;
    }
    .sig-headline-ko {
      font-size: 14px;
    }
  }
`;
