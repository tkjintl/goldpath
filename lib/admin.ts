// ─────────────────────────────────────────────────────────────────────
// Admin gate
//
// Phase 1: ADMIN_TOKEN in cookie or query string. Phase 2 swaps to a
// proper SSO/IdP-gated admin role on top of the customer auth provider,
// plus IP allowlist via Vercel Firewall rules.
// ─────────────────────────────────────────────────────────────────────

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'gp_admin';

function timingEq(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const c = await cookies();
  const tok = c.get(ADMIN_COOKIE)?.value;
  if (!tok) return false;
  return timingEq(tok, expected);
}

export async function requireAdmin(): Promise<void> {
  const ok = await isAdmin();
  if (!ok) redirect('/ops/login');
}

export async function setAdminCookie(token: string): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  if (!timingEq(token, expected)) return false;
  const c = await cookies();
  c.set(ADMIN_COOKIE, token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
  });
  return true;
}

export async function clearAdminCookie(): Promise<void> {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
}
