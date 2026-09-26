import type { Issue, Member } from '@pompeitech/mock-data'
import { Badge, Button } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_VARIANT, ISSUE_TYPE_ICON } from '../../_shared/format'
import { AddIssueDialog } from '../../project-detail/components/add-issue-dialog'

type SubtasksSectionProps = {
  issue: Pick<Issue, 'id' | 'projectId'>
  projectIssues: Issue[]
  members: Member[]
  onProjectIssuesChange: (updater: (prev: Issue[]) => Issue[]) => void
  onNavigateToIssue: (issueId: string) => void
}

/** "Sottotask" — issues whose `parentId` points at this one. */
export function SubtasksSection({
  issue,
  projectIssues,
  members,
  onProjectIssuesChange,
  onNavigateToIssue
}: SubtasksSectionProps) {
  const [addOpen, setAddOpen] = useState(false)
  const subtasks = projectIssues.filter(candidate => candidate.parentId === issue.id)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Subtasks</h3>
        <Button variant="ghost" size="sm" onClick={() => setAddOpen(true)}>
          <PlusIcon /> Add subtask
        </Button>
      </div>

      {subtasks.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subtasks yet.</p>
      ) : (
        <div className="flex flex-col divide-y rounded-md border">
          {subtasks.map(subtask => {
            const TypeIcon = ISSUE_TYPE_ICON[subtask.type]
            return (
              <button
                key={subtask.id}
                type="button"
                onClick={() => onNavigateToIssue(subtask.id)}
                className="flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted/50"
              >
                <TypeIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {subtask.key}
                </span>
                <span className="min-w-0 flex-1 truncate">{subtask.title}</span>
                <Badge variant={ISSUE_STATUS_VARIANT[subtask.status]}>
                  {ISSUE_STATUS_LABEL[subtask.status]}
                </Badge>
              </button>
            )
          })}
        </div>
      )}

      <AddIssueDialog
        open={addOpen}
        projectId={issue.projectId}
        members={members}
        parentId={issue.id}
        onOpenChange={setAddOpen}
        onSubmit={newIssue => onProjectIssuesChange(prev => [newIssue, ...prev])}
      />
    </div>
  )
}
