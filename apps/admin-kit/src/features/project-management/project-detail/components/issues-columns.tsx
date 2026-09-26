import type { Issue, Member } from '@pompeitech/mock-data'
import {
  Badge,
  DataTableColumnHeader,
  UserAvatar,
  cn,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import {
  ISSUE_PRIORITY_COLOR_CLASS,
  ISSUE_PRIORITY_ICON,
  ISSUE_PRIORITY_LABEL,
  ISSUE_STATUS_LABEL,
  ISSUE_STATUS_VARIANT,
  ISSUE_TYPE_COLOR_CLASS,
  ISSUE_TYPE_ICON,
  dateFormatter
} from '../../_shared/format'

/** The Issues column set: key/title, type, status, priority, assignee, due date. */
export function buildIssueColumns(membersById: Map<string, Member>): DataTableColumnDef<Issue>[] {
  return [
    {
      accessorKey: 'title',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Issue" />,
      cell: ({ row }) => {
        const TypeIcon = ISSUE_TYPE_ICON[row.original.type]
        return (
          <div className="flex items-center gap-2">
            <TypeIcon
              className={cn('size-4 shrink-0', ISSUE_TYPE_COLOR_CLASS[row.original.type])}
            />
            <div className="min-w-0">
              <p className="truncate font-medium">{row.original.title}</p>
              <p className="text-xs text-muted-foreground">{row.original.key}</p>
            </div>
          </div>
        )
      },
      size: 300
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<Issue['status']>()
        return <Badge variant={ISSUE_STATUS_VARIANT[status]}>{ISSUE_STATUS_LABEL[status]}</Badge>
      },
      filterFn: 'arrHas',
      size: 120
    },
    {
      accessorKey: 'priority',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Priority" />,
      cell: ({ getValue }) => {
        const priority = getValue<Issue['priority']>()
        const PriorityIcon = ISSUE_PRIORITY_ICON[priority]
        return (
          <div className={cn('flex items-center gap-1.5', ISSUE_PRIORITY_COLOR_CLASS[priority])}>
            <PriorityIcon className="size-3.5" />
            {ISSUE_PRIORITY_LABEL[priority]}
          </div>
        )
      },
      filterFn: 'arrHas',
      size: 110
    },
    {
      id: 'assignee',
      accessorFn: row => (row.assigneeId ? (membersById.get(row.assigneeId)?.name ?? '') : ''),
      header: ({ header }) => <DataTableColumnHeader header={header} title="Assignee" />,
      cell: ({ row }) => {
        const assignee = row.original.assigneeId
          ? membersById.get(row.original.assigneeId)
          : undefined
        return assignee ? (
          <div className="flex items-center gap-2">
            <UserAvatar name={assignee.name} src={assignee.avatarUrl} size="sm" />
            <span className="truncate">{assignee.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Unassigned</span>
        )
      },
      size: 170
    },
    {
      accessorKey: 'dueDate',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Due" />,
      cell: ({ getValue }) => {
        const dueDate = getValue<string | undefined>()
        return dueDate ? (
          <span className="text-muted-foreground">{dateFormatter.format(new Date(dueDate))}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
      size: 120
    }
  ]
}
