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
          placeholder="Handling instructions or anything the warehouse should know."
          rows={4}
        />
      </CardContent>
    </Card>
  )
}
