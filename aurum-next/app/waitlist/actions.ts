'use server';

import { headers } from 'next/headers';
import { randomUUID } from 'node:crypto';
import {
  WaitlistSchema,
  deriveFlags,
  persistEntry,
  notifyOps,
  type StoredEntry,
} from '@/lib/waitlist';

export type SubmitState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitWaitlist(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = WaitlistSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Honeypot trip — silently accept (don't tell the bot)
  if (parsed.data._hp && parsed.data._hp.length > 0) {
    return { status: 'success', message: 'Thank you. We will be in touch.' };
  }

  const h = await headers();
  const entry: StoredEntry = {
    ...parsed.data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ip: h.get('x-forwarded-for') ?? undefined,
    userAgent: h.get('user-agent') ?? undefined,
    flags: deriveFlags(parsed.data),
  };

  try {
    await persistEntry(entry);
    await notifyOps(entry);
  } catch (err) {
    console.error('[waitlist] persist failure', err);
    return {
      status: 'error',
      message: 'Something went wrong on our side. Please try again.',
    };
  }

  return {
    status: 'success',
    message: entry.flags.krResident
      ? "Thank you. Aurum is not currently offered to Korean residents — we'll let you know when that changes."
      : 'Thank you. We will be in touch shortly.',
  };
}
