import type { Department, Employee } from '@pompeitech/mock-data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { PencilIcon, Trash2Icon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { InfoField } from '../../_shared/info-field'
import { NO_MANAGER_VALUE } from '../../_shared/employee-form-schema'
import { isAncestor } from '../utils'

export type EmployeeUpdate = {
  jobTitle: string
  departmentId: string
  managerId: string | undefined
}

type DetailPanelProps = {
  employee: Employee | undefined
  department: Department | undefined
  manager: Employee | undefined
  directReports: Employee[]
  departments: Department[]
  employees: Employee[]
  onClose: () => void
  onUpdate: (employeeId: string, changes: EmployeeUpdate) => void
  onRemove: (employeeId: string) => void
}

/** Side panel for the selected node: read-only by default, an Edit mode changes job title/department/manager, and Remove takes them off the chart entirely. */
export function DetailPanel({
  employee,
  department,
  manager,
  directReports,
  departments,
  employees,
  onClose,
  onUpdate,
  onRemove
}: DetailPanelProps) {
  return (
    <Sheet open={!!employee} onOpenChange={open => !open && onClose()}>
      <SheetContent side="right" className="flex flex-col gap-6 overflow-y-auto p-6">
        {employee && (
          <DetailPanelBody
            key={employee.id}
            employee={employee}
            department={department}
            manager={manager}
            directReports={directReports}
            departments={departments}
            employees={employees}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function DetailPanelBody({
  employee,
  department,
  manager,
  directReports,
  departments,
  employees,
  onUpdate,
  onRemove
}: {
  employee: Employee
  department: Department | undefined
  manager: Employee | undefined
  directReports: Employee[]
  departments: Department[]
  employees: Employee[]
  onUpdate: (employeeId: string, changes: EmployeeUpdate) => void
  onRemove: (employeeId: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const [jobTitle, setJobTitle] = useState(employee.jobTitle)
  const [departmentId, setDepartmentId] = useState(employee.departmentId)
  const [managerId, setManagerId] = useState(employee.managerId ?? NO_MANAGER_VALUE)

  // A valid new manager is anyone except this employee themselves or one of
  // their own (transitive) reports — picking either would close a loop.
  const managerOptions = employees.filter(
    candidate => candidate.id !== employee.id && !isAncestor(employees, candidate.id, employee.id)
  )

  const handleSave = () => {
    onUpdate(employee.id, {
      jobTitle,
      departmentId,
      managerId: managerId === NO_MANAGER_VALUE ? undefined : managerId
    })
    setIsEditing(false)
  }

  return (
    <>
      <SheetHeader className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <UserAvatar name={employee.name} src={employee.avatarUrl} size="lg" />
            <div>
              <SheetTitle>{employee.name}</SheetTitle>
              <SheetDescription>{employee.jobTitle}</SheetDescription>
            </div>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon />
              <span className="sr-only">Edit</span>
            </Button>
          )}
        </div>
      </SheetHeader>

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <InfoField label="Job title">
            <Input
              value={jobTitle}
              onChange={event => setJobTitle(event.target.value)}
              className="mt-1"
            />
          </InfoField>
          <InfoField label="Department">
            <Select value={departmentId} onValueChange={setDepartmentId}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InfoField>
          <InfoField label="Reports to">
            <Select value={managerId} onValueChange={setManagerId}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_MANAGER_VALUE}>No one (top of the chart)</SelectItem>
                {managerOptions.map(candidate => (
                  <SelectItem key={candidate.id} value={candidate.id}>
                    {candidate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InfoField>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              <XIcon />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <InfoField label="Department">
            {department ? (
              <Link
                to={`/hr/department-detail/${department.id}`}
                className="text-primary hover:underline"
              >
                {department.name}
              </Link>
            ) : (
              'Unassigned'
            )}
          </InfoField>
          <InfoField label="Reports to">
            {manager ? (
              <Link
                to={`/hr/employee-detail/${manager.id}`}
                className="text-primary hover:underline"
              >
                {manager.name}
              </Link>
            ) : (
              'No one (CEO)'
            )}
          </InfoField>
          <InfoField label={`Direct reports (${directReports.length})`}>
            {directReports.length === 0 ? (
              <span className="text-muted-foreground">None</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {directReports.map(report => (
                  <Badge key={report.id} variant="outline">
                    {report.name}
                  </Badge>
                ))}
              </div>
            )}
          </InfoField>
          <InfoField label="Email">{employee.email}</InfoField>
          <InfoField label="Location">{employee.location}</InfoField>
        </div>
      )}

      {!isEditing && (
        <div className="mt-auto flex flex-col gap-3 border-t pt-4">
          <Link
            to={`/hr/employee-detail/${employee.id}`}
            className="text-sm text-primary hover:underline"
          >
            View full profile →
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => setConfirmingRemove(true)}
          >
            <Trash2Icon />
            Remove from org chart
          </Button>
        </div>
      )}

      <AlertDialog open={confirmingRemove} onOpenChange={setConfirmingRemove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {employee.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              {directReports.length > 0
                ? `${directReports.length === 1 ? 'Their direct report' : `All ${directReports.length} of their direct reports`} will move up to report to ${manager?.name ?? 'no one'} instead.`
                : "This can't be undone here — this only removes them from this org chart view."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onRemove(employee.id)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
