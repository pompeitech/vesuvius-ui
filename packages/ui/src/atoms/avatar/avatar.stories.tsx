import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvatarGroup } from '../../molecules/avatar-group/avatar-group'
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

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
