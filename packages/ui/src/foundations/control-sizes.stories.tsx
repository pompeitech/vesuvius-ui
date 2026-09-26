import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../atoms/button/button'
import { Input } from '../atoms/input/input'
import { CONTROL_SIZES, type ControlSize } from '../lib/control-size'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../molecules/select/select'
import { MultiSelect } from '../organisms/multi-select/multi-select'

const meta = {
  title: 'Foundations/Control Sizes',
  parameters: { layout: 'centered' }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ControlRow({ size }: { size: ControlSize }) {
  return (
    <div className="grid grid-cols-[5rem_repeat(4,12rem)] items-center gap-3">
      <code className="text-muted-foreground text-xs">{size}</code>
      <Button size={size}>Button</Button>
      <Input size={size} aria-label={`${size} text input`} placeholder="Text input" />
      <Select>
        <SelectTrigger size={size} className="w-full" aria-label={`${size} select`}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">Option one</SelectItem>
          <SelectItem value="two">Option two</SelectItem>
        </SelectContent>
      </Select>
      <MultiSelect
        size={size}
        options={[
          { label: 'Option one', value: 'one' },
          { label: 'Option two', value: 'two' }
        ]}
        defaultValue={['one']}
        maxDisplay={1}
        aria-label={`${size} multi-select`}
      />
    </div>
  )
}

export const Comparison: Story = {
  render: () => (
    <div className="space-y-3 overflow-x-auto p-1">
      <div className="text-muted-foreground grid grid-cols-[5rem_repeat(4,12rem)] gap-3 text-xs font-medium">
        <span>Size</span>
        <span>Button</span>
        <span>Input</span>
        <span>Select</span>
        <span>MultiSelect</span>
      </div>
      {CONTROL_SIZES.map(size => (
        <ControlRow key={size} size={size} />
      ))}
    </div>
  )
}
