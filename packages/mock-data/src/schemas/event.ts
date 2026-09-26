import { z } from 'zod'

/** Matches `Badge`'s own variant names, so the calendar's color dot can reuse the same semantic palette everywhere else in this kit already does. */
export const eventColorSchema = z.enum([
  'default',
  'success',
  'warning',
  'info',
  'destructive',
  'highlight'
])
export type EventColor = z.infer<typeof eventColorSchema>

/** A calendar event — independent of `Issue`, unlike a ticket's `dueDate` this is created directly on the Calendar (a meeting, a reminder), the way Google Calendar events aren't tied to any task tracker. */
export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  start: z.string(),
  end: z.string(),
  location: z.string().optional(),
  attendeeIds: z.array(z.string()).optional(),
  color: eventColorSchema.optional(),
  createdAt: z.string()
})

export type Event = z.infer<typeof eventSchema>
