import { Field, Form, useZodForm } from '@admin/form'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
  toast,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { SaveIcon } from 'lucide-react'
import { z } from 'zod'
import { useCurrentUserStore } from '../../../lib/use-current-user-store'
import { AccountSettingsNav } from '../_shared/account-settings-nav'

const TIMEZONE_OPTIONS = [
  { label: 'Rome (GMT+1)', value: 'Europe/Rome' },
  { label: 'London (GMT+0)', value: 'Europe/London' },
  { label: 'New York (GMT-5)', value: 'America/New_York' },
  { label: 'Los Angeles (GMT-8)', value: 'America/Los_Angeles' },
  { label: 'Tokyo (GMT+9)', value: 'Asia/Tokyo' },
  { label: 'Sydney (GMT+11)', value: 'Australia/Sydney' }
]

const profileFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.email('Enter a valid email.'),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  timezone: z.string().min(1, 'Select a timezone.')
})

export function Component() {
  const [profile, setProfile] = useCurrentUserStore()
  const form = useZodForm(profileFormSchema, { defaultValues: profile })

  const handleSave = form.handleSubmit(values => {
    setProfile({
      ...values,
      phone: values.phone ?? '',
      jobTitle: values.jobTitle ?? '',
      bio: values.bio ?? ''
    })
    toast.success('Profile updated.')
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Account Settings
        </Typography>
        <Typography variant="muted">
          Manage your personal profile, security, and notification preferences.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <AccountSettingsNav active="profile" />

        <Form {...form}>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Profile</CardTitle>
                <Button type="submit">
                  <SaveIcon />
                  Save changes
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <UserAvatar name={profile.name} size="lg" />
                  <div>
                    <Typography variant="small" className="font-medium">
                      {profile.name}
                    </Typography>
                    <Typography variant="muted">
                      Your avatar is generated from your name's initials.
                    </Typography>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field.Text name="name" label="Name" required />
                  <Field.Text name="email" label="Email" type="email" required />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field.Text name="phone" label="Phone" placeholder="+1 (555) 000-0000" />
                  <Field.Text name="jobTitle" label="Job title" placeholder="Operations Manager" />
                </div>
                <Field.Textarea
                  name="bio"
                  label="Bio"
                  placeholder="A short line about you."
                  rows={3}
                />
                <Field.Select
                  name="timezone"
                  label="Timezone"
                  options={TIMEZONE_OPTIONS}
                  required
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
