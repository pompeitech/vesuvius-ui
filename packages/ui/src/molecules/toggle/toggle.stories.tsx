import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold } from 'lucide-react'
import { Toggle } from './toggle'

const meta = {
  title: 'Molecules/Toggle',
  component: Toggle,
  tags: ['autodocs']
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Toggle bold' },
  render: args => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  )
}

export const Outline: Story = {
  args: { variant: 'outline', 'aria-label': 'Toggle bold' },
  render: args => (
    <Toggle {...args}>
      <Bold />
      Bold
    </Toggle>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle size="xs" aria-label="Extra small">
        <Bold />
      </Toggle>
      <Toggle size="sm" aria-label="Small">
        <Bold />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Bold />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold />
      </Toggle>
    </div>
  )
}
