import type { Shipment } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { dateTimeFormatter } from '../../_shared/format'

/** Vertical dotted-line timeline of status updates — same visual pattern as PM Dashboard 4's `CriticalPathCard`. */
export function ActivityCard({ shipment }: { shipment: Shipment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {shipment.activity.map((event, i) => (
            <li key={`${event.title}-${event.timestamp}`} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 size-2.5 shrink-0 rounded-full ${
                    i === shipment.activity.length - 1 ? 'bg-primary' : 'bg-muted-foreground/40'
                  }`}
                />
                {i < shipment.activity.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="flex flex-col gap-0.5 pb-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-medium">{event.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {dateTimeFormatter.format(new Date(event.timestamp))}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                {event.location && (
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
