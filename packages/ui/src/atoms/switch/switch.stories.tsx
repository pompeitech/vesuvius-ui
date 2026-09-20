import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../label/label'
import { Switch } from './switch'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs']
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Airplane mode' }
}

export const WithLabel: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  )
}

export const Checked: Story = {
  args: { defaultChecked: true, 'aria-label': 'Airplane mode' }
}

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Airplane mode' }
}
