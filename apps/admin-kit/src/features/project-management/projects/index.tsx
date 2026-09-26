import {
  addProject,
  getMembers,
  getProjects,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { Button, DataTable, Typography, toast } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { buildProjectColumns } from './components/columns'
import { ProjectDialog } from './components/project-dialog'
import { ProjectsTableToolbar } from './components/table-toolbar'
import type { ProjectFormOutput } from './schema'

export async function loader() {
  const [projects, members] = await Promise.all([
    getProjects({ pageSize: 200 }),
    getMembers({ pageSize: 200 })
  ])
  return { projects: projects.data, members: members.data }
}

export function Component() {
  const { projects: initialProjects, members } = useLoaderData() as {
    projects: Project[]
    members: Member[]
  }
  const [projects, setProjects] = useState(initialProjects)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const navigate = useNavigate()

  const membersById = useMemo(() => new Map(members.map(m => [m.id, m])), [members])
  const columns = useMemo(() => buildProjectColumns({ membersById }), [membersById])

  const handleAddProject = (values: ProjectFormOutput) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      status: 'planning',
      health: 'on_track',
      priority: values.priority,
      progress: 0,
      ownerId: values.ownerId,
      members: [{ memberId: values.ownerId, status: 'active' }],
      dueDate: (values.dueDate ?? new Date()).toISOString()
    }
    addProject(project)
    setProjects(prev => [project, ...prev])
    toast.success(`${project.name} created.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Projects
          </Typography>
          <Typography variant="muted">
            Every project across the team, its owner, health, and progress.
          </Typography>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusIcon />
          Add Project
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        getRowId={row => row.id}
        defaultSorting={[{ id: 'dueDate', desc: false }]}
        searchPlaceholder="Search projects..."
        onRowClick={row => navigate(`/project-management/project-detail/${row.id}`)}
        toolbar={ctx => <ProjectsTableToolbar {...ctx} />}
      />

      <ProjectDialog
        open={addDialogOpen}
        members={members}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddProject}
      />
    </div>
  )
}
