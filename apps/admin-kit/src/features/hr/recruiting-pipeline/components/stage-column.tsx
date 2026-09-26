import type { Candidate, CandidateStage } from '@pompeitech/mock-data'
import { Badge, cn } from '@pompeitech/vesuvius-ui'
import { useDroppable } from '@dnd-kit/core'
import { CandidateCard } from './candidate-card'

type StageColumnProps = {
  stage: CandidateStage
  label: string
  candidates: Candidate[]
}

/** One pipeline stage — a drop target for candidate cards dragged in from another column. */
export function StageColumn({ stage, label, candidates }: StageColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex h-full w-64 shrink-0 flex-col gap-2 rounded-md border bg-muted/30 p-3 transition-colors',
        isOver && 'border-primary bg-primary/5'
      )}
    >
      <div className="flex shrink-0 items-center justify-between px-1">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant="secondary">{candidates.length}</Badge>
      </div>
      <div className="min-h-16 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  )
}
