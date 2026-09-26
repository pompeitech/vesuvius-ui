import type { OrderLineItem } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { ItemRow } from './item-row'

type ItemLineupProps = {
  items: OrderLineItem[]
  focusedId: string | undefined
  onFocus: (item: OrderLineItem) => void
}

/** The clickable item list — selecting a row updates the preview panel's photo. */
export function ItemLineup({ items, focusedId, onFocus }: ItemLineupProps) {
  return (
    <div>
      <Typography variant="p" className="font-medium">
        Item lineup
      </Typography>
      <Typography variant="muted">Click any row to focus it in the preview panel.</Typography>
      <div className="mt-3 flex flex-col gap-3">
        {items.map(item => (
          <ItemRow
            key={item.productId}
            item={item}
            focused={focusedId === item.productId}
            onFocus={() => onFocus(item)}
          />
        ))}
      </div>
    </div>
  )
}
