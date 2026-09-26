import type { Member, Project, ProjectMember, ProjectMemberStatus } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PeopleSelect,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { XIcon } from 'lucide-react'
import { InfoField } from '../../../../components/info-field'
import {
  PROJECT_HEALTH_OPTIONS,
  PROJECT_HEALTH_VARIANT,
  PROJECT_MEMBER_STATUS_OPTIONS,
  PROJECT_MEMBER_STATUS_VARIANT,
  PROJECT_PRIORITY_OPTIONS,
  PROJECT_PRIORITY_VARIANT,
  PROJECT_STATUS_OPTIONS,
  PROJECT_STATUS_VARIANT,
  dateFormatter
} from '../../_shared/format'
import { PillSelect } from '../../_shared/pill-select'

type DetailSidebarProps = {
  project: Project
  members: Member[]
  onUpdate: (changes: Partial<Pick<Project, 'status' | 'health' | 'priority' | 'members'>>) => void
}

/** Status/health/priority are edited directly here — a project only has three of them, so a full edit-mode toggle would be more chrome than the fields it's protecting. */
export function DetailSidebar({ project, members, onUpdate }: DetailSidebarProps) {
  const membersById = new Map(members.map(m => [m.id, m]))
  const roster = project.members
    .map(pm => ({ pm, member: membersById.get(pm.memberId) }))
    .filter((entry): entry is { pm: ProjectMember; member: Member } => entry.member !== undefined)
  const availableMembers = members.filter(m => !project.members.some(pm => pm.memberId === m.id))

  const handleStatusChange = (memberId: string, status: ProjectMemberStatus) => {
    onUpdate({
      members: project.members.map(pm => (pm.memberId === memberId ? { ...pm, status } : pm))
    })
  }

  const handleRemoveMember = (memberId: string) => {
    onUpdate({ members: project.members.filter(pm => pm.memberId !== memberId) })
  }

  const handleAddMember = (memberId: string | undefined) => {
    if (!memberId) return
    onUpdate({ members: [...project.members, { memberId, status: 'invited' }] })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Project status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <InfoField label="Status">
            <PillSelect
              value={project.status}
              onValueChange={value => onUpdate({ status: value })}
              options={PROJECT_STATUS_OPTIONS.map(option => ({
                ...option,
                variant: PROJECT_STATUS_VARIANT[option.value]
              }))}
            />
          </InfoField>
          <InfoField label="Health">
            <PillSelect
              value={project.health}
              onValueChange={value => onUpdate({ health: value })}
              options={PROJECT_HEALTH_OPTIONS.map(option => ({
                ...option,
                variant: PROJECT_HEALTH_VARIANT[option.value]
              }))}
            />
          </InfoField>
          <InfoField label="Priority">
            <PillSelect
              value={project.priority}
              onValueChange={value => onUpdate({ priority: value })}
              options={PROJECT_PRIORITY_OPTIONS.map(option => ({
                ...option,
                variant: PROJECT_PRIORITY_VARIANT[option.value]
              }))}
            />
          </InfoField>
          <InfoField label="Due date">{dateFormatter.format(new Date(project.dueDate))}</InfoField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {roster.map(({ pm, member }) => {
            const isOwner = member.id === project.ownerId
            return (
              <div key={member.id} className="flex items-center gap-2">
                <UserAvatar name={member.name} src={member.avatarUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {isOwner ? 'Owner' : member.role}
                  </p>
                </div>
                {isOwner ? (
                  <Badge variant={PROJECT_MEMBER_STATUS_VARIANT[pm.status]}>
                    {PROJECT_MEMBER_STATUS_OPTIONS.find(option => option.value === pm.status)
                      ?.label ?? pm.status}
                  </Badge>
                ) : (
                  <>
                    <PillSelect
                      value={pm.status}
                      onValueChange={status => handleStatusChange(member.id, status)}
                      options={PROJECT_MEMBER_STATUS_OPTIONS.map(option => ({
                        ...option,
                        variant: PROJECT_MEMBER_STATUS_VARIANT[option.value]
                      }))}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      aria-label={`Remove ${member.name} from the project`}
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <XIcon className="size-3.5" />
                    </Button>
                  </>
                )}
              </div>
            )
          })}

          {availableMembers.length > 0 && (
            <PeopleSelect
              key={project.members.length}
              options={availableMembers.map(member => ({
                value: member.id,
                label: member.name,
                description: member.role,
                avatarSrc: member.avatarUrl
              }))}
              onChange={handleAddMember}
              placeholder="Add a member..."
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
