import { CheckIcon, ChevronDownIcon, ShuffleIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'
import { type ColorTheme, useTheme } from '../../theme/theme-provider'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../command/command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover'
import {
  DEFAULT_THEME_SWATCHES,
  FALLBACK_THEME_SWATCH,
  formatThemeName,
  type ThemeSwatch
} from './theme-swatches'

function ThemeSwatchPreview({ swatch }: { swatch: ThemeSwatch }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-hidden="true">
      {swatch.map((color, i) => (
        <span
          key={i}
          className="ring-border size-3.5 rounded-[3px] ring-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  )
}

export type ThemePalettePickerProps = {
  swatches?: Record<string, ThemeSwatch>
  className?: string
}

export function ThemePalettePicker({ swatches, className }: ThemePalettePickerProps) {
  const { colorTheme, setColorTheme, colorThemes } = useTheme()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const resolvedSwatches = useMemo(() => ({ ...DEFAULT_THEME_SWATCHES, ...swatches }), [swatches])

  const swatchFor = (theme: ColorTheme) => resolvedSwatches[theme] ?? FALLBACK_THEME_SWATCH

  const handleSelect = (theme: ColorTheme) => {
    setColorTheme(theme)
    setOpen(false)
  }

  const handleShuffle = () => {
    const pool = colorThemes.filter(theme => theme !== colorTheme)
    const candidates = pool.length > 0 ? pool : colorThemes
    const next = candidates[Math.floor(Math.random() * candidates.length)]
    if (next) handleSelect(next)
  }

  return (
    <Popover
      open={open}
      onOpenChange={next => {
        setOpen(next)
        if (!next) setSearch('')
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('h-9 gap-2 px-3', className)}
          aria-label={`Theme: ${formatThemeName(colorTheme)}`}
        >
          <ThemeSwatchPreview swatch={swatchFor(colorTheme)} />
          <span className="text-sm font-medium">{formatThemeName(colorTheme)}</span>
          <ChevronDownIcon className="text-muted-foreground size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="end">
        <Command shouldFilter>
          <CommandInput placeholder="Search themes..." value={search} onValueChange={setSearch} />
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-muted-foreground text-xs">{colorThemes.length} themes</span>
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Switch to a random theme"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-sm p-1"
            >
              <ShuffleIcon className="size-3.5" />
            </button>
          </div>
          <CommandList>
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              {colorThemes.map(theme => (
                <CommandItem key={theme} value={theme} onSelect={() => handleSelect(theme)}>
                  <ThemeSwatchPreview swatch={swatchFor(theme)} />
                  <span>{formatThemeName(theme)}</span>
                  {theme === colorTheme && <CheckIcon className="ml-auto size-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
