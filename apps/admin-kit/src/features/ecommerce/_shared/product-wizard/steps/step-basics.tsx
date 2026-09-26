import { Field } from '@admin/form'
import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'
import { PRODUCT_FORM_CATEGORIES } from '../../product-form'
import { PRODUCT_TYPES } from '../schema'

/** Step 1 — product identity: name, type, category, SKU/barcode, description. */
export function StepBasics() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 pt-6">
        <Typography variant="h4">Product Basics</Typography>
        <Typography variant="muted" className="-mt-4">
          Start with the product identity and the media your catalog team will rely on every day.
        </Typography>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Switch
            name="returnable"
            label="Returnable product"
            description="Keep this enabled when post-purchase returns are allowed for the SKU family."
          />
          <Field.Switch
            name="hasVariants"
            label="Has variants"
            description="Turn this on when sizes, packs, or colorways will branch off later."
          />
        </div>

        <Field.Text
          name="name"
          label="Product name"
          placeholder="Solstice Trail Backpack"
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Select
            name="productType"
            label="Product type"
            placeholder="Select product type"
            options={PRODUCT_TYPES.map(type => ({ label: type, value: type }))}
            required
          />
          <Field.Select
            name="category"
            label="Product category"
            placeholder="Select product category"
            options={PRODUCT_FORM_CATEGORIES.map(category => ({
              label: category,
              value: category
            }))}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field.Text name="sku" label="Product SKU" placeholder="SKU-TRAIL-2087" required />
          <Field.Text name="barcode" label="Barcode" placeholder="9081726354019" />
        </div>
        <Field.Textarea
          name="description"
          label="Description"
          placeholder="Describe the item in a way that helps catalog, merchandising, and support teams identify it quickly."
          className="min-h-24"
        />
      </CardContent>
    </Card>
  )
}
