import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateTimeRangePicker } from './date-time-range-picker'

const meta = {
  title: 'Organisms/DateTimeRangePicker',
  component: DateTimeRangePicker,
  tags: ['autodocs']
} satisfies Meta<typeof DateTimeRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultRange: Story = {
  args: {
    defaultValue: {
      from: new Date(2026, 8, 12, 9, 30),
      to: new Date(2026, 8, 15, 17, 0)
    }
  }
}

export const TwentyFourHourWithSeconds: Story = {
  args: {
    hourFormat: '24',
    showSeconds: true,
    defaultValue: {
      from: new Date(2026, 8, 12, 9, 30, 15),
      to: new Date(2026, 8, 15, 17, 0, 45)
    }
  }
}
