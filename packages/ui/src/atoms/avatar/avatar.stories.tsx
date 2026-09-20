import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/pompeitech.png" alt="@pompeitech" />
      <AvatarFallback>PT</AvatarFallback>
    </Avatar>
  )
}

export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-url.example/none.png" alt="" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}

// A "Group" story (stacked avatars) belongs to the AvatarGroup molecule,
// which lands in a later release — see src/molecules/avatar-group.
