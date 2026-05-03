# GoldPath · Build & Dev Guide

A practical reference for running, building, deploying, and extending GoldPath.

---

## Stack

- **Framework:** Next.js 16 App Router (Turbopack)
- **Language:** TypeScript strict
- **Validation:** Zod
- **Hosting:** Vercel (Fluid Compute)
- **Database (Phase 2):** Neon Postgres via Vercel Marketplace
- **Auth (Phase 1 stub → Phase 2 Clerk):** signed-cookie HMAC
- **Pricing feeds:** Stooq (XAUUSD daily) + Frankfurter (ECB FX)
- **Theme:** CSS variables, 7 directions registered, `GP` locked default

---

## Local development

```bash
# 1. Install
npm install

# 2. Env vars (minimum)
cp .env.example .env.local
# Edit and set ADMIN_TOKEN + SESSION_SECRET to random 32+ char hex strings.
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Run dev server
npm run dev          # http://localhost:3000

# 4. Type-check
npm run typecheck    # tsc --noEmit

# 5. Production build (verifies everything compiles + types)
npm run build
npm start            # http://localhost:3000
```

---

## Project layout

```
goldpath/
├── app/                          Next.js App Router
│   ├── layout.tsx                root layout — theme injection, metadata
│   ├── globals.css               reset, fonts, animations
│   ├── page.tsx                  public landing
│   ├── (public routes)/page.tsx  why, how, tiers, vault, heritage, faq,
│   │                             calculator, insurance, audits, regulators,
│   │                             contact, legal
│   ├── login/                    customer auth (signed-cookie stub)
│   ├── logout/route.ts
│   ├── signup/                   real signup form + Server Action
│   ├── app/                      authenticated customer portal
│   │   ├── layout.tsx            requireSession() gate
│   │   ├── page.tsx              dashboard
│   │   ├── deposit, withdraw, heritage, referrals, statements, settings
│   │   └── welcome/              post-signup landing
│   ├── ops/                      admin portal
│   │   ├── layout.tsx            pass-through (login renders here ungated)
│   │   ├── login/                token entry
│   │   ├── logout/route.ts
│   │   └── (gated)/              everything below here calls requireAdmin()
│   │       ├── layout.tsx        gate + OpsNav
│   │       ├── page.tsx          overview
│   │       ├── kyc, settlement, withdrawals, customers, vault, audits,
│   │       │   compliance, financials
│   ├── api/
│   │   └── health/route.ts       public health probe
│   └── actions/
│       └── theme.ts              theme cookie setter
├── components/
│   ├── (public)                  Nav, Footer, Mark, Ticker, Hero, WhyStrip,
│   │                             Mechanism, TierLadder, EndCTA, Stub
│   ├── ThemeSwitcher.tsx         floating dev-only switcher
│   ├── portal/                   PortalNav, Section
│   └── ops/                      OpsNav, Queue (Table/Th/Td/StatusPill/Header)
├── lib/
│   ├── themes.ts                 7-direction theme registry
│   ├── theme-cookie.ts           server theme resolution
│   ├── pricing.ts                Stooq + Frankfurter pricing oracle
│   ├── auth.ts                   signed-cookie session
│   ├── admin.ts                  admin token gate
│   ├── founders.ts               cohort count + baseline offset
│   ├── demo.ts                   account builder (real-first, demo-fallback)
│   ├── demo-ops.ts               operator queue demo data
│   ├── ledger.ts                 append-only ledger primitive
│   └── db/
│       ├── schema.sql            full Postgres schema (run against Neon)
│       ├── types.ts              domain types matching schema
│       ├── store.ts              JSONL ↔ Postgres adapter (signup CRUD)
│       └── index.ts              adapter ping (Phase 2 wires Neon)
├── scripts/
│   └── mint-session.mjs          dev helper — mint valid session cookies
├── design/                       6 HTML mockups (visual identity reference)
├── docs/
│   ├── SESSION-1-GOLDPATH-DEV.md   chronological session log
│   ├── BUILDING.md                 this file
│   └── ROADMAP.md                  what's done, what's next
├── .env.example                  env var template
├── package.json
├── tsconfig.json
├── next.config.mjs
├── vercel.json                   pins framework=nextjs
└── README.md
```

---

## Theme system

Every visual decision lives in `lib/themes.ts` as a token object. Components read CSS variables (`var(--accent)`, `var(--font-krs)`) — never hardcoded values.

**Default theme: `GP`** (B2 layout × A2 brass-gold palette).

To preview another direction:
```
?theme=A1   → Vault Data
?theme=A2   → Vault Quiet
?theme=B1   → Daewangam Ink
?theme=B2   → Daewangam Warm
?theme=C1   → Specie Document
?theme=C2   → Specie Modern
```

Or set `NEXT_PUBLIC_THEME_SWITCHER=1` to render the floating in-app switcher.

To **lock a different theme** in production: set `NEXT_PUBLIC_DEFAULT_THEME=<id>` in Vercel env vars.

---

## Auth model (Phase 1)

Two separate gates:

**Customer auth** (`lib/auth.ts`)
- HMAC-signed cookie `gp_session`
- Set via `setSession(email, name)` — used in /login and /signup
- Read via `getSession()` / `requireSession()` (latter redirects to /login)
- Phase 2 swaps the implementation to Clerk; call sites stay identical

**Admin auth** (`lib/admin.ts`)
- Plain string match against `ADMIN_TOKEN` env var
- Cookie `gp_admin`, 8-hour TTL
- `requireAdmin()` redirects to `/ops/login` if missing/wrong
- Phase 2 swaps to SSO + IP allowlist + role-based access

Phase 1 dev helper: `node scripts/mint-session.mjs <email> <name>` outputs a valid session cookie value for testing.

---

## Pricing oracle

`lib/pricing.ts` runs three feeds in parallel, cached 5 min via `unstable_cache`:

1. **LBMA gold (USD/oz)** — Stooq XAUUSD daily CSV. Free, no key.
2. **FX (KRW/USD)** — Frankfurter (ECB rates). Free, no key.
3. **Korea retail (KRW/g)** — currently a weekly-updated seed (`SEED_RETAIL_KRW_G`). Phase 2 wires a licensed feed.

Falls back gracefully when any feed fails. Health probe at `/api/health` shows per-feed status.

To update the retail seed: edit the constants at the top of `lib/pricing.ts`. Update `SEED_RETAIL_AS_OF` to today's date so the UI tells the truth.

---

## Storage layer

`lib/db/store.ts` is the unified persistence API:

```ts
createSignup(input, meta)    → CreateSignupResult
listSignups(limit)           → Signup[]
getSignupByEmail(email)      → Signup | null
getSignupById(id)            → Signup | null
getSignupCount()             → number
storageBackend()             → 'jsonl' | 'postgres'
```

**Phase 1:** writes to `.data/signups.jsonl` (gitignored).
**Phase 2:** when `DATABASE_URL` is set, swaps internals to `@neondatabase/serverless` queries against `customers` table.

Call sites do not change.

---

## Adding a new public page

```bash
# 1. Create app/<route>/page.tsx — keep the Ticker/Nav/Footer pattern
# 2. Add the route to components/Nav.tsx if it deserves nav placement
# 3. Add to components/Footer.tsx footer columns if relevant
# 4. typedRoutes will fail the build if any Link references a non-existent page
```

---

## Adding a new admin queue surface

```bash
# 1. Add demo data to lib/demo-ops.ts (function returning typed array)
# 2. Update getOpsStats() to derive count from new array
# 3. Create app/ops/(gated)/<surface>/page.tsx — use OpsTable, OpsTh, OpsTd, StatusPill
# 4. Add link to components/ops/OpsNav.tsx
# 5. Add Queue card to app/ops/(gated)/page.tsx overview
```

---

## Deploying to Vercel

Auto-deploys from `main`. Repo is wired; no further config needed.

If the project ever loses its framework setting:
- Settings → General → **Framework Preset:** Next.js
- Root Directory: blank (repo root)

`vercel.json` at repo root pins `framework: "nextjs"` as a belt-and-suspenders override.

---

## Common gotchas

- **typedRoutes errors with query strings:** Cast to `as never` or use `as Route`. Already handled in signup → welcome redirect.
- **Server Actions don't curl:** Smoke-test gated pages by minting a session cookie via `scripts/mint-session.mjs`. Real form submissions need browser or Playwright.
- **JSONL resets on each Vercel deploy:** Function disks are ephemeral. Phase 2 (Neon) fixes this.
- **Live pricing seeds:** If both gold and FX show `seed` in `/api/health`, Stooq/Frankfurter are blocked from your deploy region. Try a different region or vendor.
- **Theme switcher visible in production:** Set `NEXT_PUBLIC_THEME_SWITCHER=0` (or unset) in production env vars.
- **CRLF warnings on Windows:** Harmless. Git's autocrlf normalizes line endings.

---

## Health checks

```bash
# Public probe — no auth needed
curl https://goldpath-git-main-tkjintls-projects.vercel.app/api/health

# Should return:
# - ok: true
# - build: <commit SHA>
# - pricing.sources: { gold: 'live', fx: 'live', retail: 'seed' }
# - portals.admin: 'ok' (if ADMIN_TOKEN set)
# - signups: { count: N, capRemaining: 5000 - N }
```

---

## Next steps for the next session

See `docs/ROADMAP.md`. Highest impact:
1. Provision Neon Postgres (your action, ~2 min in Vercel dashboard)
2. Wire `lib/db/store.ts` to Neon (next dev session, swap JSONL for SQL)
3. Resend integration for signup confirmation email
4. Persona KYC kickoff at `/app/welcome` step 02
