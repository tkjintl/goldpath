import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/admin';

export async function GET(req: Request) {
  await clearAdminCookie();
  return NextResponse.redirect(new URL('/ops/login', req.url));
}
export async function POST(req: Request) {
  await clearAdminCookie();
  return NextResponse.redirect(new URL('/ops/login', req.url));
}
