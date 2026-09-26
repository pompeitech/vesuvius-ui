import {
  getEcommerceDashboardStats,
  getFinanceDashboardStats,
  getOperationalDashboardStats,
  type EcommerceDashboardStats,
  type FinanceDashboardStats,
  type OperationalDashboardStats
} from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartCard,
  Combobox,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  SimpleAreaChart,
  SimpleBarChart,
  StatCard,
  Typography
} from '@pompeitech/vesuvius-ui'
import { DownloadIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import { currency, compactCurrency } from '../dashboard-4/format'

export async function loader() {
  const [ecommerce, finance, operations] = await Promise.all([
    getEcommerceDashboardStats(),
    getFinanceDashboardStats(),
    getOperationalDashboardStats()
  ])
  return { ecommerce, finance, operations }
}

export function Component() {
  const { ecommerce, finance, operations } = useLoaderData() as {
    ecommerce: EcommerceDashboardStats
    finance: FinanceDashboardStats
    operations: OperationalDashboardStats
  }
  const [range, setRange] = useState('90d')
  const [channelQuery, setChannelQuery] = useState('')
  const channels = useMemo(
    () =>
      ecommerce.revenueByChannel.filter(channel =>
        channel.label.toLowerCase().includes(channelQuery.toLowerCase())
      ),
    [channelQuery, ecommerce.revenueByChannel]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Typography as="h1" variant="h3">
            Analytics
          </Typography>
          <Typography variant="muted">
            A decision-ready view of revenue, demand and operational health.
          </Typography>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Combobox
            aria-label="Reporting period"
            className="w-40"
            options={[
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
              { value: 'ytd', label: 'Year to date' }
            ]}
            value={range}
            onValueChange={value => value && setRange(value)}
          />
          <Button variant="outline" size="sm">
            <DownloadIcon />
            Export report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue"
          value={compactCurrency.format(finance.grossRevenue)}
          changePct={finance.grossRevenueChangePct}
        />
        <StatCard
          label="Net profit"
          value={compactCurrency.format(finance.netProfit)}
          changePct={finance.netProfitChangePct}
        />
        <StatCard
          label="Orders"
          value={operations.totalOrders.toLocaleString()}
          changePct={operations.totalOrdersChangePct}
        />
        <StatCard
          label="Conversion rate"
          value={`${operations.conversionRate}%`}
          changePct={operations.conversionRateChangePct}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
        <ChartCard
          label="Revenue momentum"
          value={currency.format(finance.revenueOverview)}
          changePct={finance.revenueOverviewChangePct}
          caption={`Reporting range: ${range === 'ytd' ? 'Year to date' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}`}
        >
          <SimpleAreaChart
            data={finance.revenueByMonth}
            index="month"
            categories={['revenue']}
            colors={['var(--chart-1)']}
            showLegend={false}
            className="h-64"
          />
        </ChartCard>
        <ChartCard
          label="Order mix by category"
          value={operations.categoryPerformanceTotal.toLocaleString()}
          caption="Orders across the selected operating period"
        >
          <SimpleBarChart
            data={operations.categoryPerformance}
            index="day"
            categories={['electronics', 'clothing', 'homeGarden', 'sports']}
            colors={['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']}
            stacked
            showLegend
            className="h-64"
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>Revenue by channel</CardTitle>
              <Typography variant="muted">Where your customers are buying.</Typography>
            </div>
            <InputGroup className="w-44">
              <InputGroupAddon>
                <SearchIcon className="size-4" aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Filter channels"
                placeholder="Filter"
                value={channelQuery}
                onChange={event => setChannelQuery(event.target.value)}
              />
            </InputGroup>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map(channel => (
              <div key={channel.channel} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{channel.label}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {currency.format(channel.value)}
                  </span>
                </div>
                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (channel.value / Math.max(...ecommerce.revenueByChannel.map(item => item.value), 1)) * 100)}%`
                    }}
                  />
                </div>
              </div>
            ))}
            {channels.length === 0 && (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No channels match that filter.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Signals to watch</CardTitle>
            <Typography variant="muted">Small changes that deserve attention.</Typography>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
              <div>
                <p className="font-medium">Fulfillment speed</p>
                <p className="text-muted-foreground text-sm">
                  Average delivery is {operations.avgFulfillmentDays} days.
                </p>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
              <div>
                <p className="font-medium">Returns</p>
                <p className="text-muted-foreground text-sm">
                  Current return rate is {operations.returnRate}%.
                </p>
              </div>
              <Badge variant={operations.returnRate > 5 ? 'warning' : 'secondary'}>
                {operations.returnRate > 5 ? 'Review' : 'On track'}
              </Badge>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
              <div>
                <p className="font-medium">Inventory coverage</p>
                <p className="text-muted-foreground text-sm">
                  {ecommerce.lowStockProducts.length} products are below the stock threshold.
                </p>
              </div>
              <Badge variant={ecommerce.lowStockProducts.length > 3 ? 'warning' : 'success'}>
                {ecommerce.lowStockProducts.length > 3 ? 'Action needed' : 'Healthy'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
