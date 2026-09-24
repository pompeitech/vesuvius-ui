import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PeopleSelect, type PeopleSelectOption } from './people-select'

const people: PeopleSelectOption[] = [
  { value: 'ada', label: 'Ada Lovelace', description: 'Engineering' },
  { value: 'grace', label: 'Grace Hopper', description: 'Engineering' },
  { value: 'margaret', label: 'Margaret Hamilton', description: 'Engineering' },
  { value: 'katherine', label: 'Katherine Johnson', description: 'Data Science' }
]

const meta = {
  title: 'Organisms/PeopleSelect',
  component: PeopleSelect,
  tags: ['autodocs'],
  args: { options: people }
} satisfies Meta<typeof PeopleSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('ada')
    return (
      <PeopleSelect options={people} value={value} onChange={setValue} className="w-72" />
    )
  }
}

export const Empty: Story = {
  render: () => <PeopleSelect options={people} className="w-72" />
}

export const Clearable: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>('grace')
    return (
      <PeopleSelect
        options={people}
        value={value}
        onChange={setValue}
        clearable
        className="w-72"
      />
    )
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {(['xs', 'sm', 'default', 'lg'] as const).map(size => (
        <PeopleSelect key={size} size={size} options={people} defaultValue="ada" />
      ))}
    </div>
  )
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'ada' },
  render: args => <PeopleSelect {...args} options={people} className="w-72" />
}
