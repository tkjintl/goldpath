import type { MetadataRoute } from 'next';

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://goldpath-git-main-tkjintls-projects.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/app/', '/ops/', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
