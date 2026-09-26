import type { Department, Employee } from '@pompeitech/mock-data'
import { Typography, UserAvatar } from '@pompeitech/vesuvius-ui'
import { Link } from 'react-router'

type DetailHeaderProps = {
  department: Department
  head: Employee | undefined
  memberCount: number
}

/** Name, description, head, and headcount — the read-only header for a department's page. */
export function DetailHeader({ department, head, memberCount }: DetailHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {department.name}
        </Typography>
        <Typography variant="muted">{department.description}</Typography>
      </div>
      <div className="flex items-center gap-4">
        {head && (
          <Link
            to={`/hr/employee-detail/${head.id}`}
            className="flex items-center gap-2 hover:opacity-80"
          >
            <UserAvatar name={head.name} src={head.avatarUrl} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{head.name}</p>
              <p className="truncate text-xs text-muted-foreground">Department head</p>
            </div>
          </Link>
        )}
        <div className="text-right">
          <p className="text-2xl font-semibold tabular-nums">{memberCount}</p>
          <p className="text-xs text-muted-foreground">{memberCount === 1 ? 'person' : 'people'}</p>
        </div>
      </div>
    </div>
  )
}
