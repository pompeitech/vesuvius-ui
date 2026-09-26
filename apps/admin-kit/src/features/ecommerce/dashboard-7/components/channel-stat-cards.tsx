import type { ChannelSalesStats } from '@pompeitech/mock-data'
import { StatCard } from '@pompeitech/vesuvius-ui'
import { PackageIcon, RotateCcwIcon, StoreIcon, WarehouseIcon } from 'lucide-react'
import { currency } from '../format'

/** In-store, website, wholesale, and returns — the four sales channels this dashboard tracks. */
export function ChannelStatCards({ stats }: { stats: ChannelSalesStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="In-store Sales"
        value={currency.format(stats.inStoreSales)}
        icon={StoreIcon}
        changePct={stats.inStoreSalesChangePct}
        changeLabel={`based on ${stats.inStoreSalesOrderCount.toLocaleString()} orders`}
      />
      <StatCard
        label="Website Sales"
        value={currency.format(stats.websiteSales)}
        icon={PackageIcon}
        changePct={stats.websiteSalesChangePct}
        changeLabel={`based on ${stats.websiteSalesOrderCount.toLocaleString()} orders`}
      />
      <StatCard
        label="Wholesale"
        value={currency.format(stats.wholesaleSales)}
        icon={WarehouseIcon}
        changePct={stats.wholesaleSalesChangePct}
        changeLabel={`based on ${stats.wholesaleSalesOrderCount.toLocaleString()} orders`}
      />
      <StatCard
        label="Returns"
        value={currency.format(stats.returns)}
        icon={RotateCcwIcon}
        changePct={stats.returnsChangePct}
        changeLabel={`based on ${stats.returnsOrderCount.toLocaleString()} orders`}
      />
    </div>
  )
}
