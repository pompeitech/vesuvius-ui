import type { Order } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
  Typography
} from '@pompeitech/vesuvius-ui'
import { MoreHorizontalIcon, PencilIcon, PrinterIcon, TrashIcon, XIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { dateFormatter, ORDER_STATUS_VARIANT } from '../../_shared/format'

/** Order #, customer, status/date summary, and the Edit/more-actions row. */
export function DetailHeader({ order }: { order: Order }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          Order {order.orderNumber}
        </Typography>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={ORDER_STATUS_VARIANT[order.status]} className="capitalize">
            {order.status}
          </Badge>
          <span>·</span>
          <span>{order.customerName}</span>
          <span>·</span>
          <span>Placed {dateFormatter.format(new Date(order.createdAt))}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate(`/ecommerce/edit-order/${order.id}`)}>
          <PencilIcon />
          Edit
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success(`Printing invoice for ${order.orderNumber}...`)}
        >
          <PrinterIcon />
          Print invoice
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontalIcon />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                toast.info(`${order.orderNumber} marked as cancelled (not persisted).`)
              }
            >
              <XIcon />
              Cancel order
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => toast.success(`Deleted ${order.orderNumber}.`)}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
