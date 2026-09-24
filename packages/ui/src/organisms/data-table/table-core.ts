import {
  legacyCreateColumnHelper,
  useLegacyTable,
  type LegacyCell,
  type LegacyColumn,
  type LegacyColumnDef,
  type LegacyHeader,
  type LegacyHeaderGroup,
  type LegacyReactTable,
  type LegacyRow,
  type LegacyTableOptions
} from '@tanstack/react-table/legacy'
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ColumnVisibilityState,
  OnChangeFn,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  Updater
} from '@tanstack/react-table'

export { flexRender } from '@tanstack/react-table'
export {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table/legacy'
export const createColumnHelper = legacyCreateColumnHelper
export const useReactTable = useLegacyTable

export type { RowData }
export type ColumnDef<TData extends RowData, TValue = unknown> = LegacyColumnDef<TData, TValue>
export type Table<TData extends RowData> = LegacyReactTable<TData>
export type Row<TData extends RowData> = LegacyRow<TData>
export type Column<TData extends RowData, TValue = unknown> = LegacyColumn<TData, TValue>
export type Header<TData extends RowData, TValue = unknown> = LegacyHeader<TData, TValue>
export type HeaderGroup<TData extends RowData> = LegacyHeaderGroup<TData>
export type Cell<TData extends RowData, TValue = unknown> = LegacyCell<TData, TValue>
export type TableOptions<TData extends RowData> = LegacyTableOptions<TData>

export type VisibilityState = ColumnVisibilityState

export type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater
}
