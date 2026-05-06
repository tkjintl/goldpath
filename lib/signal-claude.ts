// ─────────────────────────────────────────────────────────────────────────────
// signal-claude.ts
//
// Calls Claude (Haiku) to generate bilingual headline, summary, L1 category,
// L2 subcategory tags, and sentiment from raw post text.
// ─────────────────────────────────────────────────────────────────────────────

import Anthropic from '@anthropic-ai/sdk';
import type { SignalCategory } from './signal-store';

// ── Two-level taxonomy ────────────────────────────────────────────────────────

export const CATEGORY_MAP: Record<SignalCategory, string[]> = {
  'Price Action': [
    'Spot price move',
    'KRW price',
    'SGD price',
    'USD price',
    'Technical breakout',
    'Support / resistance',
    'Premium to spot',
    'Seasonal pattern',
  ],
  'Macro Drivers': [
    'Fed policy',
    'Real interest rates',
    'Dollar index',
    'Inflation / CPI',
    'Fiscal deficit',
    'Yield curve',
    'Currency debasement',
    'Liquidity cycle',
  ],
  'Geopolitics': [
    'War / conflict',
    'Trade policy',
    'Sanctions',
    'De-dollarization',
    'Reserve currency shift',
    'US–China tensions',
    'Middle East',
    'Europe',
  ],
  'Central Banks': [
    'CB net purchases',
    'Reserve composition',
    'EM central bank rotation',
    'BIS / IMF signals',
    'Bank of Korea',
    'PBoC / China',
    'Fed / ECB / BOJ',
    'MAS Singapore',
  ],
  'Physical Market': [
    'Asia demand',
    'Middle East demand',
    'Western demand',
    'Jewellery demand',
    'Bar & coin demand',
    'Mine supply',
    'Recycling flows',
    'LBMA mechanics',
    'SGE mechanics',
    'KRX mechanics',
    'Physical shortage',
    'Refinery standards',
    'Vaulting / custody',
  ],
  'Paper Markets': [
    'ETF flows',
    'COT positioning',
    'Comex open interest',
    'Futures backwardation',
    'Lease rates',
    'OTC market',
    'Speculative positioning',
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
    'Japan / APAC',
    'China SGE',
    'Southeast Asia',
    'Hong Kong',
  ],
  'Regulation': [
    'MAS regulation',
    'Korean FSC / FSS',
    'SEC / CFTC',
    'Capital gains tax',
    'VAT treatment',
    'AML / KYC',
    'Eligible gold standards',
    'Cross-border reporting',
  ],
  'Platform': [
    'New deal listing',
    'Vault update',
    'Pricing update',
    'Feature release',
    'Educational guide',
    'Company news',
  ],
};

const ALLOWED_CATEGORIES = Object.keys(CATEGORY_MAP).join(', ');
const ALL_SUBCATEGORIES = Object.values(CATEGORY_MAP).flat().join(', ');

// ── Output type ───────────────────────────────────────────────────────────────

export interface SignalContent {
  headline_en: string;
  headline_ko: string;
  summary_en: string;
  summary_ko: string;
  category: SignalCategory;
  tags: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

// ── Prompt ────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a bilingual (English / Korean) financial editor specialising in gold markets.
Given a social-media post or news excerpt, return ONLY a JSON object — no markdown fences, no preamble, no trailing text.

JSON shape:
{
  "headline_en": "<1-line English headline, max 12 words>",
  "headline_ko": "<1-line Korean headline>",
  "summary_en": "<2-3 sentence English summary explaining why this matters for gold investors>",
  "summary_ko": "<2-3 sentence Korean summary explaining why this matters for gold investors>",
  "category": "<exactly one L1 category from the allowed list>",
  "tags": ["<subcategory1>", "<subcategory2>"],
  "sentiment": "<bullish|bearish|neutral>"
}

L1 CATEGORY (pick exactly one):
${ALLOWED_CATEGORIES}

L2 SUBCATEGORY TAGS (pick 2–3 from this list only):
${ALL_SUBCATEGORIES}

Rules:
- category must be exactly one string from the L1 list
- tags must be 2–3 items chosen ONLY from the L2 subcategory list above
- sentiment must be exactly one of: bullish, bearish, neutral — relative to gold price direction
- Do NOT include any text outside the JSON object`;

// ── Public function ───────────────────────────────────────────────────────────

export async function generateSignalContent(
  postText: string,
  sourceUrl?: string
): Promise<SignalContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

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
    throw new Error(`Claude returned non-JSON: ${rawText}`);
  }

  if (!isSignalContent(parsed)) {
    throw new Error(`Claude JSON missing required fields: ${rawText}`);
  }

  return parsed;
}

// ── Type guard ────────────────────────────────────────────────────────────────

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
