import type {
  EventColor,
  IssuePriority,
  IssueStatus,
  IssueType,
  ProjectHealth,
  ProjectMemberStatus,
  ProjectPriority,
  ProjectStatus,
  TimesheetStatus
} from '@pompeitech/mock-data'
import type { BadgeProps } from '@pompeitech/vesuvius-ui'
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BugIcon,
  EqualIcon,
  ListTodoIcon,
  SparklesIcon,
  WrenchIcon,
  ZapIcon,
  type LucideIcon
} from 'lucide-react'

// Shared across every Project Management page that renders a project's or
// an issue's status/priority — one place to keep the label/color/icon
// mapping instead of redefining it per page, same convention as
// ecommerce/hr's own `_shared/format.ts` files.

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: 'Planning',
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed'
}

export const PROJECT_STATUS_VARIANT: Record<ProjectStatus, BadgeProps['variant']> = {
  planning: 'secondary',
  active: 'success',
  on_hold: 'warning',
  completed: 'outline'
}

export const PROJECT_STATUS_OPTIONS: { label: string; value: ProjectStatus }[] = (
  Object.entries(PROJECT_STATUS_LABEL) as [ProjectStatus, string][]
).map(([value, label]) => ({ value, label }))

export const PROJECT_HEALTH_LABEL: Record<ProjectHealth, string> = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  blocked: 'Blocked',
  dependency: 'Dependency'
}

export const PROJECT_HEALTH_VARIANT: Record<ProjectHealth, BadgeProps['variant']> = {
  on_track: 'success',
  at_risk: 'warning',
  blocked: 'destructive',
  dependency: 'info'
}

export const PROJECT_HEALTH_OPTIONS: { label: string; value: ProjectHealth }[] = (
  Object.entries(PROJECT_HEALTH_LABEL) as [ProjectHealth, string][]
).map(([value, label]) => ({ value, label }))

export const PROJECT_PRIORITY_LABEL: Record<ProjectPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
}

export const PROJECT_PRIORITY_VARIANT: Record<ProjectPriority, BadgeProps['variant']> = {
  low: 'secondary',
  medium: 'info',
  high: 'warning'
}

export const PROJECT_PRIORITY_OPTIONS: { label: string; value: ProjectPriority }[] = (
  Object.entries(PROJECT_PRIORITY_LABEL) as [ProjectPriority, string][]
).map(([value, label]) => ({ value, label }))

export const ISSUE_STATUS_LABEL: Record<IssueStatus, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done'
}

export const ISSUE_STATUS_VARIANT: Record<IssueStatus, BadgeProps['variant']> = {
  backlog: 'secondary',
  todo: 'info',
  in_progress: 'warning',
  in_review: 'highlight',
  done: 'success'
}

/** Board column order — backlog first, done last, matching the Kanban's left-to-right flow. */
export const ISSUE_STATUS_ORDER: IssueStatus[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done'
]

export const ISSUE_STATUS_OPTIONS: { label: string; value: IssueStatus }[] = ISSUE_STATUS_ORDER.map(
  value => ({
    value,
    label: ISSUE_STATUS_LABEL[value]
  })
)

export const ISSUE_PRIORITY_LABEL: Record<IssuePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
}

export const ISSUE_PRIORITY_ICON: Record<IssuePriority, LucideIcon> = {
  low: ArrowDownIcon,
  medium: EqualIcon,
  high: ArrowUpIcon,
  urgent: AlertTriangleIcon
}

export const ISSUE_PRIORITY_COLOR_CLASS: Record<IssuePriority, string> = {
  low: 'text-muted-foreground',
  medium: 'text-info',
  high: 'text-warning',
  urgent: 'text-destructive'
}

export const ISSUE_PRIORITY_OPTIONS: { label: string; value: IssuePriority }[] = (
  Object.entries(ISSUE_PRIORITY_LABEL) as [IssuePriority, string][]
).map(([value, label]) => ({ value, label }))

export const ISSUE_TYPE_LABEL: Record<IssueType, string> = {
  bug: 'Bug',
  feature: 'Feature',
  task: 'Task',
  chore: 'Chore',
  epic: 'Epic'
}

export const ISSUE_TYPE_ICON: Record<IssueType, LucideIcon> = {
  bug: BugIcon,
  feature: SparklesIcon,
  task: ListTodoIcon,
  chore: WrenchIcon,
  epic: ZapIcon
}

export const ISSUE_TYPE_COLOR_CLASS: Record<IssueType, string> = {
  bug: 'text-destructive',
  feature: 'text-highlight',
  task: 'text-info',
  chore: 'text-muted-foreground',
  epic: 'text-success'
}

export const ISSUE_TYPE_OPTIONS: { label: string; value: IssueType }[] = (
  Object.entries(ISSUE_TYPE_LABEL) as [IssueType, string][]
).map(([value, label]) => ({ value, label }))

/** Fixed tag pool for the "Etichette" field — matches the generator's `ISSUE_LABEL_POOL` in `@pompeitech/mock-data`. */
export const ISSUE_LABEL_OPTIONS = [
  'frontend',
  'backend',
  'design',
  'urgent',
  'tech-debt',
  'customer-reported',
  'needs-qa',
  'blocked-external'
].map(label => ({ value: label, label }))

export const PROJECT_MEMBER_STATUS_LABEL: Record<ProjectMemberStatus, string> = {
  active: 'Active',
  invited: 'Invited'
}

export const PROJECT_MEMBER_STATUS_VARIANT: Record<ProjectMemberStatus, BadgeProps['variant']> = {
  active: 'success',
  invited: 'secondary'
}

export const PROJECT_MEMBER_STATUS_OPTIONS: { label: string; value: ProjectMemberStatus }[] = (
  Object.entries(PROJECT_MEMBER_STATUS_LABEL) as [ProjectMemberStatus, string][]
).map(([value, label]) => ({ value, label }))

/**
 * `SimplePieChart`'s `colors` prop wants real CSS color values (its own
 * live usage passes `var(--chart-1)`), not `Badge` variant names — this
 * bridges the two so the Overview status donut can reuse the exact same
 * semantics as `ISSUE_STATUS_VARIANT` instead of a separate palette.
 */
export const BADGE_VARIANT_TO_CSS_VAR: Partial<Record<NonNullable<BadgeProps['variant']>, string>> =
  {
    default: 'var(--primary)',
    secondary: 'var(--secondary-foreground)',
    destructive: 'var(--destructive)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    info: 'var(--info)',
    highlight: 'var(--highlight)'
  }

export const TIMESHEET_STATUS_LABEL: Record<TimesheetStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  rejected: 'Rejected'
}

export const TIMESHEET_STATUS_VARIANT: Record<TimesheetStatus, BadgeProps['variant']> = {
  draft: 'secondary',
  submitted: 'info',
  approved: 'success',
  rejected: 'destructive'
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})
export const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})
export const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit'
})

/** The Calendar's event color dot/block — same semantic tokens as everywhere else in this kit, never a raw Tailwind palette color. */
export const EVENT_COLOR_CLASS: Record<EventColor, string> = {
  default: 'bg-primary/10 text-primary border-primary/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  info: 'bg-info/10 text-info border-info/30',
  destructive: 'bg-destructive/10 text-destructive border-destructive/30',
  highlight: 'bg-highlight/10 text-highlight border-highlight/30'
}

export const EVENT_COLOR_DOT_CLASS: Record<EventColor, string> = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  destructive: 'bg-destructive',
  highlight: 'bg-highlight'
}

export const EVENT_COLOR_OPTIONS: { value: EventColor; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'success', label: 'Green' },
  { value: 'warning', label: 'Yellow' },
  { value: 'info', label: 'Blue' },
  { value: 'destructive', label: 'Red' },
  { value: 'highlight', label: 'Orange' }
]
