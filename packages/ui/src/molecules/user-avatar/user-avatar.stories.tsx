import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserAvatar } from './user-avatar'

const meta = {
  title: 'Molecules/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace' }
} satisfies Meta<typeof UserAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const InitialsFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <UserAvatar name="Ada Lovelace" />
      <UserAvatar name="Grace Hopper" />
      <UserAvatar name="Alan Turing" />
      <UserAvatar name="Margaret Hamilton" />
      <UserAvatar name="Barbara" />
    </div>
  )
}

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <UserAvatar name="Ada Lovelace" shape="circle" />
      <UserAvatar name="Ada Lovelace" shape="square" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <UserAvatar name="Ada Lovelace" size="sm" />
      <UserAvatar name="Ada Lovelace" size="default" />
      <UserAvatar name="Ada Lovelace" size="lg" />
      <UserAvatar name="Ada Lovelace" size="xl" />
    </div>
  )
}

export const BrokenImageFallsBackToInitials: Story = {
  name: 'Broken image → falls back to initials',
  args: { name: 'Ada Lovelace', src: 'https://broken-url.example/none.png' }
}
