import type { ChatMessage, Conversation, Member } from '@pompeitech/mock-data'
import { Button, Input } from '@pompeitech/vesuvius-ui'
import { PenSquareIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { lastMessageFor } from '../utils'
import { ConversationListRow } from './conversation-list-row'

type ConversationListProps = {
  conversations: Conversation[]
  membersById: Map<string, Member>
  messages: ChatMessage[]
  selectedId: string | undefined
  onSelect: (conversationId: string) => void
  onNewChat: () => void
}

export function ConversationList({
  conversations,
  membersById,
  messages,
  selectedId,
  onSelect,
  onNewChat
}: ConversationListProps) {
  const [search, setSearch] = useState('')

  const sorted = useMemo(() => {
    const query = search.trim().toLowerCase()
    return conversations
      .filter(
        c => !query || (membersById.get(c.memberId)?.name.toLowerCase().includes(query) ?? false)
      )
      .sort((a, b) => {
        const aTime = lastMessageFor(a.id, messages)?.createdAt ?? a.createdAt
        const bTime = lastMessageFor(b.id, messages)?.createdAt ?? b.createdAt
        return bTime.localeCompare(aTime)
      })
  }, [conversations, membersById, messages, search])

  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="flex flex-col gap-2 border-b p-2">
        <Button variant="outline" className="w-full" onClick={onNewChat}>
          <PenSquareIcon /> New chat
        </Button>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {sorted.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">No conversations found.</p>
        ) : (
          sorted.map(conversation => {
            const member = membersById.get(conversation.memberId)
            if (!member) return null
            return (
              <ConversationListRow
                key={conversation.id}
                conversation={conversation}
                member={member}
                messages={messages}
                isSelected={conversation.id === selectedId}
                onSelect={() => onSelect(conversation.id)}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
