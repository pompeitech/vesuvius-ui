import type { Shift } from '@pompeitech/mock-data'
import { cn, Tooltip, TooltipContent, TooltipTrigger } from '@pompeitech/vesuvius-ui'

const STATUS_CLASS: Record<Shift['status'], string> = {
  scheduled: 'bg-info/20 text-info',
  completed: 'bg-success/20 text-success',
  cancelled: 'bg-muted text-muted-foreground line-through'
}

/** One employee×day cell on the Shifts grid — a shift is always a single day, so no bar/split logic like the absence calendar needs. */
export function ShiftCell({ shift }: { shift: Shift | undefined }) {
  if (!shift) return <td className="h-14 border-t border-l" />

  return (
    <td className="h-14 border-t border-l p-1.5 align-middle">
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex h-8 w-full cursor-default items-center justify-center rounded-md text-xs font-medium',
              STATUS_CLASS[shift.status]
            )}
          >
            {shift.startTime}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="font-medium">
            {shift.startTime}-{shift.endTime}
          </p>
          <p className="opacity-80">
            {shift.location} · <span className="capitalize">{shift.status}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </td>
  )
}
