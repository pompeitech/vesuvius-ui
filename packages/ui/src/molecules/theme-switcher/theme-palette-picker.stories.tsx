import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '../../theme/theme-provider'
import { ThemePalettePicker } from './theme-palette-picker'

const meta = {
  title: 'Molecules/ThemePalettePicker',
  component: ThemePalettePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof ThemePalettePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
