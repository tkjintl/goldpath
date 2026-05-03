import { Ticker } from '@/components/Ticker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getPriceSnapshot, fmtKRW } from '@/lib/pricing';

export const metadata = { title: '계산기 · GoldPath' };

const KRW = new Intl.NumberFormat('ko-KR');
const G = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 3 });
const USD = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const MIN_MONTHLY = 200_000;
const MAX_MONTHLY = 5_000_000;
const MIN_MONTHS = 6;
const MAX_MONTHS = 240;
const DEFAULT_MONTHLY = 200_000;
const DEFAULT_MONTHS = 36;
const SAVINGS_APR = 0.0283; // BoK reference 2025

function clamp(n: number, min: number, max: number) {
  if (!isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function parseInput(v: string | string[] | undefined, fb: number): number {
  if (typeof v !== 'string') return fb;
  const n = Number(v.replace(/[^\d.-]/g, ''));
  return isFinite(n) && n > 0 ? n : fb;
}

// Future value of a monthly contribution annuity, end-of-month
function savingsFV(monthly: number, months: number, apr: number): number {
  const r = apr / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r);
}

export default async function CalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ monthly?: string; months?: string }>;
}) {
  const sp = await searchParams;
  const snap = await getPriceSnapshot();

  const monthlyKRW = clamp(
    parseInput(sp.monthly, DEFAULT_MONTHLY),
    MIN_MONTHLY,
    MAX_MONTHLY,
  );
  const months = Math.round(
    clamp(parseInput(sp.months, DEFAULT_MONTHS), MIN_MONTHS, MAX_MONTHS),
  );

  const goldpathPerG = snap.aurumKrwPerGram; // LBMA × FX / 31.1 × 1.02
  const lbmaPerG = snap.lbmaKrwPerGram;

  const gramsPerMonth = monthlyKRW / goldpathPerG;
  const totalGrams = gramsPerMonth * months;
  const nominalKRW = totalGrams * lbmaPerG; // valued at LBMA spot today
  const totalContributedKRW = monthlyKRW * months;

  const savingsMaturity = savingsFV(monthlyKRW, months, SAVINGS_APR);
  const streakBonusG = Math.floor(months / 12); // illustrative note only

  const fmtTime = new Date(snap.timestamp).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <>
      <Ticker />
      <Nav />
      <main
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
          color: 'var(--ink)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          § VII · 계산기 · CALCULATOR
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            lineHeight: 1.1,
            margin: '0 0 1rem',
          }}
        >
          매달 얼마. 몇 년 뒤 얼마.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            lineHeight: 1.7,
            opacity: 0.78,
            marginBottom: '3rem',
          }}
        >
          원화 자동이체 금액과 기간을 입력하면 누적 그램과 명목
          가치가 산출됩니다. 예시 계산이며, 가격 예측이 아닙니다.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* ── INPUTS ─────────────────────────────────────── */}
          <form method="get" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.6,
                margin: 0,
              }}
            >
              Inputs · 입력
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>월 자동이체</span>
                <span style={{ color: 'var(--accent)' }}>
                  {fmtKRW(monthlyKRW)}
                </span>
              </span>
              <input
                type="range"
                name="monthly"
                min={MIN_MONTHLY}
                max={MAX_MONTHLY}
                step={50_000}
                defaultValue={monthlyKRW}
              />
              <input
                type="number"
                name="monthly"
                min={MIN_MONTHLY}
                max={MAX_MONTHLY}
                step={10_000}
                defaultValue={monthlyKRW}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  padding: '0.6rem 0.8rem',
                  border: '1px solid color-mix(in oklab, var(--ink) 20%, transparent)',
                  background: 'transparent',
                  color: 'var(--ink)',
                  borderRadius: 2,
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-krs)',
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>기간 (개월)</span>
                <span style={{ color: 'var(--accent)' }}>{months}개월</span>
              </span>
              <input
                type="range"
                name="months"
                min={MIN_MONTHS}
                max={MAX_MONTHS}
                step={1}
                defaultValue={months}
              />
              <input
                type="number"
                name="months"
                min={MIN_MONTHS}
                max={MAX_MONTHS}
                step={1}
                defaultValue={months}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  padding: '0.6rem 0.8rem',
                  border: '1px solid color-mix(in oklab, var(--ink) 20%, transparent)',
                  background: 'transparent',
                  color: 'var(--ink)',
                  borderRadius: 2,
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.85rem 1.4rem',
                background: 'var(--ink)',
                color: 'var(--canvas)',
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              재계산 · Recalculate
            </button>
          </form>

          {/* ── OUTPUTS ────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.6,
                margin: 0,
              }}
            >
              Output · 산출
            </p>

            <Row label="월 그램" value={`${G.format(gramsPerMonth)} g`} />
            <Row label="누적 그램" value={`${G.format(totalGrams)} g`} accent />
            <Row label="누적 납입 KRW" value={fmtKRW(totalContributedKRW)} />
            <Row
              label="현 LBMA 기준 명목 가치"
              value={fmtKRW(nominalKRW)}
              accent
            />

            <hr
              style={{
                border: 0,
                borderTop:
                  '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
                margin: '0.4rem 0',
              }}
            />

            <Row
              label={`적금 만기 (연 ${(SAVINGS_APR * 100).toFixed(2)}%)`}
              value={fmtKRW(savingsMaturity)}
            />
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                lineHeight: 1.7,
                opacity: 0.6,
                margin: 0,
              }}
            >
              참고 — 12개월 연속 자동이체마다 1g 스트릭 보너스가
              제공됩니다 (위 누적 그램에는 미포함). 기간 ÷ 12 ={' '}
              {streakBonusG}g 예상.
            </p>
          </div>
        </div>

        <p
          style={{
            marginTop: '4rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            lineHeight: 1.7,
            opacity: 0.55,
            borderTop:
              '1px solid color-mix(in oklab, var(--ink) 14%, transparent)',
            paddingTop: '1.2rem',
          }}
        >
          예시 계산입니다. 가격 예측이 아닙니다. 현 LBMA $
          {USD.format(snap.lbmaUsdPerOz)}/oz · 환율 ₩
          {KRW.format(Math.round(snap.fxKrwPerUsd))}/USD · GoldPath
          ₩{KRW.format(goldpathPerG)}/g · 산출 시각 {fmtTime}.
          데이터: gold {snap.sources.gold.toUpperCase()} · fx{' '}
          {snap.sources.fx.toUpperCase()}.
        </p>
      </main>
      <Footer />
    </>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-krs)',
          fontSize: '0.9rem',
          opacity: 0.75,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: accent ? 'var(--font-display)' : 'var(--font-sans)',
          fontStyle: accent ? 'italic' : 'normal',
          fontSize: accent ? '1.6rem' : '1.05rem',
          color: accent ? 'var(--accent)' : 'var(--ink)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </div>
  );
}
