import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail } from 'lucide-react'
import { Button, type ButtonProps } from './button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg']
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Button', variant: 'default', size: 'default' }
}

export const AllVariants: Story = {
  args: { children: 'Button' },
  render: (args: ButtonProps) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  )
}

export const Sizes: Story = {
  args: { children: 'Button' },
  render: (args: ButtonProps) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="xs">
        Extra small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
}

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Send email">
        <Mail />
      </Button>
      <Button size="icon-sm" aria-label="Send email">
        <Mail />
      </Button>
      <Button size="icon" aria-label="Send email">
        <Mail />
      </Button>
      <Button size="icon-lg" aria-label="Send email">
        <Mail />
      </Button>
    </div>
  )
}

export const Disabled: Story = {
  args: { children: 'Button', disabled: true }
}
