import type { MetadataRoute } from 'next';

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://goldpath-git-main-tkjintls-projects.vercel.app';

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: Entry = {
    url: `${BASE}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  };

  const primary: Array<{ path: string; priority: number }> = [
    { path: '/why', priority: 0.8 },
    { path: '/how', priority: 0.8 },
    { path: '/tiers', priority: 0.8 },
    { path: '/calculator', priority: 0.8 },
  ];

  // Trust pillar pages
  const trustPillar: Array<{ path: string; priority: number }> = [
    { path: '/vault', priority: 0.6 },
    { path: '/heritage', priority: 0.6 },
    { path: '/faq', priority: 0.6 },
    { path: '/insurance', priority: 0.6 },
    { path: '/trust', priority: 0.6 },
    { path: '/about', priority: 0.6 },
    { path: '/why-singapore', priority: 0.6 },
    { path: '/tax', priority: 0.6 },
    { path: '/signup', priority: 0.6 },
    { path: '/login', priority: 0.6 },
  ];

  const tertiary: Array<{ path: string; priority: number }> = [
    { path: '/legal', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/audits', priority: 0.5 },
    { path: '/regulators', priority: 0.5 },
  ];

  const rest: Entry[] = [...primary, ...trustPillar, ...tertiary].map(
    ({ path, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    }),
  );

  return [home, ...rest];
}
