import { ChevronRightIcon, type LucideIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { cn } from '../../lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../dropdown-menu/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from './sidebar'
import { useSidebar } from './sidebar-provider'

export type SidebarNavItem = {
  id: string
  label: string
  description?: string
  icon?: LucideIcon
  href?: string
  badge?: ReactNode
  active?: boolean
  disabled?: boolean
  items?: SidebarNavItem[]
}

export type SidebarNavProps = {
  items: SidebarNavItem[]
  onNavigate?: (item: SidebarNavItem) => void
  defaultOpenIds?: string[]
}

export function SidebarNav({ items, onNavigate, defaultOpenIds = [] }: SidebarNavProps) {
  return (
    <SidebarMenu>
      {items.map(item => (
        <SidebarNavEntry
          key={item.id}
          item={item}
          onNavigate={onNavigate}
          defaultOpen={defaultOpenIds.includes(item.id)}
        />
      ))}
    </SidebarMenu>
  )
}

function ItemContent({ item }: { item: SidebarNavItem }) {
  const Icon = item.icon
  return (
    <>
      {Icon && <Icon />}
      {item.description ? (
        <span className="flex min-w-0 flex-col">
          <span className="truncate">{item.label}</span>
          <span className="text-muted-foreground truncate text-xs font-normal group-data-[collapsible=icon]:hidden">
            {item.description}
          </span>
        </span>
      ) : (
        <span className="truncate">{item.label}</span>
      )}
    </>
  )
}

function SidebarNavEntry({
  item,
  onNavigate,
  defaultOpen
}: {
  item: SidebarNavItem
  onNavigate?: (item: SidebarNavItem) => void
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen || Boolean(item.items?.some(c => c.active)))
  const hasChildren = Boolean(item.items?.length)
  const { state, isMobile } = useSidebar()
  const isIconRail = state === 'collapsed' && !isMobile

  if (hasChildren && isIconRail) {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton isActive={item.active} disabled={item.disabled}>
              <ItemContent item={item} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="min-w-48">
            <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            {item.items!.map(child => (
              <DropdownMenuItem
                key={child.id}
                disabled={child.disabled}
                onClick={() => onNavigate?.(child)}
              >
                {child.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  if (hasChildren) {
    return (
      <Collapsible asChild open={open} onOpenChange={setOpen} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={item.active}
              disabled={item.disabled}
              tooltip={item.label}
              className={cn(item.description && 'h-auto py-2')}
            >
              <ItemContent item={item} />
              {item.badge !== undefined && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items!.map(child => (
                <SidebarMenuSubItem key={child.id}>
                  <SidebarMenuSubButton
                    isActive={child.active}
                    aria-disabled={child.disabled}
                    onClick={() => !child.disabled && onNavigate?.(child)}
                  >
                    {child.label}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={item.active}
        disabled={item.disabled}
        tooltip={item.label}
        className={cn(item.description && 'h-auto py-2')}
        onClick={() => !item.disabled && onNavigate?.(item)}
      >
        <ItemContent item={item} />
        {item.badge !== undefined && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
