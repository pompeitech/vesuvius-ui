import { getIssues, getProjects, type Issue, type Project } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { IssuesByTypeCard } from './components/issues-by-type-card'
import { OverdueIssuesCard } from './components/overdue-issues-card'
import { StatCards } from './components/stat-cards'
import { UpcomingTimelineCard } from './components/upcoming-timeline-card'
import { VelocityTrendCard } from './components/velocity-trend-card'

export async function loader() {
  const [issues, projects] = await Promise.all([
    getIssues({ pageSize: 2000 }),
    getProjects({ pageSize: 200 })
  ])
  return { issues: issues.data, projects: projects.data }
}

/** How fast work is actually moving — closing pace over time, the mix of work being closed, and what's coming up or already late. */
export function Component() {
  const { issues, projects } = useLoaderData() as { issues: Issue[]; projects: Project[] }
  const projectsById = useMemo(() => new Map(projects.map(p => [p.id, p])), [projects])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Velocity & Timeline
        </Typography>
        <Typography variant="muted">How fast work is moving, and what's coming up next.</Typography>
      </div>

      <StatCards issues={issues} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <VelocityTrendCard issues={issues} />
        <IssuesByTypeCard issues={issues} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UpcomingTimelineCard issues={issues} projectsById={projectsById} />
        <OverdueIssuesCard issues={issues} projectsById={projectsById} />
      </div>
    </div>
  )
}
