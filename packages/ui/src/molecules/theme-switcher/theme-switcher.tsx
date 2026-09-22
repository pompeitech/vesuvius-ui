import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'
import { type Theme, useTheme } from '../../theme/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../dropdown-menu/dropdown-menu'
import { formatThemeName } from './theme-swatches'

const DEFAULT_SWATCH_COLORS: Record<string, string> = {
  lava: '#D65A31',
  stripe: '#533afd',
  vercel: '#000000',
  supabase: '#71e1ac',
  linear: '#6e78d5',
  claude: '#c15f3c',
  'amber-minimal': '#f49f1e',
  claymorphism: '#8b5cf6',
  alpine: '#3158d9',
  aubergine: '#3f0e40'
}

const FALLBACK_SWATCH_COLOR = '#71717a'

const MODE_OPTIONS: { value: Theme; label: string; icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon }
]

export type ThemeSwitcherProps = {
  className?: string
  swatchColors?: Record<string, string>
}

export function ThemeSwitcher({ className, swatchColors }: ThemeSwitcherProps) {
  const { theme, setTheme, colorTheme, setColorTheme, colorThemes } = useTheme()
  const swatches = { ...DEFAULT_SWATCH_COLORS, ...swatchColors }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('relative', className)}
          aria-label={`Change theme (currently ${colorTheme})`}
        >
          {/* The trigger itself shows the *active* color, not a generic
              icon — so it reads as "the color theme control" at a glance,
              and doubles as a live preview of what's currently selected. */}
          <span
            aria-hidden="true"
            className="ring-border size-4 rounded-full ring-1 ring-inset"
            style={{
              backgroundColor: swatches[colorTheme] ?? FALLBACK_SWATCH_COLOR
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-3">
        <DropdownMenuLabel className="text-muted-foreground px-0 text-xs tracking-wide uppercase">
          Mode
        </DropdownMenuLabel>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {MODE_OPTIONS.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              type="button"
              variant={theme === value ? 'secondary' : 'ghost'}
              size="sm"
              className="flex h-auto flex-col gap-1 py-2"
              onClick={() => setTheme(value)}
            >
              <Icon className="size-4" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>

        <DropdownMenuSeparator className="my-3" />

        <DropdownMenuLabel className="text-muted-foreground px-0 text-xs tracking-wide uppercase">
          Color theme
        </DropdownMenuLabel>
        <div className="mt-1.5 grid grid-cols-4 gap-2">
          {colorThemes.map(name => (
            <button
              key={name}
              type="button"
              onClick={() => setColorTheme(name)}
              aria-label={`Use ${formatThemeName(name)} theme`}
              aria-pressed={colorTheme === name}
              className={cn(
                'ring-offset-background relative flex size-7 items-center justify-center rounded-full ring-offset-2 transition-shadow',
                colorTheme === name && 'ring-ring ring-2'
              )}
              style={{
                backgroundColor: swatches[name] ?? FALLBACK_SWATCH_COLOR
              }}
            >
              {colorTheme === name && <CheckIcon className="size-3.5 text-white drop-shadow" />}
              <span className="sr-only">{formatThemeName(name)}</span>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
