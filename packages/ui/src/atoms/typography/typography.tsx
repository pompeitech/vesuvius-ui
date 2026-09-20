import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '../../lib/utils'
import {
  TYPOGRAPHY_DEFAULT_TAG,
  type TypographyVariant,
  typographyVariants
} from './typography.variants'

export type TypographyProps<T extends ElementType = 'p'> = {
  variant?: TypographyVariant
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

export function Typography<T extends ElementType = 'p'>({
  variant = 'p',
  as,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? TYPOGRAPHY_DEFAULT_TAG[variant ?? 'p']) as ElementType

  return (
    <Component
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}
