import { Field } from '@admin/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { PRODUCT_FORM_CATEGORIES } from '../schema'

/** Vendor, category/sub-category, and tags — keeps the catalog searchable. */
export function OrganizationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <CardDescription>
          Group the product so your catalog stays searchable and tidy.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field.Text name="vendor" label="Vendor" placeholder="eg. Nike" />
        <Field.Select
          name="category"
          label="Category"
          placeholder="Select category"
          options={PRODUCT_FORM_CATEGORIES.map(category => ({ label: category, value: category }))}
          required
        />
        <Field.Text name="subCategory" label="Sub category" placeholder="eg. Running shoes" />
        <Field.Text
          name="tags"
          label="Tags"
          placeholder="hero launch, new arrival"
          description="Separate tags with commas to improve internal discovery."
        />
      </CardContent>
    </Card>
  )
}
