import type { ReactNode } from 'react'
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState
} from './table-core'

export type Density = 'compact' | 'comfortable' | 'spacious'

export type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  getRowId?: (row: TData, index: number) => string

  // Sorting
  sorting?: SortingState
  defaultSorting?: SortingState
  onSortingChange?: (state: SortingState) => void
  manualSorting?: boolean
  enableMultiSort?: boolean

  // Per-column filters (set by DataTableColumnHeader / DataTableFacetedFilter)
  columnFilters?: ColumnFiltersState
  defaultColumnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (state: ColumnFiltersState) => void
  manualFiltering?: boolean

  // Global quick-search
  globalFilter?: string
  defaultGlobalFilter?: string
  onGlobalFilterChange?: (value: string) => void

  // Column visibility
  columnVisibility?: VisibilityState
  defaultColumnVisibility?: VisibilityState
  onColumnVisibilityChange?: (state: VisibilityState) => void

  // Column pinning (left/right)
  columnPinning?: ColumnPinningState
  defaultColumnPinning?: ColumnPinningState
  onColumnPinningChange?: (state: ColumnPinningState) => void
  enableColumnPinning?: boolean

  // Column order (drag to reorder)
  columnOrder?: ColumnOrderState
  defaultColumnOrder?: ColumnOrderState
  onColumnOrderChange?: (state: ColumnOrderState) => void
  enableColumnOrdering?: boolean

  // Column sizing (drag to resize)
  columnSizing?: ColumnSizingState
  defaultColumnSizing?: ColumnSizingState
  onColumnSizingChange?: (state: ColumnSizingState) => void
  enableColumnResizing?: boolean

  // Row selection
  rowSelection?: RowSelectionState
  defaultRowSelection?: RowSelectionState
  onRowSelectionChange?: (state: RowSelectionState) => void
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean)

  // Pagination
  pagination?: PaginationState
  defaultPagination?: PaginationState
  onPaginationChange?: (state: PaginationState) => void
  manualPagination?: boolean
  rowCount?: number
  pageSizeOptions?: number[]

  // Chrome
  loading?: boolean
  emptyState?: ReactNode
  toolbar?: (ctx: {
    table: Table<TData>
    density: Density
    setDensity: (density: Density) => void
  }) => ReactNode
  searchPlaceholder?: string
  enableExport?: boolean
  exportFilename?: string
  exportSelectedOnly?: boolean
  bulkActions?: ReactNode | ((ctx: { rows: Row<TData>[]; table: Table<TData> }) => ReactNode)
  density?: Density
  defaultDensity?: Density
  onDensityChange?: (density: Density) => void
  onRowClick?: (row: TData) => void
  className?: string
}

export const DENSITY_ROW_HEIGHT: Record<Density, string> = {
  compact: 'h-8',
  comfortable: 'h-10',
  spacious: 'h-14'
}
