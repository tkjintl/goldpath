import { z } from 'zod';
import { promises as fs } from 'node:fs';
import path from 'node:path';

// ─────────────────────────────────────────────────────────────────────
// Waitlist schema
// Required fields tuned for the 90-day diaspora demand test.
// ─────────────────────────────────────────────────────────────────────
export const WaitlistSchema = z.object({
  // Identity
  email: z.string().email().max(254),
  fullName: z.string().min(1).max(120),

  // Eligibility — gates the diaspora target
  residence: z.enum(['US', 'CA', 'SG', 'HK', 'KR', 'OTHER']),
  koreanHeritage: z.enum(['self', 'spouse', 'parent', 'none']),

  // Deposit intent — the signal
  initialDeposit: z.enum(['<1K', '1K-5K', '5K-25K', '25K-100K', '100K+']),
  monthlyContribution: z.enum(['none', '<500', '500-2K', '2K-10K', '10K+']),

  // Heritage interest (D3 thesis test)
  heritageInterest: z.enum(['primary', 'secondary', 'not-now']),

  // Why — open text, what they're solving
  motivation: z.string().min(10).max(1000),

  // Source
  referral: z.string().max(120).optional(),

  // Honeypot — must be empty
  _hp: z.string().max(0).optional(),
});

export type WaitlistEntry = z.infer<typeof WaitlistSchema>;

export type StoredEntry = WaitlistEntry & {
  id: string;
  createdAt: string;
  ip?: string;
  userAgent?: string;
  // Derived flags for ops triage
  flags: {
    eligible: boolean;
    highIntent: boolean;
    heritagePrimary: boolean;
    krResident: boolean;
  };
};

export function deriveFlags(e: WaitlistEntry) {
  const eligible = ['US', 'CA', 'SG', 'HK'].includes(e.residence);
  const highIntent =
    ['5K-25K', '25K-100K', '100K+'].includes(e.initialDeposit) ||
    ['2K-10K', '10K+'].includes(e.monthlyContribution);
  return {
    eligible,
    highIntent,
    heritagePrimary: e.heritageInterest === 'primary',
    krResident: e.residence === 'KR',
  };
}

// ─────────────────────────────────────────────────────────────────────
// Storage adapter — JSONL fallback when DATABASE_URL is unset.
// Phase 2 swaps to Neon Postgres without changing call sites.
// ─────────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), '.data');
const FILE = path.join(DATA_DIR, 'waitlist.jsonl');

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function persistEntry(entry: StoredEntry): Promise<void> {
  if (process.env.DATABASE_URL) {
    // TODO Phase 2: Neon Postgres insert
    // For now we still also log locally so dev can inspect.
  }
  await ensureDir();
  await fs.appendFile(FILE, JSON.stringify(entry) + '\n', 'utf8');
}

export async function readAll(): Promise<StoredEntry[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredEntry);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────
// Notification stub — Resend goes here in Phase 2.
// ─────────────────────────────────────────────────────────────────────
export async function notifyOps(entry: StoredEntry): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[waitlist] new entry (Resend unset):', entry.id, entry.email);
    return;
  }
  // TODO: Resend send to ops@ + confirm to user
  console.log('[waitlist] would send Resend notifications for', entry.id);
}
