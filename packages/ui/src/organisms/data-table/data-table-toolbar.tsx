import { XIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../atoms/button/button'
import { Input } from '../../atoms/input/input'
import { DataTableDensityToggle } from './data-table-density-toggle'
import { DataTableViewOptions } from './data-table-view-options'
import type { Density } from './data-table.types'
import type { RowData, Table } from './table-core'

export type DataTableToolbarProps<TData extends RowData> = {
  table: Table<TData>
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  searchPlaceholder?: string
  density: Density
  onDensityChange: (density: Density) => void
  filters?: ReactNode
  actions?: ReactNode
  exportAction?: ReactNode
}

export function DataTableToolbar<TData extends RowData>({
  table,
  globalFilter,
  onGlobalFilterChange,
  searchPlaceholder = 'Search...',
  density,
  onDensityChange,
  filters,
  actions,
  exportAction
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter.length > 0

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          value={globalFilter}
          onChange={event => onGlobalFilterChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-8 w-[180px] lg:w-[240px]"
        />
        {filters}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 px-2"
            onClick={() => {
              table.resetColumnFilters()
              onGlobalFilterChange('')
            }}
          >
            Reset
            <XIcon className="size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {exportAction}
        <DataTableDensityToggle density={density} onDensityChange={onDensityChange} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
