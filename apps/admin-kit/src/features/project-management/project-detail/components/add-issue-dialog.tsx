import { Field, Form, useZodForm } from '@admin/form'
import type { Issue, Member } from '@pompeitech/mock-data'
import { addIssue } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@pompeitech/vesuvius-ui'
import { z } from 'zod'
import { ISSUE_PRIORITY_OPTIONS, ISSUE_TYPE_OPTIONS } from '../../_shared/format'

const NO_ASSIGNEE_VALUE = 'unassigned'

const addIssueFormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  type: z.enum(['bug', 'feature', 'task', 'chore', 'epic']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assigneeId: z.string()
})

type AddIssueFormOutput = z.output<typeof addIssueFormSchema>

const DEFAULT_VALUES: AddIssueFormOutput = {
  title: '',
  type: 'task',
  priority: 'medium',
  assigneeId: NO_ASSIGNEE_VALUE
}

type AddIssueDialogProps = {
  open: boolean
  projectId: string
  members: Member[]
  /** Forced onto the new issue — used by "Add subtask" so it always hangs off the issue it was opened from. */
  parentId?: string
  onOpenChange: (open: boolean) => void
  onSubmit: (issue: Issue) => void
}

const ISSUE_PREFIXES = ['API', 'WEB', 'APP', 'INFRA']

/** A quick "Add Issue" form — enough to place a new card on the backlog; the full editor (description, dates, ...) is the issue detail page. */
export function AddIssueDialog({
  open,
  projectId,
  members,
  parentId,
  onOpenChange,
  onSubmit
}: AddIssueDialogProps) {
  const form = useZodForm(addIssueFormSchema, { defaultValues: DEFAULT_VALUES })

  const handleSubmit = form.handleSubmit(values => {
    const id = crypto.randomUUID()
    // Derived from the new id instead of Math.random() — a fresh UUID is
    // already the source of randomness here, no need for a second impure call.
    const prefix = ISSUE_PREFIXES[parseInt(id[0] ?? '0', 16) % ISSUE_PREFIXES.length]
    const number = 100 + (parseInt(id.replace(/-/g, '').slice(1, 4), 16) % 900)
    const now = new Date().toISOString()
    const issue: Issue = {
      id,
      key: `${prefix}-${number}`,
      title: values.title,
      projectId,
      assigneeId: values.assigneeId === NO_ASSIGNEE_VALUE ? undefined : values.assigneeId,
      status: 'backlog',
      priority: values.priority,
      type: values.type,
      parentId,
      createdAt: now,
      updatedAt: now
    }
    // Written through to the shared mock-data array (not just this page's
    // local state) so the new issue is still there after navigating to its
    // own detail page and back — see the mutation-bridge note in `api/entities.ts`.
    addIssue(issue)
    onSubmit(issue)
    form.reset(DEFAULT_VALUES)
    onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{parentId ? 'Add subtask' : 'Add issue'}</DialogTitle>
          <DialogDescription>
            {parentId
              ? 'Lands in the backlog, linked to this issue as its subtask.'
              : "Lands in the backlog — drag it into Todo when it's ready to start."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field.Text name="title" label="Title" required />
            <div className="grid grid-cols-2 gap-4">
              <Field.Select name="type" label="Type" required options={[...ISSUE_TYPE_OPTIONS]} />
              <Field.Select
                name="priority"
                label="Priority"
                required
                options={[...ISSUE_PRIORITY_OPTIONS]}
              />
            </div>
            <Field.Select
              name="assigneeId"
              label="Assignee"
              options={[
                { value: NO_ASSIGNEE_VALUE, label: 'Unassigned' },
                ...members.map(member => ({ value: member.id, label: member.name }))
              ]}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add issue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
