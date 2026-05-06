// ─────────────────────────────────────────────────────────────────────────────
// signal-claude.ts
//
// Calls Claude (Haiku) to generate bilingual headline, summary, tags, and
// sentiment from raw post text.  Returns structured JSON only.
// ─────────────────────────────────────────────────────────────────────────────

import Anthropic from '@anthropic-ai/sdk';

const ALLOWED_TAGS = [
  'Macro',
  'Central Banks',
  'KRW',
  'Geopolitics',
  'Demand',
  'Supply',
  'ETF',
  'Fed',
  'Korea',
  'China',
  'Inflation',
] as const;

export interface SignalContent {
  headline_en: string;
  headline_ko: string;
  summary_en: string;
  summary_ko: string;
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

const SYSTEM_PROMPT = `You are a bilingual (English / Korean) financial editor specialising in gold markets.
Given a social-media post or news excerpt, return ONLY a JSON object — no markdown fences, no preamble, no trailing text.

JSON shape:
{
  "headline_en": "<1-line English headline>",
  "headline_ko": "<1-line Korean headline>",
  "summary_en": "<2-3 sentence English summary explaining why this matters for gold investors>",
  "summary_ko": "<2-3 sentence Korean summary explaining why this matters for gold investors>",
  "tags": ["<tag1>", "<tag2>"],
  "sentiment": "<bullish|bearish|neutral>"
}

Rules:
- tags must be 2-4 items chosen ONLY from this list: ${ALLOWED_TAGS.join(', ')}
- sentiment must be exactly one of: bullish, bearish, neutral — relative to gold price direction
- Do NOT include any text outside the JSON object`;

export async function generateSignalContent(
  postText: string,
  sourceUrl?: string
): Promise<SignalContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  const client = new Anthropic({ apiKey });

  const userContent = sourceUrl
    ? `Source URL: ${sourceUrl}\n\nPost text:\n${postText}`
    : `Post text:\n${postText}`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userContent }],
  });

  const rawText = message.content
    .filter((block) => block.type === 'text')
    .map((block) => (block as { type: 'text'; text: string }).text)
    .join('');

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error(`Claude returned non-JSON response: ${rawText}`);
  }

  if (!isSignalContent(parsed)) {
    throw new Error(`Claude JSON missing required fields: ${rawText}`);
  }

  return parsed;
}

// ── type guard ────────────────────────────────────────────────────────────────

function isSignalContent(v: unknown): v is SignalContent {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.headline_en === 'string' &&
    typeof o.headline_ko === 'string' &&
    typeof o.summary_en === 'string' &&
    typeof o.summary_ko === 'string' &&
    Array.isArray(o.tags) &&
    (o.tags as unknown[]).every((t) => typeof t === 'string') &&
    (o.sentiment === 'bullish' || o.sentiment === 'bearish' || o.sentiment === 'neutral')
  );
}
