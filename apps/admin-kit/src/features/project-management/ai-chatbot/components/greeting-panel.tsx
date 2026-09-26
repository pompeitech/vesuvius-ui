import { AI_TOPICS } from '@pompeitech/mock-data'
import { Button, Textarea, Typography } from '@pompeitech/vesuvius-ui'
import { SendIcon, SparklesIcon } from 'lucide-react'
import { useState } from 'react'
import { timeOfDayGreeting } from '../utils'

type GreetingPanelProps = {
  userFirstName: string
  onSend: (prompt: string) => void
}

/** The empty state — greeting, prompt box, and one suggestion chip per topic the canned engine actually recognizes (so every chip leads to a real, on-topic reply). */
export function GreetingPanel({ userFirstName, onSend }: GreetingPanelProps) {
  const [draft, setDraft] = useState('')

  const handleSend = (prompt: string) => {
    const trimmed = prompt.trim()
    if (!trimmed) return
    onSend(trimmed)
    setDraft('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center gap-6 rounded-md border p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <SparklesIcon className="size-8 text-primary" />
        <Typography as="h2" variant="h3">
          {timeOfDayGreeting()}, {userFirstName}!
        </Typography>
        <Typography variant="muted">How can I assist you today?</Typography>
      </div>

      <div className="flex w-full max-w-xl flex-col gap-2">
        <div className="flex items-end gap-2">
          <Textarea
            value={draft}
            onChange={event => setDraft(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                handleSend(draft)
              }
            }}
            placeholder="Ask me anything about tickets, orders, timesheets, your calendar, or the team..."
            className="min-h-16 resize-none"
          />
          <Button
            size="icon"
            disabled={!draft.trim()}
            onClick={() => handleSend(draft)}
            aria-label="Send"
          >
            <SendIcon />
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {AI_TOPICS.map(topic => (
            <Button
              key={topic.id}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSend(topic.prompt)}
            >
              {topic.prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
