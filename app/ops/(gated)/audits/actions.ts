'use server';

// ─────────────────────────────────────────────────────────────────────
// Audits Server Actions — Phase 1
//
// NOTE (option-c demo caveat): no real file upload yet. This action
// records that an admin clicked "publish quarterly Brink's report"
// with placeholder metadata so the audit pipeline is exercised
// end-to-end. Phase 2 will accept a Vercel Blob upload, compute SHA-256,
// then INSERT into audit_reports + write the audit log entry in one
// transaction.
// ─────────────────────────────────────────────────────────────────────

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin';
import { recordAdminAction } from '@/lib/admin-audit';

const UploadInput = z.object({
  quarter: z.string().min(1),
  sha: z.string().min(1),
  fileName: z.string().min(1),
});

export async function uploadAuditReportAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = UploadInput.safeParse({
    quarter: formData.get('quarter') ?? 'Q3-2026',
    sha: formData.get('sha') ?? 'pending',
    fileName: formData.get('fileName') ?? 'pending-upload.pdf',
  });
  if (!parsed.success) {
    throw new Error('INVALID_INPUT: ' + parsed.error.message);
  }
  const { quarter, sha, fileName } = parsed.data;

  await recordAdminAction({
    actor: 'admin',
    action: 'audits.upload',
    target: quarter,
    meta: { quarter, sha, fileName },
  });

  revalidatePath('/ops/audits');
  revalidatePath('/ops/audit-log');
}
