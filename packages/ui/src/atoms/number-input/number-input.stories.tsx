import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberInput } from './number-input'

const meta = {
  title: 'Atoms/Number Input',
  component: NumberInput,
  tags: ['autodocs']
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 0, 'aria-label': 'Quantity' }
}

export const WithStep: Story = {
  args: { defaultValue: 10, step: 5, 'aria-label': 'Quantity' }
}

export const Disabled: Story = {
  args: { defaultValue: 3, disabled: true, 'aria-label': 'Quantity' }
}
