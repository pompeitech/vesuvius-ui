import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const helperTextVariants = cva('flex items-start gap-1.5 text-sm', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      info: 'text-info-emphasis',
      success: 'text-success-emphasis',
      warning: 'text-warning-emphasis',
      error: 'text-destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const VARIANT_ICONS = {
  default: undefined,
  info: InfoIcon,
  success: CheckCircle2Icon,
  warning: TriangleAlertIcon,
  error: AlertCircleIcon
} as const

export type FormHelperTextProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof helperTextVariants> & {
    showIcon?: boolean
  }

export function FormHelperText({
  variant,
  showIcon = true,
  className,
  children,
  ...props
}: FormHelperTextProps) {
  const Icon = variant ? VARIANT_ICONS[variant] : undefined

  return (
    <p
      data-slot="form-helper-text"
      className={cn(helperTextVariants({ variant }), className)}
      {...props}
    >
      {showIcon && Icon && <Icon className="mt-0.5 size-3.5 shrink-0" />}
      <span>{children}</span>
    </p>
  )
}
