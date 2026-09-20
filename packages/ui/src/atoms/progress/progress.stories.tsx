import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './progress'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs']
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 45, className: 'w-64', 'aria-label': 'Upload progress' }
}

export const Complete: Story = {
  args: { value: 100, className: 'w-64', 'aria-label': 'Upload progress' }
}
