import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'
import { SearchIcon } from 'lucide-react'
import { ORDER_CHANNEL_OPTIONS, ORDER_STATUS_OPTIONS } from '../../_shared/format'
import type { ChannelFilter, StatusFilter } from '../types'

type FiltersBarProps = {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  channel: ChannelFilter
  onChannelChange: (value: ChannelFilter) => void
}

/** Search box plus the status/channel selects, in a single row above the card grid. */
export function FiltersBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  channel,
  onChannelChange
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 sm:max-w-64">
        <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={event => onSearchChange(event.target.value)}
          placeholder="Search orders..."
          className="pl-8"
        />
      </div>
      <Select value={status} onValueChange={value => onStatusChange(value as StatusFilter)}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {ORDER_STATUS_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={channel} onValueChange={value => onChannelChange(value as ChannelFilter)}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All channels</SelectItem>
          {ORDER_CHANNEL_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
