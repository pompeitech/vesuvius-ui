import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateTimePicker } from './date-time-picker'

const meta = {
  title: 'Organisms/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs']
} satisfies Meta<typeof DateTimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Basic date time picker',
    defaultValue: new Date(2026, 8, 12, 17, 20)
  }
}

export const Empty: Story = {
  args: { label: 'Basic date time picker' }
}

export const TwentyFourHour: Story = {
  name: '24-hour',
  args: {
    label: 'Date & time (24h)',
    hourFormat: '24',
    defaultValue: new Date(2026, 8, 12, 17, 20)
  }
}

export const WithSeconds: Story = {
  args: {
    label: 'Date & time with seconds',
    showSeconds: true,
    defaultValue: new Date(2026, 8, 12, 17, 20, 45)
  }
}

export const Disabled: Story = {
  args: {
    label: 'Basic date time picker',
    disabled: true,
    defaultValue: new Date(2026, 8, 12, 17, 20)
  }
}
