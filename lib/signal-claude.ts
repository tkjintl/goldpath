import Anthropic from '@anthropic-ai/sdk';
import type { SignalCategory } from './signal-store';

// ── Two-level taxonomy: L2 subcategories scoped to their L1 parent ────────────

export const CATEGORY_MAP: Record<SignalCategory, string[]> = {
  'Price Action': [
    'Spot price move',
    'KRW price',
    'SGD / USD price',
    'Technical breakout',
    'Support / resistance',
    'Premium to spot',
    'ETF price impact',
    'Futures / backwardation',
    'Seasonal pattern',
  ],
  'Geopolitics': [
    'War / conflict',
    'Trade policy / tariffs',
    'Sanctions',
    'De-dollarization',
    'Reserve currency shift',
    'US–China tensions',
    'Middle East',
    'European risk',
    'Fed / dollar policy',
    'Real interest rates',
    'Inflation / CPI',
    'Fiscal deficit',
  ],
  'Central Banks': [
    'Net purchases',
    'Reserve composition',
    'EM central bank rotation',
    'BIS / IMF signals',
    'Fed / ECB / BOJ',
    'Bank of Korea',
    'PBoC / China',
    'MAS Singapore',
  ],
  'Physical Market': [
    'Asia demand',
    'Middle East demand',
    'Western demand',
    'Jewellery demand',
    'Bar & coin retail',
    'Mine supply',
    'Recycling flows',
    'LBMA mechanics',
    'SGE mechanics',
    'KRX mechanics',
    'Physical shortage',
    'Vaulting / custody',
    'Refinery standards',
    'ETF flows',
    'COT positioning',
    'Paper vs physical divergence',
  ],
  'Portfolio Strategy': [
    'Allocation sizing',
    'Gold vs equities',
    'Gold vs bonds',
    'Gold vs crypto',
    'Inflation hedge',
    'Wealth preservation',
    'Risk-off behavior',
    'Correlation data',
  ],
  'Korea & Asia': [
    'KRW gold price',
    'KRX gold market',
    'Korean retail demand',
    'Korean institutional / pension',
    'Japan / APAC demand',
    'China SGE / PBoC',
    'Southeast Asia',
    'Hong Kong market',
  ],
};

export interface SignalContent {
  headline_en: string;
  headline_ko: string;
  summary_en: string;
  summary_ko: string;
  category: SignalCategory;
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

// Build a compact per-category subcategory reference for the prompt
const TAXONOMY_BLOCK = Object.entries(CATEGORY_MAP)
  .map(([cat, subs]) => `${cat}:\n  ${subs.join(', ')}`)
  .join('\n');

const SYSTEM_PROMPT = `You are a bilingual (English / Korean) financial editor specialising in gold markets.
Given a social-media post or news excerpt, return ONLY a JSON object — no markdown, no preamble.

JSON shape:
{
  "headline_en": "<1-line English headline, max 12 words>",
  "headline_ko": "<1-line Korean headline>",
  "summary_en": "<2-3 sentence English summary: why this matters for gold investors>",
  "summary_ko": "<2-3 sentence Korean summary: why this matters for gold investors>",
  "category": "<one L1 category>",
  "tags": ["<subcategory1>", "<subcategory2>"],
  "sentiment": "<bullish|bearish|neutral>"
}

TAXONOMY — pick one L1 category, then pick 2-3 subcategory tags ONLY from that category's list:
${TAXONOMY_BLOCK}

Rules:
- category must be exactly one of the L1 names above
- tags must be 2-3 items chosen ONLY from the subcategory list of the chosen L1 category
- sentiment: bullish/bearish/neutral relative to gold price direction
- PRIORITY RULE: if the content specifically involves Korea, Japan, China, Hong Kong, Singapore, Taiwan, Southeast Asia, or any Asian market/institution — use "Korea & Asia" even if Central Banks or another category also fits. Asian geography beats other categories.
- Return raw JSON only — no text outside the object`;

export async function generateSignalContent(
  postText: string,
  sourceUrl?: string,
  articleText?: string | null
): Promise<SignalContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const client = new Anthropic({ apiKey });

  const parts: string[] = [];
  if (sourceUrl) parts.push(`Source URL: ${sourceUrl}`);
  parts.push(`Post text:\n${postText}`);
  if (articleText) parts.push(`\nLinked article content (use this for a richer summary):\n${articleText}`);
  const userContent = parts.join('\n\n');

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userContent }],
  });

  const rawText = message.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('');

  const cleanText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanText);
  } catch {
    throw new Error(`Claude returned non-JSON: ${rawText}`);
  }

  if (!isSignalContent(parsed)) {
    throw new Error(`Claude JSON missing required fields: ${rawText}`);
  }

  return parsed;
}

function isSignalContent(v: unknown): v is SignalContent {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.headline_en === 'string' &&
    typeof o.headline_ko === 'string' &&
    typeof o.summary_en === 'string' &&
    typeof o.summary_ko === 'string' &&
    typeof o.category === 'string' &&
    Array.isArray(o.tags) &&
    (o.tags as unknown[]).every((t) => typeof t === 'string') &&
    (o.sentiment === 'bullish' || o.sentiment === 'bearish' || o.sentiment === 'neutral')
  );
}
