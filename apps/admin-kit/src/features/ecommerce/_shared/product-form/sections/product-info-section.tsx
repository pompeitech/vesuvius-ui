import { Field } from '@admin/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** Thumbnail, name, SKU/barcode, and description — the fields that identify the product. */
export function ProductInfoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Info</CardTitle>
        <CardDescription>
          Set the essentials customers need to identify and trust this item.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Field.Upload
          name="thumbnail"
          variant="avatar"
          label="Thumbnail"
          accept="image/png,image/jpeg"
          description="JPG or PNG. Keep it square and at least 1000 by 1000 pixels."
        />
        <Field.Text name="name" label="Name" placeholder="Shirt, t-shirts, etc." required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Text name="sku" label="SKU" placeholder="eg. 348121032" required />
          <Field.Text name="barcode" label="Barcode" placeholder="0123456789012" />
        </div>
        <Field.Textarea
          name="description"
          label="Description"
          placeholder="Set a description to the product for better visibility."
          className="min-h-24"
          description="A concise summary helps merchants and customers scan the catalog faster."
        />
      </CardContent>
    </Card>
  )
}
