import { officeLocationLabel, type ClockLocation, type Office } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn
} from '@pompeitech/vesuvius-ui'
import { LogInIcon, LogOutIcon, MapPinIcon } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import type { AttendancePolicy } from '../../_shared/attendance-policy'
import { formatElapsed } from '../utils'
import { LiveClock } from './live-clock'

const STANDARD_WORKDAY_MS = 8 * 60 * 60 * 1000

export type ActiveSession = { clockInAt: string; clockInLocation: ClockLocation }

type ClockCardProps = {
  session: ActiveSession | undefined
  assignedOffice: string
  offices: Office[]
  policy: AttendancePolicy
  onAssignedOfficeChange: (office: string) => void
  onClockIn: () => void
  onClockOut: () => void
}

/** A small ring that fills up over the standard 8h workday — a glance at how far into the day this session is. */
function ElapsedRing({ percent, children }: { percent: number; children: ReactNode }) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div
      className="relative flex size-20 shrink-0 items-center justify-center rounded-full transition-[background]"
      style={{ background: `conic-gradient(var(--success) ${clamped}%, var(--muted) 0)` }}
    >
      <div className="absolute inset-[3px] flex flex-col items-center justify-center rounded-full bg-card text-center leading-none">
        {children}
      </div>
    </div>
  )
}

/** The page's centerpiece: the live clock, current status, and the one button that matters right now. */
export function ClockCard({
  session,
  assignedOffice,
  offices,
  policy,
  onAssignedOfficeChange,
  onClockIn,
  onClockOut
}: ClockCardProps) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const assignableOffices = [...offices.map(officeLocationLabel), 'Remote']

  useEffect(() => {
    if (!session) return
    const update = () => setElapsedMs(Date.now() - new Date(session.clockInAt).getTime())
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [session])

  const elapsedPercent = (elapsedMs / STANDARD_WORKDAY_MS) * 100
  const hasCoordinates =
    session && (session.clockInLocation.lat !== 0 || session.clockInLocation.lng !== 0)

  return (
    <Card
      className={cn(
        'overflow-hidden border-l-4 transition-colors',
        session ? 'border-l-success' : 'border-l-muted'
      )}
    >
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <LiveClock />

          <div className="flex flex-col items-end gap-2">
            <span className="text-sm text-muted-foreground">Assigned to</span>
            <Select
              value={assignedOffice}
              onValueChange={onAssignedOfficeChange}
              disabled={!!session}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {assignableOffices.map(office => (
                  <SelectItem key={office} value={office}>
                    {office}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Check-in {policy.checkInWindowStart}–{policy.checkInWindowEnd} · Check-out{' '}
              {policy.checkOutWindowStart}–{policy.checkOutWindowEnd}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 rounded-lg border bg-muted/30 p-4">
          {session ? (
            <ElapsedRing percent={elapsedPercent}>
              <span className="text-sm font-semibold tabular-nums">{formatElapsed(elapsedMs)}</span>
              <span className="text-[10px] text-muted-foreground">of 8h</span>
            </ElapsedRing>
          ) : (
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed text-muted-foreground">
              <LogInIcon className="size-6" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            {session ? (
              <>
                <p className="flex items-center gap-2 font-medium text-success">
                  <span className="size-2 rounded-full bg-success" /> Clocked in
                </p>
                <p className="text-sm text-muted-foreground">
                  Since{' '}
                  {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(
                    new Date(session.clockInAt)
                  )}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm">
                  <MapPinIcon className="size-3.5 text-muted-foreground" />
                  {session.clockInLocation.label}
                  <Badge
                    variant={session.clockInLocation.onSite ? 'success' : 'secondary'}
                    className="ml-1"
                  >
                    {session.clockInLocation.onSite ? 'On-site' : 'Off-site'}
                  </Badge>
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-muted-foreground">Clocked out</p>
                <p className="text-sm text-muted-foreground">
                  Clock in to start tracking today's hours.
                </p>
              </>
            )}
          </div>

          {session ? (
            <Button variant="destructive" onClick={onClockOut}>
              <LogOutIcon />
              Clock Out
            </Button>
          ) : (
            <Button onClick={onClockIn}>
              <LogInIcon />
              Clock In
            </Button>
          )}
        </div>

        {hasCoordinates && (
          <iframe
            title="Current check-in location"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${session.clockInLocation.lng - 0.004},${session.clockInLocation.lat - 0.004},${session.clockInLocation.lng + 0.004},${session.clockInLocation.lat + 0.004}&layer=mapnik&marker=${session.clockInLocation.lat},${session.clockInLocation.lng}`}
            className="h-32 w-full rounded-md border"
            loading="lazy"
          />
        )}
      </CardContent>
    </Card>
  )
}
