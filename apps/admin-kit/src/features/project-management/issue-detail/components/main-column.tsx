import type { Issue, Member } from '@pompeitech/mock-data'
import { Input, RichTextEditor, Separator } from '@pompeitech/vesuvius-ui'
import { ISSUE_TYPE_ICON } from '../../_shared/format'
import { ActivitySection } from './activity-section'
import { LinkedIssuesSection } from './linked-issues-section'
import { SubtasksSection } from './subtasks-section'

type MainColumnProps = {
  issue: Issue
  title: string
  onTitleChange: (value: string) => void
  description: string
  onDescriptionChange: (value: string) => void
  projectIssues: Issue[]
  onProjectIssuesChange: (updater: (prev: Issue[]) => Issue[]) => void
  members: Member[]
  linkedIssueIds: string[]
  onLinkedIssueIdsChange: (ids: string[]) => void
  onNavigateToIssue: (issueId: string) => void
}

/** Key/type breadcrumb, editable title, the always-visible rich-text description editor, then Subtasks/Linked tickets/Activity. */
export function MainColumn({
  issue,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  projectIssues,
  onProjectIssuesChange,
  members,
  linkedIssueIds,
  onLinkedIssueIdsChange,
  onNavigateToIssue
}: MainColumnProps) {
  const TypeIcon = ISSUE_TYPE_ICON[issue.type]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TypeIcon className="size-4" />
          {issue.key}
        </div>
        <Input
          value={title}
          onChange={event => onTitleChange(event.target.value)}
          className="border-none px-0 text-2xl font-semibold shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold">Description</h3>
        <RichTextEditor
          value={description}
          onChange={onDescriptionChange}
          placeholder="Describe the work, acceptance criteria, links…"
        />
      </div>

      <Separator />
      <SubtasksSection
        issue={issue}
        projectIssues={projectIssues}
        members={members}
        onProjectIssuesChange={onProjectIssuesChange}
        onNavigateToIssue={onNavigateToIssue}
      />

      <Separator />
      <LinkedIssuesSection
        issue={issue}
        projectIssues={projectIssues}
        linkedIssueIds={linkedIssueIds}
        onLinkedIssueIdsChange={onLinkedIssueIdsChange}
        onNavigateToIssue={onNavigateToIssue}
      />

      <Separator />
      <ActivitySection />
    </div>
  )
}
