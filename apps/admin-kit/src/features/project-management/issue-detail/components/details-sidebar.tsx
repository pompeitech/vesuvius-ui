import type { Issue, IssuePriority, IssueStatus, IssueType, Member } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DatePicker,
  MultiSelect,
  PeopleSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { ClockIcon } from 'lucide-react'
import { InfoField } from '../../../../components/info-field'
import {
  ISSUE_LABEL_OPTIONS,
  ISSUE_PRIORITY_OPTIONS,
  ISSUE_STATUS_OPTIONS,
  ISSUE_STATUS_VARIANT,
  ISSUE_TYPE_OPTIONS
} from '../../_shared/format'
import { ParentEpicSelect } from '../../project-detail/components/parent-epic-select'
import { PillSelect } from '../../_shared/pill-select'

type DetailsSidebarProps = {
  status: IssueStatus
  onStatusChange: (value: IssueStatus) => void
  type: IssueType
  onTypeChange: (value: IssueType) => void
  priority: IssuePriority
  onPriorityChange: (value: IssuePriority) => void
  assigneeId: string | undefined
  onAssigneeChange: (value: string | undefined) => void
  activeProjectMembers: Member[]
  labels: string[]
  onLabelsChange: (labels: string[]) => void
  issueId: string
  issueType: IssueType
  parentId: string | undefined
  onParentIdChange: (value: string | undefined) => void
  projectIssues: Issue[]
  dueDate: string | undefined
  onDueDateChange: (value: string | undefined) => void
  startDate: string | undefined
  onStartDateChange: (value: string | undefined) => void
}

/** "Dettagli" — every field editable inline, no separate edit-mode toggle (same reasoning as the project sidebar: nothing here needs a confirm step of its own, the page's own Save/Cancel bar is that). */
export function DetailsSidebar({
  status,
  onStatusChange,
  type,
  onTypeChange,
  priority,
  onPriorityChange,
  assigneeId,
  onAssigneeChange,
  activeProjectMembers,
  labels,
  onLabelsChange,
  issueId,
  issueType,
  parentId,
  onParentIdChange,
  projectIssues,
  dueDate,
  onDueDateChange,
  startDate,
  onStartDateChange
}: DetailsSidebarProps) {
  const assigneeOptions = activeProjectMembers.map(member => ({
    value: member.id,
    label: member.name,
    description: member.role,
    avatarSrc: member.avatarUrl
  }))

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InfoField label="Status">
          <PillSelect
            value={status}
            onValueChange={onStatusChange}
            options={ISSUE_STATUS_OPTIONS.map(option => ({
              ...option,
              variant: ISSUE_STATUS_VARIANT[option.value]
            }))}
          />
        </InfoField>

        <InfoField label="Assignee">
          <PeopleSelect
            options={assigneeOptions}
            value={assigneeId}
            onChange={onAssigneeChange}
            clearable
            unassignedLabel="Unassigned"
            placeholder="Unassigned"
          />
        </InfoField>

        <InfoField label="Type">
          <Select value={type} onValueChange={value => onTypeChange(value as IssueType)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ISSUE_TYPE_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InfoField>

        <InfoField label="Priority">
          <Select
            value={priority}
            onValueChange={value => onPriorityChange(value as IssuePriority)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ISSUE_PRIORITY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InfoField>

        <InfoField label="Labels">
          <MultiSelect
            options={ISSUE_LABEL_OPTIONS}
            value={labels}
            onValueChange={onLabelsChange}
            placeholder="Add labels..."
          />
        </InfoField>

        {issueType !== 'epic' && (
          <InfoField label="Principale">
            <ParentEpicSelect
              issue={{ id: issueId, parentId, type: issueType }}
              projectIssues={projectIssues}
              onChange={onParentIdChange}
              className="w-full"
            />
          </InfoField>
        )}

        <InfoField label="Due date">
          <DatePicker
            value={dueDate ? new Date(dueDate) : undefined}
            onChange={date => onDueDateChange(date?.toISOString())}
            className="w-full"
          />
        </InfoField>

        <InfoField label="Start date">
          <DatePicker
            value={startDate ? new Date(startDate) : undefined}
            onChange={date => onStartDateChange(date?.toISOString())}
            className="w-full"
          />
        </InfoField>

        <InfoField label="Time tracking" icon={ClockIcon}>
          <span className="text-muted-foreground">No time logged yet</span>
        </InfoField>
      </CardContent>
    </Card>
  )
}
