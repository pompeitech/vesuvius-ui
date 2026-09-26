import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

export function NotesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Field.Textarea
          name="notes"
          placeholder="Internal notes about this order (not visible to the customer)."
          rows={4}
        />
      </CardContent>
    </Card>
  )
}
