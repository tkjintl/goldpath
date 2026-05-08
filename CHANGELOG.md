# CHANGELOG

## 2026-05-08
### fix(mobile): comprehensive mobile + tablet layout audit
- **globals.css**: new tablet breakpoint block (769–1024px) — section padding tightened (64px 24px for mechanism/tiers, 40px for why-strip), footer drops to 4-col with brand spanning full row, tier grid forces 3-col
- **Mechanism.tsx**: grid changed to `repeat(4, minmax(0, 1fr))` (no more auto-fit orphan); inline tablet style adds 2×2 at 769–900px with correct border logic (nth-child(2n+3) removes right-border from right column); flex-column + spacer on cards for consistent height
- **WhyStrip.tsx**: same grid fix; inline tablet style forces 2×2 at 769–900px
- **Footer.tsx**: `repeat(5)` → `repeat(5, minmax(0, 1fr))`; tablet CSS shows brand full-width + 4 link cols
- **TierLadder.tsx**: `repeat(5, minmax(0, 1fr))` fixed; footnotes `repeat(2)` fixed
- **trust/page.tsx + about/page.tsx**: sectionWrap and hero section paddings use `clamp()`; DL gridTemplateColumns `minmax(100/90px, auto) 1fr`; dd gets `wordBreak: break-word`; trust bar-list table wrapped in overflow-x scroll container
- **signup/page.tsx**: section paddings use `clamp()`
- **calculator/Calculator.tsx**: sparkline container gets `overflow: hidden`; 가정 미래 가치 row label gets ellipsis + shrink; value wraps with flex-end
- **promo/TrustGrid.tsx**: 5-cell 2-col orphan fixed (`a:last-child:nth-child(odd)` spans full width); section padding uses `clamp()`
- **promo/VestingGrid.tsx**: 12-col → 6-col → 4-col at ≤480px; padding `clamp()`
- **promo/SkepticBlock.tsx + CreditsLadder.tsx + Leaderboard.tsx + PromoFAQ.tsx + ReferralBlock.tsx + ShareCardMockup.tsx + TierUpTimeline.tsx + MathCalc.tsx**: all hard-coded `96px 36px` section padding replaced with `clamp(48px, 7vw, 96px) clamp(16px, 4vw, 36px)`
- **why-singapore/page.tsx**: hero and sectionWrap paddings use `clamp()`

## 2026-05-07
### fix(session): stop portal from logging out on tab navigation
- `app/app/layout.tsx`: added `export const dynamic = 'force-dynamic'` — without this Next.js may cache the layout RSC render and skip reading the session cookie on navigation requests.
- `app/logout/route.ts`: redirect after logout now goes to `/login` instead of `/` (both GET and POST handlers).
- **ACTION REQUIRED**: Set `SESSION_SECRET` in Vercel environment variables (Production + Preview) — run `vercel env add SESSION_SECRET` or add via Vercel dashboard. Current fallback is a hardcoded dev string.

## 2026-05-06
### GP theme — Font C "Premium Modern" typography applied
- `app/globals.css`: added Google Fonts import for Libre Baskerville, Black Han Sans, Nanum Gothic, and Space Grotesk (inserted after pretendard CDN import).
- `lib/themes.ts` (GP theme only): updated `serif` → Libre Baskerville; `kr` → Nanum Gothic; `krs` → Black Han Sans; `mono` → Space Grotesk; `display` → Libre Baskerville; `krsRare` → Black Han Sans. All other themes (A1, A2, B1, B2, C1, C2) and all color/ornament tokens left unchanged.
