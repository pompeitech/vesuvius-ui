import {
  getIssues,
  getMembers,
  getProjects,
  updateProject,
  type Issue,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pompeitech/vesuvius-ui'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { BoardTab } from './components/board-tab'
import { CalendarTab } from './components/calendar-tab'
import { DetailHeader } from './components/detail-header'
import { DetailSidebar } from './components/detail-sidebar'
import { IssuesTab } from './components/issues-tab'
import { OverviewTab } from './components/overview-tab'
import { StatCards } from './components/stat-cards'
import { TimelineTab } from './components/timeline-tab'

export async function loader({ params }: LoaderFunctionArgs) {
  const [projects, issues, members] = await Promise.all([
    getProjects({ pageSize: 200 }),
    getIssues({ pageSize: 1000 }),
    getMembers({ pageSize: 200 })
  ])
  const project = projects.data.find(p => p.id === params.id)
  if (!project) {
    throw new Response('Project not found', { status: 404 })
  }
  return {
    project,
    issues: issues.data.filter(i => i.projectId === project.id),
    members: members.data
  }
}

export function Component() {
  const {
    project: initialProject,
    issues: initialIssues,
    members
  } = useLoaderData() as {
    project: Project
    issues: Issue[]
    members: Member[]
  }
  const [project, setProject] = useState(initialProject)
  const [issues, setIssues] = useState(initialIssues)
  const navigate = useNavigate()

  const membersById = useMemo(() => new Map(members.map(m => [m.id, m])), [members])
  const owner = membersById.get(project.ownerId)
  // Only members who've actually joined can be assigned issues — an
  // "invited" person is on the Team card but not yet assignable.
  const activeProjectMembers = useMemo(
    () =>
      project.members
        .filter(member => member.status === 'active')
        .map(member => membersById.get(member.memberId))
        .filter((member): member is Member => member !== undefined),
    [project.members, membersById]
  )

  const handleOpenIssue = (issue: Issue) => navigate(`/project-management/issue-detail/${issue.id}`)

  const handleProjectUpdate = (
    changes: Partial<Pick<Project, 'status' | 'health' | 'priority' | 'members'>>
  ) => {
    updateProject(project.id, changes)
    setProject(prev => ({ ...prev, ...changes }))
  }

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader project={project} owner={owner} />
      <StatCards project={project} issues={issues} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="board">Board</TabsTrigger>
              <TabsTrigger value="issues">Issues ({issues.length})</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <OverviewTab project={project} issues={issues} onOpenIssue={handleOpenIssue} />
            </TabsContent>

            <TabsContent value="board" className="mt-4">
              <BoardTab
                projectId={project.id}
                issues={issues}
                members={activeProjectMembers}
                membersById={membersById}
                onIssuesChange={setIssues}
                onOpenIssue={handleOpenIssue}
              />
            </TabsContent>

            <TabsContent value="issues" className="mt-4">
              <IssuesTab issues={issues} membersById={membersById} onOpenIssue={handleOpenIssue} />
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <CalendarTab
                issues={issues}
                onIssuesChange={setIssues}
                onOpenIssue={handleOpenIssue}
              />
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <TimelineTab issues={issues} />
            </TabsContent>
          </Tabs>
        </div>

        <DetailSidebar project={project} members={members} onUpdate={handleProjectUpdate} />
      </div>
    </div>
  )
}
