import type { Absence } from '@pompeitech/mock-data'
import { cn, Tooltip, TooltipContent, TooltipTrigger } from '@pompeitech/vesuvius-ui'
import {
  ABSENCE_STATUS_VARIANT,
  ABSENCE_TYPE_CELL_CLASS,
  ABSENCE_TYPE_ICON,
  ABSENCE_TYPE_LABEL
} from '../../_shared/format'

type DayCellProps = {
  /** Every absence that overlaps this specific day, for one employee. */
  absences: Absence[]
  /** "YYYY-MM-DD" for the day this cell renders. */
  day: string
}

/** One absence's tooltip line — reused by every cell shape below. */
function AbsenceSummary({ absence }: { absence: Absence }) {
  return (
    <div>
      <p className="font-medium">{ABSENCE_TYPE_LABEL[absence.type]}</p>
      <p className="opacity-80">
        {absence.startTime
          ? `${absence.startTime}-${absence.endTime}`
          : `${absence.startDate} → ${absence.endDate}`}
        {' · '}
        <span
          className={cn(
            'capitalize',
            ABSENCE_STATUS_VARIANT[absence.status] === 'destructive' && 'text-destructive'
          )}
        >
          {absence.status}
        </span>
      </p>
    </div>
  )
}

type PillProps = {
  absence: Absence
  /** Only the whole-cell case rounds both corners; a half-cell segment only rounds its own outer corner. */
  rounding: 'both' | 'left' | 'right' | 'none'
  overflowCount?: number
}

/** A single colored, icon-labeled block — full width (one absence, or the bar-continuation cells of a multi-day span) or half width (one side of a split half-day cell). */
function Pill({ absence, rounding, overflowCount }: PillProps) {
  const Icon = ABSENCE_TYPE_ICON[absence.type]
  return (
    <div
      className={cn(
        'relative flex h-8 flex-1 items-center justify-center',
        ABSENCE_TYPE_CELL_CLASS[absence.type],
        rounding === 'both' && 'rounded-md',
        rounding === 'left' && 'rounded-l-md',
        rounding === 'right' && 'rounded-r-md'
      )}
    >
      <Icon className="size-4" />
      {!!overflowCount && (
        <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
          +{overflowCount}
        </span>
      )}
    </div>
  )
}

/**
 * One employee×day cell — four shapes depending on what's scheduled:
 *
 * 1. Nothing → empty.
 * 2. Two complementary half-day absences (e.g. morning smart working +
 *    afternoon permit) → the cell splits into two colored halves, one per
 *    side, each with its own icon and its own tooltip.
 * 3. One half-day absence with nothing on the other half → a single
 *    half-width block on the correct side, the rest of the cell empty.
 * 4. Everything else (a full-day/multi-day absence, or several that aren't
 *    a clean half+half pair) → the original full-width pill, rounded only
 *    on the first/last day of a multi-day span so it reads as one
 *    continuous bar across adjacent cells, with a "+N" badge and a tooltip
 *    listing every absence when there's more than one.
 */
export function DayCell({ absences, day }: DayCellProps) {
  if (absences.length === 0) return <td className="h-14 border-t border-l" />

  const halfDay = absences.filter(
    a => a.dayPart !== 'full' && a.startDate === day && a.endDate === day
  )
  const morning = halfDay.find(a => a.dayPart === 'morning')
  const afternoon = halfDay.find(a => a.dayPart === 'afternoon')

  // Case 2: a clean morning+afternoon pair, and nothing else that day.
  if (morning && afternoon && absences.length === 2) {
    return (
      <td className="h-14 border-t border-l p-1.5 align-middle">
        <div className="flex h-8 gap-px">
          <Tooltip>
            <TooltipTrigger asChild>
              <Pill absence={morning} rounding="left" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <AbsenceSummary absence={morning} />
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pill absence={afternoon} rounding="right" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <AbsenceSummary absence={afternoon} />
            </TooltipContent>
          </Tooltip>
        </div>
      </td>
    )
  }

  // Case 3: exactly one half-day absence, the other half of the day free.
  const [half] = halfDay
  if (half && halfDay.length === 1 && absences.length === 1) {
    return (
      <td className="h-14 border-t border-l p-1.5 align-middle">
        <div className="flex h-8 gap-px">
          {half.dayPart === 'afternoon' && <div className="flex-1" />}
          <Tooltip>
            <TooltipTrigger asChild>
              <Pill absence={half} rounding={half.dayPart === 'morning' ? 'left' : 'right'} />
            </TooltipTrigger>
            <TooltipContent side="top">
              <AbsenceSummary absence={half} />
            </TooltipContent>
          </Tooltip>
          {half.dayPart === 'morning' && <div className="flex-1" />}
        </div>
      </td>
    )
  }

  // Case 4: the original full-width pill (single/multi-day, or an
  // untidy multi-absence day) with the bar-continuation border/padding
  // trick and a "+N" badge for anything past the first absence.
  const [primary] = absences
  if (!primary) return <td className="h-14 border-t border-l" />
  const isStart = primary.startDate === day
  const isEnd = primary.endDate === day

  return (
    <td
      className={cn(
        'h-14 border-t py-1.5 align-middle',
        isStart ? 'border-l pl-1.5' : 'pl-0',
        isEnd ? 'pr-1.5' : 'pr-0'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex h-8 w-full">
            <Pill
              absence={primary}
              rounding={isStart && isEnd ? 'both' : isStart ? 'left' : isEnd ? 'right' : 'none'}
              overflowCount={absences.length - 1}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex flex-col gap-2 py-2">
          {absences.map(absence => (
            <AbsenceSummary key={absence.id} absence={absence} />
          ))}
        </TooltipContent>
      </Tooltip>
    </td>
  )
}
