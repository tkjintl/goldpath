// ═══════════════════════════════════════════════════════════════════════
// AURUM · DESIGN TOKENS
// Diaspora pivot — quiet/heritage register. Drops Neo-Seoul drop palette.
// ═══════════════════════════════════════════════════════════════════════

export const T = {
  // backgrounds
  bg: '#0a0a0a',
  bg1: '#0d0b08',
  bg3: '#16120c',
  card: '#0f0d0a',
  elev: '#16120c',
  deep: '#050505',
  deepBlack: '#050505',

  // text
  text: '#e8e3d8',
  sub: '#aaa39a',
  muted: '#6b655e',

  // gold scale
  gold: '#C5A572',
  goldB: '#E3C187',
  goldD: '#8a7d6b',
  goldDeep: '#6a5a3a',

  // gold with alpha
  goldBorder: 'rgba(197,165,114,0.22)',
  goldBorderS: 'rgba(197,165,114,0.5)',
  goldGlow: 'rgba(197,165,114,0.06)',

  // neutrals
  border: 'rgba(255,255,255,0.08)',

  // semantic
  green: '#4ade80',
  red: '#f87171',
  blue: '#60a5fa',

  // type stacks
  serif: "'Cormorant Garamond', 'Noto Serif KR', Georgia, serif",
  serifKr: "'Noto Serif KR', 'Cormorant Garamond', Georgia, serif",
  sans: "'Outfit', system-ui, sans-serif",
  sansKr: "'Pretendard', 'Outfit', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export type Tokens = typeof T;
