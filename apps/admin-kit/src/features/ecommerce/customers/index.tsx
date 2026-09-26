import { getCustomers, type Customer } from '@pompeitech/mock-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  StatCard,
  Typography,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { SearchIcon, UsersIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'

export async function loader() {
  const result = await getCustomers({
    pageSize: 200,
    sortBy: 'totalSpent',
    sortDirection: 'desc'
  })
  return result.data
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export function Component() {
  const customers = useLoaderData() as Customer[]
  const [query, setQuery] = useState('')
  const filteredCustomers = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return customers
    return customers.filter(customer =>
      [customer.name, customer.email, customer.location].some(value =>
        value.toLowerCase().includes(needle)
      )
    )
  }, [customers, query])
  const totalSpent = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const averageOrders = customers.length
    ? customers.reduce((sum, customer) => sum + customer.totalOrders, 0) / customers.length
    : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Typography as="h1" variant="h3">
            Customers
          </Typography>
          <Typography variant="muted">
            Understand who drives revenue and how relationships grow.
          </Typography>
        </div>
        <InputGroup className="w-full md:w-72">
          <InputGroupAddon>
            <SearchIcon className="size-4" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search customers"
            placeholder="Search customers..."
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total customers"
          value={customers.length.toLocaleString()}
          icon={UsersIcon}
        />
        <StatCard label="Customer lifetime value" value={currency.format(totalSpent)} />
        <StatCard label="Average orders" value={averageOrders.toFixed(1)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer directory</CardTitle>
          <Typography variant="muted">
            {filteredCustomers.length} customers shown, sorted by lifetime value.
          </Typography>
        </CardHeader>
        <CardContent className="p-0">
          {filteredCustomers.length === 0 ? (
            <EmptyState
              compact
              icon={SearchIcon}
              title="No customers found"
              description="Try a different name, email or location."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-muted-foreground border-y text-left text-xs tracking-wide uppercase">
                  <tr>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 text-right font-medium">Orders</th>
                    <th className="px-6 py-3 text-right font-medium">Lifetime value</th>
                    <th className="px-6 py-3 text-right font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={customer.name} src={customer.avatarUrl} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate font-medium">{customer.name}</p>
                            <p className="text-muted-foreground truncate text-xs">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground px-6 py-4">{customer.location}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{customer.totalOrders}</td>
                      <td className="px-6 py-4 text-right font-medium tabular-nums">
                        {currency.format(customer.totalSpent)}
                      </td>
                      <td className="text-muted-foreground px-6 py-4 text-right">
                        {dateFormatter.format(new Date(customer.joinedAt))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
