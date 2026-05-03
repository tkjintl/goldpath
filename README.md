# GoldPath

A TACC Company. Singapore-incorporated precious metals dealer. Korean retail
gold accumulation — monthly auto-debit buys 999.9 physical gold, vaulted
allocated in Singapore in the customer's name.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Actions, typed routes)
- **TypeScript strict**, **Zod** for validation
- **Postgres** (Neon via Vercel Marketplace) — Phase 2; JSONL fallback for Phase 1
- Theme system with **7 directions** registered as token objects, **GP** locked as default

## Run

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
```

## Surfaces

| Path | Purpose |
|---|---|
| `/` | Public landing — Ticker, Hero, WhyStrip, Mechanism, TierLadder, EndCTA |
| `/why` | Why now — kimchi premium, central bank buying, KRW debasement, gold long run |
| `/how` | Mechanism — sign up → debit → buy → vault |
| `/tiers` | 5-tier founding cohort ladder |
| `/vault` | Malca-Amit Singapore FTZ transparency |
| `/heritage` | Beneficiary / gifting / inheritance feature |
| `/faq` | Direct, MZ-register Q&A |
| `/calculator` | Monthly → grams illustrative projector |
| `/signup` | Onboarding entry (Phase 2 wires KYC + payments) |
| `/insurance`, `/audits`, `/regulators`, `/contact`, `/legal` | Trust + footer surfaces |

Customer portal `/app/*` and admin portal `/ops/*` follow in Phase 2.

## Live pricing

`lib/pricing.ts` pulls three feeds in parallel:

- **KRX gold market** (Korea Exchange public data) — institutional Korean spot
- **LBMA international** (USD/oz + KRW FX) — what GoldPath actually buys at
- **한국금거래소 retail** — for the kimchi-premium comparison

5-minute server cache via Next's `unstable_cache`. Falls back to seeded values
when any feed is down — UI surfaces `LIVE` vs `CACHED` rather than crashing.

## Theme system

`lib/themes.ts` registers seven themes as token objects (`GP` + `A1`/`A2`/`B1`/
`B2`/`C1`/`C2`). Components consume CSS variables only — never hardcoded values.

- **Default:** `GP` (GoldPath brand) — B2 magazine layout × A2 brass-gold palette
- **Switch via cookie** in production (set by an authenticated admin tool — TBD)
- **Switch via `?theme=A1`** in dev for QA
- Hide/show the floating switcher with `NEXT_PUBLIC_THEME_SWITCHER=1`

## Environment variables

| key | purpose |
|---|---|
| `ADMIN_TOKEN` | gates `/ops` and `/api/admin/*` (Phase 2) |
| `RESEND_API_KEY` | transactional email |
| `DATABASE_URL` | Neon Postgres (Phase 2) |
| `NEXT_PUBLIC_DEFAULT_THEME` | overrides default theme — leave as `GP` |
| `NEXT_PUBLIC_THEME_SWITCHER` | `1` to show the dev switcher |

## Vercel deploy

Project: `tkjintls-projects/goldpath`. Root Directory: **repo root** (no
subdirectory). Auto-deploys from `main`.

## Status

Phase 1 (public site) shipped. Next: customer portal shell + auth + KYC stub +
payments scaffold. See `lib/pricing.ts` and the theme registry as the load-bearing
foundations.
