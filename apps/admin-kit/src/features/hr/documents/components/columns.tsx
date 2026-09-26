import {
  Badge,
  Button,
  DataTableColumnHeader,
  UserAvatar,
  toast,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { DocumentType, Employee, EmployeeDocument } from '@pompeitech/mock-data'
import { DownloadIcon, FileTextIcon } from 'lucide-react'
import { DOCUMENT_TYPE_LABEL, dateFormatter } from '../../_shared/format'

/** The Documents column set: file, employee, type, uploaded date, download action. */
export function buildDocumentColumns(
  employeesById: Map<string, Employee>
): DataTableColumnDef<EmployeeDocument>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Document" />,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate font-medium">{getValue<string>()}</span>
        </div>
      ),
      size: 240
    },
    {
      id: 'employee',
      accessorFn: row => employeesById.get(row.employeeId)?.name ?? '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Employee" />,
      cell: ({ row }) => {
        const employee = employeesById.get(row.original.employeeId)
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={employee?.name ?? '?'} src={employee?.avatarUrl} size="sm" />
            <span className="truncate">{employee?.name ?? 'Unknown'}</span>
          </div>
        )
      },
      size: 200
    },
    {
      accessorKey: 'type',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Type" />,
      cell: ({ getValue }) => (
        <Badge variant="outline">{DOCUMENT_TYPE_LABEL[getValue<DocumentType>()]}</Badge>
      ),
      filterFn: 'arrHas',
      size: 140
    },
    {
      accessorKey: 'uploadedAt',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Uploaded" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 130
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() =>
            toast.info(`Downloading "${row.original.name}" isn't wired up in this demo.`)
          }
        >
          <DownloadIcon />
          <span className="sr-only">Download {row.original.name}</span>
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 56
    }
  ]
}
