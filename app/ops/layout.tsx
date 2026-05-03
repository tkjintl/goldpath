import { headers } from 'next/headers';
import { isAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';
import { OpsNav } from '@/components/ops/OpsNav';

export const metadata = {
  title: 'Ops · GoldPath',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

// Gate every /ops/* page except /ops/login itself.
export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const path =
    h.get('next-url') ?? h.get('x-invoke-path') ?? h.get('x-pathname') ?? '/ops';

  // /ops/login renders without the layout chrome
  if (path.startsWith('/ops/login')) {
    return <>{children}</>;
  }

  const ok = await isAdmin();
  if (!ok) redirect('/ops/login');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OpsNav active={path} />
      <main style={{ maxWidth: 1480, margin: '0 auto', padding: '32px 28px 80px' }}>
        {children}
      </main>
    </div>
  );
}
