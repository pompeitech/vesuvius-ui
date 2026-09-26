import type { Candidate } from '@pompeitech/mock-data'
import { cn, UserAvatar } from '@pompeitech/vesuvius-ui'
import { useDraggable } from '@dnd-kit/core'
import { StarIcon } from 'lucide-react'

/** One draggable candidate card — drop it on another stage column to move them through the pipeline. */
export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: candidate.id
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={
        transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
      }
      className={cn(
        'cursor-grab touch-none rounded-md border bg-card p-3 shadow-sm active:cursor-grabbing',
        isDragging && 'z-10 opacity-50'
      )}
    >
      <div className="flex items-center gap-2">
        <UserAvatar name={candidate.name} src={candidate.avatarUrl} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{candidate.name}</p>
          <p className="truncate text-xs text-muted-foreground">{candidate.source}</p>
        </div>
      </div>
      {candidate.rating !== undefined && (
        <div className="mt-2 flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={cn(
                'size-3',
                i < candidate.rating! ? 'fill-warning text-warning' : 'text-muted-foreground/30'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
