import type { Metadata } from 'next';
import { THEMES, themeToCSSVars, SHOW_THEME_SWITCHER } from '@/lib/themes';
import { readThemeFromCookie } from '@/lib/theme-cookie';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { SkipLink } from '@/components/SkipLink';
import './globals.css';

export const metadata: Metadata = {
  title: 'GoldPath — A TACC Company',
  description:
    '매달 한 그램. 999.9 실물 금이 싱가포르 금고에 회원님 이름으로 쌓입니다. Korean retail gold accumulation, vaulted in Singapore.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://goldpath-git-main-tkjintls-projects.vercel.app'),
  openGraph: {
    title: 'GoldPath — 매달 한 그램',
    description: 'Korean retail gold accumulation, vaulted in Singapore. A TACC Company.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const themeId = await readThemeFromCookie();
  const theme = THEMES[themeId];

  return (
    <html lang="ko" data-theme={themeId} data-ornament={theme.ornament}>
      <head>
        <style
          // Inline theme variables on :root so SSR + client agree on first paint.
          dangerouslySetInnerHTML={{
            __html: `:root { ${themeToCSSVars(theme)} }`,
          }}
        />
      </head>
      <body>
        <SkipLink />
        <main id="main" tabIndex={-1}>{children}</main>
        {SHOW_THEME_SWITCHER && <ThemeSwitcher active={themeId} />}
      </body>
    </html>
  );
}
