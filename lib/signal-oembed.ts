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

function extractTweetId(url: string): string | null {
  const m = url.match(/\/status\/(\d+)/);
  return m ? m[1] : null;
}

async function fetchTweetImage(tweetUrl: string): Promise<string | null> {
  const id = extractTweetId(tweetUrl);
  if (!id) return null;
  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en`,
      { signal: AbortSignal.timeout(5_000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const media = data.mediaDetails as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(media) || media.length === 0) return null;
    const photo = media.find((m) => m.type === 'photo') ?? media[0];
    return (photo?.media_url_https as string) ?? null;
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
  // Remove HTML tags and collapse whitespace
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
