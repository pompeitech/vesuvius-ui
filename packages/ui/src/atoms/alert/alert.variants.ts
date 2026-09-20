import { cva } from 'class-variance-authority'

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: '',
        destructive: '[&_[data-slot=alert-title]]:text-destructive [&>svg]:text-destructive',
        success: '[&_[data-slot=alert-title]]:text-success-emphasis [&>svg]:text-success-emphasis',
        warning: '[&_[data-slot=alert-title]]:text-warning-emphasis [&>svg]:text-warning-emphasis',
        info: '[&_[data-slot=alert-title]]:text-info-emphasis [&>svg]:text-info-emphasis',
        highlight:
          '[&_[data-slot=alert-title]]:text-highlight-emphasis [&>svg]:text-highlight-emphasis'
      },
      appearance: {
        outline: 'bg-card',
        soft: 'border-transparent'
      }
    },
    compoundVariants: [
      { variant: 'default', appearance: 'soft', className: 'bg-muted' },
      {
        variant: 'destructive',
        appearance: 'soft',
        className: 'bg-destructive/10'
      },
      { variant: 'success', appearance: 'soft', className: 'bg-success/10' },
      { variant: 'warning', appearance: 'soft', className: 'bg-warning/10' },
      { variant: 'info', appearance: 'soft', className: 'bg-info/10' },
      {
        variant: 'highlight',
        appearance: 'soft',
        className: 'bg-highlight/10'
      }
    ],
    defaultVariants: {
      variant: 'default',
      appearance: 'outline'
    }
  }
)
