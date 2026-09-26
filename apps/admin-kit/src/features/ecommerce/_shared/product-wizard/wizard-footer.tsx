import { Button } from '@pompeitech/vesuvius-ui'

type WizardFooterProps = {
  activeStep: number
  totalSteps: number
  stepTitle: string
  mode: 'add' | 'edit'
  onPrevious: () => void
  onNext: () => void
}

/** Bottom nav bar: current step label plus Previous/Next (Next becomes Save on the last step). */
export function WizardFooter({
  activeStep,
  totalSteps,
  stepTitle,
  mode,
  onPrevious,
  onNext
}: WizardFooterProps) {
  const isLastStep = activeStep === totalSteps - 1

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-t pt-4">
      <span className="text-sm">
        <span className="font-medium">Step {activeStep + 1}</span>{' '}
        <span className="text-muted-foreground">{stepTitle}</span>
      </span>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" disabled={activeStep === 0} onClick={onPrevious}>
          Previous
        </Button>
        <Button type="button" onClick={onNext}>
          {isLastStep ? (mode === 'add' ? 'Save Product' : 'Update product') : 'Next'}
        </Button>
      </div>
    </div>
  )
}
