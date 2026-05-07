import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// One-shot: recategorise misfiled Korea & Asia posts
// Protected by ADMIN_TOKEN. Hit once, then this file can be deleted.

export async function POST(req: NextRequest) {
  if (req.headers.get('x-admin-token') !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = neon(process.env.DATABASE_URL!);

  const ids = [
    '7ed590ca-fbbb-49f3-ba17-77da93be1a8d', // 홍콩 금 흐름
    'e00b88de-23f6-4d85-bb81-510196836337', // 한국은행 매입
    '4a04ddea-0e28-4d28-be04-e4762cbcd44a', // 중국 12개월
  ];

  await db`UPDATE signal_posts SET category = 'Korea & Asia' WHERE id = ANY(${ids}::uuid[])`;

  return NextResponse.json({ ok: true, updated: ids.length });
}
