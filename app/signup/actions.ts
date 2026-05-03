'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupSchema, createSignup } from '@/lib/db/store';
import { setSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

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
  // Rate limit before doing any work — 5 attempts per 60s per IP+UA.
  const hdrs = await headers();
  const xff = hdrs.get('x-forwarded-for') ?? '';
  const ip = (xff.split(',')[0] ?? '').trim() || hdrs.get('x-real-ip') || 'unknown';
  const uaPrefix = (hdrs.get('user-agent') ?? '').slice(0, 64);
  const rl = rateLimit({ key: `signup:${ip}:${uaPrefix}`, limit: 5, windowSec: 60 });
  if (!rl.ok) {
    return {
      status: 'error',
      message: `요청이 너무 많습니다. ${rl.retryAfterSec}초 후 다시 시도해 주세요.`,
    };
  }

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

  const result = await createSignup(parsed.data, {
    ip: hdrs.get('x-forwarded-for') ?? undefined,
    userAgent: hdrs.get('user-agent') ?? undefined,
  });

  if (!result.ok) {
    return { status: 'error', message: result.error };
  }

  // Auto-login the new founder so they land on /app/welcome with a session.
  await setSession(parsed.data.email, parsed.data.name);

  redirect(`/app/welcome?founder=${result.signup.founderNumber}` as never);
}
