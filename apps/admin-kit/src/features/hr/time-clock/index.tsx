import type { ClockLocation } from '@pompeitech/mock-data'
import { Button, Typography, toast } from '@pompeitech/vesuvius-ui'
import { MapIcon, Settings2Icon, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ATTENDANCE_POLICY_STORAGE_KEY,
  DEFAULT_ATTENDANCE_POLICY,
  type AttendancePolicy
} from '../_shared/attendance-policy'
import { usePersistedState } from '../../../lib/use-persisted-state'
import { CURRENT_USER } from '../../../lib/current-user'
import { useOfficesStore } from '../../company/_shared/offices-store'
import { ClockActionDialog, type ClockAction } from './components/clock-action-dialog'
import { ClockCard, type ActiveSession } from './components/clock-card'
import { HistoryCard, type CompletedEntry } from './components/history-card'
import { todayIso } from './utils'

export function Component() {
  const navigate = useNavigate()
  const [assignedOffice, setAssignedOffice] = usePersistedState(
    'vesuvius-time-clock:office',
    'Milan, IT'
  )
  const [session, setSession] = usePersistedState<ActiveSession | undefined>(
    'vesuvius-time-clock:session',
    undefined
  )
  const [history, setHistory] = usePersistedState<CompletedEntry[]>(
    'vesuvius-time-clock:history',
    []
  )
  const [policy] = usePersistedState<AttendancePolicy>(
    ATTENDANCE_POLICY_STORAGE_KEY,
    DEFAULT_ATTENDANCE_POLICY
  )
  const [offices] = useOfficesStore()
  const [dialogAction, setDialogAction] = useState<ClockAction>()

  const firstName = CURRENT_USER.name.split(' ')[0]

  const handleConfirm = (location: ClockLocation) => {
    if (dialogAction === 'in') {
      setSession({ clockInAt: new Date().toISOString(), clockInLocation: location })
      toast.success(`Clocked in from ${location.label}.`)
    } else if (dialogAction === 'out' && session) {
      const clockOutAt = new Date()
      const clockInAt = new Date(session.clockInAt)
      const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' })
      const entry: CompletedEntry = {
        id: crypto.randomUUID(),
        date: todayIso(),
        clockIn: timeFormatter.format(clockInAt),
        clockOut: timeFormatter.format(clockOutAt),
        totalHours:
          Math.round(((clockOutAt.getTime() - clockInAt.getTime()) / 3_600_000) * 10) / 10,
        clockInLocation: session.clockInLocation,
        clockOutLocation: location
      }
      setHistory(prev => [entry, ...prev])
      setSession(undefined)
      toast.success(`Clocked out from ${location.label}. ${entry.totalHours}h logged.`)
    }
    setDialogAction(undefined)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            {session ? `You're clocked in, ${firstName}` : `Welcome back, ${firstName}`}
          </Typography>
          <Typography variant="muted">
            {session
              ? 'Clock out when you wrap up for the day.'
              : "Clock in with your live location to start today's hours."}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/hr/team-status')}>
            <UsersIcon />
            Team Status
          </Button>
          <Button variant="outline" onClick={() => navigate('/hr/location-map')}>
            <MapIcon />
            Location Map
          </Button>
          <Button variant="outline" onClick={() => navigate('/hr/attendance-settings')}>
            <Settings2Icon />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ClockCard
          session={session}
          assignedOffice={assignedOffice}
          offices={offices}
          policy={policy}
          onAssignedOfficeChange={setAssignedOffice}
          onClockIn={() => setDialogAction('in')}
          onClockOut={() => setDialogAction('out')}
        />
        <HistoryCard entries={history} />
      </div>

      <ClockActionDialog
        action={dialogAction}
        assignedOffice={assignedOffice}
        offices={offices}
        policy={policy}
        onOpenChange={open => !open && setDialogAction(undefined)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
