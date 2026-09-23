import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserAvatar } from '../user-avatar/user-avatar'
import { AvatarGroup } from './avatar-group'

const meta = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  args: { children: null }
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

const TEAM = [
  'Ada Lovelace',
  'Grace Hopper',
  'Alan Turing',
  'Margaret Hamilton',
  'Barbara Liskov',
  'Katherine Johnson',
  'Donald Knuth'
]

export const Default: Story = {
  render: () => (
    <AvatarGroup max={4}>
      {TEAM.map(name => (
        <UserAvatar key={name} name={name} />
      ))}
    </AvatarGroup>
  )
}

export const HoverToExpand: Story = {
  name: 'Hover to see the tooltip-free names (expands stack)',
  render: () => (
    <AvatarGroup max={5}>
      {TEAM.map(name => (
        <UserAvatar key={name} name={name} />
      ))}
    </AvatarGroup>
  )
}

export const SquareLarge: Story = {
  render: () => (
    <AvatarGroup max={4} shape="square" size="lg">
      {TEAM.map(name => (
        <UserAvatar key={name} name={name} shape="square" size="lg" />
      ))}
    </AvatarGroup>
  )
}

export const NoOverflow: Story = {
  render: () => (
    <AvatarGroup max={10}>
      {TEAM.slice(0, 3).map(name => (
        <UserAvatar key={name} name={name} />
      ))}
    </AvatarGroup>
  )
}
