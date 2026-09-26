import type { Order } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { EyeIcon, MoreHorizontalIcon, PencilIcon } from 'lucide-react'
import {
  currency,
  dateFormatter,
  ORDER_CHANNEL_LABEL,
  ORDER_STATUS_VARIANT,
  PAYMENT_STATUS_VARIANT
} from '../../_shared/format'

type OrderCardProps = {
  order: Order
  onEdit: (order: Order) => void
  onView: (order: Order) => void
}

/** One order card: customer, item thumbnails, totals, and status/payment badges. */
export function OrderCard({ order, onEdit, onView }: OrderCardProps) {
  const visibleItems = order.items.slice(0, 4)
  const extraItems = order.items.length - visibleItems.length

  return (
    <Card className="gap-3 p-4">
      <div className="flex items-start gap-3">
        <UserAvatar name={order.customerName} src={order.customerAvatarUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Typography variant="small" className="truncate font-semibold">
              {order.customerName}
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mt-1 size-7 shrink-0">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open actions for order {order.orderNumber}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(order)}>
                  <EyeIcon />
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(order)}>
                  <PencilIcon />
                  Edit order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {order.orderNumber} · {dateFormatter.format(new Date(order.createdAt))}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {visibleItems.map(item => (
          <img
            key={item.productId}
            src={item.imageUrl}
            alt=""
            className="size-9 shrink-0 rounded-md border object-cover"
          />
        ))}
        {extraItems > 0 && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium text-muted-foreground">
            +{extraItems}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={ORDER_STATUS_VARIANT[order.status]} className="capitalize">
          {order.status}
        </Badge>
        <Badge variant={PAYMENT_STATUS_VARIANT[order.paymentStatus]} className="capitalize">
          {order.paymentStatus}
        </Badge>
        <Badge variant="outline">{ORDER_CHANNEL_LABEL[order.channel]}</Badge>
      </div>

      <div className="flex items-center justify-between border-t pt-3 text-sm">
        <span className="text-muted-foreground">
          {order.itemCount} item{order.itemCount === 1 ? '' : 's'}
        </span>
        <span className="font-semibold tabular-nums">{currency.format(order.total)}</span>
      </div>
    </Card>
  )
}
