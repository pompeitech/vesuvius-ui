import { Button, cn } from '@pompeitech/vesuvius-ui'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { addMonths, buildMonthGrid, monthLabel } from './utils'

const WEEKDAY_INITIALS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

type MiniMonthProps = {
  month: Date
  selectedIso?: string
  onSelectDate: (date: Date) => void
  onMonthChange: (month: Date) => void
}

/** A compact month picker for the Calendar sidebar — same grid math as the main view (`buildMonthGrid`), just smaller and without any event/ticket content. */
export function MiniMonth({ month, selectedIso, onSelectDate, onMonthChange }: MiniMonthProps) {
  const weeks = buildMonthGrid(month)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{monthLabel(month)}</span>
        <div className="flex gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={() => onMonthChange(addMonths(month, -1))}
          >
            <ChevronLeftIcon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={() => onMonthChange(addMonths(month, 1))}
          >
            <ChevronRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {WEEKDAY_INITIALS.map((letter, index) => (
          <span key={`${letter}-${index}`} className="text-[10px] text-muted-foreground">
            {letter}
          </span>
        ))}
        {weeks.flatMap(week =>
          week.map(day => (
            <button
              key={day.iso}
              type="button"
              onClick={() => onSelectDate(day.date)}
              className={cn(
                'flex size-6 items-center justify-center justify-self-center rounded-full text-xs hover:bg-muted',
                !day.isCurrentMonth && 'text-muted-foreground/50',
                day.isToday && 'font-semibold text-primary',
                day.iso === selectedIso && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {day.dayOfMonth}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
