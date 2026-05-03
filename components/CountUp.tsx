'use client';

import { useEffect, useRef, useState } from 'react';

// Easing curve aligned to GoldPath motion language.
function easeOutExpo(t: number): number {
  // Approximation of cubic-bezier(0.16, 1, 0.3, 1)
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Primitive props only — no function props. Server components can't
// serialize functions across the RSC boundary, so format is composed
// from prefix/suffix/decimals/locale instead of a callback.
export function CountUp({
  to,
  duration = 1100,
  start = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  locale = 'ko-KR',
}: {
  to: number;
  duration?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState<number>(start);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (done) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setVal(to);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            observer.disconnect();
            const t0 = performance.now();
            let raf = 0;
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / duration);
              const eased = easeOutExpo(p);
              const cur = start + (to - start) * eased;
              setVal(cur);
              if (p < 1) {
                raf = requestAnimationFrame(tick);
              } else {
                setVal(to);
                setDone(true);
              }
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, start, done]);

  const formatted =
    decimals > 0
      ? val.toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(val).toLocaleString(locale);

  return (
    <span
      ref={ref}
      data-counted={done ? 'true' : 'false'}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
