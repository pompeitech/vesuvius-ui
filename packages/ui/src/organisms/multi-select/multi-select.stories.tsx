import type { Meta, StoryObj } from '@storybook/react-vite'
import { Laptop, Palette, ShieldCheck, ShoppingCart, TrendingUp, Truck, Users } from 'lucide-react'
import { useState } from 'react'
import { MultiSelect, type MultiSelectOption } from './multi-select'

const departments: MultiSelectOption[] = [
  { label: 'Sales', value: 'sales', icon: TrendingUp },
  { label: 'Marketing', value: 'marketing', icon: Palette },
  { label: 'Engineering', value: 'engineering', icon: Laptop },
  { label: 'Customer Support', value: 'support', icon: Users },
  { label: 'Logistics', value: 'logistics', icon: Truck },
  { label: 'Ecommerce', value: 'ecommerce', icon: ShoppingCart },
  { label: 'Security', value: 'security', icon: ShieldCheck }
]

const meta = {
  title: 'Organisms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: { options: departments, 'aria-label': 'Departments' }
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>(['sales', 'engineering'])
    return (
      <MultiSelect
        options={departments}
        value={values}
        onValueChange={setValues}
        placeholder="Select departments..."
        aria-label="Departments"
        className="w-96"
      />
    )
  }
}

export const Empty: Story = {
  render: () => (
    <MultiSelect
      options={departments}
      placeholder="Select departments..."
      aria-label="Departments"
      className="w-96"
    />
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      {(['xs', 'sm', 'default', 'lg'] as const).map(size => (
        <MultiSelect
          key={size}
          size={size}
          options={departments}
          defaultValue={['sales']}
          maxDisplay={1}
          aria-label={`${size} departments`}
        />
      ))}
    </div>
  )
}

export const ManySelected: Story = {
  name: 'Overflow (+N more)',
  render: function Render() {
    const [values, setValues] = useState<string[]>(departments.map(d => d.value))
    return (
      <MultiSelect
        options={departments}
        value={values}
        onValueChange={setValues}
        maxDisplay={2}
        aria-label="Departments"
        className="w-96"
      />
    )
  }
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['sales'] },
  render: args => <MultiSelect {...args} options={departments} className="w-96" />
}
