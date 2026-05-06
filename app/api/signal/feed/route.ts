// ─────────────────────────────────────────────────────────────────────────────
// /app/api/signal/feed/route.ts
//
// Public GET endpoint — returns the published Signal feed as JSON.
// No auth required (feed data is public).
//
// GET /api/signal/feed?limit=20   (default 20, max 100)
// Response: { posts: SignalPost[] }
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { getSignalFeed } from '@/lib/signal-store';

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const rawLimit = searchParams.get('limit');
  const limit = rawLimit ? parseInt(rawLimit, 10) : 20;

  if (isNaN(limit) || limit < 1) {
    return NextResponse.json({ error: 'limit must be a positive integer' }, { status: 400 });
  }

  try {
    const posts = await getSignalFeed(limit);
    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
