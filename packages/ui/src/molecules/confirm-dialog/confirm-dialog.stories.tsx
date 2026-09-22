import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmDialog } from './confirm-dialog'

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    trigger: 'Delete project',
    title: 'Delete project?',
    description: 'This action cannot be undone.'
  }
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: {
    destructive: true,
    confirmLabel: 'Delete'
  }
}
