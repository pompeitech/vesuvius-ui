import { Button } from '@pompeitech/vesuvius-ui'

type CategoryBarProps = {
  categories: string[]
  active: string
  onSelect: (category: string) => void
}

/** Horizontal, scrollable category chips — "All" plus every distinct category actually present in the catalog (derived from `Product`, not a hardcoded list). */
export function CategoryBar({ categories, active, onSelect }: CategoryBarProps) {
  return (
    <div className="flex shrink-0 gap-2 overflow-x-auto pb-1">
      <Button
        type="button"
        variant={active === 'all' ? 'default' : 'outline'}
        size="sm"
        className="shrink-0"
        onClick={() => onSelect('all')}
      >
        All
      </Button>
      {categories.map(category => (
        <Button
          key={category}
          type="button"
          variant={active === category ? 'default' : 'outline'}
          size="sm"
          className="shrink-0"
          onClick={() => onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
