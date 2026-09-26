import { updateIssue, type Issue, type IssueStatus, type Member } from '@pompeitech/mock-data'
import { Button, toast } from '@pompeitech/vesuvius-ui'
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_ORDER } from '../../_shared/format'
import { AddIssueDialog } from './add-issue-dialog'
import { StatusColumn } from './status-column'

type BoardTabProps = {
  projectId: string
  issues: Issue[]
  members: Member[]
  membersById: Map<string, Member>
  onIssuesChange: (updater: (prev: Issue[]) => Issue[]) => void
  onOpenIssue: (issue: Issue) => void
}

/** The project's Jira-style board — drag a card to another column to change its status. */
export function BoardTab({
  projectId,
  issues,
  members,
  membersById,
  onIssuesChange,
  onOpenIssue
}: BoardTabProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  // Without an activation distance, dnd-kit's PointerSensor treats even a
  // stationary click as a completed zero-distance drag and swallows the
  // click event that would otherwise open the issue — a few pixels of
  // slack is enough to tell an intentional drag from a click.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const newStatus = over.id as IssueStatus
    const issue = issues.find(i => i.id === active.id)
    if (!issue || issue.status === newStatus) return

    const updatedAt = new Date().toISOString()
    updateIssue(issue.id, { status: newStatus, updatedAt })
    onIssuesChange(prev =>
      prev.map(i => (i.id === issue.id ? { ...i, status: newStatus, updatedAt } : i))
    )
    toast.success(`${issue.key} moved to ${ISSUE_STATUS_LABEL[newStatus]}.`)
  }

  const handleParentChange = (issueId: string, parentId: string | undefined) => {
    const updatedAt = new Date().toISOString()
    updateIssue(issueId, { parentId, updatedAt })
    onIssuesChange(prev => prev.map(i => (i.id === issueId ? { ...i, parentId, updatedAt } : i)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAddDialogOpen(true)}>
          <PlusIcon />
          Add Issue
        </Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {ISSUE_STATUS_ORDER.map(status => (
            <StatusColumn
              key={status}
              status={status}
              label={ISSUE_STATUS_LABEL[status]}
              issues={issues.filter(i => i.status === status)}
              allIssues={issues}
              membersById={membersById}
              onOpenIssue={onOpenIssue}
              onParentChange={handleParentChange}
            />
          ))}
        </div>
      </DndContext>

      <AddIssueDialog
        open={addDialogOpen}
        projectId={projectId}
        members={members}
        onOpenChange={setAddDialogOpen}
        onSubmit={issue => onIssuesChange(prev => [issue, ...prev])}
      />
    </div>
  )
}
