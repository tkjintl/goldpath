import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SignalFeed } from '@/components/SignalFeed';
import { getSignalFeed } from '@/lib/signal-store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '시그널 — GoldPath',
  description: '실시간 금 시장 인사이트 · 큐레이션 골드 시그널',
};

export default async function SignalPage() {
  const posts = await getSignalFeed(50).catch(() => []);
  return (
    <>
      <Ticker />
      <Nav />
      <SignalFeed posts={posts} />
      <Footer />
    </>
  );
}
