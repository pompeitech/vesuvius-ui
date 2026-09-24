import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PinIcon,
  PinOffIcon
} from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../molecules/dropdown-menu/dropdown-menu'
import type { Header, RowData } from './table-core'

export type DataTableColumnHeaderProps<
  TData extends RowData,
  TValue
> = HTMLAttributes<HTMLDivElement> & {
  header: Header<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  header,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const column = header.column
  const canSort = column.getCanSort()
  const canHide = column.getCanHide()
  const canPin = column.getCanPin()
  const canResize = column.getCanResize()
  const isPinned = column.getIsPinned()
  const sorted = column.getIsSorted()

  const SortIcon =
    sorted === 'desc' ? ArrowDownIcon : sorted === 'asc' ? ArrowUpIcon : ChevronsUpDownIcon

  return (
    <div className={cn('relative flex h-full w-full items-center gap-1', className)} {...props}>
      {canSort || canHide || canPin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="data-[state=open]:bg-accent -ml-2 h-7 gap-1.5 px-2"
            >
              <span className="truncate">{title}</span>
              {canSort && <SortIcon className="text-muted-foreground size-3.5" />}
              {isPinned && <PinIcon className="text-muted-foreground size-3" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            {canSort && (
              <>
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <ArrowUpIcon />
                  Sort ascending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDownIcon />
                  Sort descending
                </DropdownMenuItem>
              </>
            )}
            {canSort && (canHide || canPin) && <DropdownMenuSeparator />}
            {canPin && (
              <>
                {isPinned !== 'start' && (
                  <DropdownMenuItem onClick={() => column.pin('start')}>
                    <PinIcon />
                    Pin left
                  </DropdownMenuItem>
                )}
                {isPinned !== 'end' && (
                  <DropdownMenuItem onClick={() => column.pin('end')}>
                    <PinIcon className="-scale-x-100" />
                    Pin right
                  </DropdownMenuItem>
                )}
                {isPinned && (
                  <DropdownMenuItem onClick={() => column.pin(false)}>
                    <PinOffIcon />
                    Unpin
                  </DropdownMenuItem>
                )}
              </>
            )}
            {canPin && canHide && <DropdownMenuSeparator />}
            {canHide && (
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOffIcon />
                Hide column
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className="truncate px-2 text-sm font-medium">{title}</span>
      )}

      {canResize && (
        // A resize handle is, semantically, a slider over the column's
        // width — that's also the one ARIA role covering this pattern
        // that's actually focusable/interactive (unlike "separator").
        <div
          role="slider"
          aria-orientation="horizontal"
          aria-label={`Resize ${title} column`}
          aria-valuenow={column.getSize()}
          aria-valuemin={column.columnDef.minSize ?? 20}
          aria-valuemax={column.columnDef.maxSize ?? undefined}
          tabIndex={0}
          onDoubleClick={() => column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          onKeyDown={event => {
            const RESIZE_STEP = 10
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              header.getContext().table.setColumnSizing(old => ({
                ...old,
                [column.id]: Math.max(
                  column.columnDef.minSize ?? 20,
                  column.getSize() - RESIZE_STEP
                )
              }))
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              header.getContext().table.setColumnSizing(old => ({
                ...old,
                [column.id]: Math.min(
                  column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER,
                  column.getSize() + RESIZE_STEP
                )
              }))
            } else if (event.key === 'Home' || event.key === 'Enter') {
              event.preventDefault()
              column.resetSize()
            }
          }}
          className={cn(
            'absolute top-0 right-0 h-full w-1.5 cursor-col-resize touch-none select-none',
            'bg-border focus-visible:ring-ring opacity-0 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none',
            column.getIsResizing() && 'bg-primary opacity-100'
          )}
        />
      )}
    </div>
  )
}
