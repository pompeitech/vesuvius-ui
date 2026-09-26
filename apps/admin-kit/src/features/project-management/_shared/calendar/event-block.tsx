import type { Event } from '@pompeitech/mock-data'
import { cn } from '@pompeitech/vesuvius-ui'
import type { CSSProperties } from 'react'
import { EVENT_COLOR_CLASS, timeFormatter } from '../format'

type EventBlockProps = {
  event: Event
  onClick: () => void
  /** Compact = a small pill inside a month-view day cell (title only). Default = a time-sized block inside the hour grid. */
  compact?: boolean
  style?: CSSProperties
}

/** A calendar event, rendered either as a small month-cell pill or a positioned hour-grid block — never draggable (unlike `IssueChip`), see the Calendar plan's scope cut. */
export function EventBlock({ event, onClick, compact = false, style }: EventBlockProps) {
  return (
    <button
      type="button"
      onClick={clickEvent => {
        clickEvent.stopPropagation()
        onClick()
      }}
      style={style}
      className={cn(
        'min-w-0 truncate rounded border px-1.5 py-0.5 text-left text-xs font-medium transition-opacity hover:opacity-80',
        EVENT_COLOR_CLASS[event.color ?? 'default'],
        compact ? 'w-full' : 'absolute inset-x-0.5 overflow-hidden'
      )}
    >
      <span className="truncate">{event.title}</span>
      {!compact && (
        <span className="block truncate text-[10px] opacity-80">
          {timeFormatter.format(new Date(event.start))}
        </span>
      )}
    </button>
  )
}
