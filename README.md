# Goldpath / Aurum

Two apps live here.

## `aurum-next/` — production target

Next.js 16 App Router app. **This is what `tkjintls-projects/goldpath` on Vercel should deploy.**

Phase 1 surface: diaspora-positioned landing, heritage feature page, waitlist with
deposit-intent capture, six trust/transparency pages, Korean-residents non-solicitation
disclosure, `/ops` admin dashboard, sitemap, robots, OG image, illustrative calculator.

```bash
cd aurum-next
npm install
cp .env.example .env.local   # set ADMIN_TOKEN at minimum
npm run dev                  # http://localhost:3000
```

See `aurum-next/README.md` for full Phase 1 scope, the 90-day kill criteria, and the
Phase 2 roadmap.

## `src/` (and root) — Vite mockup, design reference

The original Korean-MZ drop-energy design exploration. Kept as a reference for the design
system, not the production target. Ignore if you're working on the live product.

```bash
npm install
npm run dev   # Vite dev server, original mockup
```

## Vercel deploy posture

The `tkjintls-projects/goldpath` Vercel project should be configured with:

- **Root Directory:** `aurum-next`
- **Framework Preset:** Next.js (auto-detected)
- **Build / Install / Output:** defaults (`aurum-next/vercel.json` pins them)

Once Root Directory is set, every push to `main` deploys `aurum-next/` to production.
The Vite mockup at repo root is no longer the deploy target.

## Environment variables (Vercel project settings)

Required for the Phase 1 waitlist surface:

| key | purpose | scope |
|---|---|---|
| `ADMIN_TOKEN` | gates `/ops` and `/api/waitlist` GET | Production + Preview |
| `RESEND_API_KEY` | (optional) waitlist confirmation emails | Production |
| `DATABASE_URL` | (Phase 2) Neon Postgres for waitlist persistence | all |

Without `DATABASE_URL`, waitlist entries fall back to a local JSONL file — fine for
development, **not for production** (filesystem is ephemeral on Vercel Functions).
Provision Neon via the Vercel Marketplace before any real traffic.

## Background work tracked elsewhere

- 30-day waitlist kill-criteria check is scheduled at <https://claude.ai/code/routines/trig_01BSQZi877nJ2deReZHDYK39> — update the placeholder URL/token before it fires on 2026-06-01.
