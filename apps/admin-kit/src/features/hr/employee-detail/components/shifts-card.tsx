import type { Shift } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { CalendarClockIcon } from 'lucide-react'
import { IconRow } from '../../_shared/icon-row'
import { SHIFT_STATUS_VARIANT } from '../../_shared/format'

const shiftDateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
})

/** This employee's scheduled shifts, most recent/upcoming first. */
export function ShiftsCard({ shifts }: { shifts: Shift[] }) {
  const sorted = [...shifts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shifts</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No shifts scheduled.</p>
        ) : (
          sorted.map(shift => (
            <IconRow
              key={shift.id}
              icon={CalendarClockIcon}
              title={shiftDateFormatter.format(new Date(shift.date))}
              subtitle={
                <>
                  {shift.startTime}–{shift.endTime} · {shift.location}
                </>
              }
              trailing={
                <Badge variant={SHIFT_STATUS_VARIANT[shift.status]} className="capitalize">
                  {shift.status}
                </Badge>
              }
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
