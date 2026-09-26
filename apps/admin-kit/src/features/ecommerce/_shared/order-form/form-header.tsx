import { Button, Typography } from '@pompeitech/vesuvius-ui'

type FormHeaderProps = {
  mode: 'add' | 'edit'
  onReset: () => void
}

/** Page title + Reset/Submit — the submit button relies on the surrounding `<form>`'s onSubmit. */
export function FormHeader({ mode, onReset }: FormHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {mode === 'add' ? 'Add Order' : 'Edit Order'}
        </Typography>
        <Typography variant="muted">
          {mode === 'add'
            ? 'Create a new order with its items, payment, and shipping details.'
            : "Update this order's items, payment, and shipping details."}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
        <Button type="submit">{mode === 'add' ? 'Create order' : 'Update order'}</Button>
      </div>
    </div>
  )
}
