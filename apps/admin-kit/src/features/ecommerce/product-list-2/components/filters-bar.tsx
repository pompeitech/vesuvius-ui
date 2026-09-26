import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { PRODUCT_STATUS_OPTIONS } from '../../_shared/product-status'
import { STOCK_LEVEL_OPTIONS } from '../../_shared/stock-level'
import type { StatusFilter, StockFilter } from '../types'

type FiltersBarProps = {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  stock: StockFilter
  onStockChange: (value: StockFilter) => void
}

/** Search box plus the status/stock selects, in a single row above the card grid. */
export function FiltersBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  stock,
  onStockChange
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 sm:max-w-64">
        <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="pl-8"
        />
      </div>
      <Select value={status} onValueChange={value => onStatusChange(value as StatusFilter)}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All products</SelectItem>
          {PRODUCT_STATUS_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={stock} onValueChange={value => onStockChange(value as StockFilter)}>
        <SelectTrigger className="w-32">
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
  )
}
