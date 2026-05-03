'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { PriceSnapshot } from '@/lib/pricing';

const MIN = 200_000;
const MAX = 5_000_000;
const STEP = 100_000;

const TIERS: Array<{
  roman: 'I' | 'II' | 'III' | 'IV' | 'V';
  name: string;
  threshold: number;
  bonusGram: number;
}> = [
  { roman: 'I', name: '브론즈', threshold: 200_000, bonusGram: 0.23 },
  { roman: 'II', name: '실버', threshold: 500_000, bonusGram: 0.7 },
  { roman: 'III', name: '골드', threshold: 1_000_000, bonusGram: 1.86 },
  { roman: 'IV', name: '플래티넘', threshold: 2_000_000, bonusGram: 4.65 },
  { roman: 'V', name: '소브린', threshold: 5_000_000, bonusGram: 11.6 },
];

function detectTier(monthly: number) {
  let last = TIERS[0]!;
  for (const t of TIERS) if (monthly >= t.threshold) last = t;
  return last;
}

const KRW_FMT = new Intl.NumberFormat('ko-KR');
const G_FMT = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 });

function fmtKrw(n: number): string {
  return '₩' + KRW_FMT.format(Math.round(n));
}

export function MathCalc({ snapshot }: { snapshot: PriceSnapshot }) {
  const [monthlyKrw, setMonthlyKrw] = useState<number>(500_000);
  const [debounced, setDebounced] = useState<number>(500_000);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(monthlyKrw), 200);
    return () => clearTimeout(id);
  }, [monthlyKrw]);

  const calc = useMemo(() => {
    const aurum = snapshot.aurumKrwPerGram;
    const retail = snapshot.retailKrwPerGram;
    const gramsPerMonth = debounced / aurum;
    const cumulativeKrw = debounced * 12;
    const cumulativeGrams = gramsPerMonth * 12;
    const tier = detectTier(debounced);
    const totalGrams = cumulativeGrams + tier.bonusGram;
    const todayValue = totalGrams * aurum;
    const retailEquiv = totalGrams * retail;
    const savings = retailEquiv - todayValue;
    return {
      aurum,
      gramsPerMonth,
      cumulativeKrw,
      cumulativeGrams,
      tier,
      totalGrams,
      todayValue,
      retailEquiv,
      savings,
    };
  }, [debounced, snapshot]);

  const pct = ((monthlyKrw - MIN) / (MAX - MIN)) * 100;

  return (
    <section style={{ padding: '96px 36px', borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
            marginBottom: 18,
          }}
        >
          § 수학 · THE MATH
        </div>
        <h2
          lang="ko"
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 48px',
            color: 'var(--ink)',
          }}
        >
          숫자로 보기.
        </h2>

        <style>{`
          .gp-math-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 44px;
            background: transparent;
            cursor: pointer;
          }
          .gp-math-slider:focus { outline: none; }
          .gp-math-slider::-webkit-slider-runnable-track {
            height: 2px;
            background: linear-gradient(to right, var(--accent) 0% var(--gp-pct), var(--rule) var(--gp-pct) 100%);
          }
          .gp-math-slider::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 22px; height: 22px;
            background: var(--accent-bright, var(--accent));
            border: 1px solid var(--ink);
            border-radius: 50%;
            margin-top: -10px;
            box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 50%, transparent);
          }
          .gp-math-slider::-moz-range-track {
            height: 2px;
            background: linear-gradient(to right, var(--accent) 0% var(--gp-pct), var(--rule) var(--gp-pct) 100%);
            border: none;
          }
          .gp-math-slider::-moz-range-thumb {
            width: 22px; height: 22px;
            background: var(--accent-bright, var(--accent));
            border: 1px solid var(--ink);
            border-radius: 50%;
          }
          @media (max-width: 800px) {
            .gp-math-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div
          className="gp-math-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Slider */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-2)',
                }}
              >
                월 자동이체 · MONTHLY
              </span>
              <span
                className="gp-num"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  color: 'var(--ink)',
                }}
              >
                ₩{(monthlyKrw / 10_000).toLocaleString('en-US')}만
              </span>
            </div>
            <input
              type="range"
              className="gp-math-slider"
              min={MIN}
              max={MAX}
              step={STEP}
              value={monthlyKrw}
              onChange={(e) => setMonthlyKrw(Number(e.target.value))}
              style={{ ['--gp-pct' as string]: `${pct}%` } as CSSProperties}
              aria-label="월 자동이체 금액"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--ink-3)',
                marginTop: 4,
              }}
            >
              <span>₩20만</span>
              <span>₩500만</span>
            </div>

            <div
              style={{
                marginTop: 28,
                padding: '14px 18px',
                border: '1px solid var(--accent)',
                background: 'color-mix(in srgb, var(--accent) 6%, var(--bg))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                lang="ko"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-2)',
                }}
              >
                감지된 등급 · DETECTED TIER
              </span>
              <span
                lang="ko"
                style={{
                  fontFamily: 'var(--font-kr)',
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'var(--accent)',
                }}
              >
                {calc.tier.roman} · {calc.tier.name} (+{calc.tier.bonusGram.toFixed(2)}g)
              </span>
            </div>
          </div>

          {/* Output table */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                lineHeight: 2,
                color: 'var(--ink)',
              }}
              className="gp-num"
            >
              <RowOut k="매달 자동이체" v={fmtKrw(debounced)} />
              <RowOut
                k="12개월 누적 매입"
                v={`${fmtKrw(calc.cumulativeKrw)}  →  ≈ ${G_FMT.format(calc.cumulativeGrams)}g`}
              />
              <RowOut
                k="파운더스 그램"
                v={`+ ${calc.tier.bonusGram.toFixed(2)}g`}
                accent
              />
              <div
                style={{
                  borderTop: '1px solid var(--rule)',
                  margin: '8px 0',
                }}
              />
              <RowOut
                k="12개월 후 보유"
                v={`${G_FMT.format(calc.totalGrams)}g`}
                big
              />
              <RowOut k="오늘 가치 환산" v={`≈ ${fmtKrw(calc.todayValue)}`} />
              <RowOut
                k={`한국 소매로 같은 ${G_FMT.format(calc.totalGrams)}g`}
                v={`≈ ${fmtKrw(calc.retailEquiv)}`}
              />
              <RowOut
                k="절감"
                v={`+${fmtKrw(calc.savings)}`}
                celadon
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                lineHeight: 1.7,
                color: 'var(--ink-3)',
                marginTop: 18,
                paddingTop: 12,
                borderTop: '1px solid var(--rule)',
              }}
            >
              * 시세는 매달 변동. 실제 매입 그램은 매월 자동이체일의 LBMA 픽스로 잠김.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RowOut({
  k,
  v,
  accent,
  big,
  celadon,
}: {
  k: string;
  v: string;
  accent?: boolean;
  big?: boolean;
  celadon?: boolean;
}) {
  const color = accent
    ? 'var(--accent)'
    : celadon
      ? 'var(--accent-2, var(--ink))'
      : 'var(--ink)';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: big ? 16 : 13,
        fontWeight: big ? 600 : 400,
      }}
    >
      <span lang="ko" style={{ color: 'var(--ink-2)' }}>
        {k}
      </span>
      <span style={{ color }}>{v}</span>
    </div>
  );
}
