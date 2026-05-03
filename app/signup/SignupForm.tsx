'use client';

import { useActionState, useState } from 'react';
import { submitSignup, type SignupState } from './actions';

const TIERS: { v: 'I' | 'II' | 'III' | 'IV' | 'V'; ko: string; en: string; min: number; gift: string }[] = [
  { v: 'I', ko: '브론즈', en: 'Bronze', min: 200_000, gift: '₩50K' },
  { v: 'II', ko: '실버', en: 'Silver', min: 500_000, gift: '₩150K' },
  { v: 'III', ko: '골드', en: 'Gold', min: 1_000_000, gift: '₩400K' },
  { v: 'IV', ko: '플래티넘', en: 'Platinum', min: 2_000_000, gift: '₩1M' },
  { v: 'V', ko: '소브린', en: 'Sovereign', min: 5_000_000, gift: '₩2.5M' },
];

const initial: SignupState = { status: 'idle' };

export function SignupForm() {
  const [state, action, pending] = useActionState(submitSignup, initial);
  const [tier, setTier] = useState<'I' | 'II' | 'III' | 'IV' | 'V'>('I');
  const [monthlyKrw, setMonthlyKrw] = useState<number>(200_000);

  const tierMin = TIERS.find((t) => t.v === tier)!.min;

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Tier picker */}
      <fieldset style={{ border: 'none' }}>
        <legend style={legendStyle}>§ I · 등급 선택 · CHOOSE TIER</legend>
        <div
          className="gp-signup-tier-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 8,
            marginTop: 14,
          }}
        >
          {TIERS.map((t) => {
            const active = tier === t.v;
            return (
              <button
                type="button"
                key={t.v}
                onClick={() => {
                  setTier(t.v);
                  setMonthlyKrw(t.min);
                }}
                style={{
                  background: active ? 'var(--accent)' : 'var(--bg-2)',
                  color: active ? 'var(--inv-ink)' : 'var(--ink)',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--rule-strong)'}`,
                  padding: '18px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 32,
                    lineHeight: 1,
                    fontWeight: 500,
                    color: active ? 'var(--inv-ink)' : 'var(--accent)',
                  }}
                >
                  {t.v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-krs)',
                    fontWeight: 500,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  {t.ko}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    color: active ? 'var(--inv-ink)' : 'var(--ink-3)',
                    marginTop: 6,
                  }}
                >
                  ₩{(t.min / 1000).toLocaleString()}K+
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 16,
                    color: active ? 'var(--inv-ink)' : 'var(--accent)',
                    marginTop: 10,
                    fontWeight: 500,
                  }}
                >
                  + {t.gift}
                </div>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="tier" value={tier} />
      </fieldset>

      {/* Monthly amount */}
      <Field
        label="월 자동이체 금액 · MONTHLY DEBIT (KRW)"
        name="monthlyKrw"
        type="text"
        value={monthlyKrw.toLocaleString('ko-KR')}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/[^\d]/g, ''), 10) || 0;
          setMonthlyKrw(n);
        }}
        hint={`최소 ₩${(tierMin / 1000).toLocaleString()}K · 단계 변경 시 자동 조정`}
        error={state.fieldErrors?.monthlyKrw?.[0]}
      />

      {/* Identity */}
      <fieldset style={{ border: 'none' }}>
        <legend style={legendStyle}>§ II · 본인 정보 · IDENTITY</legend>
        <div style={{ display: 'grid', gap: 16, marginTop: 14 }}>
          <Field label="이름 · NAME" name="name" type="text" required placeholder="홍길동" error={state.fieldErrors?.name?.[0]} />
          <Field label="이메일 · EMAIL" name="email" type="email" required placeholder="you@domain.com" error={state.fieldErrors?.email?.[0]} />
          <Field label="휴대폰 · PHONE (E.164, optional)" name="phoneE164" type="text" placeholder="+821012345678" error={state.fieldErrors?.phoneE164?.[0]} />
          <Select
            label="거주 국가 · RESIDENCE"
            name="residenceIso"
            required
            error={state.fieldErrors?.residenceIso?.[0]}
            options={[
              { v: '', l: '선택…' },
              { v: 'KR', l: '대한민국' },
              { v: 'US', l: 'United States' },
              { v: 'SG', l: 'Singapore' },
              { v: 'HK', l: 'Hong Kong' },
              { v: 'CA', l: 'Canada' },
              { v: 'JP', l: 'Japan' },
              { v: 'OTHER', l: '기타 · Other' },
            ]}
          />
        </div>
      </fieldset>

      {/* Open response */}
      <fieldset style={{ border: 'none' }}>
        <legend style={legendStyle}>§ III · 가입 사유 · WHY (OPTIONAL)</legend>
        <div style={{ marginTop: 14 }}>
          <textarea
            name="motivation"
            rows={4}
            placeholder="솔직하게 한 두 줄. 모든 응답은 직접 읽습니다."
            style={{
              ...inputStyle,
              resize: 'vertical',
              minHeight: 100,
            }}
          />
        </div>
      </fieldset>

      <Field
        label="추천 · 어떻게 알게 되셨나요? (OPTIONAL)"
        name="source"
        type="text"
        placeholder="친구, 검색, SNS…"
      />

      {/* Error banner */}
      {state.status === 'error' && state.message && (
        <div
          style={{
            background: 'color-mix(in srgb, var(--red) 8%, transparent)',
            border: '1px solid var(--red)',
            color: 'var(--red)',
            padding: 14,
            fontFamily: 'var(--font-kr)',
            fontSize: 14,
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          background: 'var(--accent)',
          color: 'var(--inv-ink)',
          padding: '20px 28px',
          fontFamily: 'var(--font-kr)',
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: '0.06em',
          borderRadius: 2,
          marginTop: 8,
          opacity: pending ? 0.5 : 1,
          cursor: pending ? 'wait' : 'pointer',
        }}
      >
        {pending ? '제출 중…' : '파운더스 합류 →'}
      </button>

      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 12,
          color: 'var(--ink-3)',
          lineHeight: 1.6,
          marginTop: 8,
        }}
      >
        제출 후 본인인증 (KYC) 절차로 안내됩니다. 자동이체는 본인인증 완료 후 다음 5일에 시작됩니다.
        Phase 2: KYC + 자동이체 결제 라이브.
      </div>
    </form>
  );
}

const legendStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.32em',
  color: 'var(--accent)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg)',
  border: '1px solid var(--rule-strong)',
  color: 'var(--ink)',
  padding: '14px 16px',
  fontFamily: 'var(--font-sans)',
  fontSize: 15,
  borderRadius: 2,
};

function Field({ label, hint, error, ...rest }: { label: string; hint?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
        }}
      >
        {label} {rest.required && <span>*</span>}
      </span>
      <input {...rest} style={inputStyle} />
      {hint && (
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 12, color: 'var(--ink-3)' }}>
          {hint}
        </span>
      )}
      {error && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)' }}>{error}</span>}
    </label>
  );
}

function Select({
  label,
  options,
  required,
  error,
  ...rest
}: {
  label: string;
  options: { v: string; l: string }[];
  required?: boolean;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
        }}
      >
        {label} {required && <span>*</span>}
      </span>
      <select {...rest} required={required} defaultValue="" style={inputStyle}>
        {options.map((o) => (
          <option key={o.v} value={o.v} disabled={o.v === ''} style={{ background: 'var(--bg)' }}>
            {o.l}
          </option>
        ))}
      </select>
      {error && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)' }}>{error}</span>}
    </label>
  );
}
