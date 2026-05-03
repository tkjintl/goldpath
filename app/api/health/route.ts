import { NextResponse } from 'next/server';
import { ping } from '@/lib/db';
import { getPriceSnapshot } from '@/lib/pricing';

// Public health probe. Returns build/feed status without exposing secrets.
// Use it for: uptime monitoring, deploy verification, "is the live ticker
// actually live" sanity check.
export async function GET() {
  const [db, price] = await Promise.all([ping(), getPriceSnapshot()]);
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    build: process.env.VERCEL_GIT_COMMIT_SHA ?? 'local',
    db: { status: db.status, message: db.message },
    pricing: {
      sources: price.sources,
      krxKrwPerGram: price.krxKrwPerGram,
      retailKrwPerGram: price.retailKrwPerGram,
      aurumKrwPerGram: price.aurumKrwPerGram,
      kimchiPremiumPct: price.kimchiPremiumPct,
      timestamp: price.timestamp,
    },
    portals: {
      public: 'ok',
      customer: 'ok',
      admin: process.env.ADMIN_TOKEN ? 'ok' : 'admin-token-not-set',
    },
  });
}
