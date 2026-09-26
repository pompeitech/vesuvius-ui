import type { OrderLineItem } from '@pompeitech/mock-data'
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast
} from '@pompeitech/vesuvius-ui'
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { currency } from '../../_shared/format'

type ItemRowProps = {
  item: OrderLineItem
  focused: boolean
  onFocus: () => void
}

/** One row in the item lineup — click to focus it in the preview panel, or open its own menu. */
export function ItemRow({ item, focused, onFocus }: ItemRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onFocus}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onFocus()
        }
      }}
      className={cn(
        'flex items-center gap-4 rounded-md border p-3 text-left transition-colors',
        focused ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
      )}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="size-12 shrink-0 rounded-md border object-cover"
      />
      <div className="min-w-0 flex-1">
        <span className="truncate font-medium">{item.name}</span>
        <p className="truncate text-sm text-muted-foreground">
          {item.sku} · Qty {item.quantity}
        </p>
      </div>
      <div className="w-24 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Unit price</p>
        <p className="font-semibold tabular-nums">{currency.format(item.unitPrice)}</p>
      </div>
      <div className="w-24 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Total</p>
        <p className="font-semibold tabular-nums">{currency.format(item.lineTotal)}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={event => event.stopPropagation()}
          >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Item actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => toast.info("Editing individual items isn't wired up in this demo.")}
          >
            <PencilIcon />
            Edit item
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => toast.success(`Removed "${item.name}".`)}
          >
            <TrashIcon />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
