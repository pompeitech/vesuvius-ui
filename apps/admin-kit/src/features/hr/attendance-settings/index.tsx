import { Field, Form, useZodForm } from '@admin/form'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
  toast
} from '@pompeitech/vesuvius-ui'
import { RotateCcwIcon, SaveIcon } from 'lucide-react'
import {
  ATTENDANCE_POLICY_STORAGE_KEY,
  DEFAULT_ATTENDANCE_POLICY,
  attendancePolicySchema,
  type AttendancePolicy
} from '../_shared/attendance-policy'
import { usePersistedState } from '../../../lib/use-persisted-state'

export function Component() {
  const [policy, setPolicy] = usePersistedState<AttendancePolicy>(
    ATTENDANCE_POLICY_STORAGE_KEY,
    DEFAULT_ATTENDANCE_POLICY
  )
  const form = useZodForm(attendancePolicySchema, { defaultValues: policy })

  const handleSave = form.handleSubmit(values => {
    setPolicy(values)
    toast.success('Attendance policy updated.')
  })

  const handleReset = () => {
    form.reset(DEFAULT_ATTENDANCE_POLICY)
    setPolicy(DEFAULT_ATTENDANCE_POLICY)
    toast.success('Reset to the default attendance policy.')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Attendance Settings
          </Typography>
          <Typography variant="muted">
            The check-in/check-out windows and geofence the Time Clock and Team Status pages are
            judged against.
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcwIcon />
            Reset to defaults
          </Button>
          <Button type="button" onClick={handleSave}>
            <SaveIcon />
            Save changes
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Check-in</CardTitle>
              <CardDescription>
                When employees are expected to arrive, and how late is too late.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field.Text name="checkInWindowStart" label="Window opens" type="time" required />
                <Field.Text name="checkInWindowEnd" label="Window closes" type="time" required />
              </div>
              <Field.Text
                name="standardStartTime"
                label="Standard start time"
                type="time"
                required
                description="The nominal shift start a late arrival is measured against."
              />
              <Field.NumberInput
                name="graceMinutes"
                label="Grace period (minutes)"
                min={0}
                max={120}
                description="Minutes after the standard start time still counted as on time."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check-out</CardTitle>
              <CardDescription>When employees are expected to leave.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field.Text name="checkOutWindowStart" label="Window opens" type="time" required />
                <Field.Text name="checkOutWindowEnd" label="Window closes" type="time" required />
              </div>
              <Field.Text name="standardEndTime" label="Standard end time" type="time" required />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                How close a check-in needs to be to an office to count as on-site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field.NumberInput
                name="geofenceMeters"
                label="Geofence radius (meters)"
                min={10}
                max={5000}
                step={10}
                className="max-w-xs"
                description="A check-in within this distance of the assigned office is marked on-site."
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
