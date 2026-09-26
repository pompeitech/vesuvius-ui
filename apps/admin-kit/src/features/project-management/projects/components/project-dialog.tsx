import { Field, Form, useZodForm } from '@admin/form'
import type { Member } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@pompeitech/vesuvius-ui'
import { PROJECT_PRIORITY_OPTIONS } from '../../_shared/format'
import { PROJECT_FORM_DEFAULT_VALUES, projectFormSchema, type ProjectFormOutput } from '../schema'

type ProjectDialogProps = {
  open: boolean
  members: Member[]
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ProjectFormOutput) => void
}

/** The "Add Project" form. */
export function ProjectDialog({ open, members, onOpenChange, onSubmit }: ProjectDialogProps) {
  const form = useZodForm(projectFormSchema, { defaultValues: PROJECT_FORM_DEFAULT_VALUES })

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values)
    form.reset(PROJECT_FORM_DEFAULT_VALUES)
    onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription>
            Start a new project — you can add issues and a timeline once it's created.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field.Text name="name" label="Name" required />
            <Field.Textarea name="description" label="Description" rows={3} required />
            <div className="grid grid-cols-2 gap-4">
              <Field.Select
                name="ownerId"
                label="Owner"
                placeholder="Select an owner"
                required
                options={members.map(member => ({ value: member.id, label: member.name }))}
              />
              <Field.Select
                name="priority"
                label="Priority"
                required
                options={[...PROJECT_PRIORITY_OPTIONS]}
              />
            </div>
            <Field.DatePicker name="dueDate" label="Due date" required className="w-full" />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
