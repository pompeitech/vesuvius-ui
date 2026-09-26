import type { ChatMessage } from '@pompeitech/mock-data'

/**
 * A tiny deterministic string hash → a stable "random" number in [0, 1).
 * Same pattern already used in `hr/team-status/simulate.ts` and
 * `hr/location-map/utils.ts` — kept as a local per-feature copy, same
 * convention.
 */
function seededRandom(seed: string): number {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

/** Simulated presence — no real connection behind this, just a stable per-member coin flip (~60% online). */
export function isOnline(memberId: string): boolean {
  return seededRandom(`${memberId}:online`) < 0.6
}

export function messagesFor(conversationId: string, messages: ChatMessage[]): ChatMessage[] {
  return messages.filter(m => m.conversationId === conversationId)
}

export function lastMessageFor(
  conversationId: string,
  messages: ChatMessage[]
): ChatMessage | undefined {
  const thread = messagesFor(conversationId, messages)
  return thread[thread.length - 1]
}

export function unreadCountFor(conversationId: string, messages: ChatMessage[]): number {
  return messagesFor(conversationId, messages).filter(m => m.senderId !== 'me' && !m.read).length
}

const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

/** A short relative timestamp for the conversation list ("2h", "Yesterday", "Mon") — compact, unlike Inbox's full `relativeTime()`. */
export function shortRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffMinutes = Math.round(diffMs / 60_000)
  if (diffMinutes < 1) return 'Now'
  if (diffMinutes < 60) return relativeFormatter.format(-diffMinutes, 'minute')
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return relativeFormatter.format(-diffHours, 'hour')
  const diffDays = Math.round(diffHours / 24)
  if (diffDays < 7) return relativeFormatter.format(-diffDays, 'day')
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** A day-separator label for the thread ("Today", "Yesterday", or a date). */
export function dayLabel(iso: string): string {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()
  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: date.getFullYear() === today.getFullYear() ? undefined : 'numeric'
  })
}
