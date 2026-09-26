import { getDepartments, getEmployees, type Department, type Employee } from '@pompeitech/mock-data'
import { Button, Typography, toast } from '@pompeitech/vesuvius-ui'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { DepartmentCard } from './components/department-card'
import { DepartmentDialog } from './components/department-dialog'
import { NO_HEAD_VALUE, type DepartmentFormOutput } from './schema'

export async function loader() {
  const [departments, employees] = await Promise.all([
    getDepartments({ pageSize: 50 }),
    getEmployees({ pageSize: 200 })
  ])
  return { departments: departments.data, employees: employees.data }
}

export function Component() {
  const { departments: initialDepartments, employees } = useLoaderData() as {
    departments: Department[]
    employees: Employee[]
  }
  const [departments, setDepartments] = useState(initialDepartments)
  const [dialogTarget, setDialogTarget] = useState<Department | 'new' | undefined>()

  const handleSubmit = (values: DepartmentFormOutput) => {
    const headEmployeeId =
      values.headEmployeeId === NO_HEAD_VALUE ? undefined : values.headEmployeeId
    if (dialogTarget && dialogTarget !== 'new') {
      setDepartments(prev =>
        prev.map(d =>
          d.id === dialogTarget.id
            ? { ...d, name: values.name, description: values.description, headEmployeeId }
            : d
        )
      )
      toast.success(`Updated ${values.name}.`)
    } else {
      const department: Department = {
        id: crypto.randomUUID(),
        name: values.name,
        description: values.description,
        headEmployeeId
      }
      setDepartments(prev => [...prev, department])
      toast.success(`Added ${department.name}.`)
    }
  }

  const handleDelete = (department: Department) => {
    const memberCount = employees.filter(e => e.departmentId === department.id).length
    if (memberCount > 0) {
      toast.error(
        `Can't delete ${department.name} — reassign its ${memberCount} member(s) to another department first.`
      )
      return
    }
    setDepartments(prev => prev.filter(d => d.id !== department.id))
    toast.success(`Deleted ${department.name}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Departments
          </Typography>
          <Typography variant="muted">
            Every team, its head, and everyone who reports into it.
          </Typography>
        </div>
        <Button onClick={() => setDialogTarget('new')}>
          <PlusIcon />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {departments.map(department => {
          const members = employees.filter(e => e.departmentId === department.id)
          const head = members.find(e => e.id === department.headEmployeeId)
          return (
            <DepartmentCard
              key={department.id}
              department={department}
              head={head}
              members={members}
              onEdit={() => setDialogTarget(department)}
              onDelete={() => handleDelete(department)}
            />
          )
        })}
      </div>

      <DepartmentDialog
        department={dialogTarget}
        employees={employees}
        onOpenChange={open => !open && setDialogTarget(undefined)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
