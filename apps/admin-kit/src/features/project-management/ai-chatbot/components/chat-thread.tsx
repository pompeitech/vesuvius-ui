import type { AiChatMessage } from '@pompeitech/mock-data'
import { Button, Textarea, cn } from '@pompeitech/vesuvius-ui'
import { BotIcon, SendIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type ChatThreadProps = {
  messages: AiChatMessage[]
  isTyping: boolean
  onSend: (prompt: string) => void
}

/** A "typing" bubble — three dots with staggered `animate-bounce` delays, no library. Exists to make the ~1s simulated delay before a canned reply feel like something is happening, not a stall. */
function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export function ChatThread({ messages, isTyping, onSend }: ChatThreadProps) {
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, isTyping])

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onSend(trimmed)
    setDraft('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <BotIcon className="size-4 text-primary" />
        <span className="text-sm font-medium">Assistant</span>
        <span className="text-xs text-muted-foreground">· simulated, not a real model</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {messages.map(message => {
            const mine = message.role === 'user'
            return (
              <div key={message.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
                    mine
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-bl-sm bg-muted'
                  )}
                >
                  {message.body}
                </div>
              </div>
            )
          })}
          {isTyping && <TypingBubble />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex items-end gap-2 border-t p-2">
        <Textarea
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
          placeholder="Message the assistant..."
          className="min-h-10 resize-none"
        />
        <Button size="icon" disabled={!draft.trim()} onClick={handleSend} aria-label="Send">
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
