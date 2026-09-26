import type { Issue } from '@pompeitech/mock-data'
import { cn } from '@pompeitech/vesuvius-ui'
import { useDraggable } from '@dnd-kit/core'
import { ISSUE_TYPE_COLOR_CLASS, ISSUE_TYPE_ICON } from '../format'

type IssueChipProps = {
  issue: Issue
  onClick: () => void
  /** Compact = calendar day cell (icon + key only). Default = unscheduled panel row (also shows the title). */
  compact?: boolean
  /** Shown as a trailing muted label — only passed by cross-project consumers (the global Calendar) where it's not obvious which project a chip belongs to. */
  projectName?: string
}

/** A small draggable issue chip — used both inside a calendar day cell and in the "Unscheduled tickets" panel, same `@dnd-kit` `useDraggable` pattern as the board's `IssueCard`. */
export function IssueChip({ issue, onClick, compact = false, projectName }: IssueChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id
  })
  const TypeIcon = ISSUE_TYPE_ICON[issue.type]

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      style={
        transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
      }
      onClick={onClick}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') onClick()
      }}
      className={cn(
        'flex min-w-0 cursor-grab touch-none items-center gap-1.5 rounded border bg-card px-1.5 py-1 text-xs shadow-sm transition-colors hover:border-primary/40 active:cursor-grabbing',
        isDragging && 'z-10 opacity-50'
      )}
    >
      <TypeIcon className={cn('size-3 shrink-0', ISSUE_TYPE_COLOR_CLASS[issue.type])} />
      <span className="shrink-0 font-medium text-muted-foreground">{issue.key}</span>
      {/* `min-w-0 flex-1` so this is the one thing that actually gives up
          space — without it, a long, non-shrinking `projectName` (below)
          starves this down to 0px and the title just vanishes instead of
          truncating (reproduced live: every row showed key+project only). */}
      {!compact && <span className="min-w-0 flex-1 truncate">{issue.title}</span>}
      {projectName && (
        <span className="max-w-20 shrink-0 truncate text-[10px] text-muted-foreground">
          {projectName}
        </span>
      )}
    </div>
  )
}
