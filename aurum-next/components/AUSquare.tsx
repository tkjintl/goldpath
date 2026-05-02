import { T } from '@/lib/tokens';

export function AUSquare({ size = 64 }: { size?: number }) {
  const s = size;
  return (
    <div
      style={{
        width: s,
        height: s,
        border: `1px solid ${T.goldBorderS}`,
        background: `linear-gradient(135deg, rgba(197,165,114,0.12), rgba(197,165,114,0.02))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: T.serif,
        fontStyle: 'italic',
        fontSize: s * 0.55,
        fontWeight: 500,
        color: T.gold,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}
    >
      Au
    </div>
  );
}
