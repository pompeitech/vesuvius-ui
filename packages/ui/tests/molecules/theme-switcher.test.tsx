import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ThemeModeToggle, ThemePalettePicker, ThemeSwitcher } from '@ui/molecules/theme-switcher'
import { ThemeProvider } from '@ui/theme/theme-provider'

describe('theme controls', () => {
  test('render their accessible controls', () => {
    render(
      <ThemeProvider>
        <ThemeModeToggle />
        <ThemePalettePicker />
        <ThemeSwitcher />
      </ThemeProvider>
    )
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
})
