import type { Event, EventColor, Member } from '@pompeitech/mock-data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  cn,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  MultiSelect,
  Textarea
} from '@pompeitech/vesuvius-ui'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { EVENT_COLOR_DOT_CLASS, EVENT_COLOR_OPTIONS } from '../../_shared/format'

function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function toTimeValue(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function combine(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const result = new Date(date)
  result.setHours(hours ?? 0, minutes ?? 0, 0, 0)
  return result
}

type EventDialogProps = {
  open: boolean
  /** Present = editing; absent = creating a new one. */
  event?: Event
  /** Pre-fills the date/time when opened from a calendar-slot click. */
  initialStart?: Date
  initialEnd?: Date
  members: Member[]
  onOpenChange: (open: boolean) => void
  onSave: (event: Event) => void
  onDelete?: (eventId: string) => void
}

/** Create/edit an `Event` — a plain local-state form (not `useZodForm`, given the mix of date + two time inputs + multi-select + color swatches doesn't map cleanly onto that pattern) remounted per-open via the `key` in `CalendarEventDialog` below. */
export function EventDialog({
  open,
  event,
  initialStart,
  initialEnd,
  members,
  onOpenChange,
  onSave,
  onDelete
}: EventDialogProps) {
  const startSeed = event ? new Date(event.start) : (initialStart ?? new Date())
  const endSeed = event
    ? new Date(event.end)
    : (initialEnd ?? new Date(startSeed.getTime() + 60 * 60_000))

  const [title, setTitle] = useState(event?.title ?? '')
  const [date, setDate] = useState<Date | undefined>(toDateOnly(startSeed))
  const [startTime, setStartTime] = useState(toTimeValue(startSeed))
  const [endTime, setEndTime] = useState(toTimeValue(endSeed))
  const [description, setDescription] = useState(event?.description ?? '')
  const [location, setLocation] = useState(event?.location ?? '')
  const [attendeeIds, setAttendeeIds] = useState<string[]>(event?.attendeeIds ?? [])
  const [color, setColor] = useState<EventColor>(event?.color ?? 'default')
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const handleSave = () => {
    if (!title.trim() || !date) return
    const start = combine(date, startTime)
    const end = combine(date, endTime)
    onSave({
      id: event?.id ?? crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      start: start.toISOString(),
      end: (end.getTime() > start.getTime()
        ? end
        : new Date(start.getTime() + 30 * 60_000)
      ).toISOString(),
      location: location.trim() || undefined,
      attendeeIds: attendeeIds.length > 0 ? attendeeIds : undefined,
      color,
      createdAt: event?.createdAt ?? new Date().toISOString()
    })
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{event ? 'Edit event' : 'Create event'}</DialogTitle>
            <DialogDescription>
              {event
                ? "Update this event's details."
                : 'Add a meeting or reminder to the calendar — independent of any ticket.'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event title"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <DatePicker value={date} onChange={setDate} className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Start time</Label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>End time</Label>
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Meeting room, video call link..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Attendees</Label>
              <MultiSelect
                options={members.map(member => ({
                  value: member.id,
                  label: member.name
                }))}
                value={attendeeIds}
                onValueChange={setAttendeeIds}
                placeholder="No attendees"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Color</Label>
              <div className="flex gap-2">
                {EVENT_COLOR_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.label}
                    onClick={() => setColor(option.value)}
                    className={cn(
                      'ring-offset-background size-6 rounded-full ring-offset-2 transition-shadow',
                      EVENT_COLOR_DOT_CLASS[option.value],
                      color === option.value && 'ring-foreground ring-2'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            {event && onDelete ? (
              <Button
                variant="outline"
                className="text-destructive"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                <TrashIcon /> Delete
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!title.trim() || !date}>
                {event ? 'Save changes' : 'Create event'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {event && onDelete && (
        <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete "{event.title}"?</AlertDialogTitle>
              <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(event.id)
                  setConfirmDeleteOpen(false)
                  onOpenChange(false)
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
