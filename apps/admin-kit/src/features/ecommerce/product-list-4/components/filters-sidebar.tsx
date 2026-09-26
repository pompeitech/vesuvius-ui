import type { ProductChannel } from '@pompeitech/mock-data'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { STOCK_LEVEL_OPTIONS } from '../../_shared/stock-level'
import { FilterButton } from './filter-button'
import { SORT_OPTIONS, type SortOption, type StatusFilter, type StockFilter } from '../types'

type StatusCounts = Record<StatusFilter, number>

type FiltersSidebarProps = {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  statusCounts: StatusCounts
  channel: ProductChannel | 'all'
  onChannelChange: (value: ProductChannel | 'all') => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
  stock: StockFilter
  onStockChange: (value: StockFilter) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
}

/** The left-hand filter rail: search, status/type chips, and the sort/stock/category selects. */
export function FiltersSidebar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statusCounts,
  channel,
  onChannelChange,
  sort,
  onSortChange,
  stock,
  onStockChange,
  category,
  onCategoryChange,
  categories
}: FiltersSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="pl-8"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Product status</p>
        <div className="grid grid-cols-2 gap-2">
          <FilterButton
            active={status === 'all'}
            count={statusCounts.all}
            onClick={() => onStatusChange('all')}
          >
            All
          </FilterButton>
          <FilterButton
            active={status === 'active'}
            count={statusCounts.active}
            onClick={() => onStatusChange('active')}
          >
            Active
          </FilterButton>
          <FilterButton
            active={status === 'draft'}
            count={statusCounts.draft}
            onClick={() => onStatusChange('draft')}
          >
            Draft
          </FilterButton>
          <FilterButton
            active={status === 'archived'}
            count={statusCounts.archived}
            onClick={() => onStatusChange('archived')}
          >
            Archived
          </FilterButton>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Product type</p>
        <div className="grid grid-cols-2 gap-2">
          <FilterButton
            active={channel === 'retail'}
            onClick={() => onChannelChange(channel === 'retail' ? 'all' : 'retail')}
          >
            Retail
          </FilterButton>
          <FilterButton
            active={channel === 'wholesale'}
            onClick={() => onChannelChange(channel === 'wholesale' ? 'all' : 'wholesale')}
          >
            Wholesale
          </FilterButton>
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

      <div>
        <p className="mb-2 text-sm font-medium">Stock alert</p>
        <Select value={stock} onValueChange={value => onStockChange(value as StockFilter)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stock</SelectItem>
            {STOCK_LEVEL_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Category</p>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map(c => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
