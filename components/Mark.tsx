// The GoldPath mark renders differently across ornament systems.
// Same component, theme-aware via the data-ornament attribute on <html>.
export function Mark({ size = 36 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        border: '1.5px solid var(--accent)',
        color: 'var(--accent)',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: size * 0.5,
        fontWeight: 600,
        letterSpacing: '-0.04em',
        background: 'transparent',
      }}
    >
      Au
    </span>
  );
}
