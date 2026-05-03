import { headers } from 'next/headers';
import { requireAdmin } from '@/lib/admin';
import { OpsNav } from '@/components/ops/OpsNav';

export const dynamic = 'force-dynamic';

// Gated routes: requireAdmin redirects to /ops/login if no admin cookie.
// /ops/login lives outside this layout (in the (gated) sibling tree),
// so it cannot infinite-loop on its own redirect.
export default async function OpsGatedLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  // Best-effort active-link highlight; works in Next 16 via the next-url
  // header set by the App Router on RSC requests.
  const h = await headers();
  const active =
    h.get('next-url') ?? h.get('x-invoke-path') ?? h.get('x-pathname') ?? '/ops';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OpsNav active={active} />
      <main style={{ maxWidth: 1480, margin: '0 auto', padding: '32px 28px 80px' }}>
        {children}
      </main>
    </div>
  );
}
