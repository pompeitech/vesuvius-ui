import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  dividers?: boolean
}

export function List({ className, dividers = false, ...props }: ListProps) {
  return (
    <ul
      data-slot="list"
      data-dividers={dividers ? 'true' : undefined}
      className={cn(
        'w-full',
        dividers && '[&>[data-slot=list-item]+[data-slot=list-item]]:border-t',
        className
      )}
      {...props}
    />
  )
}

export type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  leading?: ReactNode
  trailing?: ReactNode
  dense?: boolean
}

export function ListItem({
  children,
  className,
  dense = false,
  leading,
  trailing,
  ...props
}: ListItemProps) {
  return (
    <li
      data-slot="list-item"
      data-dense={dense ? 'true' : undefined}
      className={cn(
        'text-foreground flex w-full items-center gap-3 px-4 py-3 text-sm',
        dense && 'gap-2 px-3 py-2 text-sm',
        className
      )}
      {...props}
    >
      {leading && <span className="flex shrink-0 items-center">{leading}</span>}
      <span className="min-w-0 flex-1">{children}</span>
      {trailing && <span className="flex shrink-0 items-center">{trailing}</span>}
    </li>
  )
}
