import type { Member, Project } from '@pompeitech/mock-data'
import {
  AvatarGroup,
  Badge,
  DataTableColumnHeader,
  Progress,
  UserAvatar,
  type DataTableColumnDef
} from '@pompeitech/vesuvius-ui'
import { FolderKanbanIcon } from 'lucide-react'
import {
  PROJECT_HEALTH_LABEL,
  PROJECT_HEALTH_VARIANT,
  PROJECT_PRIORITY_LABEL,
  PROJECT_PRIORITY_VARIANT,
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_VARIANT,
  dateFormatter
} from '../../_shared/format'

type BuildColumnsOptions = {
  membersById: Map<string, Member>
}

/** The Projects column set: name, owner, status/health/priority, progress, due date, and the team. */
export function buildProjectColumns({
  membersById
}: BuildColumnsOptions): DataTableColumnDef<Project>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Project" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FolderKanbanIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.description}</p>
          </div>
        </div>
      ),
      size: 280
    },
    {
      id: 'owner',
      accessorFn: row => membersById.get(row.ownerId)?.name ?? '',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Owner" />,
      cell: ({ row }) => {
        const owner = membersById.get(row.original.ownerId)
        return (
          <div className="flex items-center gap-2">
            <UserAvatar name={owner?.name ?? '?'} src={owner?.avatarUrl} size="sm" />
            <span className="truncate">{owner?.name ?? 'Unassigned'}</span>
          </div>
        )
      },
      size: 170
    },
    {
      accessorKey: 'status',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Status" />,
      cell: ({ getValue }) => {
        const status = getValue<Project['status']>()
        return (
          <Badge variant={PROJECT_STATUS_VARIANT[status]}>{PROJECT_STATUS_LABEL[status]}</Badge>
        )
      },
      filterFn: 'arrHas',
      size: 110
    },
    {
      accessorKey: 'health',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Health" />,
      cell: ({ getValue }) => {
        const health = getValue<Project['health']>()
        return (
          <Badge variant={PROJECT_HEALTH_VARIANT[health]}>{PROJECT_HEALTH_LABEL[health]}</Badge>
        )
      },
      filterFn: 'arrHas',
      size: 120
    },
    {
      accessorKey: 'priority',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Priority" />,
      cell: ({ getValue }) => {
        const priority = getValue<Project['priority']>()
        return (
          <Badge variant={PROJECT_PRIORITY_VARIANT[priority]}>
            {PROJECT_PRIORITY_LABEL[priority]}
          </Badge>
        )
      },
      filterFn: 'arrHas',
      size: 100
    },
    {
      accessorKey: 'progress',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Progress" />,
      cell: ({ getValue }) => {
        const progress = getValue<number>()
        return (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-1.5 w-16" />
            <span className="text-xs text-muted-foreground tabular-nums">{progress}%</span>
          </div>
        )
      },
      size: 130
    },
    {
      accessorKey: 'dueDate',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Due" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {dateFormatter.format(new Date(getValue<string>()))}
        </span>
      ),
      size: 120
    },
    {
      id: 'team',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Team" />,
      cell: ({ row }) => {
        const members = row.original.members
          .map(member => membersById.get(member.memberId))
          .filter(member => member !== undefined)
        if (members.length === 0) return <span className="text-muted-foreground">-</span>
        return (
          <AvatarGroup max={4} size="sm">
            {members.map(member => (
              <UserAvatar key={member.id} name={member.name} src={member.avatarUrl} size="sm" />
            ))}
          </AvatarGroup>
        )
      },
      enableSorting: false,
      size: 140
    }
  ]
}
