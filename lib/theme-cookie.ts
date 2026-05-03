import { cookies } from 'next/headers';
import { resolveTheme, type ThemeId, DEFAULT_THEME } from './themes';

const COOKIE = 'gp_theme';

// Server-side: read theme from cookie, falling back to default.
export async function readThemeFromCookie(): Promise<ThemeId> {
  const c = await cookies();
  const v = c.get(COOKIE)?.value;
  return resolveTheme(v) ?? DEFAULT_THEME;
}

// Server-side: pick from query param OR cookie OR default.
export async function pickTheme(searchParam?: string | string[]): Promise<ThemeId> {
  const fromQuery = Array.isArray(searchParam) ? searchParam[0] : searchParam;
  if (fromQuery) return resolveTheme(fromQuery);
  return readThemeFromCookie();
}

export const THEME_COOKIE = COOKIE;
