import {
  Badge,
  Button,
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import type { Absence, Employee } from '@pompeitech/mock-data'
import { CheckIcon, MessageSquareTextIcon, XIcon } from 'lucide-react'
import {
  ABSENCE_STATUS_VARIANT,
  ABSENCE_TYPE_ICON,
  ABSENCE_TYPE_LABEL,
  DAY_PART_LABEL,
  dateFormatter
} from '../../_shared/format'

type BuildColumnsOptions = {
  employeesById: Map<string, Employee>
  onApprove: (row: Absence) => void
  onReject: (row: Absence) => void
}

/** The Time Off Requests column set: employee, type, dates, status, and the approve/reject actions. */
export function buildRequestColumns({
  employeesById,
  onApprove,
  onReject
}: BuildColumnsOptions): DataTableColumnDef<Absence>[] {
  return [
    {
      id: 'employee',
      accessorFn: row => employeesById.get(row.employeeId)?.name ?? '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Employee" />,
      cell: ({ row }) => {
        const employee = employeesById.get(row.original.employeeId)
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={employee?.name ?? '?'} src={employee?.avatarUrl} size="sm" />
            <span className="truncate font-medium">{employee?.name ?? 'Unknown'}</span>
          </div>
        )
      },
      size: 200
    },
    {
      accessorKey: 'type',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Type" />,
      cell: ({ getValue }) => {
        const type = getValue<Absence['type']>()
        const Icon = ABSENCE_TYPE_ICON[type]
        return (
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-muted-foreground" />
            {ABSENCE_TYPE_LABEL[type]}
          </div>
        )
      },
      filterFn: 'arrHas',
      size: 160
    },
    {
      id: 'dates',
      accessorFn: row => row.startDate,
      header: ({ header }) => <DataTableColumnHeader header={header} title="Dates" />,
      cell: ({ row }) => {
        const { startDate, endDate, startTime, endTime, dayPart } = row.original
        const sameDay = startDate === endDate
        return (
          <span className="text-muted-foreground">
            {dateFormatter.format(new Date(startDate))}
            {!sameDay && <> – {dateFormatter.format(new Date(endDate))}</>}
            {startTime && (
              <>
                {' '}
                · {startTime}-{endTime}
              </>
            )}
            {dayPart !== 'full' && <> ({DAY_PART_LABEL[dayPart]})</>}
          </span>
        )
      },
      size: 180
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ row }) => {
        const { status, reviewNote, reviewedBy } = row.original
        return (
          <div className="flex items-center gap-1.5">
            <Badge variant={ABSENCE_STATUS_VARIANT[status]} className="capitalize">
              {status}
            </Badge>
            {reviewNote && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <MessageSquareTextIcon className="size-3.5 cursor-default text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-64">
                  <p className="font-medium">{reviewedBy ?? 'Reviewer'}</p>
                  <p className="opacity-80">{reviewNote}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )
      },
      filterFn: 'arrHas',
      size: 130
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) =>
        row.original.status === 'pending' ? (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => onApprove(row.original)}
            >
              <CheckIcon />
              <span className="sr-only">Approve</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => onReject(row.original)}
            >
              <XIcon />
              <span className="sr-only">Reject</span>
            </Button>
          </div>
        ) : null,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 100
    }
  ]
}
