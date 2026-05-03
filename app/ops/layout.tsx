// /ops/* — root layout is intentionally pass-through.
// Gating + chrome live in /ops/(gated)/layout.tsx so /ops/login bypasses both.
export const metadata = {
  title: 'Ops · GoldPath',
  robots: { index: false, follow: false },
};

export default function OpsRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
