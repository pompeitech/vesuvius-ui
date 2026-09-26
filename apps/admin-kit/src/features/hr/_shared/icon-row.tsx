import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type IconRowProps = {
  icon: LucideIcon
  title: ReactNode
  subtitle?: ReactNode
  trailing?: ReactNode
}

/**
 * One icon-led row of a record list — icon square, title/subtitle stack, optional
 * trailing content (a status badge, an action button, or both). Used wherever a
 * detail page shows a short list of an employee's own records (documents, shifts,
 * time entries) instead of a full DataTable, mirroring a settings-style "connected
 * items" list rather than a spreadsheet.
 */
export function IconRow({ icon: Icon, title, subtitle, trailing }: IconRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
    </div>
  )
}
