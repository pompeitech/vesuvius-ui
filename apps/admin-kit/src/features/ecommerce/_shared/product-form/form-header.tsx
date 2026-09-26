import { Button, Typography } from '@pompeitech/vesuvius-ui'

type FormHeaderProps = {
  mode: 'add' | 'edit'
  onReset: () => void
  onSaveDraft: () => void
}

/** Page title + Reset/Save draft/Submit — the submit button relies on the surrounding `<form>`'s onSubmit. */
export function FormHeader({ mode, onReset, onSaveDraft }: FormHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {mode === 'add' ? 'Add Product' : 'Edit Product'}
        </Typography>
        <Typography variant="muted">
          {mode === 'add'
            ? 'Build a polished product record with pricing, media, availability, and variant data.'
            : 'Update pricing, media, availability, and variant data without leaving the catalog flow.'}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
        <Button type="button" variant="outline" onClick={onSaveDraft}>
          Save draft
        </Button>
        <Button type="submit">{mode === 'add' ? 'Save Product' : 'Update product'}</Button>
      </div>
    </div>
  )
}
