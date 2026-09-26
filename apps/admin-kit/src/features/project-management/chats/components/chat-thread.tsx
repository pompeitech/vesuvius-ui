import type { ChatMessage, Member } from '@pompeitech/mock-data'
import { Button, Input, cn } from '@pompeitech/vesuvius-ui'
import { SendIcon } from 'lucide-react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { dayLabel, isOnline } from '../utils'
import { PresenceAvatar } from './presence-avatar'

type ChatThreadProps = {
  member: Member
  messages: ChatMessage[]
  onSend: (body: string) => void
}

export function ChatThread({ member, messages, onSend }: ChatThreadProps) {
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const online = isOnline(member.id)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  const handleSend = () => {
    const body = draft.trim()
    if (!body) return
    onSend(body)
    setDraft('')
  }

  // Precomputed here (not mutated during the render loop below) so each
  // message knows whether it starts a new day-separator — `reduce` into a
  // fresh array each time, peeking at the last entry already built
  // instead of reassigning a tracking variable.
  const withDayLabels = useMemo(
    () =>
      messages.reduce<{ message: ChatMessage; label: string; showDayLabel: boolean }[]>(
        (acc, message) => {
          const label = dayLabel(message.createdAt)
          const previousLabel = acc[acc.length - 1]?.label
          return [...acc, { message, label, showDayLabel: label !== previousLabel }]
        },
        []
      ),
    [messages]
  )

  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <PresenceAvatar name={member.name} src={member.avatarUrl} online={online} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{member.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {online ? 'Online' : 'Offline'} · {member.role}
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Say hi to {member.name.split(' ')[0]}!
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {withDayLabels.map(({ message, label, showDayLabel }) => {
              const mine = message.senderId === 'me'
              return (
                <Fragment key={message.id}>
                  {showDayLabel && (
                    <div className="my-2 flex items-center justify-center">
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  )}
                  <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[70%] rounded-2xl px-3.5 py-2 text-sm',
                        mine
                          ? 'rounded-br-sm bg-primary text-primary-foreground'
                          : 'rounded-bl-sm bg-muted'
                      )}
                    >
                      {message.body}
                      <span
                        className={cn(
                          'mt-1 block text-right text-[10px]',
                          mine ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}
                      >
                        {new Date(message.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </Fragment>
              )
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t p-2">
        <Input
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
          placeholder={`Message ${member.name.split(' ')[0]}...`}
        />
        <Button size="icon" disabled={!draft.trim()} onClick={handleSend} aria-label="Send">
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}
