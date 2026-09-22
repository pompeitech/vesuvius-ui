import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationCenter, type Notification } from './notification-center'

const meta = {
  title: 'Molecules/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs']
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

const NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Build complete', description: 'main deployed to production' },
  { id: '2', title: 'New comment', description: 'Maya Chen commented on your PR', read: true },
  { id: '3', title: 'Storage almost full', description: '92% of your plan used' }
]

export const Default: Story = {
  args: { notifications: NOTIFICATIONS }
}

export const Empty: Story = {
  args: { notifications: [] }
}
