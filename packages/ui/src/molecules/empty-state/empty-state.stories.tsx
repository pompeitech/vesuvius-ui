import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileSearchIcon, PlusIcon } from 'lucide-react'
import { Button } from '../../atoms/button/button'
import { EmptyState } from './empty-state'

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: FileSearchIcon,
    title: 'No orders yet',
    description: 'Orders will appear here once your first customer checks out.',
    action: (
      <Button size="sm">
        <PlusIcon />
        Create order
      </Button>
    )
  }
}

export const Compact: Story = {
  args: {
    icon: FileSearchIcon,
    title: 'No matching results',
    description: 'Try changing your filters or search term.',
    compact: true
  }
}
