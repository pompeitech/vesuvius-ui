import { Field, Form, useZodForm } from '@admin/form'
import type { Office } from '@pompeitech/mock-data'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@pompeitech/vesuvius-ui'
import { OFFICE_FORM_DEFAULT_VALUES, officeFormSchema, type OfficeFormOutput } from '../schema'

type OfficeDialogProps = {
  /** `undefined` creates a new office; an existing `Office` edits it in place. */
  office: Office | undefined | 'new'
  onOpenChange: (open: boolean) => void
  onSubmit: (values: OfficeFormOutput) => void
}

/** One dialog behind both "Add Office" and editing an existing card — same form, different starting values. */
export function OfficeDialog({ office, onOpenChange, onSubmit }: OfficeDialogProps) {
  const open = office !== undefined

  return (
    <Dialog open={open} onOpenChange={next => !next && onOpenChange(false)}>
      <DialogContent className="sm:max-w-lg">
        {open && (
          <OfficeDialogBody
            key={office === 'new' ? 'new' : office.id}
            office={office === 'new' ? undefined : office}
            onCancel={() => onOpenChange(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function OfficeDialogBody({
  office,
  onCancel,
  onSubmit
}: {
  office: Office | undefined
  onCancel: () => void
  onSubmit: (values: OfficeFormOutput) => void
}) {
  const form = useZodForm(officeFormSchema, { defaultValues: office ?? OFFICE_FORM_DEFAULT_VALUES })

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values)
    onCancel()
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>{office ? 'Edit office' : 'Add office'}</DialogTitle>
        <DialogDescription>
          {office ? "Update this location's details." : 'Add a new company location.'}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field.Text name="name" label="Name" placeholder="e.g. Milan HQ" required />
          <div className="grid grid-cols-2 gap-4">
            <Field.Text name="city" label="City" required />
            <Field.Text name="country" label="Country code" placeholder="e.g. IT" required />
          </div>
          <Field.Text name="address" label="Address" required />
          <div className="grid grid-cols-2 gap-4">
            <Field.NumberInput name="lat" label="Latitude" step="any" required />
            <Field.NumberInput name="lng" label="Longitude" step="any" required />
          </div>
          <Field.Checkbox name="isHeadquarters" label="This is the headquarters" />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{office ? 'Save changes' : 'Add office'}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
