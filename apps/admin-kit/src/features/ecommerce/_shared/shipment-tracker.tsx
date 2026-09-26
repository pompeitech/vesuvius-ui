import type { ShipmentStatus } from '@pompeitech/mock-data'
import { cn } from '@pompeitech/vesuvius-ui'
import { TriangleAlertIcon } from 'lucide-react'
import { buildShipmentTrackerSteps } from './shipment-tracker-steps'

/** Compact icon-step tracker for the Shipments list table's "Shipment Event" column. */
export function ShipmentEventTracker({ status }: { status: ShipmentStatus }) {
  const steps = buildShipmentTrackerSteps(status)

  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center">
          <span
            title={step.failed ? `${step.label} — exception` : step.label}
            className={cn(
              'flex size-5 items-center justify-center rounded-full border',
              step.failed
                ? 'border-destructive bg-destructive/10 text-destructive'
                : step.done
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted text-muted-foreground'
            )}
          >
            {step.failed ? (
              <TriangleAlertIcon className="size-3" />
            ) : (
              <step.icon className="size-3" />
            )}
          </span>
          {i < steps.length - 1 && (
            <span
              className={cn(
                'h-px w-4 shrink-0',
                step.done && !step.failed ? 'bg-primary' : 'bg-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/** Larger labeled stepper with per-segment progress bars, for the Shipment Detail route card. */
export function ShipmentProgressTracker({ status }: { status: ShipmentStatus }) {
  const steps = buildShipmentTrackerSteps(status)

  return (
    <div className="grid grid-cols-4 gap-3">
      {steps.map(step => (
        <div key={step.key} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-full border',
                step.failed
                  ? 'border-destructive bg-destructive/10 text-destructive'
                  : step.done
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-muted-foreground'
              )}
            >
              {step.failed ? (
                <TriangleAlertIcon className="size-3.5" />
              ) : (
                <step.icon className="size-3.5" />
              )}
            </span>
            <span
              className={cn(
                'text-xs font-medium',
                !step.done && !step.failed && 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
          <div
            className={cn(
              'h-1.5 rounded-full',
              step.failed ? 'bg-destructive' : step.done ? 'bg-primary' : 'bg-border'
            )}
          />
        </div>
      ))}
    </div>
  )
}
