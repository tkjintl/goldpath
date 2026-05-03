-- ─────────────────────────────────────────────────────────────────────
-- GoldPath Postgres schema
--
-- Phase 2 target: Neon Postgres via Vercel Marketplace.
-- Run this against your DATABASE_URL once provisioned.
-- ─────────────────────────────────────────────────────────────────────

-- Strict mode helpers
SET client_min_messages = warning;

-- ─── Customers ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           CITEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  initials        TEXT NOT NULL,                 -- displayed in leaderboards
  founder_number  INTEGER UNIQUE,                -- 1..5000, null after cap
  phone_e164      TEXT,
  residence_iso   CHAR(2),                       -- 'KR', 'US', etc.
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','paused','closed','frozen')),
  CHECK (founder_number IS NULL OR (founder_number BETWEEN 1 AND 5000))
);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

-- ─── KYC ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kyc (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vendor            TEXT NOT NULL DEFAULT 'persona',
  vendor_ref        TEXT,
  status            TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','in_review','edd_required','approved','rejected')),
  flags             JSONB NOT NULL DEFAULT '[]',
  decision_at       TIMESTAMPTZ,
  decision_by       TEXT,                          -- ops user
  source_of_funds   JSONB,
  pep_check         BOOLEAN NOT NULL DEFAULT FALSE,
  sanctions_check   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_kyc_customer ON kyc(customer_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON kyc(status);

-- ─── Subscriptions ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  tier            TEXT NOT NULL CHECK (tier IN ('I','II','III','IV','V')),
  monthly_krw     BIGINT NOT NULL CHECK (monthly_krw > 0),
  debit_day       INTEGER NOT NULL DEFAULT 5 CHECK (debit_day BETWEEN 1 AND 28),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','paused','cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  cancelled_at   TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_subs_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subs_status ON subscriptions(status);

-- ─── Ledger (append-only, source of truth) ───────────────────────────
-- Every gram movement, every KRW movement, posts here. Nothing
-- updates or deletes — corrections are explicit reversal entries.
CREATE TABLE IF NOT EXISTS ledger (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  entry_type        TEXT NOT NULL CHECK (entry_type IN (
                      'debit_received',      -- KRW landed at PG
                      'fx_executed',         -- KRW → USD
                      'buy_executed',        -- USD → unallocated XAU at fix
                      'allocate',            -- pool → per-customer
                      'credit_grant',        -- founders gift
                      'credit_vest',         -- founders gift vested portion
                      'credit_reverse',      -- early cancel → unvested reversed
                      'sellback',            -- grams → KRW out
                      'physical_withdrawal', -- grams → bar shipment
                      'heritage_transfer',   -- grams to beneficiary
                      'storage_fee',         -- bps charge
                      'reversal'             -- explicit correction
                    )),
  grams_delta       NUMERIC(18,6) NOT NULL DEFAULT 0,
  krw_delta         BIGINT NOT NULL DEFAULT 0,
  fx_rate           NUMERIC(12,6),
  fix_price_krw     NUMERIC(18,2),
  reference         TEXT,                       -- batch/withdrawal/etc id
  notes             TEXT,
  idempotency_key   TEXT UNIQUE,
  posted_by         TEXT,                       -- 'system' | ops user
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ledger_customer ON ledger(customer_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ledger_type ON ledger(entry_type);
CREATE INDEX IF NOT EXISTS idx_ledger_reference ON ledger(reference);

-- Append-only enforcement
CREATE OR REPLACE FUNCTION ledger_no_mutate() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'ledger entries are immutable; create a reversal entry instead';
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS ledger_no_update ON ledger;
DROP TRIGGER IF EXISTS ledger_no_delete ON ledger;
CREATE TRIGGER ledger_no_update BEFORE UPDATE ON ledger
  FOR EACH ROW EXECUTE FUNCTION ledger_no_mutate();
CREATE TRIGGER ledger_no_delete BEFORE DELETE ON ledger
  FOR EACH ROW EXECUTE FUNCTION ledger_no_mutate();

-- Materialized balance per customer — rebuildable from ledger any time
CREATE MATERIALIZED VIEW IF NOT EXISTS account_balance AS
SELECT
  customer_id,
  SUM(grams_delta)::NUMERIC(18,6) AS grams_owned,
  SUM(krw_delta)::BIGINT AS krw_balance,
  COUNT(*) AS entry_count,
  MAX(created_at) AS last_entry_at
FROM ledger
GROUP BY customer_id;
CREATE UNIQUE INDEX IF NOT EXISTS idx_account_balance_customer ON account_balance(customer_id);

-- ─── Settlement batches ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settlement_batches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_date      DATE NOT NULL UNIQUE,
  customer_count  INTEGER NOT NULL,
  total_krw       BIGINT NOT NULL,
  estimated_grams NUMERIC(18,6) NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','fix_taken','ledger_posted','failed')),
  fix_price_krw   NUMERIC(18,2),
  fix_taken_at    TIMESTAMPTZ,
  posted_at       TIMESTAMPTZ,
  bullion_bank_ticket TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Withdrawals ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS withdrawals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  type            TEXT NOT NULL CHECK (type IN ('sellback','physical_100g','physical_1kg','physical_10g','physical_1g','heritage')),
  grams           NUMERIC(18,6) NOT NULL CHECK (grams > 0),
  krw_estimate    BIGINT,
  status          TEXT NOT NULL DEFAULT 'pending_review'
                    CHECK (status IN ('pending_review','maker_approved','checker_approved','in_progress','completed','flagged','cancelled')),
  maker_user      TEXT,
  checker_user    TEXT,
  ship_to         JSONB,
  beneficiary_id  UUID,                         -- references heritage table
  flags           JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_withdrawals_customer ON withdrawals(customer_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);

-- ─── Heritage / beneficiaries ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS heritage_designations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  beneficiary_name TEXT NOT NULL,
  beneficiary_relation TEXT,
  beneficiary_contact JSONB NOT NULL,           -- email/phone
  beneficiary_kyc_id UUID REFERENCES kyc(id),   -- once they verify
  trigger_type    TEXT NOT NULL CHECK (trigger_type IN ('date','age','manual','estate')),
  trigger_value   TEXT,                          -- ISO date or age int or null
  partial_grams   NUMERIC(18,6),                 -- null = entire account
  certificate_message_encrypted BYTEA,           -- sealed
  status          TEXT NOT NULL DEFAULT 'pending_setup'
                    CHECK (status IN ('pending_setup','active','triggered','completed','cancelled')),
  triggered_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_heritage_customer ON heritage_designations(customer_id);

-- ─── Vault lots (Malca-Amit physical inventory) ──────────────────────
CREATE TABLE IF NOT EXISTS vault_lots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_ref         TEXT NOT NULL UNIQUE,
  refiner         TEXT NOT NULL,
  bar_size        TEXT NOT NULL,                  -- '1kg', '100g', etc.
  bar_count       INTEGER NOT NULL,
  total_grams     NUMERIC(18,6) NOT NULL,
  custody_date    DATE NOT NULL,
  vault           TEXT NOT NULL DEFAULT 'malca-amit-sgp',
  trustee_ref     TEXT,                           -- license trust beneficial title
  retired_at      TIMESTAMPTZ,                    -- when shipped/sold
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Compliance hits ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS compliance_hits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID REFERENCES customers(id) ON DELETE SET NULL,
  rule            TEXT NOT NULL,
  severity        TEXT NOT NULL CHECK (severity IN ('info','warn','critical')),
  description     TEXT NOT NULL,
  payload         JSONB,
  status          TEXT NOT NULL DEFAULT 'open'
                    CHECK (status IN ('open','investigating','cleared','reported')),
  cleared_by      TEXT,
  cleared_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_compliance_status ON compliance_hits(status);

-- ─── Audit attestations (Brink's quarterly) ─────────────────────────
CREATE TABLE IF NOT EXISTS audit_attestations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quarter         TEXT NOT NULL UNIQUE,           -- '2026Q1'
  auditor         TEXT NOT NULL DEFAULT 'brinks-sgp',
  attestation_pdf TEXT,                           -- Vercel Blob URL
  total_grams_attested NUMERIC(18,6) NOT NULL,
  variance_grams  NUMERIC(18,6) NOT NULL DEFAULT 0,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Pricing snapshots (historical) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_snapshots (
  id              BIGSERIAL PRIMARY KEY,
  taken_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  krx_krw_per_g   NUMERIC(18,2),
  retail_krw_per_g NUMERIC(18,2),
  aurum_krw_per_g NUMERIC(18,2),
  lbma_usd_per_oz NUMERIC(18,2),
  fx_krw_per_usd  NUMERIC(12,4),
  source          JSONB                            -- which feeds were live
);
CREATE INDEX IF NOT EXISTS idx_pricing_taken ON pricing_snapshots(taken_at DESC);

-- ─── Audit log (every admin action) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_audit (
  id              BIGSERIAL PRIMARY KEY,
  admin_user      TEXT NOT NULL,
  action          TEXT NOT NULL,
  target_type     TEXT,
  target_id       UUID,
  payload         JSONB,
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_user ON admin_audit(admin_user);

-- ─── Refresh helper ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION refresh_account_balance() RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY account_balance;
END;
$$ LANGUAGE plpgsql;

-- ─── Required Postgres extensions ───────────────────────────────────
-- Run once as a superuser in Neon:
--   CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid()
--   CREATE EXTENSION IF NOT EXISTS citext;     -- email column
