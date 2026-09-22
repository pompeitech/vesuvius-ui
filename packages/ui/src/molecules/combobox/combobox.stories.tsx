import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from './combobox'

const OPTIONS = [
  { value: 'engineering', label: 'Engineering', description: '12 members' },
  { value: 'design', label: 'Design', description: '8 members' },
  { value: 'marketing', label: 'Marketing', description: '5 members' },
  { value: 'sales', label: 'Sales', description: '14 members' }
]

const meta = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: { options: OPTIONS, placeholder: 'Select a team...' },
  parameters: { layout: 'centered' }
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Clearable: Story = {
  args: { defaultValue: 'engineering', clearable: true }
}
export const Sizes: Story = {
  render: args => (
    <div className="flex w-72 flex-col gap-3">
      {(['xs', 'sm', 'default', 'lg'] as const).map(size => (
        <Combobox key={size} {...args} size={size} placeholder={size} />
      ))}
    </div>
  )
}
