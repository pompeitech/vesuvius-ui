import { Badge, Button, cn } from '@pompeitech/vesuvius-ui'
import { InboxIcon, PenSquareIcon, SendIcon, StarIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type InboxView = 'inbox' | 'starred' | 'sent' | 'drafts'

const FOLDERS: { id: InboxView; label: string; icon: LucideIcon }[] = [
  { id: 'inbox', label: 'Inbox', icon: InboxIcon },
  { id: 'starred', label: 'Starred', icon: StarIcon },
  { id: 'sent', label: 'Sent', icon: SendIcon },
  { id: 'drafts', label: 'Drafts', icon: PenSquareIcon }
]

type FolderNavProps = {
  active: InboxView
  onSelect: (view: InboxView) => void
  counts: Record<InboxView, number>
  onCompose: () => void
}

/** The Gmail-style left rail — Compose, then folders with unread/total counts. "Starred" is a cross-folder filter, not a real folder, same as Gmail's own. */
export function FolderNav({ active, onSelect, counts, onCompose }: FolderNavProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button className="w-full" onClick={onCompose}>
        <PenSquareIcon /> Compose
      </Button>
      <nav className="flex flex-col gap-0.5">
        {FOLDERS.map(folder => {
          const Icon = folder.icon
          const count = counts[folder.id]
          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => onSelect(folder.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                active === folder.id && 'bg-muted font-medium'
              )}
            >
              <Icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-left">{folder.label}</span>
              {count > 0 && (
                <Badge variant={folder.id === 'inbox' ? 'default' : 'secondary'}>{count}</Badge>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
