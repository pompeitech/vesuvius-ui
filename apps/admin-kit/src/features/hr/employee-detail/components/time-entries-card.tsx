import type { TimeEntry } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { TimerIcon } from 'lucide-react'
import { IconRow } from '../../_shared/icon-row'
import { TIME_ENTRY_STATUS_VARIANT } from '../../_shared/format'

const entryDateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
})

/** This employee's clock-in/clock-out history, most recent first. */
export function TimeEntriesCard({ entries }: { entries: TimeEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time entries</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No clock-in records yet.</p>
        ) : (
          sorted.map(entry => (
            <IconRow
              key={entry.id}
              icon={TimerIcon}
              title={entryDateFormatter.format(new Date(entry.date))}
              subtitle={
                entry.clockIn && entry.clockOut ? (
                  <>
                    {entry.clockIn} → {entry.clockOut} · {entry.totalHours}h
                  </>
                ) : (
                  'No clock-out recorded'
                )
              }
              trailing={
                <Badge variant={TIME_ENTRY_STATUS_VARIANT[entry.status]} className="capitalize">
                  {entry.status.replace('_', ' ')}
                </Badge>
              }
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
