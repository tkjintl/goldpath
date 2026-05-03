'use server';

// ─────────────────────────────────────────────────────────────────────
// Settlement Server Actions — Phase 1
//
// NOTE (option-c demo caveat): demo data is read-only at module level;
// Phase 1 records the audit + revalidates and the row visually snaps
// back. Phase 2 will UPDATE settlement_runs.status='published' alongside
// the audit insert in a single Postgres transaction.
// ─────────────────────────────────────────────────────────────────────

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin';
import { recordAdminAction } from '@/lib/admin-audit';
import { getSettlementQueue } from '@/lib/demo-ops';

const PublishInput = z.object({
  id: z.string().min(1),
});

export async function publishSettlementAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = PublishInput.safeParse({ id: formData.get('id') });
  if (!parsed.success) {
    throw new Error('INVALID_INPUT: ' + parsed.error.message);
  }
  const { id } = parsed.data;

  const row = getSettlementQueue().find((b) => b.id === id);
  const totalKrw = row?.totalKRW ?? null;
  const totalGrams = row?.estimatedGrams ?? null;
  const fixDate = row?.date ?? null;

  await recordAdminAction({
    actor: 'admin',
    action: 'settlement.publish',
    target: id,
    meta: { runId: id, totalKrw, totalGrams, fixDate },
  });

  revalidatePath('/ops/settlement');
  revalidatePath('/ops/audit-log');
}
