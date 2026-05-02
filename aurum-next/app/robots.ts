import type { MetadataRoute } from 'next';

const BASE = 'https://aurum.example';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/ops', '/ops/', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
