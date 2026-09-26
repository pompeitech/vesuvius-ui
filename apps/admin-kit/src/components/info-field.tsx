import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/** A label + value pair used across every read-only detail page (HR, Project Management, ...) — email, department, contract, project status, and the like. An optional leading icon gives it more visual weight where a card is mostly personal/contact info. */
export function InfoField({
  label,
  icon: Icon,
  children
}: {
  label: string
  icon?: LucideIcon
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-2.5">
      {Icon && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  )
}
