import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '../../theme/theme-provider'
import { ThemeModeToggle } from './theme-mode-toggle'
import { ThemePalettePicker } from './theme-palette-picker'

const meta = {
  title: 'Molecules/ThemeModeToggle',
  component: ThemeModeToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof ThemeModeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPalettePicker: Story = {
  name: 'Paired with ThemePalettePicker (topbar pattern)',
  render: () => (
    <div className="flex items-center gap-2">
      <ThemeModeToggle />
      <ThemePalettePicker />
    </div>
  )
}
