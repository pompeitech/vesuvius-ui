import type { AiConversation } from '@pompeitech/mock-data'
import { Button, cn } from '@pompeitech/vesuvius-ui'
import { PenSquareIcon } from 'lucide-react'
import { groupByRecency } from '../utils'

type HistorySidebarProps = {
  conversations: AiConversation[]
  activeId: string | undefined
  onSelect: (conversationId: string) => void
  onNewChat: () => void
}

/** Today/Yesterday/Previous grouped chat history, same shape as the reference's sidebar. */
export function HistorySidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat
}: HistorySidebarProps) {
  const groups = groupByRecency(conversations)

  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="border-b p-2">
        <Button variant="outline" className="w-full" onClick={onNewChat}>
          <PenSquareIcon /> New chat
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {groups.length === 0 && (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">
            No conversations yet.
          </p>
        )}
        {groups.map(({ group, conversations: items }) => (
          <div key={group} className="mb-3">
            <p className="px-2 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {group}
            </p>
            {items.map(conversation => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={cn(
                  'block w-full truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted',
                  conversation.id === activeId && 'bg-muted font-medium'
                )}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
