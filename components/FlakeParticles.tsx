// Drifting brass-gold flake particles. CSS-driven via .gp-drift (provided by Agent T).
// Deterministic seed positions to avoid hydration mismatch.
const SEEDS: { top: number; left: number; size: number; delay: number }[] = [
  { top: 8, left: 12, size: 4, delay: 0 },
  { top: 24, left: 78, size: 3, delay: 1.2 },
  { top: 42, left: 34, size: 5, delay: 0.6 },
  { top: 62, left: 88, size: 3, delay: 2.0 },
  { top: 18, left: 56, size: 4, delay: 1.5 },
  { top: 78, left: 22, size: 3, delay: 0.9 },
  { top: 34, left: 8, size: 4, delay: 2.4 },
  { top: 84, left: 64, size: 5, delay: 0.3 },
  { top: 12, left: 92, size: 3, delay: 1.8 },
  { top: 56, left: 16, size: 4, delay: 2.7 },
  { top: 70, left: 48, size: 3, delay: 0.4 },
  { top: 28, left: 70, size: 5, delay: 2.1 },
];

export function FlakeParticles({
  count = 6,
  tone = 'accent',
}: {
  count?: number;
  tone?: 'accent' | 'inv-accent';
}) {
  const flakes = SEEDS.slice(0, Math.min(count, SEEDS.length));
  const color = tone === 'inv-accent' ? 'var(--inv-accent)' : 'var(--accent)';
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {flakes.map((f, i) => (
        <span
          key={i}
          className="gp-drift"
          style={{
            position: 'absolute',
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}`,
            opacity: 0.6,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
