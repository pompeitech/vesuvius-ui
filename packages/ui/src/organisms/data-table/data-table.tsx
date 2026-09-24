import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVerticalIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../molecules/table/table'
import { Skeleton } from '../../atoms/skeleton/skeleton'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTableExportButton } from './data-table-export-button'
import { DENSITY_ROW_HEIGHT, type DataTableProps } from './data-table.types'
import { flexRender, type Column, type Header, type RowData } from './table-core'
import { useDataTable } from './use-data-table'

// Note: TanStack v9 renamed pinning positions "left"/"right" → "start"/"end"
// (RTL-friendly) — see table-core.ts for the full explanation.
function getPinningStyles<TData extends RowData>(column: Column<TData, unknown>): CSSProperties {
  const pinned = column.getIsPinned()
  return {
    position: pinned ? 'sticky' : 'relative',
    left: pinned === 'start' ? `${column.getStart('start')}px` : undefined,
    right: pinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    width: column.getSize(),
    zIndex: pinned ? 1 : 0
  }
}

function pinnedBoundaryClass<TData extends RowData>(column: Column<TData, unknown>): string {
  const pinned = column.getIsPinned()
  if (pinned === 'start' && column.getIsLastColumn('start')) {
    return 'shadow-[2px_0_4px_-2px_rgb(0_0_0_/_0.15)]'
  }
  if (pinned === 'end' && column.getIsFirstColumn('end')) {
    return 'shadow-[-2px_0_4px_-2px_rgb(0_0_0_/_0.15)]'
  }
  return ''
}

function DraggableHeaderCell<TData extends RowData>({
  header,
  enableColumnOrdering
}: {
  header: Header<TData, unknown>
  enableColumnOrdering: boolean
}) {
  const column = header.column
  // Pinned columns don't reorder — dragging a column across the
  // pinned/unpinned boundary is ambiguous UX, so most grids disable it.
  const draggable = enableColumnOrdering && !column.getIsPinned()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    disabled: !draggable
  })

  const style: CSSProperties = {
    ...getPinningStyles(column),
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition
  }
  if (isDragging) style.zIndex = 10

  return (
    <TableHead
      ref={draggable ? setNodeRef : undefined}
      colSpan={header.colSpan}
      className={cn(
        'bg-background align-middle',
        pinnedBoundaryClass(column),
        isDragging && 'opacity-70'
      )}
      style={style}
    >
      {header.isPlaceholder ? null : (
        <div className="flex items-center gap-1">
          {draggable && (
            <button
              type="button"
              className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab touch-none active:cursor-grabbing"
              aria-label="Reorder column"
              {...attributes}
              {...listeners}
            >
              <GripVerticalIcon className="size-3.5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        </div>
      )}
    </TableHead>
  )
}

export function DataTable<TData extends RowData>(props: DataTableProps<TData>) {
  const {
    loading,
    emptyState,
    toolbar,
    searchPlaceholder,
    pageSizeOptions,
    rowCount,
    manualPagination,
    onRowClick,
    className,
    enableColumnOrdering = true,
    enableExport = false,
    exportFilename = 'export.csv',
    exportSelectedOnly = false,
    bulkActions
  } = props

  const { table, density, setDensity } = useDataTable(props)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const currentOrder =
      table.getState().columnOrder.length > 0
        ? table.getState().columnOrder
        : table.getAllLeafColumns().map(c => c.id)

    const oldIndex = currentOrder.indexOf(String(active.id))
    const newIndex = currentOrder.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    table.setColumnOrder(arrayMove(currentOrder, oldIndex, newIndex))
  }

  const leafColumnIds = table.getAllLeafColumns().map(c => c.id)
  const rows = table.getRowModel().rows
  const columnCount = table.getVisibleLeafColumns().length
  const rowHeight = DENSITY_ROW_HEIGHT[density]
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-3', className)}>
      {toolbar ? (
        toolbar({ table, density, setDensity })
      ) : (
        <DataTableToolbar
          table={table}
          globalFilter={table.getState().globalFilter ?? ''}
          onGlobalFilterChange={value => table.setGlobalFilter(value)}
          searchPlaceholder={searchPlaceholder}
          density={density}
          onDensityChange={setDensity}
          exportAction={
            enableExport ? (
              <DataTableExportButton
                table={table}
                filename={exportFilename}
                selectedOnly={exportSelectedOnly}
              />
            ) : undefined
          }
        />
      )}

      {selectedRows.length > 0 && bulkActions && (
        <div className="bg-muted/30 border-border flex min-w-0 flex-wrap items-center gap-2 rounded-md border px-3 py-2">
          <span className="text-muted-foreground mr-auto text-sm">
            {selectedRows.length} row(s) selected
          </span>
          {typeof bulkActions === 'function'
            ? bulkActions({ rows: selectedRows, table })
            : bulkActions}
        </div>
      )}

      <div className="w-full min-w-0 overflow-hidden rounded-md border">
        {/* Table already provides its own overflow-x-auto wrapper. */}
        <DndContext
          sensors={sensors}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
        >
          <Table style={{ minWidth: table.getTotalSize() }}>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  <SortableContext items={leafColumnIds} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map(header => (
                      <DraggableHeaderCell
                        key={header.id}
                        header={header}
                        enableColumnOrdering={enableColumnOrdering}
                      />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({
                  length: table.getState().pagination.pageSize
                }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-transparent">
                    {Array.from({ length: columnCount }).map((__, cellIndex) => (
                      <TableCell key={cellIndex} className={rowHeight}>
                        <Skeleton className="h-4 w-full max-w-32" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : rows.length > 0 ? (
                rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(onRowClick && 'cursor-pointer')}
                  >
                    {row.getVisibleCells().map(cell => {
                      const column = cell.column
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            rowHeight,
                            'bg-background align-middle',
                            pinnedBoundaryClass(column)
                          )}
                          style={getPinningStyles(column)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columnCount} className="h-32 text-center">
                    {emptyState ?? (
                      <span className="text-muted-foreground text-sm">No results.</span>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <DataTablePagination
        table={table}
        pageSizeOptions={pageSizeOptions}
        rowCount={manualPagination ? rowCount : undefined}
      />
    </div>
  )
}
