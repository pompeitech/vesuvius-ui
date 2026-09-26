import {
  addEvent,
  deleteEvent,
  getEvents,
  getIssues,
  getMembers,
  getProjects,
  updateEvent,
  updateIssue,
  type Event,
  type Issue,
  type Member,
  type Project
} from '@pompeitech/mock-data'
import { Button, ToggleGroup, ToggleGroupItem, Typography, toast } from '@pompeitech/vesuvius-ui'
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { HourGrid } from '../_shared/calendar/hour-grid'
import { MiniMonth } from '../_shared/calendar/mini-month'
import { MonthGrid } from '../_shared/calendar/month-grid'
import {
  addDays,
  buildMonthGrid,
  isoDate,
  parseIsoDate,
  startOfMonth,
  startOfWeek
} from '../_shared/calendar/utils'
import { EventDialog } from './components/event-dialog'
import { UnscheduledPanel } from './components/unscheduled-panel'

const dueDateToastFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const weekRangeFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const dayLabelFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})

type ViewMode = 'month' | 'week' | 'day'

type DialogState = { event?: Event; initialStart?: Date; initialEnd?: Date }

export async function loader() {
  const [issues, projects, members, events] = await Promise.all([
    getIssues({ pageSize: 1000 }),
    getProjects({ pageSize: 200 }),
    getMembers({ pageSize: 200 }),
    getEvents({ pageSize: 200 })
  ])
  return {
    issues: issues.data,
    projects: projects.data,
    members: members.data,
    events: events.data
  }
}

/**
 * A Google-Calendar-style calendar — Month/Week/Day views, a "Create"
 * button and click-on-a-slot both open the same `EventDialog`. Events are
 * a genuinely independent entity (`Event`, `packages/mock-data`), not
 * derived from ticket due dates — those still show alongside as draggable
 * chips (unchanged mechanics from the per-project Calendar tab), but
 * creating/editing/deleting an `Event` never touches an `Issue`.
 */
export function Component() {
  const {
    issues: initialIssues,
    projects,
    members,
    events: initialEvents
  } = useLoaderData() as {
    issues: Issue[]
    projects: Project[]
    members: Member[]
    events: Event[]
  }
  const [issues, setIssues] = useState(initialIssues)
  const [events, setEvents] = useState(initialEvents)
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [anchorDate, setAnchorDate] = useState(() => new Date())
  const [search, setSearch] = useState('')
  const [dialogState, setDialogState] = useState<DialogState | null>(null)
  const navigate = useNavigate()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const projectsById = useMemo(
    () => new Map(projects.map(project => [project.id, project])),
    [projects]
  )
  const getProjectName = (issue: Issue) => projectsById.get(issue.projectId)?.name ?? '—'

  const unscheduled = issues.filter(
    issue =>
      !issue.dueDate && `${issue.key} ${issue.title}`.toLowerCase().includes(search.toLowerCase())
  )

  const issuesByDate = new Map<string, Issue[]>()
  for (const issue of issues) {
    if (!issue.dueDate) continue
    const key = isoDate(new Date(issue.dueDate))
    const existing = issuesByDate.get(key)
    if (existing) existing.push(issue)
    else issuesByDate.set(key, [issue])
  }

  const eventsByDate = new Map<string, Event[]>()
  for (const event of events) {
    const key = isoDate(new Date(event.start))
    const existing = eventsByDate.get(key)
    if (existing) existing.push(event)
    else eventsByDate.set(key, [event])
  }

  function handleDragEnd(dragEvent: DragEndEvent) {
    const { active, over } = dragEvent
    if (!over) return
    const issue = issues.find(i => i.id === active.id)
    if (!issue) return

    // Ticket drag-and-drop is only wired up on the Month grid's day cells
    // (`over.id` is always that cell's local-day iso string) — Week/Day's
    // hour grid has no droppable zones, only click-to-create for `Event`s.
    const droppedDate = parseIsoDate(String(over.id))
    const dueDate = droppedDate.toISOString()
    const updatedAt = new Date().toISOString()
    updateIssue(issue.id, { dueDate, updatedAt })
    setIssues(prev => prev.map(i => (i.id === issue.id ? { ...i, dueDate, updatedAt } : i)))
    toast.success(`${issue.key} scheduled for ${dueDateToastFormatter.format(droppedDate)}.`)
  }

  const handleOpenIssue = (issue: Issue) => navigate(`/project-management/issue-detail/${issue.id}`)

  const handleSaveEvent = (event: Event) => {
    const isNew = !events.some(e => e.id === event.id)
    if (isNew) {
      addEvent(event)
      setEvents(prev => [event, ...prev])
      toast.success(`"${event.title}" created.`)
    } else {
      updateEvent(event.id, event)
      setEvents(prev => prev.map(e => (e.id === event.id ? event : e)))
      toast.success(`"${event.title}" updated.`)
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId)
    setEvents(prev => prev.filter(e => e.id !== eventId))
    toast.success('Event deleted.')
  }

  const days = useMemo(() => {
    if (viewMode === 'day') return [anchorDate]
    if (viewMode === 'week')
      return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(anchorDate), i))
    return []
  }, [viewMode, anchorDate])

  const headerLabel = useMemo(() => {
    if (viewMode === 'day') return dayLabelFormatter.format(anchorDate)
    if (viewMode === 'week') {
      const start = startOfWeek(anchorDate)
      const end = addDays(start, 6)
      return `${weekRangeFormatter.format(start)} – ${weekRangeFormatter.format(end)}, ${end.getFullYear()}`
    }
    return anchorDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }, [viewMode, anchorDate])

  function navigateBy(delta: number) {
    if (viewMode === 'day') setAnchorDate(prev => addDays(prev, delta))
    else if (viewMode === 'week') setAnchorDate(prev => addDays(prev, delta * 7))
    else setAnchorDate(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
        <div className="flex flex-wrap items-start justify-between gap-4 lg:shrink-0">
          <div>
            <Typography as="h1" variant="h3">
              Calendar
            </Typography>
            <Typography variant="muted">Events and ticket due dates, all in one place.</Typography>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={viewMode}
            onValueChange={value => value && setViewMode(value as ViewMode)}
          >
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-2 lg:shrink-0">
          <Button variant="outline" size="icon" onClick={() => navigateBy(-1)}>
            <ChevronLeftIcon />
          </Button>
          <span className="min-w-48 text-sm font-medium">{headerLabel}</span>
          <Button variant="outline" size="icon" onClick={() => navigateBy(1)}>
            <ChevronRightIcon />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAnchorDate(new Date())}>
            Today
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[220px_1fr_280px]">
          <div className="flex flex-col gap-4 lg:h-full lg:min-h-0 lg:overflow-y-auto">
            <Button className="w-full" onClick={() => setDialogState({})}>
              <PlusIcon /> Create
            </Button>
            <MiniMonth
              month={startOfMonth(anchorDate)}
              selectedIso={isoDate(anchorDate)}
              onSelectDate={date => setAnchorDate(date)}
              onMonthChange={month => setAnchorDate(month)}
            />
          </div>

          <div className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
            {viewMode === 'month' ? (
              <MonthGrid
                weeks={buildMonthGrid(startOfMonth(anchorDate))}
                issuesByDate={issuesByDate}
                onOpenIssue={handleOpenIssue}
                eventsByDate={eventsByDate}
                onOpenEvent={event => setDialogState({ event })}
                onCreateEvent={date => {
                  const start = new Date(date)
                  start.setHours(9, 0, 0, 0)
                  setDialogState({
                    initialStart: start,
                    initialEnd: new Date(start.getTime() + 60 * 60_000)
                  })
                }}
              />
            ) : (
              <HourGrid
                days={days}
                events={events}
                onOpenEvent={event => setDialogState({ event })}
                onCreateEvent={(start, end) =>
                  setDialogState({ initialStart: start, initialEnd: end })
                }
              />
            )}
          </div>

          <div className="lg:h-full lg:min-h-0 lg:overflow-y-auto">
            <UnscheduledPanel
              issues={unscheduled}
              search={search}
              onSearchChange={setSearch}
              onOpenIssue={handleOpenIssue}
              getProjectName={getProjectName}
            />
          </div>
        </div>
      </div>

      {dialogState && (
        <EventDialog
          key={dialogState.event?.id ?? 'new'}
          open
          event={dialogState.event}
          initialStart={dialogState.initialStart}
          initialEnd={dialogState.initialEnd}
          members={members}
          onOpenChange={open => !open && setDialogState(null)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </DndContext>
  )
}
