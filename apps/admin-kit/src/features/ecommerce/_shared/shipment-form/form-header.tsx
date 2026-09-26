import { Button, Typography } from '@pompeitech/vesuvius-ui'

type FormHeaderProps = {
  mode: 'add' | 'edit'
  onReset: () => void
}

/** Page title + Reset/Submit — same layout as the Order/Product form headers. */
export function FormHeader({ mode, onReset }: FormHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {mode === 'add' ? 'Create Shipping Label' : 'Edit Shipping Label'}
        </Typography>
        <Typography variant="muted">
          {mode === 'add'
            ? 'Generate a new shipping label for an order — carrier, package, and delivery details.'
            : "Update this shipment's carrier, package, and delivery details."}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
        <Button type="submit">{mode === 'add' ? 'Create label' : 'Save changes'}</Button>
      </div>
    </div>
  )
}
