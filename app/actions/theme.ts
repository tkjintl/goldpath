'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { resolveTheme, type ThemeId } from '@/lib/themes';
import { THEME_COOKIE } from '@/lib/theme-cookie';

// Persist theme choice in a cookie. Used by the in-app theme switcher.
export async function setTheme(formData: FormData): Promise<void> {
  const id = formData.get('id');
  const theme: ThemeId = resolveTheme(typeof id === 'string' ? id : null);
  const c = await cookies();
  c.set(THEME_COOKIE, theme, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
