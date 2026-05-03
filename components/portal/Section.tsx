import type { ReactNode } from 'react';

export function PortalSection({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <header style={{ marginBottom: 24 }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.32em',
              color: 'var(--accent)',
              marginBottom: 10,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-krs)',
            fontWeight: 300,
            fontSize: 32,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 16,
              color: 'var(--ink-3)',
              marginTop: 8,
            }}
          >
            {subtitle}
          </div>
        )}
      </header>
      {children}
    </section>
  );
}

export function PortalCard({
  label,
  children,
  span = 1,
}: {
  label?: string;
  children: ReactNode;
  span?: number;
}) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--rule)',
        padding: 24,
        gridColumn: `span ${span}`,
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.24em',
            color: 'var(--accent)',
            marginBottom: 12,
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatBig({ value, hint }: { value: string; hint?: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 56,
          color: 'var(--accent)',
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {hint && (
        <div
          style={{
            fontFamily: 'var(--font-kr)',
            fontSize: 13,
            color: 'var(--ink-3)',
            marginTop: 8,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
