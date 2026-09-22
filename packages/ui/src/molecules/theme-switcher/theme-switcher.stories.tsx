import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader, CardTitle } from '../../atoms/card/card'
import { COLOR_THEMES, ThemeProvider } from '../../theme/theme-provider'
import { ThemeSwitcher } from './theme-switcher'

// Reads/writes @pompeitech/vesuvius-ui's ThemeProvider directly, so it needs its own
// provider here — the Storybook toolbar toggles are a separate mechanism
// (see preview.tsx) that don't drive this React context.
const meta = {
  title: 'Molecules/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ThemeSwitcher />
}

export const InToolbar: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Vesuvius UI</CardTitle>
        <ThemeSwitcher />
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        The theme switcher can be dropped into any topbar — it changes the color theme and
        light/dark mode for the whole app instantly.
      </CardContent>
    </Card>
  )
}

/**
 * Simulates a theme delivered as its own npm package: the `<style>` tag
 * below stands in for that package's CSS import (a real one would ship a
 * `.css` file with these same `[data-theme="acme"]` blocks, imported once
 * in the app instead of inlined here). The app only needs to list the
 * name via `colorThemes` and, for the picker UI, a swatch color — no
 * changes to ThemeProvider/ThemeSwitcher themselves.
 */
export const CustomThemeFromAPackage: Story = {
  name: 'Custom theme (as if from an npm package)',
  decorators: [
    Story => (
      <ThemeProvider
        colorThemes={[...COLOR_THEMES, 'acme']}
        defaultColorTheme="acme"
        // Distinct key so this demo doesn't pick up a persisted built-in
        // choice persisted from other ThemeSwitcher stories sharing the
        // default key — real apps only ever have one ThemeProvider.
        colorThemeStorageKey="storybook-acme-demo-theme"
      >
        <style>{`
          [data-theme="acme"] {
            --primary: oklch(0.55 0.2 145);
            --primary-foreground: oklch(0.985 0 0);
            --ring: oklch(0.55 0.2 145);
          }
          [data-theme="acme"].dark {
            --primary: oklch(0.7 0.17 145);
            --primary-foreground: oklch(0.145 0 0);
            --ring: oklch(0.7 0.17 145);
          }
        `}</style>
        <Story />
      </ThemeProvider>
    )
  ],
  render: () => (
    <Card className="w-96">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Acme Inc.</CardTitle>
        <ThemeSwitcher swatchColors={{ acme: '#16a34a' }} />
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        "acme" isn't one of the kit's built-in themes — it's added purely via props, the same shape
        a real theme package would ship.
      </CardContent>
    </Card>
  )
}
