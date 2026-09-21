import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './select'

const meta = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs']
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      {/* role="combobox" doesn't get an accessible name from its content */}
      <SelectTrigger className="w-56" aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-56 flex-col gap-3">
      {(['xs', 'sm', 'default', 'lg'] as const).map(size => (
        <Select key={size}>
          <SelectTrigger size={size} className="w-full" aria-label={`${size} fruit`}>
            <SelectValue placeholder={`${size} select`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
