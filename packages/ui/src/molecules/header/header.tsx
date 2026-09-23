import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

export function Header({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      data-slot="header"
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur',
        className
      )}
      {...props}
    />
  )
}

export function HeaderStart({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-start"
      className={cn('flex min-w-0 items-center gap-2', className)}
      {...props}
    />
  )
}

export function HeaderEnd({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="header-end" className={cn('flex items-center gap-2', className)} {...props} />
  )
}
