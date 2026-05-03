import { THEMES, THEME_IDS, type ThemeId } from '@/lib/themes';
import { setTheme } from '@/app/actions/theme';

// Floating theme picker. Visible on every page during the design-decision phase.
// Removed (or admin-gated) once a direction is locked.
export function ThemeSwitcher({ active }: { active: ThemeId }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        background: 'var(--inv-bg)',
        color: 'var(--inv-ink)',
        border: '1px solid var(--rule-strong)',
        padding: '10px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.14em',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ opacity: 0.6, marginRight: 4 }}>THEME</span>
      {THEME_IDS.map((id) => (
        <form key={id} action={setTheme} style={{ display: 'inline' }}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            title={THEMES[id].name}
            style={{
              padding: '5px 9px',
              background: id === active ? 'var(--inv-accent)' : 'transparent',
              color: id === active ? 'var(--inv-bg)' : 'var(--inv-ink)',
              border: `1px solid ${id === active ? 'var(--inv-accent)' : 'var(--rule-strong)'}`,
              fontFamily: 'inherit',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {id}
          </button>
        </form>
      ))}
    </div>
  );
}
