import type { ChannelSalesStats } from '@pompeitech/mock-data'
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { currency, dateFormatter, PRIORITY_VARIANT, STATUS_VARIANT } from '../format'

/** The recent-invoices table: customer, amount, priority, and payment status. */
export function RecentInvoicesCard({ stats }: { stats: ChannelSalesStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Invoices{' '}
          <span className="ml-1 font-normal text-muted-foreground">{stats.invoices.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.invoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserAvatar
                      name={invoice.customerName}
                      src={invoice.customerAvatarUrl}
                      size="sm"
                    />
                    <span className="truncate">{invoice.customerName}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell className="text-muted-foreground">
                  {dateFormatter.format(new Date(invoice.date))}
                </TableCell>
                <TableCell className="tabular-nums">{currency.format(invoice.amount)}</TableCell>
                <TableCell>
                  <Badge variant={PRIORITY_VARIANT[invoice.priority]}>{invoice.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[invoice.status]}>{invoice.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
