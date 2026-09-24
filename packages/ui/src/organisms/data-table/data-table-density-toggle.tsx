import { AlignJustifyIcon, Rows3Icon, Rows4Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../molecules/dropdown-menu/dropdown-menu'
import { Button } from '../../atoms/button/button'
import type { Density } from './data-table.types'

const OPTIONS: { value: Density; label: string; icon: typeof Rows3Icon }[] = [
  { value: 'compact', label: 'Compact', icon: AlignJustifyIcon },
  { value: 'comfortable', label: 'Comfortable', icon: Rows3Icon },
  { value: 'spacious', label: 'Spacious', icon: Rows4Icon }
]

export type DataTableDensityToggleProps = {
  density: Density
  onDensityChange: (density: Density) => void
}

export function DataTableDensityToggle({ density, onDensityChange }: DataTableDensityToggleProps) {
  const Icon = OPTIONS.find(o => o.value === density)?.icon ?? Rows3Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8" aria-label="Row density">
          <Icon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {OPTIONS.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onDensityChange(option.value)}
            className={density === option.value ? 'bg-accent' : undefined}
          >
            <option.icon />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
