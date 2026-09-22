import * as TogglePrimitive from '@radix-ui/react-toggle'
import type { VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { toggleVariants } from './toggle.variants'

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

export const Toggle = forwardRef<ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      data-size={size ?? 'default'}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Toggle.displayName = 'Toggle'
