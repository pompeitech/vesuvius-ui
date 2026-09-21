import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Check, ChevronRight, Mail, MoreHorizontal, UserRound } from 'lucide-react'
import { Badge } from '../../atoms/badge/badge'
import { List, ListItem } from './list'

const meta = {
  title: 'Molecules/List',
  component: List,
  tags: ['autodocs']
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <List className="max-w-md rounded-lg border">
      <ListItem
        leading={<UserRound className="size-4" />}
        trailing={<ChevronRight className="size-4" />}
      >
        <span className="font-medium">Account settings</span>
        <span className="text-muted-foreground mt-0.5 block text-xs">Manage your profile</span>
      </ListItem>
      <ListItem leading={<Bell className="size-4" />} trailing={<Badge>3</Badge>}>
        <span className="font-medium">Notifications</span>
        <span className="text-muted-foreground mt-0.5 block text-xs">You have new activity</span>
      </ListItem>
      <ListItem
        leading={<Mail className="size-4" />}
        trailing={<Check className="size-4 text-green-500" />}
      >
        <span className="font-medium">Email preferences</span>
      </ListItem>
    </List>
  )
}

export const Dense: Story = {
  render: () => (
    <List dividers className="max-w-md rounded-lg border">
      <ListItem
        dense
        leading={<span className="size-2 rounded-full bg-green-500" />}
        trailing="Online"
      >
        Maya Chen
      </ListItem>
      <ListItem
        dense
        leading={<span className="size-2 rounded-full bg-yellow-500" />}
        trailing="Away"
      >
        Noah Williams
      </ListItem>
      <ListItem
        dense
        leading={<span className="size-2 rounded-full bg-muted-foreground" />}
        trailing="Offline"
      >
        Sofia Rossi
      </ListItem>
    </List>
  )
}

export const Slots: Story = {
  render: () => (
    <List className="max-w-md rounded-lg border">
      <ListItem leading={<span className="rounded-md bg-primary/10 p-2 text-primary">A</span>}>
        Leading content only
      </ListItem>
      <ListItem trailing={<MoreHorizontal className="size-4" />}>Trailing content only</ListItem>
      <ListItem
        leading={<span className="rounded-md bg-primary/10 p-2 text-primary">A</span>}
        trailing={<Badge variant="secondary">New</Badge>}
      >
        Both slots
      </ListItem>
    </List>
  )
}
