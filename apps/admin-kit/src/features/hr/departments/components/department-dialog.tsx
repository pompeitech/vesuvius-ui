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
import {
  DEPARTMENT_FORM_DEFAULT_VALUES,
  NO_HEAD_VALUE,
  departmentFormSchema,
  type DepartmentFormOutput
} from '../schema'

type DepartmentDialogProps = {
  /** `undefined` closes the dialog, `"new"` adds a department, an existing `Department` edits it. */
  department: Department | 'new' | undefined
  employees: Employee[]
  onOpenChange: (open: boolean) => void
  onSubmit: (values: DepartmentFormOutput) => void
}

/** One dialog behind both "Add Department" and editing an existing card. */
export function DepartmentDialog({
  department,
  employees,
  onOpenChange,
  onSubmit
}: DepartmentDialogProps) {
  const open = department !== undefined

  return (
    <Dialog open={open} onOpenChange={next => !next && onOpenChange(false)}>
      <DialogContent className="sm:max-w-lg">
        {open && (
          <DepartmentDialogBody
            key={department === 'new' ? 'new' : department.id}
            department={department === 'new' ? undefined : department}
            employees={employees}
            onCancel={() => onOpenChange(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function DepartmentDialogBody({
  department,
  employees,
  onCancel,
  onSubmit
}: {
  department: Department | undefined
  employees: Employee[]
  onCancel: () => void
  onSubmit: (values: DepartmentFormOutput) => void
}) {
  const form = useZodForm(departmentFormSchema, {
    defaultValues: department
      ? {
          name: department.name,
          description: department.description,
          headEmployeeId: department.headEmployeeId ?? NO_HEAD_VALUE
        }
      : DEPARTMENT_FORM_DEFAULT_VALUES
  })

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values)
    onCancel()
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>{department ? 'Edit department' : 'Add department'}</DialogTitle>
        <DialogDescription>
          {department
            ? "Update this department's details."
            : 'Add a new department to the org chart.'}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field.Text name="name" label="Name" required />
          <Field.Textarea name="description" label="Description" rows={3} required />
          <Field.Select
            name="headEmployeeId"
            label="Department head"
            options={[
              { value: NO_HEAD_VALUE, label: 'Unassigned' },
              ...employees.map(employee => ({ value: employee.id, label: employee.name }))
            ]}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{department ? 'Save changes' : 'Add department'}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
