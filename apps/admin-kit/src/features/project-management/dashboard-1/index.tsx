import {
  getIssues,
  getMembers,
  getProjects,
  type Issue,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { IssuesByPriorityCard } from './components/issues-by-priority-card'
import { IssuesByStatusCard } from './components/issues-by-status-card'
import { RecentActivityCard } from './components/recent-activity-card'
import { StatCards } from './components/stat-cards'
import { UpcomingDeadlinesCard } from './components/upcoming-deadlines-card'

export async function loader() {
  const [issues, projects, members] = await Promise.all([
    getIssues({ pageSize: 2000 }),
    getProjects({ pageSize: 200 }),
    getMembers({ pageSize: 200 })
  ])
  return { issues: issues.data, projects: projects.data, members: members.data }
}

/** The Project Management landing page — a general pulse across every project: open work, status/priority mix, what's due soon, and what just moved. */
export function Component() {
  const { issues, projects, members } = useLoaderData() as {
    issues: Issue[]
    projects: Project[]
    members: Member[]
  }

  const projectsById = useMemo(() => new Map(projects.map(p => [p.id, p])), [projects])
  const membersById = useMemo(() => new Map(members.map(m => [m.id, m])), [members])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Dashboard
        </Typography>
        <Typography variant="muted">
          A pulse across every project — status, priorities, and what's coming up.
        </Typography>
      </div>

      <StatCards issues={issues} projects={projects} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssuesByStatusCard issues={issues} />
        <IssuesByPriorityCard issues={issues} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <UpcomingDeadlinesCard
          issues={issues}
          projectsById={projectsById}
          membersById={membersById}
        />
        <RecentActivityCard issues={issues} />
      </div>
    </div>
  )
}
