import { Field, Form, useZodForm } from '@admin/form'
import type { Employee } from '@pompeitech/mock-data'
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
  REQUEST_FORM_DEFAULT_VALUES,
  REQUESTABLE_TYPE_OPTIONS,
  requestFormSchema,
  type RequestFormOutput
} from './request-form-schema'

type RequestDialogProps = {
  employees: Employee[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: RequestFormOutput) => void
}

const DAY_PART_OPTIONS = [
  { value: 'full', label: 'Full day' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' }
]

/** The "Request Time Off" form — anyone submitting on an employee's behalf, same page as the requests they review. */
export function RequestDialog({ employees, open, onOpenChange, onSubmit }: RequestDialogProps) {
  const form = useZodForm(requestFormSchema, {
    defaultValues: REQUEST_FORM_DEFAULT_VALUES
  })

  useEffect(() => {
    if (open) form.reset(REQUEST_FORM_DEFAULT_VALUES)
    // Only reset when the dialog opens, not on every keystroke.
  }, [open])

  const type = form.watch('type')
  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')
  const canBeHalfDay =
    (type === 'permit' || type === 'smart_working') &&
    !!startDate &&
    !!endDate &&
    new Date(startDate).toDateString() === new Date(endDate).toDateString()

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values)
    onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request time off</DialogTitle>
          <DialogDescription>
            Submit a new absence request on behalf of an employee.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field.Select
              name="employeeId"
              label="Employee"
              placeholder="Select an employee"
              required
              options={employees.map(employee => ({
                value: employee.id,
                label: employee.name
              }))}
            />

            <Field.Select
              name="type"
              label="Type"
              required
              options={[...REQUESTABLE_TYPE_OPTIONS]}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field.DatePicker name="startDate" label="Start date" required className="w-full" />
              <Field.DatePicker name="endDate" label="End date" required className="w-full" />
            </div>

            {canBeHalfDay && (
              <Field.RadioGroup
                name="dayPart"
                label="Duration"
                orientation="horizontal"
                options={DAY_PART_OPTIONS}
              />
            )}

            <Field.Textarea
              name="note"
              label="Note"
              placeholder="Any context for the reviewer (optional)."
              rows={3}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
