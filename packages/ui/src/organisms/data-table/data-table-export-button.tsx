import { DownloadIcon } from 'lucide-react'
import { Button } from '../../atoms/button/button'
import type { RowData, Table } from './table-core'

export type DataTableExportButtonProps<TData extends RowData> = {
  table: Table<TData>
  filename?: string
  selectedOnly?: boolean
}

function escapeCsvValue(value: unknown): string {
  const text = value == null ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function DataTableExportButton<TData extends RowData>({
  table,
  filename = 'export.csv',
  selectedOnly = false
}: DataTableExportButtonProps<TData>) {
  const exportCsv = () => {
    const columns = table
      .getVisibleLeafColumns()
      .filter(
        column =>
          (column.columnDef.meta as { enableExport?: boolean } | undefined)?.enableExport !== false
      )
    const rows = selectedOnly ? table.getSelectedRowModel().rows : table.getFilteredRowModel().rows
    const headers = columns.map(
      column => (column.columnDef.meta as { label?: string } | undefined)?.label ?? column.id
    )
    const lines = [
      headers.map(escapeCsvValue).join(','),
      ...rows.map(row => columns.map(column => escapeCsvValue(row.getValue(column.id))).join(','))
    ]
    const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], {
      type: 'text/csv;charset=utf-8;'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={exportCsv}>
      <DownloadIcon className="size-4" />
      Export CSV
    </Button>
  )
}
