// ─────────────────────────────────────────────────────────────────────
// Phase 1 auth stub
//
// Signed cookie session — minimal, dev-grade. Phase 2 swaps this file's
// public surface to Clerk (or similar) without touching call sites.
//
// Public API:
//   getSession()          — { email, name } | null
//   requireSession()      — same, throws redirect to /login if missing
//   signIn(email, name)   — server action helper
//   signOut()             — clears session
// ─────────────────────────────────────────────────────────────────────

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'gp_session';
const SECRET = process.env.SESSION_SECRET ?? 'dev-only-secret-change-in-production';

export type Session = {
  email: string;
  name: string;
  issuedAt: number;
};

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('base64url');
}

function verify(payload: string, sig: string): boolean {
  const expected = sign(payload);
  if (expected.length !== sig.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}

function encode(s: Session): string {
  const json = JSON.stringify(s);
  const payload = Buffer.from(json).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): Session | null {
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  if (!verify(payload, sig)) return null;
  try {
    const json = Buffer.from(payload, 'base64url').toString('utf8');
    const parsed = JSON.parse(json) as Session;
    if (!parsed.email || !parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const c = await cookies();
  const tok = c.get(COOKIE)?.value;
  if (!tok) return null;
  return decode(tok);
}

export async function requireSession(): Promise<Session> {
  const s = await getSession();
  if (!s) redirect('/login');
  return s;
}

export async function setSession(email: string, name: string): Promise<void> {
  const c = await cookies();
  const session: Session = { email, name, issuedAt: Date.now() };
  c.set(COOKIE, encode(session), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}
