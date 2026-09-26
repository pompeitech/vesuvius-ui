import {
  CANDIDATES,
  DEPARTMENTS,
  JOB_OPENINGS,
  type Candidate,
  type CandidateStage,
  type JobOpening
} from '@pompeitech/mock-data'
import { Typography, toast } from '@pompeitech/vesuvius-ui'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { StageColumn } from './components/stage-column'

const STAGES: { value: CandidateStage; label: string }[] = [
  { value: 'applied', label: 'Applied' },
  { value: 'phone_screen', label: 'Phone Screen' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' }
]

const STAGE_LABEL = new Map(STAGES.map(s => [s.value, s.label]))

export async function loader({ params }: LoaderFunctionArgs) {
  const jobOpening = JOB_OPENINGS.find(j => j.id === params.jobId)
  if (!jobOpening) {
    throw new Response('Job opening not found', { status: 404 })
  }
  const department = DEPARTMENTS.find(d => d.id === jobOpening.departmentId)
  return {
    jobOpening,
    departmentName: department?.name ?? 'Unassigned',
    candidates: CANDIDATES.filter(c => c.jobOpeningId === jobOpening.id)
  }
}

export function Component() {
  const {
    jobOpening,
    departmentName,
    candidates: initialCandidates
  } = useLoaderData() as {
    jobOpening: JobOpening
    departmentName: string
    candidates: Candidate[]
  }
  const [candidates, setCandidates] = useState(initialCandidates)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const newStage = over.id as CandidateStage
    const candidate = candidates.find(c => c.id === active.id)
    if (!candidate || candidate.stage === newStage) return

    setCandidates(prev => prev.map(c => (c.id === candidate.id ? { ...c, stage: newStage } : c)))
    toast.success(`${candidate.name} moved to ${STAGE_LABEL.get(newStage)}.`)
  }

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-104px)]">
      <div className="lg:shrink-0">
        <Typography as="h1" variant="h3">
          {jobOpening.title}
        </Typography>
        <Typography variant="muted">
          {departmentName} · {jobOpening.location} · {candidates.length} candidates
        </Typography>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-2 lg:min-h-0 lg:flex-1">
          {STAGES.map(stage => (
            <StageColumn
              key={stage.value}
              stage={stage.value}
              label={stage.label}
              candidates={candidates.filter(c => c.stage === stage.value)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}
