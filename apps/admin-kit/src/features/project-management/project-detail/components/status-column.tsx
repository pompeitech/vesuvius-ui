import type { Issue, IssueStatus, Member } from '@pompeitech/mock-data'
import { Badge, cn } from '@pompeitech/vesuvius-ui'
import { useDroppable } from '@dnd-kit/core'
import { IssueCard } from './issue-card'

type StatusColumnProps = {
  status: IssueStatus
  label: string
  issues: Issue[]
  /**
   * Every issue in scope (not just this column) — for each card's
   * "Principale" epic picker, further narrowed per-card to that issue's
   * own `projectId` (matters on the cross-project global Kanban, where
   * this list spans multiple projects; a no-op filter on the per-project
   * Board, where it's already all one project).
   */
  allIssues: Issue[]
  membersById: Map<string, Member>
  onOpenIssue: (issue: Issue) => void
  onParentChange: (issueId: string, parentId: string | undefined) => void
  /** Only passed by the global Kanban, where cards need a project label. */
  getProjectName?: (issue: Issue) => string
}

/** One board column — a drop target for issue cards dragged in from another status. */
export function StatusColumn({
  status,
  label,
  issues,
  allIssues,
  membersById,
  onOpenIssue,
  onParentChange,
  getProjectName
}: StatusColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex h-full w-64 shrink-0 flex-col gap-2 rounded-md border bg-muted/30 p-3 transition-colors',
        isOver && 'border-primary bg-primary/5'
      )}
    >
      <div className="flex shrink-0 items-center justify-between px-1">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant="secondary">{issues.length}</Badge>
      </div>
      {/* `min-h-0` is what lets this actually shrink to scroll instead of
          growing the column (and the page) to fit every card — see
          [[vesuvius-ui-fullheight-layout-fix]]. A no-op when the column's
          own `h-full` above has no bounded ancestor to fill (e.g. inside
          the per-project Board tab), so this degrades gracefully there. */}
      <div className="min-h-16 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {issues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              assignee={issue.assigneeId ? membersById.get(issue.assigneeId) : undefined}
              projectIssues={allIssues.filter(candidate => candidate.projectId === issue.projectId)}
              onOpen={onOpenIssue}
              onParentChange={onParentChange}
              projectName={getProjectName?.(issue)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
