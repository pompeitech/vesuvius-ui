import {
  getIssues,
  getMembers,
  getProjects,
  updateIssue,
  type Issue,
  type IssueStatus,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { KanbanBoard, Typography, toast } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router'
import { ISSUE_STATUS_LABEL, ISSUE_STATUS_ORDER } from '../_shared/format'
import { IssueCard } from '../project-detail/components/issue-card'
import { KanbanToolbar } from './components/kanban-toolbar'

export async function loader() {
  const [issues, projects, members] = await Promise.all([
    getIssues({ pageSize: 1000 }),
    getProjects({ pageSize: 200 }),
    getMembers({ pageSize: 200 })
  ])
  return {
    issues: issues.data,
    projects: projects.data,
    members: members.data
  }
}

/** Every project's board merged into one — the per-project Board scoped down to a single `Project`, this one spans all of them. Same drag-to-change-status mechanics, same `updateIssue` mutation bridge for cross-page persistence. */
export function Component() {
  const {
    issues: initialIssues,
    projects,
    members
  } = useLoaderData() as {
    issues: Issue[]
    projects: Project[]
    members: Member[]
  }
  const [issues, setIssues] = useState(initialIssues)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [projectIds, setProjectIds] = useState<string[]>([])
  const [search, setSearch] = useState('')
  // Deep-linked from Team & Members ("show me this person's board").
  const assigneeId = searchParams.get('assignee') ?? undefined
  const setAssigneeId = (id: string | undefined) => {
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev)
        if (id) next.set('assignee', id)
        else next.delete('assignee')
        return next
      },
      { replace: true }
    )
  }

  const projectsById = useMemo(
    () => new Map(projects.map(project => [project.id, project])),
    [projects]
  )
  const membersById = useMemo(() => new Map(members.map(member => [member.id, member])), [members])

  const filteredIssues = issues.filter(issue => {
    if (projectIds.length > 0 && !projectIds.includes(issue.projectId)) return false
    if (assigneeId && issue.assigneeId !== assigneeId) return false
    if (search && !`${issue.key} ${issue.title}`.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  function handleDragEnd(issue: Issue, newStatus: IssueStatus) {
    if (issue.status === newStatus) return

    const updatedAt = new Date().toISOString()
    updateIssue(issue.id, { status: newStatus, updatedAt })
    setIssues(prev =>
      prev.map(i => (i.id === issue.id ? { ...i, status: newStatus, updatedAt } : i))
    )
    toast.success(`${issue.key} moved to ${ISSUE_STATUS_LABEL[newStatus]}.`)
  }

  const handleParentChange = (issueId: string, parentId: string | undefined) => {
    const updatedAt = new Date().toISOString()
    updateIssue(issueId, { parentId, updatedAt })
    setIssues(prev => prev.map(i => (i.id === issueId ? { ...i, parentId, updatedAt } : i)))
  }

  const handleOpenIssue = (issue: Issue) => navigate(`/project-management/issue-detail/${issue.id}`)

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Kanban
        </Typography>
        <Typography variant="muted">
          Every project's board, merged into one — filter by project or assignee.
        </Typography>
      </div>

      <div className="lg:shrink-0">
        <KanbanToolbar
          projects={projects}
          members={members}
          projectIds={projectIds}
          onProjectIdsChange={setProjectIds}
          assigneeId={assigneeId}
          onAssigneeChange={setAssigneeId}
          search={search}
          onSearchChange={setSearch}
        />
      </div>

      <KanbanBoard
        columns={ISSUE_STATUS_ORDER.map(status => ({
          id: status,
          title: ISSUE_STATUS_LABEL[status],
          count: filteredIssues.filter(issue => issue.status === status).length
        }))}
        items={filteredIssues}
        getItemId={issue => issue.id}
        getItemColumn={issue => issue.status}
        onItemMove={handleDragEnd}
        columnClassName="lg:min-h-0"
        className="lg:min-h-0 lg:flex-1"
        renderItem={issue => (
          <IssueCard
            issue={issue}
            assignee={issue.assigneeId ? membersById.get(issue.assigneeId) : undefined}
            projectIssues={filteredIssues.filter(
              candidate => candidate.projectId === issue.projectId
            )}
            onOpen={handleOpenIssue}
            onParentChange={handleParentChange}
            projectName={projectsById.get(issue.projectId)?.name ?? '—'}
            enableDrag={false}
          />
        )}
      />
    </div>
  )
}
