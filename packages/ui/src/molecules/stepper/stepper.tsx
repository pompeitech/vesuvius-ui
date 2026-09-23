import { CheckIcon, XIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type StepStatus = 'upcoming' | 'active' | 'completed' | 'error'

export type StepperStep = {
  title: string
  description?: string
  status?: StepStatus
}

export type StepperProps = HTMLAttributes<HTMLDivElement> & {
  steps: StepperStep[]
  activeStep: number
  orientation?: 'horizontal' | 'vertical'
  onStepClick?: (index: number) => void
}

function getStatus(step: StepperStep, index: number, activeStep: number): StepStatus {
  if (step.status) return step.status
  if (index < activeStep) return 'completed'
  if (index === activeStep) return 'active'
  return 'upcoming'
}

const CIRCLE_CLASSES: Record<StepStatus, string> = {
  upcoming: 'border-muted-foreground/30 bg-background text-muted-foreground',
  active: 'border-primary bg-primary text-primary-foreground',
  completed: 'border-primary bg-primary text-primary-foreground',
  error: 'border-destructive bg-destructive text-destructive-foreground'
}

const CONNECTOR_CLASSES: Record<StepStatus, string> = {
  upcoming: 'bg-muted-foreground/30',
  active: 'bg-muted-foreground/30',
  completed: 'bg-primary',
  error: 'bg-muted-foreground/30'
}

function StepCircle({ status, index }: { status: StepStatus; index: number }) {
  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
        CIRCLE_CLASSES[status]
      )}
    >
      {status === 'completed' ? (
        <CheckIcon className="size-4" />
      ) : status === 'error' ? (
        <XIcon className="size-4" />
      ) : (
        index + 1
      )}
    </span>
  )
}

function StepLabel({
  step,
  status,
  align
}: {
  step: StepperStep
  status: StepStatus
  align: 'center' | 'start'
}) {
  return (
    <span className={cn('flex flex-col', align === 'center' && 'items-center text-center')}>
      <span
        className={cn(
          'text-sm font-medium',
          status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
        )}
      >
        {step.title}
      </span>
      {step.description && (
        <span className="text-muted-foreground text-xs">{step.description}</span>
      )}
    </span>
  )
}

function StepButton({
  clickable,
  onClick,
  status,
  className,
  children
}: {
  clickable: boolean
  onClick?: () => void
  status: StepStatus
  className?: string
  children: ReactNode
}) {
  if (!clickable) {
    return (
      <div role="tab" aria-selected={status === 'active'} className={className}>
        {children}
      </div>
    )
  }
  return (
    <button
      type="button"
      role="tab"
      aria-selected={status === 'active'}
      onClick={onClick}
      className={cn(
        'focus-visible:ring-ring cursor-pointer rounded-sm bg-transparent p-0 text-left outline-none focus-visible:ring-2',
        className
      )}
    >
      {children}
    </button>
  )
}

export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  onStepClick,
  className,
  ...props
}: StepperProps) {
  const clickable = Boolean(onStepClick)

  if (orientation === 'vertical') {
    return (
      <div
        data-slot="stepper"
        role="tablist"
        aria-orientation="vertical"
        className={cn('flex flex-col', className)}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStatus(step, index, activeStep)
          const isLast = index === steps.length - 1
          return (
            // One role="tab" per step, not two (was: icon-only tab had no name).
            <div key={step.title} className="flex gap-3">
              <StepButton
                clickable={clickable}
                onClick={() => onStepClick?.(index)}
                status={status}
                className="flex gap-3 text-left"
              >
                <div className="flex flex-col items-center">
                  <StepCircle status={status} index={index} />
                  {!isLast && (
                    <div
                      className={cn('my-1 w-0.5 flex-1', CONNECTOR_CLASSES[status])}
                      style={{ minHeight: 24 }}
                    />
                  )}
                </div>
                <div className={cn('pt-1 pb-6', isLast && 'pb-0')}>
                  <StepLabel step={step} status={status} align="start" />
                </div>
              </StepButton>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      data-slot="stepper"
      role="tablist"
      aria-orientation="horizontal"
      className={cn('flex w-full items-start', className)}
      {...props}
    >
      {steps.map((step, index) => {
        const status = getStatus(step, index, activeStep)
        const isLast = index === steps.length - 1
        return (
          <div key={step.title} className={cn('flex items-center', !isLast && 'flex-1')}>
            <StepButton
              clickable={clickable}
              onClick={() => onStepClick?.(index)}
              status={status}
              className="flex flex-col items-center"
            >
              <StepCircle status={status} index={index} />
              <div className="mt-2">
                <StepLabel step={step} status={status} align="center" />
              </div>
            </StepButton>
            {!isLast && (
              <div className={cn('mx-2 mt-4 h-0.5 flex-1 self-start', CONNECTOR_CLASSES[status])} />
            )}
          </div>
        )
      })}
    </div>
  )
}
