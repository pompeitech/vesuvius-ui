import type { Member, Project } from '@pompeitech/mock-data'
import { Input, MultiSelect, PeopleSelect } from '@pompeitech/vesuvius-ui'

type KanbanToolbarProps = {
  projects: Project[]
  members: Member[]
  projectIds: string[]
  onProjectIdsChange: (ids: string[]) => void
  assigneeId: string | undefined
  onAssigneeChange: (id: string | undefined) => void
  search: string
  onSearchChange: (value: string) => void
}

/** Filters for the cross-project Kanban — by project, by assignee (deep-linked from Team & Members), and a free-text search. */
export function KanbanToolbar({
  projects,
  members,
  projectIds,
  onProjectIdsChange,
  assigneeId,
  onAssigneeChange,
  search,
  onSearchChange
}: KanbanToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder="Search issues..."
        className="w-56"
      />
      <MultiSelect
        options={projects.map(project => ({
          value: project.id,
          label: project.name
        }))}
        value={projectIds}
        onValueChange={onProjectIdsChange}
        placeholder="All projects"
        className="w-56"
      />
      <PeopleSelect
        options={members.map(member => ({
          value: member.id,
          label: member.name,
          description: member.role,
          avatarSrc: member.avatarUrl
        }))}
        value={assigneeId}
        onChange={onAssigneeChange}
        clearable
        unassignedLabel="All assignees"
        placeholder="All assignees"
        className="w-56"
      />
    </div>
  )
}
