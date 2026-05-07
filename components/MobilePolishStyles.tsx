// Agent M2 — mobile polish layer.
// Loaded once globally via <Footer />. Every rule below is scoped inside a
// media query (max-width: 768px, hover/coarse pointer, or prefers-reduced-motion).
// Desktop is untouched. Layered ON TOP of Wave 3's structural mobile rules
// in app/globals.css — does not duplicate stacked grids, ticker scroll,
// ops table edge-to-edge, hero CTA stacking, etc.

export function MobilePolishStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

const CSS = `
/* ════════════════════════════════════════════════════════════════════
   GoldPath — Mobile Polish Layer (Agent M2)
   Post-Pretendard recalibration + ambient ease.
   ════════════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
  /* ── A. Korean typography rebalance for Pretendard ───────────────── */
  html[lang="ko"] p,
  html[lang="ko"] li,
  html[lang="ko"] dd,
  html[lang="ko"] dt {
    font-size: 15px !important;
    line-height: 1.72 !important;
    letter-spacing: -0.012em !important;
    word-break: keep-all;
  }
  html[lang="ko"] h1 {
    line-height: 1.04 !important;
    letter-spacing: -0.025em !important;
    font-weight: 600 !important;
  }
  html[lang="ko"] h2 {
    line-height: 1.10 !important;
    letter-spacing: -0.022em !important;
    font-weight: 600 !important;
  }
  html[lang="ko"] h3 {
    line-height: 1.18 !important;
    letter-spacing: -0.018em !important;
    font-weight: 600 !important;
  }
  html[lang="ko"] h4,
  html[lang="ko"] h5 {
    line-height: 1.24 !important;
    letter-spacing: -0.014em !important;
    font-weight: 600 !important;
  }
  html[lang="ko"] [class*="eyebrow"],
  [data-mobile*="eyebrow"] {
    font-size: 10px !important;
    letter-spacing: 0.22em !important;
  }

  /* ── B. Tabular figures everywhere on mobile ─────────────────────── */
  [class*="num"], [class*="price"], [class*="value"],
  [class*="counter"], [class*="cohort"], [class*="ticker"],
  [class*="-num"], [class*="figure"], [class*="metric"],
  .gp-num, .gp-mono, [class*="mono"] {
    font-variant-numeric: tabular-nums !important;
    font-feature-settings: 'tnum' 1, 'lnum' 1 !important;
  }

  /* ── C. Easier-on-eye section transitions ────────────────────────── */
  section + section {
    position: relative;
  }
  section + section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--accent) 36%, transparent),
      transparent
    );
    opacity: 0.6;
    pointer-events: none;
  }

  /* ── D. Breathing accent strip — gentle ambient motion ───────────── */
  body::after {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      color-mix(in srgb, var(--accent) 22%, transparent) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
    animation: gp-mobile-breathe 8s ease-in-out infinite;
  }
  @keyframes gp-mobile-breathe {
    0%, 100% { opacity: 0.30; transform: scaleY(1); }
    50%      { opacity: 0.60; transform: scaleY(1.04); }
  }

  /* ── E. Softer card borders on mobile ────────────────────────────── */
  [class*="-card"], [class*="card-"],
  div[style*="border: 1px solid var(--rule)"],
  div[style*="border:1px solid var(--rule)"] {
    border-color: color-mix(in srgb, var(--rule) 70%, transparent) !important;
    border-radius: 4px !important;
  }
  /* Carousel cards keep their own border-radius */
  .gp-carousel-track article {
    border-radius: 16px !important;
  }

  /* ── F. More breathing room — universal padding bump ─────────────── */
  section:not(.gp-hero) {
    padding-top: clamp(40px, 10vw, 64px) !important;
    padding-bottom: clamp(40px, 10vw, 64px) !important;
  }
  html[lang="ko"] p + p {
    margin-top: 1em !important;
  }

  /* ── G. Subtle gradient washes behind headlines ──────────────────── */
  h1, h2 {
    position: relative;
  }
  h1::before, h2::before {
    content: '';
    position: absolute;
    top: -16px;
    left: -8px;
    right: -8px;
    height: 80px;
    background: radial-gradient(
      ellipse at 30% 50%,
      color-mix(in srgb, var(--accent) 6%, transparent),
      transparent 70%
    );
    pointer-events: none;
    z-index: -1;
  }

  /* ── I. Calm shadow under sticky nav as it scrolls ───────────────── */
  .gp-nav[data-scrolled="true"] {
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent) 14%, transparent),
      0 12px 24px -16px color-mix(in srgb, var(--ink) 22%, transparent) !important;
  }

  /* ── J. Permanent link underlines (no hover on touch) ────────────── */
  article a, .gp-prose a, p a, dl a {
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 60%, transparent);
    padding-bottom: 1px;
  }

  /* ── K. Soften dense mono labels ─────────────────────────────────── */
  [class*="mono"] {
    letter-spacing: 0.18em !important;
  }

  /* ── L. FAQ details/summary easing ───────────────────────────────── */
  details {
    transition: background 220ms ease;
  }
  details[open] {
    background: color-mix(in srgb, var(--accent) 4%, transparent);
  }
  summary {
    padding: 16px 8px !important;
    cursor: pointer;
    list-style: none;
    transition: color 200ms ease;
  }
  summary::-webkit-details-marker { display: none; }
  summary:active { color: var(--accent); }

  /* ── M. Hero card glow softer on mobile ──────────────────────────── */
  .gp-hero .gp-breathe,
  .gp-hero [class*="breathe"] {
    opacity: 0.6 !important;
    filter: blur(12px) !important;
  }

  /* ── N. Reduce flake/particle density on mobile ──────────────────── */
  [class*="flake"]:nth-child(n+4) {
    display: none !important;
  }

  /* ── O. Smoother scroll + sticky-nav anchor offset ───────────────── */
  html { scroll-behavior: smooth; }
  section[id], [id] {
    scroll-margin-top: 80px;
  }
}

/* ── H. Touch-feedback ripple (replaces flat tap) ────────────────────── */
@media (hover: none) and (pointer: coarse) {
  a, button, [role="button"], summary {
    -webkit-tap-highlight-color: color-mix(in srgb, var(--accent) 18%, transparent);
    transition: background 160ms ease, transform 80ms ease, opacity 160ms ease;
  }
  a:active,
  button:active,
  [role="button"]:active,
  summary:active {
    transform: scale(0.97);
    opacity: 0.85;
  }
}

/* ── Reduced motion — disable ambient breathe ───────────────────────── */
@media (prefers-reduced-motion: reduce) {
  body::after { animation: none !important; }
  html { scroll-behavior: auto; }
}
`;
