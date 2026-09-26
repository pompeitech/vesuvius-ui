import type { Office } from '@pompeitech/mock-data'
import { Badge, Card, CardContent, cn } from '@pompeitech/vesuvius-ui'
import { BarChart3Icon, HistoryIcon, SettingsIcon, StarIcon, StoreIcon } from 'lucide-react'
import { currency } from '../../_shared/format'

const SHORTCUTS = [
  { label: 'Top Deals', icon: StarIcon },
  { label: 'Settings', icon: SettingsIcon },
  { label: 'History', icon: HistoryIcon },
  { label: 'Report', icon: BarChart3Icon }
]

type ChannelPanelProps = {
  offices: Office[]
  activeOfficeId: string
  onSelectOffice: (officeId: string) => void
  salesToday: number
}

/**
 * The reference site's "Channels" column is a register/location picker —
 * this kit already has real store locations (`Office`, Company settings),
 * so it's reused directly rather than inventing a parallel "channel"
 * entity. The shortcuts below (Top Deals/Settings/History/Report) are
 * decorative, same as in the reference — an explicit scope cut, marked
 * "Soon" rather than wired to dead clicks.
 */
export function ChannelPanel({
  offices,
  activeOfficeId,
  onSelectOffice,
  salesToday
}: ChannelPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <p className="px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Locations
        </p>
        {offices.map(office => (
          <button
            key={office.id}
            type="button"
            onClick={() => onSelectOffice(office.id)}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted',
              office.id === activeOfficeId && 'bg-muted font-medium'
            )}
          >
            <StoreIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate">{office.name}</span>
          </button>
        ))}

        <p className="mt-4 px-2 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Shortcuts
        </p>
        {SHORTCUTS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground"
          >
            <Icon className="size-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              Soon
            </Badge>
          </div>
        ))}
      </div>

      <Card className="m-2 mt-0 gap-1 py-3">
        <CardContent className="px-3">
          <p className="text-xs text-muted-foreground">Sales Today</p>
          <p className="text-lg font-semibold tabular-nums">{currency.format(salesToday)}</p>
        </CardContent>
      </Card>
    </div>
  )
}
