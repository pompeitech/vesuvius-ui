import {
  getIssues,
  getMembers,
  getProjects,
  getTeams,
  type Issue,
  type Member,
  type Project,
  type Team
} from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData } from 'react-router'
import { StatCards } from './components/stat-cards'
import { TeamBreakdownCard } from './components/team-breakdown-card'
import { TopContributorsCard } from './components/top-contributors-card'
import { UnassignedIssuesCard } from './components/unassigned-issues-card'
import { WorkloadByMemberCard } from './components/workload-by-member-card'

export async function loader() {
  const [issues, projects, members, teams] = await Promise.all([
    getIssues({ pageSize: 2000 }),
    getProjects({ pageSize: 200 }),
    getMembers({ pageSize: 200 }),
    getTeams({ pageSize: 50 })
  ])
  return { issues: issues.data, projects: projects.data, members: members.data, teams: teams.data }
}

/** Who's carrying what — workload per person and team, what's still unowned, and who's shipped the most lately. */
export function Component() {
  const { issues, projects, members, teams } = useLoaderData() as {
    issues: Issue[]
    projects: Project[]
    members: Member[]
    teams: Team[]
  }

  const projectsById = useMemo(() => new Map(projects.map(p => [p.id, p])), [projects])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Team Workload
        </Typography>
        <Typography variant="muted">Who's carrying what, right now.</Typography>
      </div>

      <StatCards issues={issues} members={members} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <WorkloadByMemberCard issues={issues} members={members} />
        <TeamBreakdownCard teams={teams} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <UnassignedIssuesCard issues={issues} projectsById={projectsById} />
        <TopContributorsCard issues={issues} members={members} />
      </div>
    </div>
  )
}
