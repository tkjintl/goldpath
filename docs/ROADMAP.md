# GoldPath · Roadmap

Where we are, what's next, in priority order.

---

## Phase 1 — public site + portal shells (DONE)

**Status:** Live at https://goldpath-git-main-tkjintls-projects.vercel.app
**Commit:** `cae8710` (audit fixes)

| Surface | Status |
|---|---|
| Public landing + 14 secondary routes | ✅ |
| Customer portal `/app/*` (8 routes) | ✅ shell, demo data |
| Admin portal `/ops/*` (10 routes) | ✅ shell, demo data |
| Auth (signed-cookie stub) | ✅ |
| Theme system (7 directions, GP locked) | ✅ |
| Live pricing oracle | ✅ |
| Real signup → store → welcome flow | ✅ |
| Postgres schema + ledger primitive | ✅ written, not yet wired |
| Health probe `/api/health` | ✅ |

---

## Phase 2 — make money flow

The Phase 2 unlock list, in dependency order. Each item is sized as a single dev session.

### 2A · Persistence

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Provision Neon Postgres via Vercel Marketplace | user | 2 min | Vercel dashboard → Storage → Create → Neon → Free tier. Auto-injects `DATABASE_URL` and 4–5 related vars |
| Run `lib/db/schema.sql` against new database | dev | 15 min | Use Neon SQL editor or `psql` |
| Wire `lib/db/store.ts` JSONL → Neon adapter | dev | 1 session | Swap internal writes; call sites unchanged |
| Migrate any test signups from JSONL to Postgres | dev | 30 min | One-shot script |
| Update health probe to verify table reads | dev | 10 min | |

### 2B · Customer comms

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Resend account + API key | user | 2 min | https://resend.com/api-keys (free tier 100/day) |
| Add `RESEND_API_KEY` to Vercel | user | 1 min | |
| Wire signup confirmation email | dev | 1 session | Server Action posts to Resend; HTML template + Korean copy |
| Quarterly Brink's audit publication email | dev | 1 session | Triggered from `/ops/audits` upload flow |
| Solapi (Korean SMS) for KYC step | dev | 1 session | Phase 2C dependency |
| Kakao Alimtalk integration | dev | 1 session | Optional but heavily preferred by Korean MZ |

### 2C · Identity (KYC)

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Persona sandbox account | user | 15 min | https://withpersona.com — sandbox is free |
| Choose verification template (passport + liveness + sanctions) | user + dev | 30 min | |
| Add `PERSONA_API_KEY` + `PERSONA_TEMPLATE_ID` to Vercel | user | 1 min | |
| Wire `/app/welcome` step 02 → Persona inquiry | dev | 1 session | Embedded inquiry, webhook receives result |
| `/ops/kyc` queue reads real Persona statuses | dev | 1 session | Replace demo data |
| EDD trigger for Sovereign tier (₩5M+/mo) | dev | 1 session | Source-of-funds doc upload |

### 2D · Korean payments rail

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Toss Payments merchant onboarding | user | 1–2 weeks | Real biz docs required: 사업자등록증, 통장사본, 대표자 신분증, 법인등기부등본 |
| Sandbox API keys | user | 30 min | After approval |
| Wire `/app/welcome` step 03 → Toss Billing customer creation | dev | 1 session | Recurring auto-debit (자동이체) registration via CMS |
| Webhook handler for debit success/failure | dev | 1 session | Triggers settlement workflow |
| Failed-debit recovery flow | dev | 1 session | Pause subscription, notify, retry |

### 2E · Settlement workflow

The monthly batch: collect KRW → FX to USD → buy unallocated XAU at LBMA fix → allocate to bullion bars → post per-customer ledger entries.

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Vercel Workflow durable job | dev | 2 sessions | Crash-safe, idempotent, retries |
| Bullion bank API integration (StoneX or ICBC Standard) | user + dev | 2–4 weeks | Account opening + connectivity |
| Manual ops control panel for each step | dev | 1 session | `/ops/settlement` actually does the work |
| Integration with `lib/ledger.ts` `recordMonthlyDebit()` | dev | already done | Call sites ready |
| Sanity checks (variance, sanctions, fix-staleness) | dev | 1 session | |

### 2F · Auth swap

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Clerk app + KFTC connector | user | 1 hour | https://dashboard.clerk.com |
| Add Clerk env vars to Vercel | user | 1 min | |
| Replace `lib/auth.ts` internals with Clerk SDK | dev | 1 session | Public API stays the same |
| Add Korean phone + passkey + MFA | dev | 1 session | |
| Migrate signup flow to Clerk-managed identity | dev | 1 session | |

### 2G · Vault + insurance + audit

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Malca-Amit account opening | user | 4–8 weeks | KYC on UBOs, AML program, insurance binder |
| Lloyd's specie binder via Price Forbes | user | 4–8 weeks | Tightening capacity post-2025 rally; expect 25–40 bps initially |
| SG-licensed trustee selection (Equiom / Vistra / Trident) | user | 2–4 weeks | Customer title separation from Aurum estate |
| Wire ops portal to receive/upload Brink's quarterly PDFs | dev | 1 session | Vercel Blob storage + customer email blast |
| `/ops/vault` reconciliation against Malca-Amit statement API | dev | 1 session | If they have one; otherwise CSV import |

### 2H · Observability + production hardening

| Step | Owner | Effort | Notes |
|---|---|---|---|
| Sentry account | user | 5 min | Free tier ample for this stage |
| Wire Sentry into Server Actions + API routes | dev | 1 session | |
| Vercel Observability + Speed Insights | user | 0 (built in, just enable) | |
| Vercel BotID on `/signup` and `/login` | user + dev | 30 min | Bot defense |
| Rate limiting on Server Actions | dev | 1 session | Vercel Firewall rules |
| Audit logging — every admin action to `admin_audit` table | dev | 1 session | Already in schema, needs wire-up |

---

## Phase 3 — distribution + growth

| Initiative | Notes |
|---|---|
| Public launch + paid acquisition | Korean KAKAO ads, Naver Ads, Threads/X, MZ creators |
| Korean tax handler | 해외금융계좌 신고 helper for accounts >₩5억 |
| Heritage product polish | Beneficiary inquiry flow, certificate PDF generator, sealed-envelope shipping |
| Referral program engine | Code-based, 1-tier-only (anti-MLM), commission caps |
| Mobile app (PWA) | Just `next-pwa` + service worker — no native needed for v1 |
| Multi-language: English + Japanese | Korean expat market in Japan, US East Coast |

---

## Phase 4 — products beyond GoldPath

The TACC umbrella has room. Speculative:

- **Silver Path** — same mechanic, silver instead of gold. Higher volatility, smaller AOV, larger TAM.
- **Heritage marketplace** — third-party gold gifting between members.
- **Allocated-gold-backed lending** — borrow KRW against your allocated balance (asset-backed loan).
- **Yield product** — gold leasing to refiners (Monetary Metals model). Real institutional product, real regulatory complexity.

These come AFTER 1,000 paying GoldPath customers and a working settlement loop.

---

## Decisions still needed from operator

1. **Domain.** `goldpath.kr`? `goldpath.com`? `tacc.gold`? Decision affects branding everywhere.
2. **Korean entity strategy.** Foreign solicitation under FISA Article 444 requires either (a) a Korean license, (b) partnership with a Korean licensed counterparty, or (c) operating only via reverse-solicitation. **Pick one before any ad spend.**
3. **Founders cap commitment.** "5,000 永久 마감" is a marketing promise. Once made publicly, you can't break it. Confirm or adjust before launch.
4. **Free credit liability accounting.** ₩50K Bronze gift × 5,000 founders × Bronze share = up to ₩50M+ in gift expense. Sovereign tier alone could be ₩125M (₩2.5M × 50). Reserve this on day one.

---

## Ready-to-execute now (no external blockers)

These I can do in the next session without anything from you:

- **Bug audit + UI polish** — second pass with Playwright for actual form testing
- **Improve calculator** — currently a stub; build the real monthly→grams→years projection
- **Add /ops/signups page** — admin view of recent signups (currently buried in /api/admin)
- **OG image** — 1200×630 dynamic image for social shares
- **Sitemap + robots.txt** — for SEO once domain is live
- **Korean copy review** — second pass for tone consistency, MZ register, and accuracy
- **Admin audit log wiring** — the `admin_audit` table is in schema but not yet written to
- **Account balance materialized view refresh trigger** — schema-defined, needs wire-up

Tell me which to do next.
