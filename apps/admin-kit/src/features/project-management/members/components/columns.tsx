import type { Issue, Member, Project, Team } from '@pompeitech/mock-data'
import { DataTableColumnHeader, UserAvatar, type DataTableColumnDef } from '@pompeitech/vesuvius-ui'

type BuildColumnsOptions = {
  teamsById: Map<string, Team>
  issues: Issue[]
  projects: Project[]
}

/** The roster of Project Management `Member`s — a separate cast from HR's `Employee`s (the one deliberate bridge between the two is the Timesheet feature). */
export function buildMemberColumns({
  teamsById,
  issues,
  projects
}: BuildColumnsOptions): DataTableColumnDef<Member>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Member" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.original.name} src={row.original.avatarUrl} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
      size: 240
    },
    {
      id: 'team',
      accessorFn: row => row.teamId,
      header: ({ header }) => <DataTableColumnHeader header={header} title="Team" />,
      cell: ({ row }) => teamsById.get(row.original.teamId)?.name ?? '—',
      filterFn: 'arrHas',
      size: 140
    },
    {
      accessorKey: 'role',
      header: ({ header }) => <DataTableColumnHeader header={header} title="Role" />,
      size: 160
    },
    {
      id: 'activeIssues',
      accessorFn: row =>
        issues.filter(issue => issue.assigneeId === row.id && issue.status !== 'done').length,
      header: ({ header }) => <DataTableColumnHeader header={header} title="Active issues" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
      size: 120
    },
    {
      id: 'projects',
      accessorFn: row => {
        const projectIds = new Set(
          projects
            .filter(
              project =>
                project.ownerId === row.id || project.members.some(m => m.memberId === row.id)
            )
            .map(p => p.id)
        )
        return projectIds.size
      },
      header: ({ header }) => <DataTableColumnHeader header={header} title="Projects" />,
      cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}</span>,
      size: 100
    }
  ]
}
