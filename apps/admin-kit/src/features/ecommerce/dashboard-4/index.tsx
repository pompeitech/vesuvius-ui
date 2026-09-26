import { getFinanceDashboardStats, type FinanceDashboardStats } from '@pompeitech/mock-data'
import { useLoaderData } from 'react-router'
import { FinanceHeader } from './components/finance-header'
import { FinanceStatCards } from './components/finance-stat-cards'
import { RevenueCostsCards } from './components/revenue-costs-cards'
import { TransactionsCard } from './components/transactions-card'

export async function loader() {
  return getFinanceDashboardStats()
}

export function Component() {
  const stats = useLoaderData() as FinanceDashboardStats

  return (
    <div className="flex flex-col gap-6">
      <FinanceHeader />
      <RevenueCostsCards stats={stats} />
      <FinanceStatCards stats={stats} />
      <TransactionsCard stats={stats} />
    </div>
  )
}
