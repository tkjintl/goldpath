# aurum-next

Phase 1 of the Aurum platform — diaspora-pivoted waitlist surface.

This is the Next.js 16 rebuild of the marketing site, repositioned per the strategy critique:
**Korean diaspora (US/CA/SG/HK), heritage gifting as the wedge, no Korean-resident solicitation,
no drop-cohort scarcity, no leaderboard.** The original Vite mockup at `../src` is kept
intact as the v0 design reference.

## Scope shipped in Phase 1

- `/` — diaspora landing (Hero, Wedge, ProofStrip, Heritage, Mechanism, Honest, CTA)
- `/heritage` — feature page for the differentiator
- `/waitlist` — application form with deposit-intent question (the actual demand test)
- `/trust/*` — six transparency pages (vault, insurance, audits, regulators, team, bankruptcy)
- `/disclosure-kr` — Korean-residents disclosure (not soliciting)
- `/api/waitlist` GET — admin JSON dump (token-gated)
- Server Action `submitWaitlist` — Zod-validated, JSONL-persisted, Resend-ready

## What is **not** in Phase 1

- KYC, auth, dashboards, recurring debit, ledger, withdrawal, beneficiary flow.
  These are Phases 2–4 per the platform plan.
- Database — falls back to `.data/waitlist.jsonl` until `DATABASE_URL` is wired.
- Resend / BotID / Persona — env-gated stubs in place; integrate before public launch.

## Run locally

```bash
cd aurum-next
npm install
cp .env.example .env.local       # fill in ADMIN_TOKEN at minimum
npm run dev
```

App runs on <http://localhost:3000>.

## Inspect waitlist entries

```bash
curl "http://localhost:3000/api/waitlist?token=$ADMIN_TOKEN" | jq
```

Returns counts (eligible / high-intent / heritage-primary / KR-resident) plus all entries
sorted high-intent first. This is the operator console v0 — replace with a real `/ops` UI
in Phase 2.

## The 90-day demand test

The waitlist form intentionally asks deposit intent and heritage interest. Pass criteria:

- 500+ submissions
- 50+ "high-intent" (initial deposit ≥ $5K **or** monthly ≥ $2K)
- 20+ "heritage-primary"

Below those numbers in 90 days, the diaspora-heritage thesis is wrong and the project
should be reconsidered, not iterated. (Strategy critique, §5.)

## Phase 2 plumbing on deck

- Migrate persistence to Neon Postgres (Vercel Marketplace)
- Wire Resend for waitlist confirmation + ops notification
- Add Vercel BotID on `/waitlist` POST
- Auth (Clerk) + KYC (Persona) + Stripe ACH + Server Actions for funding
- Vercel Workflow for buy → hedge → allocate orchestration
- Operator console at `/ops` with maker/checker for withdrawals

## Relationship to the original Vite mockup

The Vite app at `goldpath/src/` retains the full design system, the `_goldpath_merged`
calculator, and the original Korean-MZ drop framing. It stays as a design reference and
is **not** the production target. When we are ready to retire it, we move the Vercel
deploy to point at `aurum-next/`.

Strategy: don't ship the Korean-MZ framing. Don't market to Korean residents. Don't
pretend "spot+2%" beats KRX gold. Build the diaspora heritage product, run the demand
test honestly, and let the numbers decide the next phase.
