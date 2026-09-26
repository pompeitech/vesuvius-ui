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
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useNavigate, useLoaderData } from 'react-router'
import { buildMemberColumns } from './components/columns'
import { MembersTableToolbar } from './components/table-toolbar'

export async function loader() {
  const [members, teams, issues, projects] = await Promise.all([
    getMembers({ pageSize: 200 }),
    getTeams({ pageSize: 200 }),
    getIssues({ pageSize: 1000 }),
    getProjects({ pageSize: 200 })
  ])
  return { members: members.data, teams: teams.data, issues: issues.data, projects: projects.data }
}

/** The Project Management roster — every `Member` across every `Team`, with a quick read on their current load. Click a row to jump to the global Kanban filtered to that person. */
export function Component() {
  const { members, teams, issues, projects } = useLoaderData() as {
    members: Member[]
    teams: Team[]
    issues: Issue[]
    projects: Project[]
  }
  const navigate = useNavigate()

  const teamsById = useMemo(() => new Map(teams.map(team => [team.id, team])), [teams])
  const columns = useMemo(
    () => buildMemberColumns({ teamsById, issues, projects }),
    [teamsById, issues, projects]
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Team & Members
        </Typography>
        <Typography variant="muted">
          Every member across every team, and how much of their plate is full.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={members}
        getRowId={row => row.id}
        searchPlaceholder="Search members..."
        onRowClick={row => navigate(`/project-management/kanban?assignee=${row.id}`)}
        toolbar={ctx => <MembersTableToolbar {...ctx} teams={teams} />}
      />
    </div>
  )
}
