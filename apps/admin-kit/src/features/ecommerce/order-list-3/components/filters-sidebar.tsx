import type { OrderStatus } from '@pompeitech/mock-data'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { ORDER_STATUS_OPTIONS } from '../../_shared/format'
import { SORT_OPTIONS, type SortOption, type StatusFilter } from '../types'
import { FilterButton } from './filter-button'

type StatusCounts = Record<StatusFilter, number>

type FiltersSidebarProps = {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  statusCounts: StatusCounts
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

/** The left-hand filter rail: search, status chips with counts, and the sort select. */
export function FiltersSidebar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statusCounts,
  sort,
  onSortChange
}: FiltersSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search orders..."
          className="pl-8"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Order status</p>
        <div className="grid grid-cols-2 gap-2">
          <FilterButton
            active={status === 'all'}
            count={statusCounts.all}
            onClick={() => onStatusChange('all')}
          >
            All
          </FilterButton>
          {ORDER_STATUS_OPTIONS.map(option => (
            <FilterButton
              key={option.value}
              active={status === option.value}
              count={statusCounts[option.value as OrderStatus]}
              onClick={() => onStatusChange(option.value)}
            >
              {option.label}
            </FilterButton>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Sort by</p>
        <Select value={sort} onValueChange={value => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
