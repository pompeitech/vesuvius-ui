import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../atoms/badge/badge'
import { FilterBar } from './filter-bar'

const meta = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [search, setSearch] = useState('')
    return (
      <div className="w-[36rem]">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          onClear={() => setSearch('')}
        >
          <Badge variant="secondary">Status: Active</Badge>
        </FilterBar>
      </div>
    )
  }
}
