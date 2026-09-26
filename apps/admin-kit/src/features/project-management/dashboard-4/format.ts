import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type { ActiveProjectRow } from '@pompeitech/mock-data'

export const HEALTH_COLOR: Record<string, string> = {
  on_track: 'var(--success)',
  at_risk: 'var(--warning)',
  blocked: 'var(--destructive)',
  dependency: 'var(--muted-foreground)'
}

export const HEALTH_LABEL: Record<ActiveProjectRow['health'], string> = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  blocked: 'Blocked',
  dependency: 'Dependency'
}

export const HEALTH_BADGE_VARIANT: Record<ActiveProjectRow['health'], BadgeProps['variant']> = {
  on_track: 'success',
  at_risk: 'warning',
  blocked: 'destructive',
  dependency: 'secondary'
}

export const PRIORITY_BADGE_VARIANT: Record<ActiveProjectRow['priority'], BadgeProps['variant']> = {
  low: 'outline',
  medium: 'secondary',
  high: 'destructive'
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
