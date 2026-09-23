import { SearchIcon, XIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../../atoms/button/button'
import { Input } from '../../atoms/input/input'
import { cn } from '../../lib/utils'

export type FilterBarProps = {
  search?: string
  onSearchChange?: (value: string) => void
  children?: ReactNode
  onClear?: () => void
  className?: string
}

export function FilterBar({
  search,
  onSearchChange,
  children,
  onClear,
  className
}: FilterBarProps) {
  const hasFilters = Boolean(search) || Boolean(onClear)
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div className="relative min-w-56 flex-1">
        <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={event => onSearchChange?.(event.target.value)}
          placeholder="Search..."
          className="pl-9"
          aria-label="Search"
        />
      </div>
      {children}
      {hasFilters && onClear && (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          <XIcon className="mr-1.5 size-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  )
}
