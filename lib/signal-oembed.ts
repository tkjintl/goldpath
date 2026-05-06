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

  return {
    html: body.html,
    authorName: body.author_name,
    text: stripHtmlTags(body.html),
  };
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
