import type { Message } from '@pompeitech/mock-data'
import { UserAvatar, cn } from '@pompeitech/vesuvius-ui'
import { StarIcon } from 'lucide-react'
import { relativeTime } from '../utils'

type MessageListRowProps = {
  message: Message
  isSelected: boolean
  isSentView: boolean
  onSelect: () => void
  onToggleStar: () => void
}

/** One Gmail-style row — unread is bold, star toggles independently of selecting the row. */
export function MessageListRow({
  message,
  isSelected,
  isSentView,
  onSelect,
  onToggleStar
}: MessageListRowProps) {
  const personName = isSentView ? message.toName : message.fromName

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 border-b px-3 py-2.5 text-left transition-colors hover:bg-muted/50',
        isSelected && 'bg-muted',
        !message.read && 'bg-muted/30'
      )}
    >
      <UserAvatar name={personName || '?'} size="sm" />
      <button
        type="button"
        aria-label={message.starred ? 'Unstar' : 'Star'}
        onClick={event => {
          event.stopPropagation()
          onToggleStar()
        }}
        className="shrink-0 text-muted-foreground hover:text-warning"
      >
        <StarIcon className={cn('size-4', message.starred && 'fill-warning text-warning')} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('truncate text-sm', !message.read && 'font-semibold')}>
            {personName || '(no recipient)'}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {relativeTime(message.createdAt)}
          </span>
        </div>
        <p className={cn('truncate text-sm', !message.read && 'font-medium')}>
          {message.subject || '(no subject)'}
        </p>
        <p className="truncate text-xs text-muted-foreground">{message.snippet}</p>
      </div>
    </button>
  )
}
