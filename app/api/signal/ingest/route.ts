// ─────────────────────────────────────────────────────────────────────────────
// /app/api/signal/ingest/route.ts
//
// KakaoTalk Skill Server endpoint.
// Kakao i Open Builder POSTs here when the operator sends a message.
//
// Must respond within 5 seconds — all errors are caught and returned as
// KakaoTalk simpleText responses so Kakao never retries on a missing response.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { generateSignalContent } from '@/lib/signal-claude';
import { fetchXEmbed } from '@/lib/signal-oembed';
import { insertSignalPost } from '@/lib/signal-store';

// ── Kakao request / response shapes ──────────────────────────────────────────

interface KakaoRequest {
  version: string;
  userRequest: {
    utterance: string;
    user: { id: string; type: string };
  };
}

function kakaoText(text: string): NextResponse {
  return NextResponse.json({
    version: '2.0',
    template: {
      outputs: [{ simpleText: { text } }],
    },
  });
}

// ── sentiment display helpers ─────────────────────────────────────────────────

const SENTIMENT_EMOJI: Record<string, string> = {
  bullish: '📈',
  bearish: '📉',
  neutral: '➡️',
};

// ── URL detection ─────────────────────────────────────────────────────────────

function isXUrl(text: string): boolean {
  return /https?:\/\/(www\.)?(x\.com|twitter\.com)\/\S+/i.test(text);
}

function extractUrl(text: string): string | null {
  const match = text.match(/https?:\/\/\S+/i);
  return match ? match[0] : null;
}

// ── auth ──────────────────────────────────────────────────────────────────────

function verifyKakaoSecret(request: NextRequest): boolean {
  const secret = process.env.KAKAO_SKILL_SECRET;
  if (!secret) return true; // dev mode — skip check

  const header = request.headers.get('x-kakao-skill-secret');
  return header === secret;
}

// ── handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Auth check
  if (!verifyKakaoSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse Kakao request body
    let body: KakaoRequest;
    try {
      body = (await request.json()) as KakaoRequest;
    } catch {
      return kakaoText('요청을 파싱할 수 없습니다. (invalid JSON)');
    }

    const utterance = body?.userRequest?.utterance?.trim();
    if (!utterance) {
      return kakaoText('메시지가 비어 있습니다.');
    }

    // Determine content source: X/Twitter URL or direct paste
    let postText: string;
    let sourceUrl: string | null = null;
    let embedHtml: string | null = null;
    let imageUrl: string | null = null;

    if (isXUrl(utterance)) {
      sourceUrl = extractUrl(utterance);

      if (sourceUrl) {
        const embed = await fetchXEmbed(sourceUrl);
        if (embed) {
          postText = embed.text;
          embedHtml = embed.html;
          imageUrl = embed.imageUrl;
        } else {
          // oEmbed failed — use URL as context for Claude
          postText = `Tweet URL: ${sourceUrl}`;
        }
      } else {
        postText = utterance;
      }
    } else {
      // Direct paste mode — treat the full utterance as post text
      postText = utterance;
    }

    // Generate bilingual content via Claude
    const content = await generateSignalContent(postText, sourceUrl ?? undefined);

    // Persist to Neon
    await insertSignalPost({
      source_url: sourceUrl,
      post_text: postText,
      embed_html: embedHtml,
      image_url: imageUrl,
      headline_en: content.headline_en,
      headline_ko: content.headline_ko,
      summary_en: content.summary_en,
      summary_ko: content.summary_ko,
      category: content.category,
      tags: content.tags,
      sentiment: content.sentiment,
    });

    // Confirmation message back to KakaoTalk
    const emoji = SENTIMENT_EMOJI[content.sentiment] ?? '➡️';
    const tagLine = content.tags.map((t) => `#${t}`).join(' ');

    const confirmText = [
      '✅ Signal에 추가됐습니다!',
      '',
      content.headline_en,
      content.headline_ko,
      '',
      `🏷️ ${tagLine}`,
      `${emoji} ${content.sentiment}`,
    ].join('\n');

    return kakaoText(confirmText);
  } catch (err: unknown) {
    // Never let the endpoint hang — Kakao retries on timeout
    const message = err instanceof Error ? err.message : 'Unknown error';
    return kakaoText(`❌ 오류가 발생했습니다: ${message}`);
  }
}
