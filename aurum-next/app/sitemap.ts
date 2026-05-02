import type { MetadataRoute } from 'next';

const BASE = 'https://aurum.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '/',
    '/heritage',
    '/waitlist',
    '/trust',
    '/trust/vault',
    '/trust/insurance',
    '/trust/audits',
    '/trust/regulators',
    '/trust/team',
    '/trust/bankruptcy',
    '/disclosure-kr',
    '/calculator',
  ];
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p === '/' ? 1 : 0.7,
  }));
}
