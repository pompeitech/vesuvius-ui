/**
 * A small "canned" response engine — keyword-matched against a fixed set
 * of topics, not a real language model. This kit has no backend, so the
 * AI Chatbot page is honest about being simulated rather than pretending
 * to be a real assistant: the same handful of on-topic replies every
 * time, plus a fallback for anything unrecognized. Lives in `generators/`
 * (not the web app) so the seeded chat history and the live UI answer
 * with the exact same logic and never contradict each other.
 */
export type AiTopic = {
  id: string
  /** The example prompt shown as a suggestion chip, and what the seeded history uses as a first message. */
  prompt: string
  keywords: string[]
  response: string
}

export const AI_TOPICS: AiTopic[] = [
  {
    id: 'tickets',
    prompt: 'Summarize my open tickets',
    keywords: ['ticket', 'issue', 'bug', 'backlog', 'sprint'],
    response:
      'You\'ve got a handful of open tickets across your active projects — most are in the "In Progress" column, with a couple flagged high priority. Check the Kanban board or a project\'s Issues tab for the full breakdown.'
  },
  {
    id: 'orders',
    prompt: 'How many orders shipped this week?',
    keywords: ['order', 'shipment', 'shipped', 'revenue', 'sales'],
    response:
      'Order volume has been trending up this week, with most fulfillment coming through the Online and In-Store channels. Head to Orders → Order List for the exact numbers and a per-channel breakdown.'
  },
  {
    id: 'timesheet',
    prompt: 'Draft a standup update',
    keywords: ['standup', 'timesheet', 'hours', 'log', 'update'],
    response:
      'Here\'s a starting point: "Yesterday I worked on my assigned tickets and logged my hours in the Timesheet. Today I\'m continuing on the same project, no blockers." Tweak it to match what you actually worked on!'
  },
  {
    id: 'calendar',
    prompt: "What's on my calendar today?",
    keywords: ['calendar', 'meeting', 'schedule', 'event', 'agenda'],
    response:
      "You've likely got a mix of meetings and project deadlines today — the Calendar page shows everything on your plate, with Month/Week/Day views if you want to zoom in."
  },
  {
    id: 'team',
    prompt: "Who's out of office today?",
    keywords: ['team', 'out of office', 'leave', "who's", 'vacation', 'pto'],
    response:
      "A few teammates usually have approved time off at any given point — the Team Status board under HR shows who's in, remote, or away right now, live."
  }
]

const FALLBACK_RESPONSE =
  "I'm a simulated assistant in this demo — there's no real model behind me, just canned answers on a few topics. I can talk about tickets, orders, timesheets, your calendar, or the team; try one of the suggestions below!"

/** Keyword match against `AI_TOPICS`, case-insensitive substring — first match wins, otherwise the honest fallback. */
export function matchAiResponse(prompt: string): string {
  const needle = prompt.toLowerCase()
  const topic = AI_TOPICS.find(t => t.keywords.some(keyword => needle.includes(keyword)))
  return topic?.response ?? FALLBACK_RESPONSE
}
