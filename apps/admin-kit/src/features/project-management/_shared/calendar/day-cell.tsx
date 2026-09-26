import type { Event, Issue } from '@pompeitech/mock-data'
import { cn } from '@pompeitech/vesuvius-ui'
import { useDroppable } from '@dnd-kit/core'
import type { MouseEvent } from 'react'
import { EventBlock } from './event-block'
import { IssueChip } from './issue-chip'
import type { MonthGridDay } from './utils'

const MAX_VISIBLE = 3

type DayCellProps = {
  day: MonthGridDay
  issues: Issue[]
  onOpenIssue: (issue: Issue) => void
  /** Only passed by the Calendar page (not the per-project tab, which has no notion of events). */
  events?: Event[]
  onOpenEvent?: (event: Event) => void
  /** Click on the cell's empty background (not on a chip/block) — opens "Create event" pre-filled with this day. */
  onCreateEvent?: (date: Date) => void
}

/** One calendar cell — a drop target (`id` = its ISO date) for tickets dragged in from the unscheduled panel or another day, and (when `events` is passed) a click target for creating a new event on this day. */
export function DayCell({
  day,
  issues,
  onOpenIssue,
  events = [],
  onOpenEvent,
  onCreateEvent
}: DayCellProps) {
  const { setNodeRef, isOver } = useDroppable({ id: day.iso })
  const eventsToShow = events.slice(0, MAX_VISIBLE)
  const issuesToShow = issues.slice(0, Math.max(0, MAX_VISIBLE - eventsToShow.length))
  const overflow = events.length - eventsToShow.length + (issues.length - issuesToShow.length)

  function handleCellClick(mouseEvent: MouseEvent<HTMLDivElement>) {
    if (mouseEvent.target === mouseEvent.currentTarget) onCreateEvent?.(day.date)
  }

  return (
    <div
      ref={setNodeRef}
      onClick={handleCellClick}
      role={onCreateEvent ? 'button' : undefined}
      tabIndex={onCreateEvent ? 0 : undefined}
      onKeyDown={
        onCreateEvent
          ? keyEvent => {
              if (
                (keyEvent.key === 'Enter' || keyEvent.key === ' ') &&
                keyEvent.target === keyEvent.currentTarget
              ) {
                onCreateEvent(day.date)
              }
            }
          : undefined
      }
      className={cn(
        'flex min-h-24 flex-col gap-1 border-r border-b p-1.5 last:border-r-0',
        !day.isCurrentMonth && 'bg-muted/20',
        isOver && 'bg-primary/5',
        onCreateEvent && 'cursor-pointer'
      )}
    >
      <span
        className={cn(
          'text-xs',
          day.isToday
            ? 'flex size-5 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground'
            : day.isCurrentMonth
              ? 'text-foreground'
              : 'text-muted-foreground'
        )}
      >
        {day.dayOfMonth}
      </span>
      <div className="flex flex-col gap-1">
        {eventsToShow.map(event => (
          <EventBlock key={event.id} event={event} compact onClick={() => onOpenEvent?.(event)} />
        ))}
        {issuesToShow.map(issue => (
          <IssueChip key={issue.id} issue={issue} compact onClick={() => onOpenIssue(issue)} />
        ))}
        {overflow > 0 && (
          <span className="px-1 text-[10px] text-muted-foreground">+{overflow} more</span>
        )}
      </div>
    </div>
  )
}
