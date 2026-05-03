'use server';

// ─────────────────────────────────────────────────────────────────────
// KYC Server Actions — Phase 1
//
// NOTE (option-c demo caveat): `lib/demo-ops.ts` returns a fresh array
// each call, so any in-memory mutation here would not persist across
// requests. Phase 1 therefore only writes to the audit log + revalidates;
// the visible queue snaps back on refresh. Phase 2 (Postgres) replaces
// `getKycQueue()` with a real query and the same Server Action will
// perform an UPDATE in the same transaction as the audit insert.
// ─────────────────────────────────────────────────────────────────────

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin';
import { recordAdminAction } from '@/lib/admin-audit';
import { getKycQueue } from '@/lib/demo-ops';

const ApproveInput = z.object({
  id: z.string().min(1),
});

export async function approveKycAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = ApproveInput.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    throw new Error('INVALID_INPUT: ' + parsed.error.message);
  }
  const { id } = parsed.data;

  const row = getKycQueue().find((k) => k.id === id);
  const tier = row?.tier ?? null;
  const prevStatus = row?.status ?? null;

  await recordAdminAction({
    actor: 'admin',
    action: 'kyc.approve',
    target: id,
    meta: { tier, prevStatus },
  });

  revalidatePath('/ops/kyc');
  revalidatePath('/ops/audit-log');
}
