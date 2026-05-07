# CHANGELOG

## 2026-05-07
### fix(session): stop portal from logging out on tab navigation
- `app/app/layout.tsx`: added `export const dynamic = 'force-dynamic'` — without this Next.js may cache the layout RSC render and skip reading the session cookie on navigation requests.
- `app/logout/route.ts`: redirect after logout now goes to `/login` instead of `/` (both GET and POST handlers).
- **ACTION REQUIRED**: Set `SESSION_SECRET` in Vercel environment variables (Production + Preview) — run `vercel env add SESSION_SECRET` or add via Vercel dashboard. Current fallback is a hardcoded dev string.

## 2026-05-06
### GP theme — Font C "Premium Modern" typography applied
- `app/globals.css`: added Google Fonts import for Libre Baskerville, Black Han Sans, Nanum Gothic, and Space Grotesk (inserted after pretendard CDN import).
- `lib/themes.ts` (GP theme only): updated `serif` → Libre Baskerville; `kr` → Nanum Gothic; `krs` → Black Han Sans; `mono` → Space Grotesk; `display` → Libre Baskerville; `krsRare` → Black Han Sans. All other themes (A1, A2, B1, B2, C1, C2) and all color/ornament tokens left unchanged.
