import { Field } from '@admin/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** The extra gallery photos, beyond the thumbnail — up to 5 images. */
export function MediaSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>Add extra photos to show the product from every angle.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field.Upload
          name="gallery"
          multiple
          accept="image/png,image/jpeg"
          description="PNG or JPG up to 5MB. Add up to 5 product media assets."
        />
      </CardContent>
    </Card>
  )
}
