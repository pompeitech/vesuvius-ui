import type { ChatMessage, Conversation, Member } from '@pompeitech/mock-data'
import { Badge, cn } from '@pompeitech/vesuvius-ui'
import { isOnline, lastMessageFor, shortRelativeTime, unreadCountFor } from '../utils'
import { PresenceAvatar } from './presence-avatar'

type ConversationListRowProps = {
  conversation: Conversation
  member: Member
  messages: ChatMessage[]
  isSelected: boolean
  onSelect: () => void
}

/** One row in the conversation list — avatar with a presence dot, name, last-message preview, relative time, unread badge. */
export function ConversationListRow({
  conversation,
  member,
  messages,
  isSelected,
  onSelect
}: ConversationListRowProps) {
  const last = lastMessageFor(conversation.id, messages)
  const unread = unreadCountFor(conversation.id, messages)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 border-b px-3 py-2.5 text-left transition-colors hover:bg-muted/50',
        isSelected && 'bg-muted'
      )}
    >
      <PresenceAvatar name={member.name} src={member.avatarUrl} online={isOnline(member.id)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('truncate text-sm', unread > 0 && 'font-semibold')}>
            {member.name}
          </span>
          {last && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {shortRelativeTime(last.createdAt)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              'min-w-0 flex-1 truncate text-xs text-muted-foreground',
              unread > 0 && 'font-medium text-foreground'
            )}
          >
            {last ? (last.senderId === 'me' ? `You: ${last.body}` : last.body) : 'No messages yet'}
          </p>
          {unread > 0 && (
            <Badge variant="default" className="shrink-0">
              {unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  )
}
