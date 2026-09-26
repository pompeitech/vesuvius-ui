import { Field, Form, useZodForm } from '@admin/form'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
  toast
} from '@pompeitech/vesuvius-ui'
import { LaptopIcon, LogOutIcon, SaveIcon, SmartphoneIcon } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { AccountSettingsNav } from '../_shared/account-settings-nav'

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password.'),
    newPassword: z.string().min(8, 'At least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your new password.')
  })
  .refine(values => values.newPassword === values.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword']
  })

type Session = {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
  icon: typeof LaptopIcon
}

const INITIAL_SESSIONS: Session[] = [
  {
    id: 's1',
    device: 'Chrome on macOS',
    location: 'Milan, IT',
    lastActive: 'This device',
    current: true,
    icon: LaptopIcon
  },
  {
    id: 's2',
    device: 'Safari on iPhone',
    location: 'Milan, IT',
    lastActive: '2 hours ago',
    current: false,
    icon: SmartphoneIcon
  },
  {
    id: 's3',
    device: 'Chrome on Windows',
    location: 'Rome, IT',
    lastActive: '3 days ago',
    current: false,
    icon: LaptopIcon
  }
]

export function Component() {
  const form = useZodForm(passwordFormSchema, {
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  })
  const [sessions, setSessions] = useState(INITIAL_SESSIONS)

  const handleSave = form.handleSubmit(() => {
    // No real auth backend to verify the current password against — this
    // simulates a successful change, same "toast only" principle as every
    // other unimplemented backend action in this kit.
    toast.success('Password updated.')
    form.reset()
  })

  const endSession = (session: Session) => {
    setSessions(prev => prev.filter(s => s.id !== session.id))
    toast.success(`Signed out of ${session.device}.`)
  }

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
        <AccountSettingsNav active="security" />

        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={handleSave}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <CardTitle>Change password</CardTitle>
                  <Button type="submit">
                    <SaveIcon />
                    Update password
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Field.Text
                    name="currentPassword"
                    label="Current password"
                    type="password"
                    required
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field.Text name="newPassword" label="New password" type="password" required />
                    <Field.Text
                      name="confirmPassword"
                      label="Confirm new password"
                      type="password"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>

          <Card>
            <CardHeader>
              <CardTitle>Active sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {sessions.map(session => (
                <div
                  key={session.id}
                  className="flex items-center justify-between gap-4 rounded-md px-2 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                      <session.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Typography variant="small" className="font-medium">
                          {session.device}
                        </Typography>
                        {session.current && <Badge variant="secondary">This device</Badge>}
                      </div>
                      <Typography variant="muted">
                        {session.location} · {session.lastActive}
                      </Typography>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="outline" size="sm" onClick={() => endSession(session)}>
                      <LogOutIcon />
                      Log out
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
