import type { ReactNode } from 'react';

// Reusable queue table for ops surfaces.
export function OpsTable({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--rule-strong)', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        {children}
      </table>
    </div>
  );
}

export function OpsTh({ children, align = 'left' }: { children: ReactNode; align?: 'left' | 'right' | 'center' }) {
  return (
    <th
      style={{
        textAlign: align,
        padding: '12px 14px',
        background: 'var(--bg-2)',
        borderBottom: '1px solid var(--rule-strong)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.22em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </th>
  );
}

export function OpsTd({
  children,
  align = 'left',
}: {
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
}) {
  return (
    <td
      style={{
        textAlign: align,
        padding: '14px',
        borderBottom: '1px dashed var(--rule)',
        color: 'var(--ink)',
        verticalAlign: 'middle',
      }}
    >
      {children}
    </td>
  );
}

export function StatusPill({ status, tone = 'info' }: { status: string; tone?: 'ok' | 'warn' | 'critical' | 'info' | 'pending' }) {
  const colors: Record<string, { bg: string; fg: string }> = {
    ok: { bg: 'color-mix(in srgb, var(--green) 18%, transparent)', fg: 'var(--green)' },
    warn: { bg: 'color-mix(in srgb, var(--accent) 14%, transparent)', fg: 'var(--accent-dim)' },
    critical: { bg: 'color-mix(in srgb, var(--red) 14%, transparent)', fg: 'var(--red)' },
    info: { bg: 'color-mix(in srgb, var(--ink) 6%, transparent)', fg: 'var(--ink-2)' },
    pending: { bg: 'color-mix(in srgb, var(--accent) 12%, transparent)', fg: 'var(--accent)' },
  };
  const c = colors[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        background: c.bg,
        color: c.fg,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.18em',
        padding: '3px 8px',
        textTransform: 'uppercase',
      }}
    >
      {status}
    </span>
  );
}

export function OpsHeader({
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}) {
  return (
    <header
      style={{
        marginBottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 18,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.32em',
            color: 'var(--accent)',
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-3)',
              letterSpacing: '0.14em',
              marginTop: 8,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </header>
  );
}
