// ─────────────────────────────────────────────────────────────────────────────
// signal-store.ts
//
// Neon Postgres storage for GoldPath Signal feed posts.
// Runs CREATE TABLE IF NOT EXISTS on first use — no migration files needed.
// ─────────────────────────────────────────────────────────────────────────────

import { neon } from '@neondatabase/serverless';

// ── types ────────────────────────────────────────────────────────────────────

export type Sentiment = 'bullish' | 'bearish' | 'neutral';

// L1 primary categories — shown as feed filter pills
export const SIGNAL_CATEGORIES = [
  'Price Action',
  'Geopolitics',
  'Central Banks',
  'Physical Market',
  'Portfolio Strategy',
  'Korea & Asia',
] as const;

export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number];

export interface SignalPost {
  id: string;
  source_url: string | null;
  post_text: string | null;
  embed_html: string | null;
  image_url: string | null;
  headline_en: string;
  headline_ko: string;
  summary_en: string;
  summary_ko: string;
  category: SignalCategory;  // L1 primary category
  tags: string[];            // L2 subcategory tags
  sentiment: Sentiment;
  created_at: string;
  published: boolean;
}

export interface SignalPostInsert {
  source_url?: string | null;
  post_text?: string | null;
  embed_html?: string | null;
  image_url?: string | null;
  headline_en: string;
  headline_ko: string;
  summary_en: string;
  summary_ko: string;
  category?: SignalCategory;
  tags?: string[];
  sentiment?: Sentiment;
  published?: boolean;
}

// ── connection ────────────────────────────────────────────────────────────────

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL required for Signal feed. Set it in Vercel environment variables.'
    );
  }
  return neon(url);
}

// ── schema bootstrap ──────────────────────────────────────────────────────────

let bootstrapped = false;

async function ensureSchema(): Promise<void> {
  if (bootstrapped) return;
  const db = sql();
  // neon() returns a tagged-template function; use it directly for DDL
  await db`
    CREATE TABLE IF NOT EXISTS signal_posts (
      id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      source_url  TEXT,
      post_text   TEXT,
      embed_html  TEXT,
      headline_en TEXT        NOT NULL,
      headline_ko TEXT        NOT NULL,
      summary_en  TEXT        NOT NULL,
      summary_ko  TEXT        NOT NULL,
      category    TEXT        NOT NULL DEFAULT 'Macro Drivers',
      tags        TEXT[]      DEFAULT '{}',
      sentiment   TEXT        DEFAULT 'neutral'
                              CHECK (sentiment IN ('bullish', 'bearish', 'neutral')),
      created_at  TIMESTAMPTZ DEFAULT now(),
      published   BOOLEAN     DEFAULT true
    )
  `;
  await db`ALTER TABLE signal_posts ADD COLUMN IF NOT EXISTS image_url TEXT`;
  bootstrapped = true;
}

// ── public API ────────────────────────────────────────────────────────────────

export async function insertSignalPost(post: SignalPostInsert): Promise<SignalPost> {
  await ensureSchema();
  const db = sql();

  const rows = await db`
    INSERT INTO signal_posts (
      source_url, post_text, embed_html, image_url,
      headline_en, headline_ko,
      summary_en, summary_ko,
      category, tags, sentiment, published
    ) VALUES (
      ${post.source_url ?? null},
      ${post.post_text ?? null},
      ${post.embed_html ?? null},
      ${post.image_url ?? null},
      ${post.headline_en},
      ${post.headline_ko},
      ${post.summary_en},
      ${post.summary_ko},
      ${post.category ?? 'Macro Drivers'},
      ${post.tags ?? []},
      ${post.sentiment ?? 'neutral'},
      ${post.published ?? true}
    )
    RETURNING *
  `;

  const row = rows[0];
  if (!row) throw new Error('Insert returned no rows');
  return rowToSignalPost(row);
}

export async function getSignalFeed(limit = 20): Promise<SignalPost[]> {
  await ensureSchema();
  const db = sql();
  const safeLimit = Math.min(Math.max(1, limit), 100);

  const rows = await db`
    SELECT * FROM signal_posts
    WHERE published = true
    ORDER BY created_at DESC
    LIMIT ${safeLimit}
  `;

  return rows.map(rowToSignalPost);
}

// ── internal helpers ──────────────────────────────────────────────────────────

// neon returns plain objects; cast to known shape
function rowToSignalPost(row: Record<string, unknown>): SignalPost {
  return {
    id: row.id as string,
    source_url: (row.source_url as string | null) ?? null,
    post_text: (row.post_text as string | null) ?? null,
    embed_html: (row.embed_html as string | null) ?? null,
    image_url: (row.image_url as string | null) ?? null,
    headline_en: row.headline_en as string,
    headline_ko: row.headline_ko as string,
    summary_en: row.summary_en as string,
    summary_ko: row.summary_ko as string,
    category: ((row.category as string) ?? 'Macro Drivers') as SignalCategory,
    tags: (row.tags as string[]) ?? [],
    sentiment: (row.sentiment as Sentiment) ?? 'neutral',
    created_at:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : (row.created_at as string),
    published: row.published as boolean,
  };
}
