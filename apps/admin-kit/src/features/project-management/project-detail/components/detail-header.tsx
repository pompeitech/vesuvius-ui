import type { Member, Project } from '@pompeitech/mock-data'
import { Badge, Typography, UserAvatar } from '@pompeitech/vesuvius-ui'
import {
  PROJECT_HEALTH_LABEL,
  PROJECT_HEALTH_VARIANT,
  PROJECT_STATUS_LABEL,
  PROJECT_STATUS_VARIANT
} from '../../_shared/format'

export function DetailHeader({ project, owner }: { project: Project; owner: Member | undefined }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Typography as="h1" variant="h3">
            {project.name}
          </Typography>
          <Badge variant={PROJECT_STATUS_VARIANT[project.status]}>
            {PROJECT_STATUS_LABEL[project.status]}
          </Badge>
          <Badge variant={PROJECT_HEALTH_VARIANT[project.health]}>
            {PROJECT_HEALTH_LABEL[project.health]}
          </Badge>
        </div>
        <Typography variant="muted">{project.description}</Typography>
      </div>
      {owner && (
        <div className="flex items-center gap-2">
          <UserAvatar name={owner.name} src={owner.avatarUrl} size="sm" />
          <div className="text-sm">
            <p className="font-medium">{owner.name}</p>
            <p className="text-xs text-muted-foreground">Owner</p>
          </div>
        </div>
      )}
    </div>
  )
}
