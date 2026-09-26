import { getProjectHealthSummary, type ProjectHealthSummary } from '@pompeitech/mock-data'
import { Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData } from 'react-router'
import { ActiveProjectsCard } from './components/active-projects-card'
import { CriticalPathCard } from './components/critical-path-card'
import { HealthAttentionCards } from './components/health-attention-cards'
import { SummaryStatCards } from './components/summary-stat-cards'

export async function loader() {
  return getProjectHealthSummary()
}

export function Component() {
  const health = useLoaderData() as ProjectHealthSummary

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Dashboard
        </Typography>
        <Typography variant="muted">Health and activity across every active project.</Typography>
      </div>

      <SummaryStatCards health={health} />
      <HealthAttentionCards health={health} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ActiveProjectsCard health={health} />
        <CriticalPathCard health={health} />
      </div>
    </div>
  )
}
