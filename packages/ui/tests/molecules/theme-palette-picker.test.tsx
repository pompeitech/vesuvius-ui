import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemePalettePicker } from '@ui/molecules/theme-switcher/theme-palette-picker'
import { ThemeProvider } from '@ui/theme/theme-provider'
import { beforeEach, describe, expect, test } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  delete document.documentElement.dataset.theme
})

describe('ThemePalettePicker', () => {
  test('searches and selects a color theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemePalettePicker />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /theme: lava/i }))
    await user.type(screen.getByPlaceholderText('Search themes...'), 'Supabase')
    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByText('Supabase'))
    expect(document.documentElement.dataset.theme).toBe('supabase')
  })

  test('shows an empty state for an unknown theme query', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemePalettePicker />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: /theme: lava/i }))
    await user.type(screen.getByPlaceholderText('Search themes...'), 'does-not-exist')
    expect(await screen.findByText('No theme found.')).toBeVisible()
  })
})
