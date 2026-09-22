import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '../../atoms/button/button'
import { useTheme } from '../../theme/theme-provider'

export type ThemeModeToggleProps = {
  className?: string
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
    </Button>
  )
}
