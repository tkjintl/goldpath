import { NextRequest, NextResponse } from 'next/server';
import { generateSignalContent } from '@/lib/signal-claude';
import { fetchXEmbed, extractArticleUrls, fetchArticleText } from '@/lib/signal-oembed';
import { insertSignalPost } from '@/lib/signal-store';

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    chat: { id: number };
    text?: string;
  };
}

const X_URL_RE = /https?:\/\/(www\.)?(x\.com|twitter\.com)\/\S+/i;
const SENTIMENT_EMOJI: Record<string, string> = { bullish: '📈', bearish: '📉', neutral: '➡️' };

async function reply(chatId: number, text: string, token: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return NextResponse.json({ ok: false }, { status: 500 });

  // Verify webhook secret if configured
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TelegramUpdate;
  try { update = (await req.json()) as TelegramUpdate; }
  catch { return NextResponse.json({ ok: true }); }

  const msg = update.message;
  if (!msg?.text) return NextResponse.json({ ok: true });

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (!X_URL_RE.test(text)) {
    await reply(chatId, '❌ X 포스트 URL을 보내주세요.\n예: https://x.com/user/status/...', token);
    return NextResponse.json({ ok: true });
  }

  const sourceUrl = text.match(/https?:\/\/\S+/i)?.[0] ?? null;
  if (!sourceUrl) return NextResponse.json({ ok: true });

  await reply(chatId, '⏳ 처리 중...', token);

  try {
    let postText = `Tweet URL: ${sourceUrl}`;
    let embedHtml: string | null = null;
    let imageUrl: string | null = null;
    let articleText: string | null = null;

    const embed = await fetchXEmbed(sourceUrl);
    if (embed) {
      postText = embed.text;
      embedHtml = embed.html;
      imageUrl = embed.imageUrl;
      const links = extractArticleUrls(embed.text);
      if (links.length > 0) articleText = await fetchArticleText(links[0]);
    }

    const content = await generateSignalContent(postText, sourceUrl, articleText);

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

    const emoji = SENTIMENT_EMOJI[content.sentiment] ?? '➡️';
    const tags = content.tags.map((t) => `#${t}`).join(' ');

    await reply(chatId,
      `✅ Signal에 추가됐습니다!\n\n${content.headline_ko}\n\n🏷 ${tags}\n${emoji} ${content.sentiment}`,
      token
    );
  } catch (err) {
    await reply(chatId, `❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`, token);
  }

  return NextResponse.json({ ok: true });
}
