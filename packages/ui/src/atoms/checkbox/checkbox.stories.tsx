import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'
import { Label } from '../label/label'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs']
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Accept terms and conditions' }
}

export const WithLabel: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export const Checked: Story = {
  args: { defaultChecked: true, 'aria-label': 'Accept terms and conditions' }
}

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Accept terms and conditions' }
}
