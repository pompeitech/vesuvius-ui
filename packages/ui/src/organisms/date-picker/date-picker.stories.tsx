import type { Meta, StoryObj } from '@storybook/react-vite'
import { it } from 'date-fns/locale'
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

export const Localized: Story = {
  name: 'Localized (Italian, Monday first)',
  args: { locale: it, weekStartsOn: 1, placeholder: 'Scegli una data', defaultValue: new Date() }
}
