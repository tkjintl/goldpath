// Hand-drawn-feel SVG ornament shaped like a 도장-style Korean seal.
// Calm, restrained, document-style. No animation by default.
export function SealOrnament({
  size = 48,
  tone = 'accent',
  text,
}: {
  size?: number;
  tone?: 'accent' | 'ink' | 'accent-dim';
  text?: string;
}) {
  const stroke =
    tone === 'ink' ? 'var(--ink)' : tone === 'accent-dim' ? 'var(--accent-dim)' : 'var(--accent)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={stroke}
      strokeWidth={1}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" />
      <circle cx="32" cy="32" r="22" opacity="0.45" />
      {/* 4-petal stylized 단정 motif */}
      <path d="M32 14 C 36 24, 36 24, 32 32 C 28 24, 28 24, 32 14 Z" opacity="0.7" />
      <path d="M50 32 C 40 36, 40 36, 32 32 C 40 28, 40 28, 50 32 Z" opacity="0.7" />
      <path d="M32 50 C 28 40, 28 40, 32 32 C 36 40, 36 40, 32 50 Z" opacity="0.7" />
      <path d="M14 32 C 24 28, 24 28, 32 32 C 24 36, 24 36, 14 32 Z" opacity="0.7" />
      <circle cx="32" cy="32" r="2.4" fill={stroke} stroke="none" />
      {text && (
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontFamily="var(--font-krs)"
          fontSize="13"
          fill={stroke}
          stroke="none"
        >
          {text}
        </text>
      )}
    </svg>
  );
}
