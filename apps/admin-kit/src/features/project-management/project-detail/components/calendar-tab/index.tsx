import { updateIssue, type Issue } from '@pompeitech/mock-data'
import { Button, toast } from '@pompeitech/vesuvius-ui'
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { MonthGrid } from '../../../_shared/calendar/month-grid'
import {
  addMonths,
  buildMonthGrid,
  isoDate,
  monthLabel,
  parseIsoDate,
  startOfMonth
} from '../../../_shared/calendar/utils'
import { UnscheduledPanel } from './unscheduled-panel'

const dueDateToastFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

type CalendarTabProps = {
  issues: Issue[]
  onIssuesChange: (updater: (prev: Issue[]) => Issue[]) => void
  onOpenIssue: (issue: Issue) => void
}

/** Month view + a searchable "unscheduled tickets" side panel — drag a ticket onto a day to set its due date, same `@dnd-kit` `DndContext` pattern as the Board. */
export function CalendarTab({ issues, onIssuesChange, onOpenIssue }: CalendarTabProps) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [search, setSearch] = useState('')
  // See board-tab.tsx's identical sensors setup — without this, a plain
  // click on a chip (to open the issue) gets swallowed as a zero-distance drag.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const weeks = buildMonthGrid(month)

  const unscheduled = issues.filter(
    issue =>
      !issue.dueDate && `${issue.key} ${issue.title}`.toLowerCase().includes(search.toLowerCase())
  )

  // Grouped by the *local* calendar day of each issue's `dueDate` — the
  // same `isoDate()` the grid cells themselves use, so a chip always lands
  // under the cell its date actually reads as, regardless of viewer timezone.
  const issuesByDate = new Map<string, Issue[]>()
  for (const issue of issues) {
    if (!issue.dueDate) continue
    const key = isoDate(new Date(issue.dueDate))
    const existing = issuesByDate.get(key)
    if (existing) existing.push(issue)
    else issuesByDate.set(key, [issue])
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const issue = issues.find(i => i.id === active.id)
    if (!issue) return

    // `over.id` is a cell's local-day iso string; parsing it back through
    // `parseIsoDate` (local components, not a UTC-parsed literal) and only
    // then serializing keeps the stored instant tied to the same local day
    // the chip was dropped on, in any timezone.
    const droppedDate = parseIsoDate(over.id as string)
    const dueDate = droppedDate.toISOString()
    const updatedAt = new Date().toISOString()
    updateIssue(issue.id, { dueDate, updatedAt })
    onIssuesChange(prev => prev.map(i => (i.id === issue.id ? { ...i, dueDate, updatedAt } : i)))
    toast.success(`${issue.key} scheduled for ${dueDateToastFormatter.format(droppedDate)}.`)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMonth(prev => addMonths(prev, -1))}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="min-w-36 text-sm font-medium">{monthLabel(month)}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMonth(prev => addMonths(prev, 1))}
          >
            <ChevronRightIcon />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setMonth(startOfMonth(new Date()))}>
            Today
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
          <MonthGrid weeks={weeks} issuesByDate={issuesByDate} onOpenIssue={onOpenIssue} />
          <UnscheduledPanel
            issues={unscheduled}
            search={search}
            onSearchChange={setSearch}
            onOpenIssue={onOpenIssue}
          />
        </div>
      </div>
    </DndContext>
  )
}
