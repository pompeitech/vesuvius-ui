import type { AiConversation } from '@pompeitech/mock-data'

export type RecencyGroup = 'Today' | 'Yesterday' | 'Previous'

const GROUP_ORDER: RecencyGroup[] = ['Today', 'Yesterday', 'Previous']

function recencyOf(iso: string): RecencyGroup {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()
  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, yesterday)) return 'Yesterday'
  return 'Previous'
}

/** Buckets conversations into the three groups the history sidebar shows, newest first within each — a coarser, 3-bucket sibling of Chats' per-day `dayLabel` (that one labels every distinct day; this one only cares about today/yesterday/everything else). */
export function groupByRecency(
  conversations: AiConversation[]
): { group: RecencyGroup; conversations: AiConversation[] }[] {
  const sorted = [...conversations].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return GROUP_ORDER.map(group => ({
    group,
    conversations: sorted.filter(c => recencyOf(c.createdAt) === group)
  })).filter(bucket => bucket.conversations.length > 0)
}

/** A time-of-day-aware greeting, like the reference site's "Good Morning, {Name}!". */
export function timeOfDayGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}
