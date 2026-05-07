// ─────────────────────────────────────────────────────────────────────
// GoldPath theme registry
//
// Six visual directions, all defined as token objects.
// Components read CSS variables — never hardcoded values — so a single
// runtime variable swap re-themes every surface (public, /app, /ops).
//
// Pick later by setting NEXT_PUBLIC_DEFAULT_THEME or ?theme=B1 query.
// ─────────────────────────────────────────────────────────────────────

export type ThemeId = 'GP' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Theme = {
  id: ThemeId;
  name: string;
  // Background canvas
  bg: string;
  bg2: string;
  bg3: string;
  // Ink (primary text/foreground)
  ink: string;
  ink2: string;
  ink3: string;
  // Brand accent (the "gold" color of this theme — may not be gold)
  accent: string;
  accentBright: string;
  accentDim: string;
  // Secondary accent
  accent2: string;
  // Rule / borders
  rule: string;
  ruleStrong: string;
  // Semantic
  green: string;
  red: string;
  // Inverted surface (CTAs, footer, end sections)
  invertedBg: string;
  invertedInk: string;
  invertedAccent: string;
  // Type stacks
  serif: string;       // Display/italic headlines
  sans: string;        // UI text
  kr: string;          // Korean sans
  krs: string;         // Korean serif (display) — Pretendard-led; serif Korean reserved for editorial moments
  mono: string;        // Data, labels
  display: string;     // Italic display headlines (≥ 56px) — Cormorant Garamond italic stack
  canvas: string;      // Alias of `bg` — exposed as --canvas for layered background contexts
  krsRare: string;     // Noto Serif KR — opt-in editorial Korean serif
  // Ornament feel — picked up by special components
  ornament: 'data-dense' | 'editorial-quiet' | 'ink-wash' | 'magazine-warm' | 'document-formal' | 'document-modern';
};

export const THEMES: Record<ThemeId, Theme> = {
  // ─── GP — GoldPath brand (LOCKED DEFAULT) ──────────────────────────
  // B2 layout/type/ornament × A2 brass-gold palette.
  // Cream canvas, warm dark ink, brass-gold primary, celadon secondary.
  GP: {
    id: 'GP',
    name: 'GoldPath',
    bg: '#F5EEDC',                  // B2 cream
    bg2: '#EAE0C7',
    bg3: '#D8CBA8',
    ink: '#1F1A14',                 // B2 warm dark
    ink2: '#3D352A',
    ink3: '#7A7060',
    accent: '#A67C3F',              // A2 brass gold (was B2 persimmon)
    accentBright: '#C99857',
    accentDim: '#7A5A2C',
    accent2: '#7B9583',             // celadon retained as cool secondary
    rule: '#D8CBA8',
    ruleStrong: '#A89A7C',
    green: '#5A7A65',
    red: '#A8442A',                 // muted persimmon retained for warning/error only
    invertedBg: '#1F1A14',
    invertedInk: '#F5EEDC',
    invertedAccent: '#C99857',
    serif: "'Libre Baskerville', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter', system-ui, sans-serif",
    kr: "'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui, sans-serif",
    krs: "'Black Han Sans', 'Nanum Gothic', system-ui, sans-serif",
    mono: "'Space Grotesk', system-ui, sans-serif",
    display: "'Libre Baskerville', Georgia, serif",
    canvas: '#F5EEDC',
    krsRare: "'Black Han Sans', 'Nanum Gothic', sans-serif",
    ornament: 'magazine-warm',
  },

  // ─── A1 — Vault / Data ─────────────────────────────────────────────
  A1: {
    id: 'A1',
    name: 'Vault · Data',
    bg: '#1B1815',
    bg2: '#13110F',
    bg3: '#0E0C0A',
    ink: '#F4F1EA',
    ink2: '#BCB6A6',
    ink3: '#7D776A',
    accent: '#A67C3F',
    accentBright: '#C99857',
    accentDim: '#7A5A2C',
    accent2: '#3F6B4D',
    rule: '#2B2724',
    ruleStrong: '#3F3A35',
    green: '#3F6B4D',
    red: '#9C3A2E',
    invertedBg: '#F4F1EA',
    invertedInk: '#1B1815',
    invertedAccent: '#A67C3F',
    serif: "'Newsreader', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter Tight', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#1B1815',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'data-dense',
  },

  // ─── A2 — Vault / Quiet ────────────────────────────────────────────
  A2: {
    id: 'A2',
    name: 'Vault · Quiet',
    bg: '#F4F1EA',
    bg2: '#E9E4D6',
    bg3: '#D9D2C0',
    ink: '#1B1815',
    ink2: '#3A3631',
    ink3: '#6E6A60',
    accent: '#A67C3F',
    accentBright: '#C99857',
    accentDim: '#7A5A2C',
    accent2: '#3F6B4D',
    rule: '#D9D2C0',
    ruleStrong: '#A39A85',
    green: '#3F6B4D',
    red: '#9C3A2E',
    invertedBg: '#1B1815',
    invertedInk: '#F4F1EA',
    invertedAccent: '#C99857',
    serif: "'Newsreader', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter Tight', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#F4F1EA',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'editorial-quiet',
  },

  // ─── B1 — Daewangam / Ink (DEFAULT) ────────────────────────────────
  B1: {
    id: 'B1',
    name: 'Daewangam · Ink',
    bg: '#EDE6D6',
    bg2: '#E2D9C4',
    bg3: '#CFC5AC',
    ink: '#0F0F0F',
    ink2: '#2A2A2A',
    ink3: '#5C5C5C',
    accent: '#7B9583',         // celadon
    accentBright: '#A8BDB1',
    accentDim: '#5A7A65',
    accent2: '#C95A3A',        // persimmon
    rule: '#CFC5AC',
    ruleStrong: '#9A8E73',
    green: '#5A7A65',
    red: '#C95A3A',
    invertedBg: '#0F0F0F',
    invertedInk: '#EDE6D6',
    invertedAccent: '#C95A3A',
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#EDE6D6',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'ink-wash',
  },

  // ─── B2 — Daewangam / Warm ─────────────────────────────────────────
  B2: {
    id: 'B2',
    name: 'Daewangam · Warm',
    bg: '#F5EEDC',
    bg2: '#EAE0C7',
    bg3: '#D8CBA8',
    ink: '#1F1A14',
    ink2: '#3D352A',
    ink3: '#7A7060',
    accent: '#C95A3A',          // persimmon as primary
    accentBright: '#E07758',
    accentDim: '#A8442A',
    accent2: '#7B9583',         // celadon as secondary
    rule: '#D8CBA8',
    ruleStrong: '#A89A7C',
    green: '#5A7A65',
    red: '#A8442A',
    invertedBg: '#1F1A14',
    invertedInk: '#F5EEDC',
    invertedAccent: '#E07758',
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#F5EEDC',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'magazine-warm',
  },

  // ─── C1 — Specie / Document ────────────────────────────────────────
  C1: {
    id: 'C1',
    name: 'Specie · Document',
    bg: '#F8F6F0',
    bg2: '#EFEAD9',
    bg3: '#DCD5BD',
    ink: '#0F1A2E',
    ink2: '#2A3550',
    ink3: '#5C6680',
    accent: '#5B1A1A',          // oxblood
    accentBright: '#7A2828',
    accentDim: '#3F0F0F',
    accent2: '#C9A14B',         // gold leaf
    rule: '#DCD5BD',
    ruleStrong: '#1A2540',
    green: '#3F6B4D',
    red: '#5B1A1A',
    invertedBg: '#0F1A2E',
    invertedInk: '#F8F6F0',
    invertedAccent: '#C9A14B',
    serif: "'EB Garamond', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#F8F6F0',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'document-formal',
  },

  // ─── C2 — Specie / Modern ──────────────────────────────────────────
  C2: {
    id: 'C2',
    name: 'Specie · Modern',
    bg: '#F8F6F0',
    bg2: '#EFEAD9',
    bg3: '#E0DAC5',
    ink: '#0D2240',
    ink2: '#1F365E',
    ink3: '#5A6B86',
    accent: '#0D2240',          // navy primary
    accentBright: '#1F365E',
    accentDim: '#5A6B86',
    accent2: '#C9A14B',         // gold leaf
    rule: '#D8D2BC',
    ruleStrong: '#0D2240',
    green: '#3F6B4D',
    red: '#5B1A1A',
    invertedBg: '#0D2240',
    invertedInk: '#F8F6F0',
    invertedAccent: '#C9A14B',
    serif: "'EB Garamond', Georgia, serif",
    sans: "'Pretendard Variable', Pretendard, 'Inter Tight', 'Inter', system-ui, sans-serif",
    kr: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    krs: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",
    mono: "'IBM Plex Mono', monospace",
    display: "'Cormorant Garamond', Georgia, 'Noto Serif KR', serif",
    canvas: '#F8F6F0',
    krsRare: "'Noto Serif KR', 'Apple SD Gothic Neo', serif",
    ornament: 'document-modern',
  },
};

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

export const DEFAULT_THEME: ThemeId =
  (process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeId | undefined) &&
  (Object.keys(THEMES) as ThemeId[]).includes(process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeId)
    ? (process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeId)
    : 'GP';

// Production UI hides the switcher; dev/QA can still hit ?theme=A1 etc.
export const SHOW_THEME_SWITCHER = process.env.NEXT_PUBLIC_THEME_SWITCHER === '1';

// Resolve a theme id from an arbitrary string (query param, cookie, etc.)
export function resolveTheme(input: string | null | undefined): ThemeId {
  if (!input) return DEFAULT_THEME;
  const upper = input.toUpperCase();
  return (THEME_IDS as string[]).includes(upper) ? (upper as ThemeId) : DEFAULT_THEME;
}

// Generate the CSS variable block for a given theme.
// This is what gets rendered into <style> on every page.
export function themeToCSSVars(theme: Theme): string {
  return `
    --bg: ${theme.bg};
    --bg-2: ${theme.bg2};
    --bg-3: ${theme.bg3};
    --ink: ${theme.ink};
    --ink-2: ${theme.ink2};
    --ink-3: ${theme.ink3};
    --accent: ${theme.accent};
    --accent-bright: ${theme.accentBright};
    --accent-dim: ${theme.accentDim};
    --accent-2: ${theme.accent2};
    --rule: ${theme.rule};
    --rule-strong: ${theme.ruleStrong};
    --green: ${theme.green};
    --red: ${theme.red};
    --inv-bg: ${theme.invertedBg};
    --inv-ink: ${theme.invertedInk};
    --inv-accent: ${theme.invertedAccent};
    --font-serif: ${theme.serif};
    --font-sans: ${theme.sans};
    --font-kr: ${theme.kr};
    --font-krs: ${theme.krs};
    --font-mono: ${theme.mono};
    --font-display: ${theme.display};
    --font-krs-rare: ${theme.krsRare};
    --canvas: ${theme.canvas};
  `.trim();
}
