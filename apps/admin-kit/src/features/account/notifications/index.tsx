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
import { z } from 'zod'
import { useNotificationPrefsStore } from '../../../lib/use-notification-prefs-store'
import { AccountSettingsNav } from '../_shared/account-settings-nav'

const NOTIFY_SCOPE_OPTIONS = [
  { label: 'All new messages', value: 'all' },
  { label: 'Direct messages and mentions', value: 'direct' },
  { label: 'Nothing', value: 'none' }
]

const notificationsFormSchema = z.object({
  notifyScope: z.enum(['all', 'direct', 'none']),
  communicationEmails: z.boolean(),
  marketingEmails: z.boolean(),
  socialEmails: z.boolean(),
  securityEmails: z.boolean(),
  differentMobileSettings: z.boolean()
})

export function Component() {
  const [prefs, setPrefs] = useNotificationPrefsStore()
  const form = useZodForm(notificationsFormSchema, { defaultValues: prefs })

  const handleSave = form.handleSubmit(values => {
    setPrefs(values)
    toast.success('Notification preferences updated.')
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
        <AccountSettingsNav active="notifications" />

        <Form {...form}>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Notifications</CardTitle>
                <Button type="submit">
                  <SaveIcon />
                  Save changes
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Field.RadioGroup
                  name="notifyScope"
                  label="Notify me about..."
                  options={NOTIFY_SCOPE_OPTIONS}
                />

                <div className="flex flex-col gap-4 border-t pt-6">
                  <Typography variant="small" className="font-medium">
                    Email notifications
                  </Typography>
                  <Field.Switch
                    name="communicationEmails"
                    label="Communication emails"
                    description="Receive emails about your account activity."
                  />
                  <Field.Switch
                    name="marketingEmails"
                    label="Marketing emails"
                    description="Receive emails about new products, features, and more."
                  />
                  <Field.Switch
                    name="socialEmails"
                    label="Social emails"
                    description="Receive emails for team mentions, follows, and more."
                  />
                  <Field.Switch
                    name="securityEmails"
                    label="Security emails"
                    description="Receive emails about your account activity and security."
                  />
                </div>

                <div className="border-t pt-6">
                  <Field.Switch
                    name="differentMobileSettings"
                    label="Use different settings for my mobile devices"
                    description="You can manage your mobile notifications in the mobile settings page."
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
}
