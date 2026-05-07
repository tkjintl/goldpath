import { NextRequest, NextResponse } from 'next/server';
import { generateSignalContent } from '@/lib/signal-claude';
import { fetchXEmbed, extractArticleUrls, fetchArticleText } from '@/lib/signal-oembed';
import { insertSignalPost, deleteSignalPost, getSignalFeed } from '@/lib/signal-store';

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

  // ── /list — show last 8 posts with short IDs ──────────────────────────────
  if (text === '/list') {
    try {
      const posts = await getSignalFeed(8);
      if (posts.length === 0) {
        await reply(chatId, '시그널이 없습니다.', token);
        return NextResponse.json({ ok: true });
      }
      const lines = posts.map((p, i) =>
        `${i + 1}. [${p.id.slice(0, 8)}] ${p.headline_ko}`
      ).join('\n');
      await reply(chatId, `최근 시그널:\n\n${lines}\n\n삭제: /delete <ID>`, token);
    } catch (err) {
      await reply(chatId, `❌ 오류: ${err instanceof Error ? err.message : 'error'}`, token);
    }
    return NextResponse.json({ ok: true });
  }

  // ── /delete <id> ──────────────────────────────────────────────────────────
  if (text.startsWith('/delete')) {
    const shortId = text.replace('/delete', '').trim();
    if (!shortId) {
      await reply(chatId, '사용법: /delete <ID>\n목록 보기: /list', token);
      return NextResponse.json({ ok: true });
    }
    try {
      // Match by full UUID prefix
      const posts = await getSignalFeed(100);
      const target = posts.find((p) => p.id.startsWith(shortId));
      if (!target) {
        await reply(chatId, `❌ ID [${shortId}]를 찾을 수 없습니다.\n목록: /list`, token);
        return NextResponse.json({ ok: true });
      }
      await deleteSignalPost(target.id);
      await reply(chatId, `🗑 삭제됐습니다: ${target.headline_ko}`, token);
    } catch (err) {
      await reply(chatId, `❌ 오류: ${err instanceof Error ? err.message : 'error'}`, token);
    }
    return NextResponse.json({ ok: true });
  }

  // ── /help ─────────────────────────────────────────────────────────────────
  if (text === '/help' || text === '/start') {
    await reply(chatId,
      'GoldPath Signal Bot\n\n' +
      '• X 포스트 URL 전송 → 시그널 추가\n' +
      '• /list → 최근 8개 목록\n' +
      '• /delete <ID> → 삭제\n' +
      '• /help → 도움말',
      token
    );
    return NextResponse.json({ ok: true });
  }

  // ── X URL ingest ──────────────────────────────────────────────────────────
  if (!X_URL_RE.test(text)) {
    await reply(chatId, 'X 포스트 URL을 보내주세요.\n명령어: /help', token);
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

    const post = await insertSignalPost({
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
    const shortId = post.id.slice(0, 8);

    await reply(chatId,
      `✅ 추가됐습니다!\n\n${content.headline_ko}\n\n🏷 ${tags}\n${emoji} ${content.sentiment}\n\n삭제하려면: /delete ${shortId}`,
      token
    );
  } catch (err) {
    await reply(chatId, `❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`, token);
  }

  return NextResponse.json({ ok: true });
}
