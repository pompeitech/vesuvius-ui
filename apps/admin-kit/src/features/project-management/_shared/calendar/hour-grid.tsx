import type { Event } from '@pompeitech/mock-data'
import { cn } from '@pompeitech/vesuvius-ui'
import type { MouseEvent } from 'react'
import { EventBlock } from './event-block'
import { isoDate } from './utils'

const HOUR_START = 8
const HOUR_END = 20
const HOUR_HEIGHT = 48
const GRID_HEIGHT = (HOUR_END - HOUR_START) * HOUR_HEIGHT
const TOTAL_MINUTES = (HOUR_END - HOUR_START) * 60

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

function minutesSinceStart(date: Date): number {
  return (date.getHours() - HOUR_START) * 60 + date.getMinutes()
}

function hourLabel(hour: number): string {
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}${hour < 12 ? 'am' : 'pm'}`
}

type HourGridProps = {
  /** 7 days for Week, 1 for Day. */
  days: Date[]
  events: Event[]
  onOpenEvent: (event: Event) => void
  onCreateEvent: (start: Date, end: Date) => void
}

/**
 * A simple 08:00–20:00 hour grid — Week is 7 columns, Day is 1. Events are
 * absolutely positioned by `top`/`height` computed from their time-of-day
 * fraction of the visible window. Deliberately no overlap-layout algorithm
 * (concurrent events just visually overlap) and no "current time" line —
 * scope cuts called out in the plan, acceptable for a demo calendar.
 */
export function HourGrid({ days, events, onOpenEvent, onCreateEvent }: HourGridProps) {
  const hours = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
  const todayIso = isoDate(new Date())

  function handleColumnClick(day: Date, mouseEvent: MouseEvent<HTMLDivElement>) {
    const rect = mouseEvent.currentTarget.getBoundingClientRect()
    const offsetY = mouseEvent.clientY - rect.top
    const hour = Math.max(
      HOUR_START,
      Math.min(HOUR_END - 1, Math.floor(HOUR_START + offsetY / HOUR_HEIGHT))
    )
    const start = new Date(day)
    start.setHours(hour, 0, 0, 0)
    onCreateEvent(start, new Date(start.getTime() + 60 * 60_000))
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div
        className="grid border-b bg-muted/30"
        style={{ gridTemplateColumns: `56px repeat(${days.length}, 1fr)` }}
      >
        <div />
        {days.map(day => (
          <div key={day.toISOString()} className="p-2 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              {WEEKDAY_FORMATTER.format(day)}
            </p>
            <p className={cn('text-sm font-semibold', isoDate(day) === todayIso && 'text-primary')}>
              {day.getDate()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex overflow-y-auto" style={{ maxHeight: 560 }}>
        <div className="w-14 shrink-0 border-r">
          {hours.map(hour => (
            <div
              key={hour}
              style={{ height: HOUR_HEIGHT }}
              className="flex items-start justify-end border-b px-1.5 pt-0.5"
            >
              <span className="text-[10px] text-muted-foreground">{hourLabel(hour)}</span>
            </div>
          ))}
        </div>

        <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}>
          {days.map(day => {
            const dayIso = isoDate(day)
            const dayEvents = events.filter(event => isoDate(new Date(event.start)) === dayIso)
            return (
              <div
                key={dayIso}
                role="button"
                tabIndex={0}
                className="relative cursor-pointer border-r last:border-r-0"
                style={{ height: GRID_HEIGHT }}
                onClick={mouseEvent => handleColumnClick(day, mouseEvent)}
                onKeyDown={keyEvent => {
                  if (
                    (keyEvent.key !== 'Enter' && keyEvent.key !== ' ') ||
                    keyEvent.target !== keyEvent.currentTarget
                  )
                    return
                  const start = new Date(day)
                  start.setHours(9, 0, 0, 0)
                  onCreateEvent(start, new Date(start.getTime() + 60 * 60_000))
                }}
              >
                {hours.map(hour => (
                  <div key={hour} style={{ height: HOUR_HEIGHT }} className="border-b" />
                ))}
                {dayEvents.map(event => {
                  const startMin = Math.max(
                    0,
                    Math.min(TOTAL_MINUTES, minutesSinceStart(new Date(event.start)))
                  )
                  const endMin = Math.max(
                    0,
                    Math.min(TOTAL_MINUTES, minutesSinceStart(new Date(event.end)))
                  )
                  const top = (startMin / 60) * HOUR_HEIGHT
                  const height = Math.max(20, ((endMin - startMin) / 60) * HOUR_HEIGHT)
                  return (
                    <EventBlock
                      key={event.id}
                      event={event}
                      onClick={() => onOpenEvent(event)}
                      style={{ top, height }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
