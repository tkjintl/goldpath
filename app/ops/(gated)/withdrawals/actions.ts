'use server';

// ─────────────────────────────────────────────────────────────────────
// Withdrawal Server Actions — Phase 1
//
// NOTE (option-c demo caveat): demo state is non-persistent. Phase 1
// only writes the audit + revalidates; the row visually snaps back on
// refresh. Phase 2 will UPDATE withdrawals.status='released' beside
// the audit insert in a single transaction.
// ─────────────────────────────────────────────────────────────────────

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin';
import { recordAdminAction } from '@/lib/admin-audit';
import { getWithdrawalQueue } from '@/lib/demo-ops';

const ReleaseInput = z.object({
  id: z.string().min(1),
});

export async function releaseWithdrawalAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = ReleaseInput.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    throw new Error('INVALID_INPUT: ' + parsed.error.message);
  }
  const { id } = parsed.data;

  const row = getWithdrawalQueue().find((w) => w.id === id);
  const amountGrams = row?.grams ?? null;
  const customerId = row ? `#${row.founderNumber}` : null;
  const mode = row?.type ?? null;

  await recordAdminAction({
    actor: 'admin',
    action: 'withdrawal.release',
    target: id,
    meta: { amountGrams, customerId, mode },
  });

  revalidatePath('/ops/withdrawals');
  revalidatePath('/ops/audit-log');
}
