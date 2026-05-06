// /signal — GoldPath Signal feed
// Server component: fetches posts, renders shell.
// Filter state delegated to <SignalFeed> (client boundary).

import { SignalFeed } from '@/components/SignalFeed';
import type { SignalPost } from '@/lib/signal-store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Signal · 시그널 — GoldPath',
  description: '실시간 금 시장 인사이트 · Live Gold Market Intelligence',
};

async function fetchPosts(): Promise<SignalPost[]> {
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
      `http://localhost:${process.env.PORT ?? 3000}`;

    const res = await fetch(`${siteUrl}/api/signal/feed`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: SignalPost[] } | SignalPost[];

    // Route returns { posts: [...] }; guard both shapes for resilience
    if (Array.isArray(data)) return data;
    return data.posts ?? [];
  } catch {
    return [];
  }
}

export default async function SignalPage() {
  const posts = await fetchPosts();

  return (
    <>
      <style>{PAGE_CSS}</style>

      <div className="sig-page">
        {/* ── Page header ── */}
        <header className="sig-page-header">
          <div className="sig-page-wordmark">
            <span className="sig-page-wordmark__en">SIGNAL</span>
            <span className="sig-page-wordmark__slash"> / </span>
            <span className="sig-page-wordmark__ko">시그널</span>
          </div>
          <p className="sig-page-sub">
            실시간 금 시장 인사이트
            <span className="sig-page-sub__dot"> · </span>
            Live Gold Market Intelligence
          </p>
        </header>

        {/* ── Feed (client — manages filter state) ── */}
        <SignalFeed posts={posts} />

        {/* ── Footer ── */}
        <footer className="sig-page-footer">
          <span>Curated by GoldPath</span>
          <span className="sig-page-footer__dot"> · </span>
          <span className="sig-page-footer__ko">금패스 큐레이션</span>
        </footer>
      </div>
    </>
  );
}

const PAGE_CSS = `
  /* Page shell — scoped to .sig-page to avoid leaking to other routes */

  .sig-page {
    min-height: 100vh;
    background: var(--bg-2, #EAE0C7);
    padding: clamp(24px, 5vw, 56px) clamp(16px, 5vw, 28px) 64px;
  }

  /* Header */
  .sig-page-header {
    max-width: 680px;
    margin: 0 auto 28px;
    text-align: center;
  }
  .sig-page-wordmark {
    font-family: var(--font-mono);
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 600;
    letter-spacing: 0.22em;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .sig-page-wordmark__slash {
    color: var(--accent);
    letter-spacing: 0.12em;
  }
  .sig-page-wordmark__ko {
    font-family: var(--font-kr);
    letter-spacing: 0.08em;
    font-weight: 500;
  }
  .sig-page-sub {
    font-family: var(--font-kr);
    font-size: clamp(13px, 1.8vw, 15px);
    color: var(--ink-3);
    letter-spacing: 0.02em;
    line-height: 1.5;
  }
  .sig-page-sub__dot {
    color: var(--accent);
    opacity: 0.6;
  }

  /* Footer */
  .sig-page-footer {
    max-width: 680px;
    margin: 40px auto 0;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--ink-3);
  }
  .sig-page-footer__dot {
    color: var(--accent);
    opacity: 0.5;
  }
  .sig-page-footer__ko {
    font-family: var(--font-kr);
    letter-spacing: 0.04em;
  }

  @media (max-width: 480px) {
    .sig-page {
      padding-top: 32px;
    }
    .sig-page-header {
      margin-bottom: 20px;
    }
  }
`;
