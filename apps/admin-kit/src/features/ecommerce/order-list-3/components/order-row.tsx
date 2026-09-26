import type { Order } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { EyeIcon, MoreHorizontalIcon, PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
  currency,
  dateFormatter,
  ORDER_CHANNEL_LABEL,
  ORDER_STATUS_VARIANT
} from '../../_shared/format'

/** One dense order row: customer, order #/date/channel, total, and status. */
export function OrderRow({ order }: { order: Order }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4 p-3">
      <UserAvatar name={order.customerName} src={order.customerAvatarUrl} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{order.customerName}</span>
          <Badge variant="outline" className="shrink-0">
            {order.orderNumber}
          </Badge>
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {ORDER_CHANNEL_LABEL[order.channel]} · {dateFormatter.format(new Date(order.createdAt))} ·{' '}
          {order.itemCount} item{order.itemCount === 1 ? '' : 's'}
        </p>
      </div>
      <div className="w-28 shrink-0 text-right">
        <p className="text-xs text-muted-foreground uppercase">Total</p>
        <p className="font-semibold tabular-nums">{currency.format(order.total)}</p>
      </div>
      <Badge
        variant={ORDER_STATUS_VARIANT[order.status]}
        className="w-24 shrink-0 justify-center capitalize"
      >
        {order.status}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 shrink-0">
            <MoreHorizontalIcon />
            <span className="sr-only">Open actions for order {order.orderNumber}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/ecommerce/order-detail-1/${order.id}`)}>
            <EyeIcon />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/ecommerce/edit-order/${order.id}`)}>
            <PencilIcon />
            Edit order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
