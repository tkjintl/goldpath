'use client';

import { useState } from 'react';

export type WhyItem = {
  n: string;
  lbl: string;
  num: string;
  cap: string;
  tone: 'warn' | 'accent';
};

export function WhyAccordion({ items }: { items: WhyItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      style={{
        border: '1px solid var(--rule)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={it.n}
            style={{
              background: 'var(--bg-2)',
              borderTop: i > 0 ? '1px solid var(--rule)' : 'none',
            }}
          >
            {/* Trigger row */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: isOpen ? '18px 18px 0' : '18px 18px 14px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                minHeight: 'auto',
                transition: 'padding-bottom 220ms ease',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.20em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
                  {it.n} · {it.lbl}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 38,
                    fontWeight: 500,
                    color: it.tone === 'warn' ? 'var(--red)' : 'var(--accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {it.num}
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: 'var(--ink-2)',
                  transition: 'transform 220ms ease',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                ▾
              </span>
            </button>

            {/* Expandable body */}
            <div
              style={{
                maxHeight: isOpen ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 260ms ease',
              }}
            >
              <div
                style={{
                  padding: '12px 18px 18px',
                  borderTop: '1px solid var(--rule)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-kr)',
                    fontSize: 13,
                    fontWeight: 300,
                    color: 'var(--ink-2)',
                    lineHeight: 1.7,
                  }}
                >
                  {it.cap}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
