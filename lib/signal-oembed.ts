// ─────────────────────────────────────────────────────────────────────────────
// signal-oembed.ts
//
// Fetches Twitter/X oEmbed data for a given post URL.
// Returns { html, authorName, text } or null if the request fails.
// ─────────────────────────────────────────────────────────────────────────────

export interface XEmbedResult {
  html: string;
  authorName: string;
  text: string;
  imageUrl: string | null;
}

export async function fetchXEmbed(url: string): Promise<XEmbedResult | null> {
  const oEmbedUrl =
    `https://publish.twitter.com/oembed` +
    `?url=${encodeURIComponent(url)}` +
    `&omit_script=false` +
    `&dnt=true`;

  let response: Response;
  try {
    response = await fetch(oEmbedUrl, {
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    // Network error or timeout — caller handles null gracefully
    return null;
  }

  if (!response.ok) return null;

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return null;
  }

  if (!isOEmbedResponse(body)) return null;

  const imageUrl = await fetchTweetImage(url);

  return {
    html: body.html,
    authorName: body.author_name,
    text: stripHtmlTags(body.html),
    imageUrl,
  };
}

function extractTweetHandle(url: string): string | null {
  const m = url.match(/(?:x|twitter)\.com\/([^/]+)\/status\//);
  return m ? m[1] : null;
}

function extractTweetId(url: string): string | null {
  const m = url.match(/\/status\/(\d+)/);
  return m ? m[1] : null;
}

async function fetchTweetImage(tweetUrl: string): Promise<string | null> {
  const handle = extractTweetHandle(tweetUrl);
  const id = extractTweetId(tweetUrl);
  if (!handle || !id) return null;
  try {
    const res = await fetch(
      `https://api.fxtwitter.com/${handle}/status/${id}`,
      { signal: AbortSignal.timeout(6_000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const tweet = data.tweet as Record<string, unknown> | undefined;
    const media = tweet?.media as Record<string, unknown> | undefined;
    const photos = media?.photos as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(photos) || photos.length === 0) return null;
    return (photos[0].url as string) ?? null;
  } catch {
    return null;
  }
}

// ── internal helpers ──────────────────────────────────────────────────────────

interface OEmbedResponse {
  html: string;
  author_name: string;
}

function isOEmbedResponse(v: unknown): v is OEmbedResponse {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.html === 'string' && typeof o.author_name === 'string';
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Article text extractor ────────────────────────────────────────────────────

const SKIP_URL = /https?:\/\/(www\.)?(x\.com|twitter\.com|t\.co|pic\.twitter\.com)/i;

export function extractArticleUrls(tweetText: string): string[] {
  const matches = tweetText.match(/https?:\/\/[^\s]+/g) ?? [];
  return matches.filter((u) => !SKIP_URL.test(u));
}

export async function fetchArticleText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8_000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GoldPathBot/1.0)' },
    });
    if (!res.ok) return null;

    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('html')) return null;

    const html = await res.text();

    // Extract the most content-dense block: prefer <article>, then <main>, then <body>
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    const mainMatch    = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const bodyMatch    = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const raw = articleMatch?.[1] ?? mainMatch?.[1] ?? bodyMatch?.[1] ?? html;

    // Strip scripts, styles, nav, header, footer noise
    const cleaned = raw
      .replace(/<(script|style|nav|header|footer|aside)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Cap at 4000 chars — enough for Claude to work with
    return cleaned.length > 4000 ? cleaned.slice(0, 4000) + '…' : cleaned;
  } catch {
    return null;
  }
}
