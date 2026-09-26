import { Field, Form, useZodForm } from '@admin/form'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
  toast
} from '@pompeitech/vesuvius-ui'
import { SaveIcon } from 'lucide-react'
import { useCompanyStore } from '../_shared/company-store'
import { COMPANY_SIZE_OPTIONS, companyProfileFormSchema } from './schema'

export function Component() {
  const [company, setCompany] = useCompanyStore()
  const form = useZodForm(companyProfileFormSchema, { defaultValues: company })

  const handleSave = form.handleSubmit(values => {
    setCompany({ ...values, description: values.description ?? '' })
    toast.success('Company profile updated.')
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Company Profile
          </Typography>
          <Typography variant="muted">
            The legal and public details for the whole workspace.
          </Typography>
        </div>
        <Button type="button" onClick={handleSave}>
          <SaveIcon />
          Save changes
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Identity</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Field.Text name="name" label="Display name" required />
              <Field.Text name="legalName" label="Legal name" required />
              <div className="grid grid-cols-2 gap-4">
                <Field.Text name="taxId" label="Tax ID" required />
                <Field.NumberInput name="foundedYear" label="Founded" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field.Text name="industry" label="Industry" required />
                <Field.Select
                  name="size"
                  label="Company size"
                  options={[...COMPANY_SIZE_OPTIONS]}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Field.Text name="website" label="Website" required />
              <Field.Text name="email" label="Email" type="email" required />
              <Field.Text name="phone" label="Phone" required />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <Field.Textarea
                name="description"
                label="Description"
                rows={4}
                placeholder="What does the company do?"
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
