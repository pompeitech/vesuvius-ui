import type { Event, Issue } from '@pompeitech/mock-data'
import { DayCell } from './day-cell'
import type { MonthGridDay } from './utils'

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type MonthGridProps = {
  weeks: MonthGridDay[][]
  issuesByDate: Map<string, Issue[]>
  onOpenIssue: (issue: Issue) => void
  /** Only passed by the Calendar page. */
  eventsByDate?: Map<string, Event[]>
  onOpenEvent?: (event: Event) => void
  onCreateEvent?: (date: Date) => void
}

export function MonthGrid({
  weeks,
  issuesByDate,
  onOpenIssue,
  eventsByDate,
  onOpenEvent,
  onCreateEvent
}: MonthGridProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {WEEKDAY_LABELS.map(label => (
          <div key={label} className="p-2 text-center text-xs font-medium text-muted-foreground">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {weeks.flatMap(week =>
          week.map(day => (
            <DayCell
              key={day.iso}
              day={day}
              issues={issuesByDate.get(day.iso) ?? []}
              onOpenIssue={onOpenIssue}
              events={eventsByDate?.get(day.iso) ?? []}
              onOpenEvent={onOpenEvent}
              onCreateEvent={onCreateEvent}
            />
          ))
        )}
      </div>
    </div>
  )
}
