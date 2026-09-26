import '@xyflow/react/dist/style.css'
import {
  getDepartments,
  getEmployees,
  officeLocationLabel,
  type Department,
  type Employee
} from '@pompeitech/mock-data'
import { Button, DEFAULT_CHART_COLORS, Typography, toast } from '@pompeitech/vesuvius-ui'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
  type OnNodeDrag
} from '@xyflow/react'
import { UserPlusIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { useOfficesStore } from '../../company/_shared/offices-store'
import { EmployeeDialog } from '../_shared/employee-dialog'
import { buildNewEmployee, nextEmployeeCode } from '../_shared/build-employee'
import type { EmployeeFormOutput } from '../_shared/employee-form-schema'
import { DetailPanel, type EmployeeUpdate } from './components/detail-panel'
import { EmployeeNode, type EmployeeNodeData } from './components/employee-node'
import { buildHierarchyEdges, isAncestor, layoutWithDagre } from './utils'

export async function loader() {
  const [employees, departments] = await Promise.all([
    getEmployees({ pageSize: 200 }),
    getDepartments({ pageSize: 50 })
  ])
  return { employees: employees.data, departments: departments.data }
}

const nodeTypes = { employee: EmployeeNode }

function OrgChartCanvas({
  initialEmployees,
  initialDepartments
}: {
  initialEmployees: Employee[]
  initialDepartments: Department[]
}) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [departments, setDepartments] = useState(initialDepartments)
  const [offices] = useOfficesStore()
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<EmployeeNodeData>>([])
  const [edges, setEdges] = useEdgesState<Edge>([])
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { getIntersectingNodes } = useReactFlow()

  const departmentsById = useMemo(() => new Map(departments.map(d => [d.id, d])), [departments])
  const departmentColor = useMemo(
    () =>
      new Map(
        departments.map((d, i) => [
          d.id,
          DEFAULT_CHART_COLORS[i % DEFAULT_CHART_COLORS.length] ?? 'var(--chart-1)'
        ])
      ),
    [departments]
  )
  const locations = useMemo(() => [...offices.map(officeLocationLabel), 'Remote'], [offices])

  // Re-lay the whole tree out with dagre whenever the reporting lines
  // change (initial load, a drag-to-reparent, an edit, an add, or a remove).
  useEffect(() => {
    const nextEdges = buildHierarchyEdges(employees)
    const baseNodes: Node<EmployeeNodeData>[] = employees.map(employee => ({
      id: employee.id,
      type: 'employee',
      position: { x: 0, y: 0 },
      data: {
        employee,
        departmentName: departmentsById.get(employee.departmentId)?.name ?? 'Unassigned',
        departmentColor: departmentColor.get(employee.departmentId) ?? 'var(--chart-1)',
        directReportCount: employees.filter(e => e.managerId === employee.id).length
      }
    }))
    setNodes(layoutWithDagre(baseNodes, nextEdges))
    setEdges(nextEdges)
  }, [employees, departmentsById, departmentColor])

  const snapBack = useCallback(() => {
    setNodes(current => layoutWithDagre(current, edges))
  }, [edges, setNodes])

  const onNodeDragStop = useCallback<OnNodeDrag<Node<EmployeeNodeData>>>(
    (_event, draggedNode) => {
      const target = getIntersectingNodes(draggedNode).find(n => n.id !== draggedNode.id)
      if (!target) return snapBack()

      const employee = employees.find(e => e.id === draggedNode.id)
      const newManager = employees.find(e => e.id === target.id)
      if (!employee || !newManager || employee.managerId === newManager.id) return snapBack()

      // Dropping A onto B means "A now reports to B" — invalid if B is
      // already (transitively) one of A's own reports, since that would
      // close a loop in the reporting line.
      if (isAncestor(employees, target.id, employee.id)) {
        toast.error(
          `Can't move ${employee.name} there — ${newManager.name} already reports up to them.`
        )
        return snapBack()
      }

      setEmployees(prev =>
        prev.map(e => (e.id === employee.id ? { ...e, managerId: newManager.id } : e))
      )
      toast.success(`${employee.name} now reports to ${newManager.name}.`)
    },
    [employees, getIntersectingNodes, snapBack]
  )

  const onNodeClick = useCallback<NodeMouseHandler<Node<EmployeeNodeData>>>(
    (_event, node) => setSelectedId(node.id),
    []
  )

  const handleAddEmployee = (values: EmployeeFormOutput) => {
    const employee = buildNewEmployee(values, nextEmployeeCode(employees.length))
    setEmployees(prev => [...prev, employee])
    toast.success(`${employee.name} added to the org chart.`)
  }

  const handleUpdateEmployee = (employeeId: string, changes: EmployeeUpdate) => {
    setEmployees(prev => prev.map(e => (e.id === employeeId ? { ...e, ...changes } : e)))
    toast.success('Employee updated.')
  }

  const handleRemoveEmployee = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId)
    if (!employee) return

    // Their reports move up to the removed employee's own manager instead
    // of being orphaned; if they led a department, that department loses
    // its head rather than pointing at someone no longer on the chart.
    setEmployees(prev =>
      prev
        .filter(e => e.id !== employeeId)
        .map(e => (e.managerId === employeeId ? { ...e, managerId: employee.managerId } : e))
    )
    setDepartments(prev =>
      prev.map(department =>
        department.headEmployeeId === employeeId
          ? { ...department, headEmployeeId: undefined }
          : department
      )
    )
    setSelectedId(undefined)
    toast.success(`${employee.name} removed from the org chart.`)
  }

  const selectedEmployee = employees.find(e => e.id === selectedId)
  const selectedDepartment = selectedEmployee
    ? departmentsById.get(selectedEmployee.departmentId)
    : undefined
  const selectedManager = selectedEmployee
    ? employees.find(e => e.id === selectedEmployee.managerId)
    : undefined
  const selectedDirectReports = selectedEmployee
    ? employees.filter(e => e.managerId === selectedEmployee.id)
    : []

  return (
    <>
      <div className="flex justify-end lg:shrink-0">
        <Button onClick={() => setAddDialogOpen(true)}>
          <UserPlusIcon />
          Add Employee
        </Button>
      </div>

      <div className="h-[70vh] min-h-0 overflow-hidden rounded-md border lg:h-full lg:flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={onNodeClick}
          onPaneClick={() => setSelectedId(undefined)}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="!bg-background" />
        </ReactFlow>
      </div>

      <DetailPanel
        employee={selectedEmployee}
        department={selectedDepartment}
        manager={selectedManager}
        directReports={selectedDirectReports}
        departments={departments}
        employees={employees}
        onClose={() => setSelectedId(undefined)}
        onUpdate={handleUpdateEmployee}
        onRemove={handleRemoveEmployee}
      />

      <EmployeeDialog
        open={addDialogOpen}
        employees={employees}
        departments={departments}
        locations={locations}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddEmployee}
      />
    </>
  )
}

export function Component() {
  const { employees, departments } = useLoaderData() as {
    employees: Employee[]
    departments: Department[]
  }

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          Org Chart
        </Typography>
        <Typography variant="muted">
          Who reports to whom, and their responsibilities. Drag a card onto another to change who
          they report to.
        </Typography>
      </div>

      <ReactFlowProvider>
        <OrgChartCanvas initialEmployees={employees} initialDepartments={departments} />
      </ReactFlowProvider>
    </div>
  )
}
