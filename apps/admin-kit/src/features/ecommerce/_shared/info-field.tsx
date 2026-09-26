import type { ReactNode } from 'react'

/** A label + value pair used across the read-only detail pages (SKU, category, price, ...). */
export function InfoField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  )
}
