import type { ClockLocation } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { TimerIcon } from 'lucide-react'
import { IconRow } from '../../_shared/icon-row'
import { dateFormatter } from '../../_shared/format'
import { todayIso } from '../utils'

export type CompletedEntry = {
  id: string
  date: string
  clockIn: string
  clockOut: string
  totalHours: number
  clockInLocation: ClockLocation
  clockOutLocation: ClockLocation
}

function locationSummary(clockIn: ClockLocation, clockOut: ClockLocation): string {
  if (clockIn.label === clockOut.label) return clockIn.label
  return `${clockIn.label} → ${clockOut.label}`
}

/** Every clock-in/out pair completed this browser session — this page's own local history, not the seeded mock dataset. */
export function HistoryCard({ entries }: { entries: CompletedEntry[] }) {
  const sorted = [...entries].sort(
    (a, b) => b.date.localeCompare(a.date) || b.clockIn.localeCompare(a.clockIn)
  )
  const totalToday = entries
    .filter(e => e.date === todayIso())
    .reduce((sum, e) => sum + e.totalHours, 0)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Today's activity</CardTitle>
        {totalToday > 0 && (
          <span className="text-sm font-medium tabular-nums text-muted-foreground">
            {totalToday.toFixed(1)}h total
          </span>
        )}
      </CardHeader>
      <CardContent className="divide-y">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Clock in to start today's record.
          </p>
        ) : (
          sorted.map(entry => {
            const bothOnSite = entry.clockInLocation.onSite && entry.clockOutLocation.onSite
            return (
              <IconRow
                key={entry.id}
                icon={TimerIcon}
                title={dateFormatter.format(new Date(entry.date))}
                subtitle={
                  <>
                    {entry.clockIn} → {entry.clockOut} · {entry.totalHours}h ·{' '}
                    {locationSummary(entry.clockInLocation, entry.clockOutLocation)}
                  </>
                }
                trailing={
                  <Badge variant={bothOnSite ? 'success' : 'secondary'}>
                    {bothOnSite ? 'On-site' : 'Off-site'}
                  </Badge>
                }
              />
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
