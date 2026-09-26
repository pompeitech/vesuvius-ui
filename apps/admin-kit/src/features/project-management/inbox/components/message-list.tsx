import type { Message } from '@pompeitech/mock-data'
import { Card, CardContent } from '@pompeitech/vesuvius-ui'
import { MessageListRow } from './message-list-row'

type MessageListProps = {
  messages: Message[]
  selectedId: string | undefined
  isSentView: boolean
  onSelect: (message: Message) => void
  onToggleStar: (message: Message) => void
}

export function MessageList({
  messages,
  selectedId,
  isSentView,
  onSelect,
  onToggleStar
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-1 py-16 text-center">
          <p className="text-sm font-medium">Nothing here</p>
          <p className="text-sm text-muted-foreground">This folder is empty.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border">
      {messages.map(message => (
        <MessageListRow
          key={message.id}
          message={message}
          isSelected={message.id === selectedId}
          isSentView={isSentView}
          onSelect={() => onSelect(message)}
          onToggleStar={() => onToggleStar(message)}
        />
      ))}
    </div>
  )
}
