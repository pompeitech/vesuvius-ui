import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './date-picker'

const meta = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  tags: ['autodocs']
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDefaultValue: Story = {
  args: { defaultValue: new Date() }
}

export const Disabled: Story = {
  args: { disabled: true }
}
