import { Badge, cn } from '@pompeitech/vesuvius-ui'
import type { ReactNode } from 'react'

type FilterButtonProps = {
  active: boolean
  count?: number
  onClick: () => void
  children: ReactNode
}

/** One toggleable filter chip, with an optional result count badge. */
export function FilterButton({ active, count, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
        active ? 'border-primary bg-primary/5 font-medium' : 'hover:bg-muted/50'
      )}
    >
      <span>{children}</span>
      {count !== undefined && (
        <Badge variant="secondary" className="tabular-nums">
          {count}
        </Badge>
      )}
    </button>
  )
}
