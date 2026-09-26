import { Button, Progress, Stepper, type StepperStep } from '@pompeitech/vesuvius-ui'

type WizardSidebarProps = {
  completedCount: number
  totalSteps: number
  draftSaved: boolean
  steps: StepperStep[]
  activeStep: number
  onStepClick: (index: number) => void
  onReset: () => void
}

/** Right rail: overall progress bar, the vertical step list, and a reset action. */
export function WizardSidebar({
  completedCount,
  totalSteps,
  draftSaved,
  steps,
  activeStep,
  onStepClick,
  onReset
}: WizardSidebarProps) {
  const progressPct = (completedCount / totalSteps) * 100

  return (
    <div className="flex min-h-0 flex-col gap-4 overflow-y-auto rounded-lg border p-4">
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="font-medium">{Math.round(progressPct)}%</span>
        </div>
        <Progress value={progressPct} className="mt-2" />
        <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {completedCount} of {totalSteps} steps complete
          </span>
          <span>{draftSaved ? 'Draft saved' : 'Not saved yet'}</span>
        </div>
      </div>

      <Stepper
        steps={steps}
        activeStep={activeStep}
        orientation="vertical"
        onStepClick={onStepClick}
        className="mt-2"
      />

      <Button type="button" variant="outline" className="mt-auto" onClick={onReset}>
        Reset draft
      </Button>
    </div>
  )
}
