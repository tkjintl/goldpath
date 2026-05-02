'use client';

import { useActionState } from 'react';
import { submitWaitlist, type SubmitState } from './actions';
import { T } from '@/lib/tokens';

const initial: SubmitState = { status: 'idle' };

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(submitWaitlist, initial);

  if (state.status === 'success') {
    return (
      <div
        style={{
          background: T.bg1,
          border: `1px solid ${T.goldBorder}`,
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 32,
            color: T.gold,
            marginBottom: 16,
          }}
        >
          Received.
        </div>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 16,
            color: T.sub,
            lineHeight: 1.7,
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          {state.message}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Honeypot */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: -10000, opacity: 0, height: 0, width: 0 }}
      />

      <Field
        label="Full name"
        name="fullName"
        type="text"
        required
        placeholder="Jane Park"
        error={state.fieldErrors?.fullName?.[0]}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        placeholder="you@domain.com"
        error={state.fieldErrors?.email?.[0]}
      />

      <Select
        label="Country of residence"
        name="residence"
        required
        options={[
          { v: '', l: 'Select…' },
          { v: 'US', l: 'United States' },
          { v: 'CA', l: 'Canada' },
          { v: 'SG', l: 'Singapore' },
          { v: 'HK', l: 'Hong Kong' },
          { v: 'KR', l: 'South Korea' },
          { v: 'OTHER', l: 'Other' },
        ]}
        error={state.fieldErrors?.residence?.[0]}
        hint="Aurum currently onboards US, CA, SG, HK residents only."
      />

      <Select
        label="Korean heritage"
        name="koreanHeritage"
        required
        options={[
          { v: '', l: 'Select…' },
          { v: 'self', l: 'I am Korean / Korean-descent' },
          { v: 'spouse', l: 'My spouse is Korean' },
          { v: 'parent', l: 'My parent is Korean' },
          { v: 'none', l: 'No heritage connection' },
        ]}
        error={state.fieldErrors?.koreanHeritage?.[0]}
      />

      <Select
        label="Initial deposit you're considering"
        name="initialDeposit"
        required
        options={[
          { v: '', l: 'Select…' },
          { v: '<1K', l: 'Less than $1,000' },
          { v: '1K-5K', l: '$1,000 – $5,000' },
          { v: '5K-25K', l: '$5,000 – $25,000' },
          { v: '25K-100K', l: '$25,000 – $100,000' },
          { v: '100K+', l: 'More than $100,000' },
        ]}
        error={state.fieldErrors?.initialDeposit?.[0]}
        hint="Honest answers help us prioritize. We will not share."
      />

      <Select
        label="Monthly contribution after that"
        name="monthlyContribution"
        required
        options={[
          { v: '', l: 'Select…' },
          { v: 'none', l: 'None — one-time only' },
          { v: '<500', l: 'Less than $500/mo' },
          { v: '500-2K', l: '$500 – $2,000/mo' },
          { v: '2K-10K', l: '$2,000 – $10,000/mo' },
          { v: '10K+', l: 'More than $10,000/mo' },
        ]}
        error={state.fieldErrors?.monthlyContribution?.[0]}
      />

      <Select
        label="How important is the heritage / gifting feature to you?"
        name="heritageInterest"
        required
        options={[
          { v: '', l: 'Select…' },
          { v: 'primary', l: 'Primary reason I am here' },
          { v: 'secondary', l: 'Nice to have' },
          { v: 'not-now', l: 'Not relevant right now' },
        ]}
        error={state.fieldErrors?.heritageInterest?.[0]}
      />

      <TextArea
        label="In your own words — why are you considering this?"
        name="motivation"
        required
        rows={5}
        placeholder="The honest answer. We read every one."
        error={state.fieldErrors?.motivation?.[0]}
      />

      <Field
        label="How did you hear about Aurum? (optional)"
        name="referral"
        type="text"
        placeholder="A friend, a newsletter, a search…"
      />

      {state.status === 'error' && state.message && (
        <div
          style={{
            background: 'rgba(248,113,113,0.06)',
            border: `1px solid ${T.red}`,
            color: T.red,
            padding: 14,
            fontFamily: T.sans,
            fontSize: 13,
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          background: pending ? T.goldD : T.gold,
          color: T.bg,
          padding: '18px 32px',
          fontFamily: T.sans,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.08em',
          borderRadius: 2,
          marginTop: 8,
          opacity: pending ? 0.6 : 1,
        }}
      >
        {pending ? 'SUBMITTING…' : 'REQUEST ACCESS →'}
      </button>

      <div
        style={{
          fontFamily: T.serif,
          fontStyle: 'italic',
          fontSize: 12,
          color: T.muted,
          lineHeight: 1.6,
          marginTop: 8,
        }}
      >
        Your information is stored encrypted and used only to evaluate your application.
        We do not sell, share, or send marketing email without your consent.
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Field primitives
// ─────────────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: T.bg,
  border: `1px solid ${T.border}`,
  color: T.text,
  padding: '14px 16px',
  fontFamily: T.sans,
  fontSize: 15,
  borderRadius: 2,
};
const labelStyle: React.CSSProperties = {
  fontFamily: T.mono,
  fontSize: 10,
  color: T.gold,
  letterSpacing: '0.22em',
  marginBottom: 8,
  display: 'block',
  textTransform: 'uppercase',
};
const hintStyle: React.CSSProperties = {
  fontFamily: T.serif,
  fontStyle: 'italic',
  fontSize: 12,
  color: T.muted,
  marginTop: 6,
};
const errorStyle: React.CSSProperties = {
  fontFamily: T.sans,
  fontSize: 12,
  color: T.red,
  marginTop: 6,
};

function Field(props: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {props.label} {props.required && <span style={{ color: T.gold }}>*</span>}
      </label>
      <input
        name={props.name}
        type={props.type}
        required={props.required}
        placeholder={props.placeholder}
        style={inputStyle}
      />
      {props.hint && <div style={hintStyle}>{props.hint}</div>}
      {props.error && <div style={errorStyle}>{props.error}</div>}
    </div>
  );
}

function TextArea(props: {
  label: string;
  name: string;
  required?: boolean;
  rows: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {props.label} {props.required && <span style={{ color: T.gold }}>*</span>}
      </label>
      <textarea
        name={props.name}
        required={props.required}
        rows={props.rows}
        placeholder={props.placeholder}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
      />
      {props.error && <div style={errorStyle}>{props.error}</div>}
    </div>
  );
}

function Select(props: {
  label: string;
  name: string;
  required?: boolean;
  options: { v: string; l: string }[];
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {props.label} {props.required && <span style={{ color: T.gold }}>*</span>}
      </label>
      <select name={props.name} required={props.required} style={inputStyle} defaultValue="">
        {props.options.map((o) => (
          <option key={o.v} value={o.v} disabled={o.v === ''} style={{ background: T.bg }}>
            {o.l}
          </option>
        ))}
      </select>
      {props.hint && <div style={hintStyle}>{props.hint}</div>}
      {props.error && <div style={errorStyle}>{props.error}</div>}
    </div>
  );
}
