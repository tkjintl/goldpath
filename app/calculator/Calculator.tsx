'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { PriceSnapshot } from '@/lib/pricing';

type Props = { initialSnapshot: PriceSnapshot };

const MIN_MONTHLY = 200_000;
const MAX_MONTHLY = 5_000_000;
const STEP_MONTHLY = 100_000;
const MIN_MONTHS = 6;
const MAX_MONTHS = 240;

const SAVINGS_APR = 0.0283; // BoK 적금 reference 2025

type Cagr = { key: 'cons' | 'base' | 'bull'; pct: number; label: string };
const CAGR_OPTIONS: Cagr[] = [
  { key: 'cons', pct: 5, label: '보수 5%' },
  { key: 'base', pct: 8, label: '기준 8%' },
  { key: 'bull', pct: 12, label: '적극 12%' },
];

const KRW_FMT = new Intl.NumberFormat('ko-KR');
const G_FMT = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 3 });

function formatKRW(n: number): string {
  const v = Math.round(n);
  if (v < 10_000) return '₩' + KRW_FMT.format(v);
  const eok = Math.floor(v / 100_000_000);
  const man = Math.floor((v % 100_000_000) / 10_000);
  if (eok > 0) {
    if (man === 0) return `${eok}억원`;
    return `${eok}억 ${KRW_FMT.format(man)}만원`;
  }
  return `${KRW_FMT.format(man)}만원`;
}

// FV of monthly contribution annuity, end-of-month, monthly compounding
function annuityFV(monthly: number, months: number, apr: number): number {
  const r = apr / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r);
}

function periodLabel(months: number): string {
  if (months < 12) return `${months}개월`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m === 0 ? `${y}년` : `${y}년 ${m}개월`;
}

export function Calculator({ initialSnapshot }: Props) {
  const snap = initialSnapshot;

  const [monthlyKrw, setMonthlyKrw] = useState<number>(500_000);
  const [months, setMonths] = useState<number>(36);
  const [cagrKey, setCagrKey] = useState<Cagr['key']>('base');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // URL persistence (light) — replaceState only, no router churn
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('m', String(monthlyKrw));
    url.searchParams.set('n', String(months));
    url.searchParams.set('c', cagrKey);
    window.history.replaceState(null, '', url.toString());
  }, [monthlyKrw, months, cagrKey]);

  // Hydrate from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URL(window.location.href).searchParams;
    const m = Number(sp.get('m'));
    const n = Number(sp.get('n'));
    const c = sp.get('c');
    if (Number.isFinite(m) && m >= MIN_MONTHLY && m <= MAX_MONTHLY) setMonthlyKrw(m);
    if (Number.isFinite(n) && n >= MIN_MONTHS && n <= MAX_MONTHS) setMonths(n);
    if (c === 'cons' || c === 'base' || c === 'bull') setCagrKey(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cagr = CAGR_OPTIONS.find((c) => c.key === cagrKey)!;

  const calc = useMemo(() => {
    const aurum = snap.aurumKrwPerGram;
    const gramsPerMonth = monthlyKrw / aurum;
    const totalGrams = gramsPerMonth * months;
    const totalKrw = monthlyKrw * months;
    const fv = annuityFV(monthlyKrw, months, cagr.pct / 100);
    const savingsFv = annuityFV(monthlyKrw, months, SAVINGS_APR);
    const retailEquivalent = totalGrams * snap.retailKrwPerGram;
    const retailSaved = retailEquivalent - totalKrw; // grams stacked vs same grams via Korean retail
    const gainPct = totalKrw > 0 ? ((fv - totalKrw) / totalKrw) * 100 : 0;

    // Sparkline series — cumulative grams + savings FV month-by-month
    const points: Array<{ m: number; grams: number; savings: number }> = [];
    for (let i = 1; i <= months; i++) {
      const g = gramsPerMonth * i;
      const s = annuityFV(monthlyKrw, i, SAVINGS_APR);
      points.push({ m: i, grams: g, savings: s });
    }

    return {
      aurum,
      gramsPerMonth,
      totalGrams,
      totalKrw,
      fv,
      savingsFv,
      retailEquivalent,
      retailSaved,
      gainPct,
      points,
    };
  }, [snap.aurumKrwPerGram, snap.retailKrwPerGram, monthlyKrw, months, cagr.pct]);

  const monthlyPct = ((monthlyKrw - MIN_MONTHLY) / (MAX_MONTHLY - MIN_MONTHLY)) * 100;
  const monthsPct = ((months - MIN_MONTHS) / (MAX_MONTHS - MIN_MONTHS)) * 100;

  const asOfShort = (() => {
    try {
      return new Date(snap.timestamp).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return snap.timestamp;
    }
  })();

  // Sparkline geometry
  const SVG_W = 320;
  const SVG_H = 80;
  const PAD_X = 4;
  const PAD_Y = 6;
  const innerW = SVG_W - PAD_X * 2;
  const innerH = SVG_H - PAD_Y * 2;

  const maxGrams = calc.totalGrams || 1;
  const maxSav = calc.savingsFv || 1;

  const xFor = (i: number) =>
    PAD_X + (calc.points.length === 1 ? innerW / 2 : (i / (calc.points.length - 1)) * innerW);

  const goldPath = calc.points
    .map((p, i) => {
      const x = xFor(i);
      const y = PAD_Y + innerH - (p.grams / maxGrams) * innerH;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const savPath = calc.points
    .map((p, i) => {
      const x = xFor(i);
      const y = PAD_Y + innerH - (p.savings / maxSav) * innerH;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const markerMonths = [12, 24, 36, 60, 120].filter((m) => m <= months);

  return (
    <div className="gp-calc-root" style={{ fontFamily: 'var(--font-krs)' }}>
      <style>{`
        input[type="range"].gp-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 24px;
          background: transparent;
          cursor: pointer;
        }
        input[type="range"].gp-slider:focus { outline: none; }
        input[type="range"].gp-slider::-webkit-slider-runnable-track {
          height: 2px;
          background: linear-gradient(to right, var(--accent) 0% var(--gp-pct), var(--rule) var(--gp-pct) 100%);
          border-radius: 1px;
        }
        input[type="range"].gp-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: var(--accent-bright, var(--accent));
          border: 1px solid var(--ink);
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 2px 6px color-mix(in srgb, var(--accent) 40%, transparent);
          cursor: pointer;
          transition: transform 120ms ease;
        }
        input[type="range"].gp-slider:active::-webkit-slider-thumb { transform: scale(1.15); }
        input[type="range"].gp-slider::-moz-range-track {
          height: 2px;
          background: linear-gradient(to right, var(--accent) 0% var(--gp-pct), var(--rule) var(--gp-pct) 100%);
          border: none;
        }
        input[type="range"].gp-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: var(--accent-bright, var(--accent));
          border: 1px solid var(--ink);
          border-radius: 50%;
          box-shadow: 0 2px 6px color-mix(in srgb, var(--accent) 40%, transparent);
        }
        .gp-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
        .gp-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--rule);
          background: transparent;
          color: var(--ink-2);
          cursor: pointer;
          text-transform: uppercase;
          transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
        }
        .gp-chip:hover { border-color: var(--ink-3); color: var(--ink); }
        .gp-chip[data-active="true"] {
          background: var(--accent);
          color: var(--inv-ink, var(--bg));
          border-color: var(--accent);
        }
        .gp-spark-grams { animation: gp-dash 1200ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .gp-spark-sav   { animation: gp-dash 1200ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both; }
        @keyframes gp-dash { from { stroke-dashoffset: var(--gp-len, 1000); } to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .gp-spark-grams, .gp-spark-sav { animation: none; stroke-dashoffset: 0 !important; }
        }
        @media (max-width: 768px) {
          .gp-calc-grid { grid-template-columns: 1fr !important; gap: 2.4rem !important; }
        }
      `}</style>

      <div
        className="gp-calc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '3.2rem',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: INPUTS ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ink-2)',
              borderBottom: '1px solid var(--rule)',
              paddingBottom: 12,
            }}
          >
            <span>§ 계산기 · CALCULATOR</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--accent)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'currentColor',
                  animation: reduceMotion ? 'none' : 'pulse 1.6s ease-in-out infinite',
                }}
              />
              LIVE
            </span>
          </div>

          {/* Monthly slider */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
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
                  fontSize: 18,
                  color: 'var(--ink)',
                }}
              >
                ₩{(monthlyKrw / 10_000).toLocaleString('ko-KR')}만
              </span>
            </div>
            <input
              type="range"
              className="gp-slider"
              min={MIN_MONTHLY}
              max={MAX_MONTHLY}
              step={STEP_MONTHLY}
              value={monthlyKrw}
              onChange={(e) => setMonthlyKrw(Number(e.target.value))}
              style={{ ['--gp-pct' as string]: `${monthlyPct}%` } as CSSProperties}
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
              }}
            >
              <span>₩20만</span>
              <span>₩500만</span>
            </div>
          </label>

          {/* Months slider */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
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
                기간 · DURATION
              </span>
              <span
                className="gp-num"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 18,
                  color: 'var(--ink)',
                }}
              >
                {periodLabel(months)}
              </span>
            </div>
            <input
              type="range"
              className="gp-slider"
              min={MIN_MONTHS}
              max={MAX_MONTHS}
              step={1}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              style={{ ['--gp-pct' as string]: `${monthsPct}%` } as CSSProperties}
              aria-label="기간 (개월)"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--ink-3)',
              }}
            >
              <span>6개월</span>
              <span>20년</span>
            </div>
          </label>

          {/* CAGR chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: 'var(--ink-2)',
              }}
            >
              가정 수익률 · ASSUMED CAGR (예시)
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CAGR_OPTIONS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className="gp-chip"
                  data-active={c.key === cagrKey}
                  onClick={() => setCagrKey(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-krs)',
              fontSize: 12.5,
              lineHeight: 1.7,
              color: 'var(--ink-3)',
              margin: 0,
              borderTop: '1px solid var(--rule)',
              paddingTop: '1rem',
            }}
          >
            * 시세는 매달 변동. 실제 매입은 매월 LBMA 픽스 시점 가격으로 잠김.
            CAGR은 예시이며 가격 예측이 아닙니다.
          </p>
        </div>

        {/* ── RIGHT: OUTPUTS ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {/* Sparkline */}
          <div
            style={{
              border: '1px solid var(--rule)',
              padding: '1rem 1rem 0.6rem',
              background: 'color-mix(in srgb, var(--accent) 4%, transparent)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                color: 'var(--ink-3)',
                marginBottom: 6,
              }}
            >
              <span style={{ color: 'var(--accent)' }}>● 누적 그램</span>
              <span style={{ color: 'var(--ink-3)' }}>● 적금 KRW (2.83%)</span>
            </div>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              width="100%"
              height={SVG_H}
              role="img"
              aria-label="누적 그램과 적금 비교 스파크라인"
              style={{ display: 'block' }}
            >
              {/* baseline */}
              <line
                x1={PAD_X}
                x2={SVG_W - PAD_X}
                y1={SVG_H - PAD_Y}
                y2={SVG_H - PAD_Y}
                stroke="var(--rule)"
                strokeWidth={1}
                strokeDasharray="2 3"
              />
              <polyline
                className="gp-spark-sav"
                points={savPath}
                fill="none"
                stroke="var(--ink-3)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 600,
                  ['--gp-len' as string]: '600',
                } as CSSProperties}
                opacity={0.7}
              />
              <polyline
                className="gp-spark-grams"
                points={goldPath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 600,
                  ['--gp-len' as string]: '600',
                } as CSSProperties}
              />
              {markerMonths.map((mm) => {
                const idx = mm - 1;
                if (idx < 0 || idx >= calc.points.length) return null;
                const p = calc.points[idx];
                const x = xFor(idx);
                const y = PAD_Y + innerH - (p.grams / maxGrams) * innerH;
                return <circle key={mm} cx={x} cy={y} r={2.5} fill="var(--accent)" />;
              })}
            </svg>
          </div>

          {/* Result table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Row
              label="월 매입 그램"
              value={`${G_FMT.format(calc.gramsPerMonth)} g`}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
                paddingTop: '0.4rem',
                borderTop: '1px solid var(--rule)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-2)',
                  flexShrink: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                누적 그램 · {periodLabel(months)}
              </span>
              <span
                className="gp-num"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {G_FMT.format(calc.totalGrams)} g
              </span>
            </div>

            <Row label="누적 납입" value={formatKRW(calc.totalKrw)} />
            <Row
              label="명목 가치 (오늘 시세)"
              value={`${formatKRW(calc.totalGrams * calc.aurum)} · ±0`}
              hint
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--rule)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-2)',
                  flexShrink: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                가정 미래 가치 · {cagr.pct}% CAGR
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 8,
                  flexShrink: 0,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  className="gp-num"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 22,
                    color: 'var(--accent)',
                  }}
                >
                  {formatKRW(calc.fv)}
                </span>
                <span
                  className="gp-num"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--green, #4a8a4a)',
                  }}
                >
                  +{calc.gainPct.toFixed(1)}%
                </span>
              </span>
            </div>

            <Row
              label="같은 ₩ → 적금 2.83%"
              value={formatKRW(calc.savingsFv)}
              muted
            />
            <Row
              label="한국 소매 동량 매입 시"
              value={`${formatKRW(calc.retailEquivalent)} · ≈ ${formatKRW(calc.retailSaved)} 절감`}
              celadon
            />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              lineHeight: 1.7,
              color: 'var(--ink-3)',
              margin: 0,
              paddingTop: '0.6rem',
              borderTop: '1px solid var(--rule)',
            }}
          >
            예시 계산 · 가격 예측 아님 · LBMA ${snap.lbmaUsdPerOz.toFixed(2)} ·
            FX ₩{KRW_FMT.format(Math.round(snap.fxKrwPerUsd))} · GP ₩
            {KRW_FMT.format(snap.aurumKrwPerGram)}/g · {asOfShort}
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
  muted,
  celadon,
}: {
  label: string;
  value: string;
  hint?: boolean;
  muted?: boolean;
  celadon?: boolean;
}) {
  const color = celadon
    ? 'var(--accent-2, var(--ink-2))'
    : muted
    ? 'var(--ink-2)'
    : hint
    ? 'var(--ink-2)'
    : 'var(--ink)';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          color: 'var(--ink-2)',
          maxWidth: '60%',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        className="gp-num"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color,
          wordBreak: 'break-all',
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
  );
}
