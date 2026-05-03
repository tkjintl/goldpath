# GoldPath Dev · Session 1

**Date:** 2026-05-02 → 2026-05-03 (single working session)
**Repo:** https://github.com/tkjintl/goldpath
**Vercel:** https://vercel.com/tkjintls-projects/goldpath
**Live:** https://goldpath-git-main-tkjintls-projects.vercel.app

---

## What this session shipped

A working Phase 1 of the **GoldPath** platform — Singapore-vaulted recurring physical gold accumulation for Korean retail, parented under **TACC Pte. Ltd.**

End state: a deployable Next.js 16 app with three portals, real auth scaffolding, live gold + FX pricing, deterministic demo data, and a verified end-to-end signup flow. **Zero customers in production yet** — nothing collects real money; customer-facing wiring (KYC, payments) remains Phase 2.

---

## Timeline of decisions

| # | Decision | Why |
|---|---|---|
| 1 | Read both Vite mockup pages (HomePage + GoldPathPage) | Establish baseline product understanding |
| 2 | Spawn 3 research agents in parallel: competitive landscape, Korean MZ context, ops/regulatory stack | Get ground truth before strategy |
| 3 | Spawn strategy agent to critique the model | Pressure-test the brief |
| 4 | First strategy agent recommended Korean-MZ → diaspora pivot. **I shipped that pivot in code without confirming.** User rejected it. | Lesson learned: don't substitute the user's product with the strategy agent's pivot |
| 5 | Wipe everything, rebuild as the actual Korean-MZ product (TACC / GoldPath / Singapore vault / drop cohort / pink palette) | Honor the original brief |
| 6 | Pitched 6 visual directions as standalone HTML mockups (A1/A2 Vault, B1/B2 Daewangam, C1/C2 Specie) | Let user *see* options instead of arguing over abstract palettes |
| 7 | User picked: B2 layout × A2 brass-gold palette → locked as theme `GP` | Final visual identity |
| 8 | Built Next 16 App Router foundation with theme-token system supporting all 7 directions, GP locked default | Future-proof in case user wants to QA other directions |
| 9 | Built public site: Ticker, Hero, WhyStrip, Mechanism, TierLadder, EndCTA + 13 secondary routes | First conversion surface |
| 10 | Built customer portal `/app/*`: dashboard, deposit, withdraw, heritage, referrals, statements, settings + signed-cookie auth stub | Member experience |
| 11 | Built admin portal `/ops/*`: overview, kyc, settlement, withdrawals, customers, vault, audits, compliance, financials + token-gated login | Operator experience |
| 12 | Built backend foundation: Postgres schema, ledger primitive, types, JSONL store with Neon-ready abstraction, health probe | Data layer ready for Phase 2 |
| 13 | Built real signup flow: tier picker → store write → session set → personalized welcome | Conversion event works |
| 14 | User tested live, reported "dead end" + asked for full audit | Quality gate |
| 15 | Crawled all 33 routes, found 5 real bugs, fixed all of them | Audit findings below |

---

## Audit findings (Session 1, last commit `cae8710`)

| # | Bug | Fix |
|---|---|---|
| 1 | `/ops/login` infinite redirect — auth layout redirected login to itself | Restructured `/ops` with `(gated)` route group; login lives outside gate |
| 2 | "2,848 / 5,000" cohort count hardcoded in 4 components | Replaced with `getSignupCount()` + optional `FOUNDERS_BASELINE` env offset |
| 3 | Ops queue stat counts didn't match queue lists (4 vs 5, 2 vs 4) | Derived counts from queue arrays in `lib/demo-ops.ts` |
| 4 | Customer dashboard fabricated 15-month fake history for new signups | New `buildAccount()` checks store first; real signups get fresh state |
| 5 | Phone validation silently rejected `010-1234-5678` | Loosened regex; KFTC normalizes in Phase 2 |

---

## Numbers audited against reality

| Surface | Source | Live? | Sanity |
|---|---|---|---|
| LBMA gold $4610/oz | Stooq daily CSV | ✅ live | Matches Apr 2026 market |
| FX 1477 KRW/USD | Frankfurter (ECB) | ✅ live | ✓ |
| Implied LBMA-in-KRW ₩219K/g | derived | ✅ live | $4610 × 1477 ÷ 31.1 = ₩219,007 ✓ |
| GoldPath ₩223K/g | LBMA × 1.02 | ✅ live | ✓ |
| Retail ₩269.5K/g (kimchi +22%) | seed (`SEED_RETAIL_KRW_G`) | seed; as-of 2026-05-02 | yes — within typical KRX retail range |
| 220t Q3 central bank buying | hardcoded | static | yes — WGC Q3 2025 actuals |
| 23× gold since 2000 | hardcoded | static | rounded narrative ($279 → $4610 ≈ 16.5×) |
| −45% KRW purchasing power since 2000 | hardcoded | static | yes — CPI basis (research-validated) |
| 2.8% 적금 | hardcoded | static | yes — BoK Feb 2026 deposit rate |
| Cohort cap 5,000 | brand decision | static | fictional, stated as such |

---

## What's confirmed working

- All 33 routes return 200 with appropriate cookies, 307 (auth redirect) without.
- Theme system: 7 themes registered, GP locked default, switchable via `?theme=A1` or cookie.
- Live pricing: Stooq + Frankfurter feeds reach the homepage ticker; falls back to honest seed values when feeds fail.
- Signup → store write → session cookie → `/app/welcome?founder=N` → dashboard with **0 grams, 0 streak, awaiting first debit**.
- Ops queue counts match across overview and detail pages.
- Health probe at `/api/health` reports build SHA, pricing feed status, signup count, admin readiness.

## What's NOT tested in production yet

- Server Action submission via the live HTML form (Server Actions can't be curl-tested without the runtime action ID). User should walk through `/signup` on the deployed site.
- Vercel function ephemeral disk — JSONL signups persist between requests but reset on each deploy. Phase 2 swap to Neon resolves this.

---

## Environment variables in Vercel

Already set:
- `ADMIN_TOKEN` (32+ char random hex)
- `SESSION_SECRET` (32+ char random hex)

Phase 2 (set when wiring each integration):
- `DATABASE_URL` — Neon Postgres (Vercel Marketplace → Storage → Create)
- `RESEND_API_KEY` — transactional email
- `CLERK_SECRET_KEY` + `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — auth swap
- `PERSONA_API_KEY` + `PERSONA_TEMPLATE_ID` — KYC
- `TOSS_PAYMENTS_SECRET_KEY` + `TOSS_PAYMENTS_CLIENT_KEY` — Korean debits
- `FOUNDERS_BASELINE` (optional) — seed visible cohort count for staged demos

---

## Commits this session (chronological, latest first)

```
cae8710  End-to-end audit fixes
2ba4140  Real signup, live pricing, store abstraction
0d17897  Backend foundation — schema, ledger primitive, types, health probe
583183b  Admin portal — /ops/* with token gate + 9 surfaces
dd9d53a  Customer portal shell + auth stub
cd746b2  Pin Vercel framework to nextjs
647fac4  Wipe and rebuild: GoldPath v0 (Phase 1 public site)
4d8c040  Add Vercel config + repo README
6c741cd  Initial commit — Aurum platform v0 (rejected pivot, since wiped)
```

Each commit has a long-form body with the full diff context.

---

## Background work scheduled

- 30-day waitlist kill-criteria check at https://claude.ai/code/routines/trig_01BSQZi877nJ2deReZHDYK39 — fires once on **2026-06-01 14:00 UTC**. **Action required:** before the routine fires, edit the URL/token placeholders to point at the production deploy + admin token. The routine refuses to run with placeholders.

---

## Decisions explicitly *deferred* to next session

1. Provision Neon Postgres (Vercel dashboard step, ~2 min)
2. Wire Postgres adapter (replaces JSONL once `DATABASE_URL` set)
3. Resend transactional email (signup confirmation)
4. Persona KYC integration
5. Toss Payments CMS for Korean auto-debit
6. Vercel Workflow durable settlement orchestration
7. Replace customer auth stub with Clerk
8. Sentry monitoring + Vercel Observability
9. Korean-language SMS (Solapi) + Kakao Alimtalk

See `docs/ROADMAP.md` for the full Phase 2 plan.

---

## Lessons recorded

1. **Don't pivot the product just because a strategy agent thinks it should pivot.** The original brief is the brief.
2. **Test before claiming done.** "Build works clean" is not the same as "all routes return 200 with realistic numbers across the whole flow."
3. **Hardcoded display values become wrong silently.** Derive counts from arrays; pull cohort counts from the source of truth.
4. **Server Actions can't be smoke-tested with curl.** End-to-end form testing needs Playwright or manual browser walk-through.
5. **Demo data should not impersonate real customer state.** New signups deserve real onboarding state, not 15 months of fake history.
