import { useState, type ReactNode } from 'react'
import { Button } from '../../atoms/button/button'
import { cn } from '../../lib/utils'
import { Stepper, type StepperStep } from '../../molecules/stepper/stepper'
import { useControllableState } from '../../hooks/use-controllable-state'

export type WizardStep = StepperStep & {
  content: ReactNode
  validate?: () => boolean | Promise<boolean>
}

export type WizardProps = {
  steps: WizardStep[]
  activeStep?: number
  defaultActiveStep?: number
  onStepChange?: (index: number) => void
  onFinish?: () => void
  orientation?: 'horizontal' | 'vertical'
  allowStepClick?: boolean
  nextLabel?: string
  backLabel?: string
  finishLabel?: string
  className?: string
}

export function Wizard({
  steps,
  activeStep: activeStepProp,
  defaultActiveStep = 0,
  onStepChange,
  onFinish,
  orientation = 'horizontal',
  allowStepClick = true,
  nextLabel = 'Next',
  backLabel = 'Back',
  finishLabel = 'Finish',
  className
}: WizardProps) {
  const [activeStep, setActiveStep] = useControllableState({
    value: activeStepProp,
    defaultValue: defaultActiveStep,
    onChange: onStepChange
  })
  const [validating, setValidating] = useState(false)
  const [furthestVisited, setFurthestVisited] = useState(defaultActiveStep)

  const isFirst = activeStep === 0
  const isLast = activeStep === steps.length - 1
  const current = steps[activeStep]

  const goTo = (index: number) => {
    setActiveStep(index)
    setFurthestVisited(prev => Math.max(prev, index))
  }

  const handleNext = async () => {
    if (!current) return
    if (current.validate) {
      setValidating(true)
      const valid = await current.validate()
      setValidating(false)
      if (!valid) return
    }
    if (isLast) {
      onFinish?.()
      return
    }
    goTo(activeStep + 1)
  }

  const handleBack = () => {
    if (!isFirst) goTo(activeStep - 1)
  }

  return (
    <div data-slot="wizard" className={cn('flex flex-col gap-6', className)}>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        orientation={orientation}
        onStepClick={
          allowStepClick
            ? index => {
                if (index <= furthestVisited) goTo(index)
              }
            : undefined
        }
      />

      <div data-slot="wizard-content">{current?.content}</div>

      <div className="flex items-center justify-between gap-2 border-t pt-4">
        <Button type="button" variant="outline" onClick={handleBack} disabled={isFirst}>
          {backLabel}
        </Button>
        <Button type="button" onClick={handleNext} disabled={validating}>
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  )
}
