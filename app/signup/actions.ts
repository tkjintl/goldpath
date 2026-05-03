'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupSchema, createSignup } from '@/lib/db/store';
import { setSession } from '@/lib/auth';

export type SignupState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const TIER_MIN: Record<'I' | 'II' | 'III' | 'IV' | 'V', number> = {
  I: 200_000,
  II: 500_000,
  III: 1_000_000,
  IV: 2_000_000,
  V: 5_000_000,
};

export async function submitSignup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const tier = String(formData.get('tier') || '') as 'I' | 'II' | 'III' | 'IV' | 'V';
  const monthlyKrwInput = String(formData.get('monthlyKrw') || '');
  const monthlyKrw = parseInt(monthlyKrwInput.replace(/[^\d]/g, ''), 10) || 0;
  const phoneRaw = String(formData.get('phoneE164') || '').trim();
  const phoneE164 = phoneRaw ? phoneRaw : undefined;

  const raw = {
    email: String(formData.get('email') || '').trim().toLowerCase(),
    name: String(formData.get('name') || '').trim(),
    phoneE164,
    residenceIso: String(formData.get('residenceIso') || ''),
    tier,
    monthlyKrw,
    motivation: String(formData.get('motivation') || '').trim() || undefined,
    source: String(formData.get('source') || '').trim() || undefined,
  };

  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: '입력 내용을 확인해주세요',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Tier minimum check
  const min = TIER_MIN[parsed.data.tier];
  if (parsed.data.monthlyKrw < min) {
    return {
      status: 'error',
      message: `${parsed.data.tier} 등급 최소 월 ₩${(min / 1000).toLocaleString()}K 이상 필요`,
      fieldErrors: { monthlyKrw: ['below tier minimum'] },
    };
  }

  const h = await headers();
  const result = await createSignup(parsed.data, {
    ip: h.get('x-forwarded-for') ?? undefined,
    userAgent: h.get('user-agent') ?? undefined,
  });

  if (!result.ok) {
    return { status: 'error', message: result.error };
  }

  // Auto-login the new founder so they land on /app/welcome with a session.
  await setSession(parsed.data.email, parsed.data.name);

  redirect(`/app/welcome?founder=${result.signup.founderNumber}` as never);
}
