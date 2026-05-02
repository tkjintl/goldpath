import { NextResponse } from 'next/server';
import { readAll } from '@/lib/waitlist';

// GET /api/waitlist?token=…
// Returns all waitlist entries as JSON, sorted by intent.
// Phase 1 ops console — replace with proper /ops UI in Phase 2.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!process.env.ADMIN_TOKEN) {
    return NextResponse.json(
      { error: 'ADMIN_TOKEN not configured' },
      { status: 503 },
    );
  }
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const all = await readAll();

  const sorted = [...all].sort((a, b) => {
    if (a.flags.highIntent !== b.flags.highIntent) {
      return a.flags.highIntent ? -1 : 1;
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  return NextResponse.json({
    count: all.length,
    eligibleCount: all.filter((e) => e.flags.eligible).length,
    highIntentCount: all.filter((e) => e.flags.highIntent).length,
    heritagePrimaryCount: all.filter((e) => e.flags.heritagePrimary).length,
    krResidentCount: all.filter((e) => e.flags.krResident).length,
    entries: sorted,
  });
}
