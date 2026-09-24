import { useMemo, useState } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import type { DataTableProps, Density } from './data-table.types'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
  type Table
} from './table-core'

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export function useDataTable<TData extends RowData>(
  props: DataTableProps<TData>
): {
  table: Table<TData>
  density: Density
  setDensity: (density: Density) => void
} {
  const {
    columns,
    data,
    getRowId,
    sorting: sortingProp,
    defaultSorting = [],
    onSortingChange,
    manualSorting = false,
    enableMultiSort = true,
    columnFilters: columnFiltersProp,
    defaultColumnFilters = [],
    onColumnFiltersChange,
    manualFiltering = false,
    globalFilter: globalFilterProp,
    defaultGlobalFilter = '',
    onGlobalFilterChange,
    columnVisibility: columnVisibilityProp,
    defaultColumnVisibility = {},
    onColumnVisibilityChange,
    columnPinning: columnPinningProp,
    defaultColumnPinning = { start: [], end: [] },
    onColumnPinningChange,
    enableColumnPinning = true,
    columnOrder: columnOrderProp,
    defaultColumnOrder = [],
    onColumnOrderChange,
    columnSizing: columnSizingProp,
    defaultColumnSizing = {},
    onColumnSizingChange,
    enableColumnResizing = true,
    rowSelection: rowSelectionProp,
    defaultRowSelection = {},
    onRowSelectionChange,
    enableRowSelection = false,
    pagination: paginationProp,
    defaultPagination,
    onPaginationChange,
    manualPagination = false,
    rowCount,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    density: densityProp,
    defaultDensity = 'comfortable',
    onDensityChange
  } = props

  const [sorting, setSorting] = useControllableState({
    value: sortingProp,
    defaultValue: defaultSorting,
    onChange: onSortingChange
  })
  const [columnFilters, setColumnFilters] = useControllableState({
    value: columnFiltersProp,
    defaultValue: defaultColumnFilters,
    onChange: onColumnFiltersChange
  })
  const [globalFilter, setGlobalFilter] = useControllableState({
    value: globalFilterProp,
    defaultValue: defaultGlobalFilter,
    onChange: onGlobalFilterChange
  })
  const [columnVisibility, setColumnVisibility] = useControllableState({
    value: columnVisibilityProp,
    defaultValue: defaultColumnVisibility,
    onChange: onColumnVisibilityChange
  })
  const [columnPinning, setColumnPinning] = useControllableState({
    value: columnPinningProp,
    defaultValue: defaultColumnPinning,
    onChange: onColumnPinningChange
  })
  const [columnOrder, setColumnOrder] = useControllableState({
    value: columnOrderProp,
    defaultValue: defaultColumnOrder,
    onChange: onColumnOrderChange
  })
  const [columnSizing, setColumnSizing] = useControllableState({
    value: columnSizingProp,
    defaultValue: defaultColumnSizing,
    onChange: onColumnSizingChange
  })
  const [rowSelection, setRowSelection] = useControllableState({
    value: rowSelectionProp,
    defaultValue: defaultRowSelection,
    onChange: onRowSelectionChange
  })
  const [pagination, setPagination] = useControllableState({
    value: paginationProp,
    defaultValue: defaultPagination ?? {
      pageIndex: 0,
      pageSize: pageSizeOptions[0] ?? 10
    },
    onChange: onPaginationChange
  })
  const [density, setDensity] = useControllableState<Density>({
    value: densityProp,
    defaultValue: defaultDensity,
    onChange: onDensityChange
  })

  // getRowId isn't part of controllable state, but memoize the identity
  // TanStack passes through so it doesn't force row-model recomputation.
  const [stableGetRowId] = useState(() => getRowId)

  const pageCount = manualPagination
    ? rowCount !== undefined
      ? Math.max(1, Math.ceil(rowCount / pagination.pageSize))
      : -1
    : undefined

  const table = useReactTable({
    data,
    columns,
    getRowId: stableGetRowId,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
      columnOrder,
      columnSizing,
      rowSelection,
      pagination
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualSorting,
    manualFiltering,
    manualPagination,
    pageCount,
    enableMultiSort,
    enableColumnPinning,
    enableRowSelection,
    enableColumnResizing,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  return useMemo(() => ({ table, density, setDensity }), [table, density, setDensity])
}
