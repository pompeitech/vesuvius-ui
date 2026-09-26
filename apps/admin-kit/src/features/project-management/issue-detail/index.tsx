import {
  ISSUES,
  MEMBERS,
  PROJECTS,
  updateIssue,
  type Issue,
  type IssuePriority,
  type IssueStatus,
  type IssueType,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { Button, toast } from '@pompeitech/vesuvius-ui'
import { ArrowLeftIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLoaderData, useNavigate, useParams, type LoaderFunctionArgs } from 'react-router'
import { DetailsSidebar } from './components/details-sidebar'
import { MainColumn } from './components/main-column'

export async function loader({ params }: LoaderFunctionArgs) {
  const issue = ISSUES.find(i => i.id === params.id)
  if (!issue) {
    throw new Response('Issue not found', { status: 404 })
  }
  const project = PROJECTS.find(p => p.id === issue.projectId)
  if (!project) {
    throw new Response('Project not found', { status: 404 })
  }
  const projectIssues = ISSUES.filter(i => i.projectId === project.id)
  return { issue, project, projectIssues, members: MEMBERS }
}

type LoaderData = { issue: Issue; project: Project; projectIssues: Issue[]; members: Member[] }

/**
 * React Router keeps this same route component mounted across `:id`
 * changes (only the loader re-runs) — so a click from Sottotask or Ticket
 * collegati onto a *different* issue wouldn't reset any of `IssueDetailPage`'s
 * local state on its own. Keying on `id` here forces a full remount, the
 * same "remount via key" convention used everywhere else in this kit
 * instead of a `useEffect`.
 */
export function Component() {
  const { id } = useParams()
  return <IssueDetailPage key={id} />
}

function IssueDetailPage() {
  const {
    issue,
    project,
    projectIssues: initialProjectIssues,
    members
  } = useLoaderData() as LoaderData
  const navigate = useNavigate()

  const [title, setTitle] = useState(issue.title)
  const [description, setDescription] = useState(issue.description ?? '')
  const [status, setStatus] = useState<IssueStatus>(issue.status)
  const [type, setType] = useState<IssueType>(issue.type)
  const [priority, setPriority] = useState<IssuePriority>(issue.priority)
  const [assigneeId, setAssigneeId] = useState<string | undefined>(issue.assigneeId)
  const [labels, setLabels] = useState<string[]>(issue.labels ?? [])
  const [parentId, setParentId] = useState<string | undefined>(issue.parentId)
  const [linkedIssueIds, setLinkedIssueIds] = useState<string[]>(issue.linkedIssueIds ?? [])
  const [dueDate, setDueDate] = useState<string | undefined>(issue.dueDate)
  const [startDate, setStartDate] = useState<string | undefined>(issue.startDate)
  const [projectIssues, setProjectIssues] = useState(initialProjectIssues)

  const projectPath = `/project-management/project-detail/${project.id}`

  const membersById = useMemo(() => new Map(members.map(m => [m.id, m])), [members])
  const activeProjectMembers = useMemo(
    () =>
      project.members
        .filter(member => member.status === 'active')
        .map(member => membersById.get(member.memberId))
        .filter((member): member is Member => member !== undefined),
    [project.members, membersById]
  )

  // Turning an issue into an Epic and leaving it pointed at another epic
  // doesn't fit the one-level hierarchy this kit models, so drop the
  // parent as a side effect — existing children of an issue switched
  // *away* from Epic are left as-is (harmless demo-grade inconsistency).
  const handleTypeChange = (value: IssueType) => {
    setType(value)
    if (value === 'epic') setParentId(undefined)
  }

  const handleNavigateToIssue = (issueId: string) =>
    navigate(`/project-management/issue-detail/${issueId}`)

  const handleSave = () => {
    updateIssue(issue.id, {
      title,
      description,
      status,
      type,
      priority,
      assigneeId,
      labels: labels.length > 0 ? labels : undefined,
      parentId,
      linkedIssueIds: linkedIssueIds.length > 0 ? linkedIssueIds : undefined,
      dueDate,
      startDate,
      updatedAt: new Date().toISOString()
    })
    toast.success(`${issue.key} updated.`)
    navigate(projectPath)
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="ghost" size="sm" className="w-fit" asChild>
        <Link to={projectPath}>
          <ArrowLeftIcon /> Back to {project.name}
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MainColumn
            issue={issue}
            title={title}
            onTitleChange={setTitle}
            description={description}
            onDescriptionChange={setDescription}
            projectIssues={projectIssues}
            onProjectIssuesChange={setProjectIssues}
            members={members}
            linkedIssueIds={linkedIssueIds}
            onLinkedIssueIdsChange={setLinkedIssueIds}
            onNavigateToIssue={handleNavigateToIssue}
          />
        </div>

        <DetailsSidebar
          status={status}
          onStatusChange={setStatus}
          type={type}
          onTypeChange={handleTypeChange}
          priority={priority}
          onPriorityChange={setPriority}
          assigneeId={assigneeId}
          onAssigneeChange={setAssigneeId}
          activeProjectMembers={activeProjectMembers}
          labels={labels}
          onLabelsChange={setLabels}
          issueId={issue.id}
          issueType={type}
          parentId={parentId}
          onParentIdChange={setParentId}
          projectIssues={projectIssues}
          dueDate={dueDate}
          onDueDateChange={setDueDate}
          startDate={startDate}
          onStartDateChange={setStartDate}
        />
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={() => navigate(projectPath)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  )
}
