import type { Issue, Member } from '@pompeitech/mock-data'
import { Badge, cn, UserAvatar } from '@pompeitech/vesuvius-ui'
import { useDraggable } from '@dnd-kit/core'
import { AlertTriangleIcon, CalendarIcon } from 'lucide-react'
import {
  ISSUE_PRIORITY_COLOR_CLASS,
  ISSUE_PRIORITY_ICON,
  ISSUE_TYPE_COLOR_CLASS,
  ISSUE_TYPE_ICON,
  monthDayFormatter
} from '../../_shared/format'
import { ParentEpicSelect } from './parent-epic-select'

const MS_PER_DAY = 86_400_000

type IssueCardProps = {
  issue: Issue
  assignee: Member | undefined
  /** Every issue in the project — resolved down to just its epics for the "Principale" picker. */
  projectIssues: Issue[]
  onOpen: (issue: Issue) => void
  onParentChange: (issueId: string, parentId: string | undefined) => void
  /** Only passed by cross-project consumers (the global Kanban) where it's not obvious which project a card belongs to. */
  projectName?: string
  enableDrag?: boolean
}

/** One draggable issue card on the board — drop it on another column to change its status, click to open the full detail. */
export function IssueCard({
  issue,
  assignee,
  projectIssues,
  onOpen,
  onParentChange,
  projectName,
  enableDrag = true
}: IssueCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    disabled: !enableDrag
  })
  const TypeIcon = ISSUE_TYPE_ICON[issue.type]
  const PriorityIcon = ISSUE_PRIORITY_ICON[issue.priority]

  const dueDate = issue.dueDate ? new Date(issue.dueDate) : undefined
  const daysUntilDue = dueDate
    ? Math.round((dueDate.getTime() - new Date().getTime()) / MS_PER_DAY)
    : undefined
  const isOverdue = daysUntilDue !== undefined && daysUntilDue < 0 && issue.status !== 'done'
  const isDueSoon =
    daysUntilDue !== undefined && daysUntilDue >= 0 && daysUntilDue <= 3 && issue.status !== 'done'

  return (
    <div
      ref={setNodeRef}
      {...(enableDrag ? listeners : {})}
      {...(enableDrag ? attributes : {})}
      role="button"
      tabIndex={0}
      style={
        transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
      }
      onClick={() => onOpen(issue)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') onOpen(issue)
      }}
      className={cn(
        'bg-card hover:border-primary/40 rounded-md border p-3 shadow-sm transition-colors',
        enableDrag && 'cursor-grab touch-none active:cursor-grabbing',
        isDragging && 'z-10 opacity-50'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs font-medium">{issue.key}</span>
        <TypeIcon className={cn('size-3.5', ISSUE_TYPE_COLOR_CLASS[issue.type])} />
      </div>
      <p className="mt-1 line-clamp-2 text-sm font-medium">{issue.title}</p>
      {projectName && (
        <p className="text-muted-foreground mt-0.5 truncate text-[11px]">{projectName}</p>
      )}

      {issue.type !== 'epic' && (
        // The card itself is the drag handle and opens the detail page on
        // click — this wrapper only exists to stop both from firing when
        // the real interactive control (the select trigger) is used, not
        // to be its own interactive element.
        <div
          className="mt-2"
          onPointerDown={event => event.stopPropagation()}
          onClick={event => event.stopPropagation()}
        >
          <ParentEpicSelect
            issue={issue}
            projectIssues={projectIssues}
            onChange={parentId => onParentChange(issue.id, parentId)}
            className="h-7 w-full text-xs"
          />
        </div>
      )}

      {dueDate && (
        <div
          className={cn(
            'mt-2 flex items-center gap-1 text-xs',
            isOverdue ? 'text-destructive' : isDueSoon ? 'text-warning' : 'text-muted-foreground'
          )}
        >
          {isOverdue || isDueSoon ? (
            <AlertTriangleIcon className="size-3" />
          ) : (
            <CalendarIcon className="size-3" />
          )}
          {monthDayFormatter.format(dueDate)}
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between">
        <Badge variant="outline" className="gap-1 px-1.5 py-0 text-[10px] capitalize">
          <PriorityIcon className={cn('size-3', ISSUE_PRIORITY_COLOR_CLASS[issue.priority])} />
          {issue.priority}
        </Badge>
        {assignee ? (
          <UserAvatar name={assignee.name} src={assignee.avatarUrl} size="sm" />
        ) : (
          <div className="size-6 rounded-full border border-dashed" />
        )}
      </div>
    </div>
  )
}
