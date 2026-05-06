import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SignalFeed } from '@/components/SignalFeed';
import type { SignalPost } from '@/lib/signal-store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '시그널 — GoldPath',
  description: '실시간 금 시장 인사이트 · 큐레이션 골드 시그널',
};

async function fetchPosts(): Promise<SignalPost[]> {
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const res = await fetch(`${siteUrl}/api/signal/feed`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: SignalPost[] } | SignalPost[];
    if (Array.isArray(data)) return data;
    return data.posts ?? [];
  } catch {
    return [];
  }
}

export default async function SignalPage() {
  const posts = await fetchPosts();
  return (
    <>
      <Ticker />
      <Nav />
      <SignalFeed posts={posts} />
      <Footer />
    </>
  );
}
