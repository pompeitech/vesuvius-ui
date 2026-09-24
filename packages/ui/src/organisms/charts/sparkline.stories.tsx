import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkline } from './sparkline'

const meta = {
  title: 'Organisms/Charts/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  args: { data: [12, 18, 14, 22, 19, 27, 24, 31] },
  parameters: { layout: 'centered' }
} satisfies Meta<typeof Sparkline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="text-primary w-32">
      <Sparkline {...args} />
    </div>
  )
}

export const TrendingDown: Story = {
  render: () => (
    <div className="text-destructive w-32">
      <Sparkline data={[31, 27, 29, 22, 20, 18, 15, 12]} />
    </div>
  )
}

export const Filled: Story = {
  render: args => (
    <div className="text-success-emphasis w-32">
      <Sparkline {...args} filled />
    </div>
  )
}
