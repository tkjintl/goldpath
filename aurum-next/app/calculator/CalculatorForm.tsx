'use client';

import { useMemo, useState } from 'react';
import { T } from '@/lib/tokens';

// Placeholder gold price — illustrative only.
// USD 2,400 / troy ounce. 1 troy ounce = 31.1034768 g.
const USD_PER_OZ = 2400;
const GRAMS_PER_OZ = 31.1034768;
const USD_PER_GRAM = USD_PER_OZ / GRAMS_PER_OZ; // ~77.16

export function CalculatorForm() {
  const [monthlyUSD, setMonthlyUSD] = useState(500);
  const [years, setYears] = useState(10);

  const { totalUSD, totalGrams } = useMemo(() => {
    const months = Math.max(0, years) * 12;
    const usd = Math.max(0, monthlyUSD) * months;
    const grams = usd / USD_PER_GRAM;
    return { totalUSD: usd, totalGrams: grams };
  }, [monthlyUSD, years]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <NumberField
        label="Monthly contribution (USD)"
        value={monthlyUSD}
        min={0}
        step={50}
        onChange={setMonthlyUSD}
      />
      <NumberField
        label="Years of contribution"
        value={years}
        min={0}
        max={60}
        step={1}
        onChange={setYears}
      />

      <div
        style={{
          marginTop: 12,
          borderTop: `1px solid ${T.border}`,
          paddingTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 0,
          background: T.bg,
          border: `1px solid ${T.goldBorder}`,
        }}
      >
        <Stat label="TOTAL INVESTED" value={`$${formatNum(totalUSD)}`} tone="text" />
        <Stat
          label="GRAMS ACCUMULATED"
          value={formatNum(totalGrams, 2)}
          suffix="g"
          tone="gold"
          divider
        />
        <Stat
          label="AT PLACEHOLDER PRICE"
          value={`$${formatNum(USD_PER_GRAM, 2)}`}
          suffix="/g"
          tone="muted"
          divider
        />
      </div>

      <div
        style={{
          fontFamily: T.serif,
          fontStyle: 'italic',
          fontSize: 13,
          color: T.muted,
          lineHeight: 1.7,
          marginTop: 4,
        }}
      >
        Gold can decline. Holding it for one year is speculation; holding it for thirty
        is something else. This calculator does neither.
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label
        style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.gold,
          letterSpacing: '0.22em',
          marginBottom: 8,
          display: 'block',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        style={{
          width: '100%',
          background: T.bg,
          border: `1px solid ${T.border}`,
          color: T.text,
          padding: '14px 16px',
          fontFamily: T.sans,
          fontSize: 15,
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  tone,
  divider,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: 'gold' | 'text' | 'muted';
  divider?: boolean;
}) {
  const color = tone === 'gold' ? T.gold : tone === 'muted' ? T.goldD : T.text;
  return (
    <div
      style={{
        padding: '24px 22px',
        borderLeft: divider ? `1px solid ${T.border}` : 'none',
      }}
    >
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 9,
          color: T.goldD,
          letterSpacing: '0.24em',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: T.serif,
          fontStyle: 'italic',
          fontSize: 30,
          fontWeight: 500,
          color,
          lineHeight: 1,
        }}
      >
        {value}
        {suffix && (
          <span
            style={{
              fontFamily: T.mono,
              fontStyle: 'normal',
              fontSize: 14,
              color: T.goldD,
              marginLeft: 4,
              letterSpacing: '0.12em',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function formatNum(n: number, decimals = 0): string {
  if (!Number.isFinite(n)) return '0';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
