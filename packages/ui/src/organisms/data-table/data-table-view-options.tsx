import { Settings2Icon } from 'lucide-react'
import { Button } from '../../atoms/button/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../molecules/dropdown-menu/dropdown-menu'
import type { RowData, Table } from './table-core'

export type DataTableViewOptionsProps<TData extends RowData> = {
  table: Table<TData>
}

export function DataTableViewOptions<TData extends RowData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const columns = table.getAllColumns().filter(column => column.getCanHide())

  if (columns.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2Icon className="size-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map(column => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={value => column.toggleVisibility(!!value)}
            onSelect={event => event.preventDefault()}
            className="capitalize"
          >
            {(column.columnDef.meta as { label?: string } | undefined)?.label ?? column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
