import { Field } from '@admin/form'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** Draft/Active/Archived — controls catalog visibility. */
export function StatusSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Field.Select
          name="status"
          description="Draft keeps the product private until your review is done."
          options={[
            { label: 'Draft', value: 'draft' },
            { label: 'Active', value: 'active' },
            { label: 'Archived', value: 'archived' }
          ]}
        />
      </CardContent>
    </Card>
  )
}
