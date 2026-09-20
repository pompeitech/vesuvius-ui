import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../input/input'
import { Label } from './label'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs']
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Email address' }
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}
