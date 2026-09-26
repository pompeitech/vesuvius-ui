import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import type { IssuePriority } from '@pompeitech/mock-data'

/** `_shared/format.ts` has `ISSUE_PRIORITY_LABEL`/`ICON`/`COLOR_CLASS` but no Badge variant (that file's `PROJECT_PRIORITY_VARIANT` is for `Project.priority`, a different — and narrower, no "urgent" — enum). Small local map, same idea as dashboard-4's own `PRIORITY_BADGE_VARIANT`. */
export const ISSUE_PRIORITY_VARIANT: Record<IssuePriority, BadgeProps['variant']> = {
  low: 'outline',
  medium: 'secondary',
  high: 'warning',
  urgent: 'destructive'
}
