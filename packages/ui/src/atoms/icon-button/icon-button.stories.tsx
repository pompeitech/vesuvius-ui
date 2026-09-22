import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { IconButton } from './icon-button'

const meta = {
  title: 'Atoms/Icon Button',
  component: IconButton,
  tags: ['autodocs']
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Edit' },
  render: (args) => (
    <IconButton {...args}>
      <Pencil />
    </IconButton>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton size="xs" aria-label="Extra small">
        <Pencil />
      </IconButton>
      <IconButton size="sm" aria-label="Small">
        <Pencil />
      </IconButton>
      <IconButton size="default" aria-label="Default">
        <Pencil />
      </IconButton>
      <IconButton size="lg" aria-label="Large">
        <Pencil />
      </IconButton>
    </div>
  )
}

export const Examples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton aria-label="Add">
        <Plus />
      </IconButton>
      <IconButton aria-label="Edit">
        <Pencil />
      </IconButton>
      <IconButton aria-label="Delete">
        <Trash2 />
      </IconButton>
      <IconButton aria-label="Close">
        <X />
      </IconButton>
    </div>
  )
}

export const Disabled: Story = {
  args: { 'aria-label': 'Edit', disabled: true },
  render: (args) => (
    <IconButton {...args}>
      <Pencil />
    </IconButton>
  )
}
