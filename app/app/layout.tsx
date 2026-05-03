import { requireSession } from '@/lib/auth';
import { PortalNav } from '@/components/portal/PortalNav';
import { headers } from 'next/headers';

export const metadata = { title: '회원 · GoldPath' };

// Auth-gated layout for the customer portal. requireSession redirects to
// /login if the cookie is missing or invalid.
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  // Read the current path from the Referer-style header that Next sets on
  // RSC requests, fallback to /app. Used to highlight the active link.
  const h = await headers();
  const active =
    h.get('next-url') ?? h.get('x-invoke-path') ?? h.get('x-pathname') ?? '/app';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PortalNav session={session} active={active} />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 28px 80px' }}>
        {children}
      </main>
    </div>
  );
}
