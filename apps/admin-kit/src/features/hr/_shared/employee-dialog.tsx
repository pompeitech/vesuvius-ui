import { Field, Form, useZodForm } from '@admin/form'
import type { Department, Employee } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@pompeitech/vesuvius-ui'
import { useEffect } from 'react'
import {
  EMPLOYEE_FORM_DEFAULT_VALUES,
  EMPLOYMENT_TYPE_OPTIONS,
  NO_MANAGER_VALUE,
  employeeFormSchema,
  type EmployeeFormOutput
} from './employee-form-schema'

type EmployeeDialogProps = {
  open: boolean
  employees: Employee[]
  departments: Department[]
  locations: string[]
  onOpenChange: (open: boolean) => void
  onSubmit: (values: EmployeeFormOutput) => void
}

/** The "Add Employee" form — used from both the Org Chart and the Employees list, each wiring the result into its own local state. */
export function EmployeeDialog({
  open,
  employees,
  departments,
  locations,
  onOpenChange,
  onSubmit
}: EmployeeDialogProps) {
  const form = useZodForm(employeeFormSchema, {
    defaultValues: EMPLOYEE_FORM_DEFAULT_VALUES
  })

  useEffect(() => {
    if (open) form.reset(EMPLOYEE_FORM_DEFAULT_VALUES)
    // Only reset when the dialog opens, not on every keystroke.
  }, [open])

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values)
    onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add employee</DialogTitle>
          <DialogDescription>
            Add a new person to the org chart and the employee roster.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field.Text name="name" label="Full name" required />
              <Field.Text name="email" label="Email" type="email" required />
            </div>
            <Field.Text name="jobTitle" label="Job title" required />
            <div className="grid grid-cols-2 gap-4">
              <Field.Select
                name="departmentId"
                label="Department"
                placeholder="Select a department"
                required
                options={departments.map(department => ({
                  value: department.id,
                  label: department.name
                }))}
              />
              <Field.Select
                name="managerId"
                label="Reports to"
                options={[
                  {
                    value: NO_MANAGER_VALUE,
                    label: 'No one (top of the chart)'
                  },
                  ...employees.map(employee => ({
                    value: employee.id,
                    label: employee.name
                  }))
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field.Select
                name="employmentType"
                label="Employment type"
                required
                options={[...EMPLOYMENT_TYPE_OPTIONS]}
              />
              <Field.Select
                name="location"
                label="Location"
                placeholder="Select a location"
                required
                options={locations.map(location => ({
                  value: location,
                  label: location
                }))}
              />
            </div>
            <Field.DatePicker name="hireDate" label="Hire date" required className="w-full" />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add employee</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
