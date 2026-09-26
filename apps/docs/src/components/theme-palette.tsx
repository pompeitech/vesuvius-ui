import type { CSSProperties } from 'react'

// Tokens shown per theme, in swatch order. Rendered by setting `data-theme`
// (and `.dark`) on a real DOM node and reading the live CSS custom
// properties via `var(--token)` — never hardcoded color values — so this
// can never drift from the actual theme files in packages/ui/src/styles.
const TOKENS: [string, string][] = [
  ['background', 'Background'],
  ['foreground', 'Foreground'],
  ['card', 'Card'],
  ['card-foreground', 'Card Fg'],
  ['primary', 'Primary'],
  ['primary-foreground', 'Primary Fg'],
  ['secondary', 'Secondary'],
  ['secondary-foreground', 'Secondary Fg'],
  ['muted', 'Muted'],
  ['muted-foreground', 'Muted Fg'],
  ['accent', 'Accent'],
  ['accent-foreground', 'Accent Fg'],
  ['destructive', 'Destructive'],
  ['success', 'Success'],
  ['warning', 'Warning'],
  ['border', 'Border'],
  ['chart-1', 'Chart 1'],
  ['chart-2', 'Chart 2'],
  ['chart-3', 'Chart 3'],
  ['chart-4', 'Chart 4'],
  ['chart-5', 'Chart 5']
]

function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="size-10 rounded-md border border-border shadow-sm"
        style={{ background: `var(--${token})` } as CSSProperties}
      />
      <span className="text-center text-[10px] leading-tight text-muted-foreground">{label}</span>
    </div>
  )
}

function Panel({ theme, dark, label }: { theme?: string; dark?: boolean; label: string }) {
  return (
    <div
      data-theme={theme}
      className={
        dark
          ? 'dark rounded-lg border border-border bg-background p-4'
          : 'rounded-lg border border-border bg-background p-4'
      }
    >
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {TOKENS.map(([token, tokenLabel]) => (
          <Swatch key={token} token={token} label={tokenLabel} />
        ))}
      </div>
    </div>
  )
}

/**
 * Live color reference for one theme, light + dark side by side. `theme`
 * is the `data-theme` value (e.g. "lava"); omit it to show the base
 * (unthemed) palette.
 */
export function ThemePalette({ theme }: { theme?: string }) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2">
      <Panel theme={theme} label="Light" />
      <Panel theme={theme} dark label="Dark" />
    </div>
  )
}

export default ThemePalette
