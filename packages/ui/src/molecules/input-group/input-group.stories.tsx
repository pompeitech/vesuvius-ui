import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'

const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupAddon>
        <SearchIcon className="size-4" aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search orders..." />
      <InputGroupButton aria-label="Open search filters">
        <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
      </InputGroupButton>
    </InputGroup>
  )
}

export const Currency: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>€</InputGroupAddon>
      <InputGroupInput inputMode="decimal" placeholder="0.00" />
      <InputGroupAddon>EUR</InputGroupAddon>
    </InputGroup>
  )
}
