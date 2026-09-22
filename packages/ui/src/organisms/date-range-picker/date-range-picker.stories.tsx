import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateRangePicker } from './date-range-picker'

const meta = {
  title: 'Organisms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs']
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultRange: Story = {
  args: {
    defaultValue: {
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date()
    }
  }
}

export const SingleMonth: Story = {
  args: { numberOfMonths: 1 }
}
