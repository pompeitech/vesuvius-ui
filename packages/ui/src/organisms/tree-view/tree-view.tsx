import { ChevronRightIcon, type LucideIcon } from 'lucide-react'
import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Checkbox } from '../../atoms/checkbox/checkbox'
import { cn } from '../../lib/utils'
import { useControllableState } from '../../hooks/use-controllable-state'

export type TreeNode = {
  id: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
  children?: TreeNode[]
}

export type TreeViewProps = {
  data: TreeNode[]
  selected?: string[]
  defaultSelected?: string[]
  onSelectedChange?: (ids: string[]) => void
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (ids: string[]) => void
  multiSelect?: boolean
  className?: string
}

type FlatItem = {
  node: TreeNode
  depth: number
  parentId: string | undefined
  index: number
  siblingCount: number
}

function flattenVisible(
  nodes: TreeNode[],
  expanded: Set<string>,
  depth = 0,
  parentId: string | undefined = undefined
): FlatItem[] {
  return nodes.flatMap((node, index) => {
    const item: FlatItem = {
      node,
      depth,
      parentId,
      index,
      siblingCount: nodes.length
    }
    const children =
      node.children && node.children.length > 0 && expanded.has(node.id)
        ? flattenVisible(node.children, expanded, depth + 1, node.id)
        : []
    return [item, ...children]
  })
}

export function TreeView({
  data,
  selected: selectedProp,
  defaultSelected = [],
  onSelectedChange,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  multiSelect = false,
  className
}: TreeViewProps) {
  const [selected, setSelected] = useControllableState({
    value: selectedProp,
    defaultValue: defaultSelected,
    onChange: onSelectedChange
  })
  const [expanded, setExpanded] = useControllableState({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange
  })
  const [focusedId, setFocusedId] = useState<string | undefined>(data[0]?.id)
  const containerRef = useRef<HTMLDivElement>(null)

  const expandedSet = useMemo(() => new Set(expanded), [expanded])
  const selectedSet = useMemo(() => new Set(selected), [selected])
  const flatItems = useMemo(() => flattenVisible(data, expandedSet), [data, expandedSet])

  const focusItem = (id: string) => {
    setFocusedId(id)
    requestAnimationFrame(() => {
      containerRef.current
        ?.querySelector<HTMLElement>(`[data-tree-id="${CSS.escape(id)}"]`)
        ?.focus()
    })
  }

  const toggleExpanded = (id: string, next?: boolean) => {
    const isExpanded = expandedSet.has(id)
    const shouldExpand = next ?? !isExpanded
    if (shouldExpand === isExpanded) return
    setExpanded(shouldExpand ? [...expanded, id] : expanded.filter(x => x !== id))
  }

  const selectNode = (node: TreeNode) => {
    if (node.disabled) return
    if (multiSelect) {
      setSelected(
        selectedSet.has(node.id) ? selected.filter(x => x !== node.id) : [...selected, node.id]
      )
    } else {
      setSelected([node.id])
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, item: FlatItem) => {
    const currentIndex = flatItems.findIndex(i => i.node.id === item.node.id)
    const hasChildren = Boolean(item.node.children?.length)
    const isExpanded = expandedSet.has(item.node.id)

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        const next = flatItems[currentIndex + 1]
        if (next) focusItem(next.node.id)
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        const prev = flatItems[currentIndex - 1]
        if (prev) focusItem(prev.node.id)
        break
      }
      case 'ArrowRight': {
        event.preventDefault()
        if (hasChildren && !isExpanded) {
          toggleExpanded(item.node.id, true)
        } else if (hasChildren) {
          const next = flatItems[currentIndex + 1]
          if (next) focusItem(next.node.id)
        }
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        if (hasChildren && isExpanded) {
          toggleExpanded(item.node.id, false)
        } else if (item.parentId) {
          focusItem(item.parentId)
        }
        break
      }
      case 'Home': {
        event.preventDefault()
        const first = flatItems[0]
        if (first) focusItem(first.node.id)
        break
      }
      case 'End': {
        event.preventDefault()
        const last = flatItems[flatItems.length - 1]
        if (last) focusItem(last.node.id)
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        selectNode(item.node)
        break
      }
    }
  }

  return (
    <div
      ref={containerRef}
      data-slot="tree-view"
      role="tree"
      aria-multiselectable={multiSelect}
      className={cn('flex flex-col text-sm', className)}
    >
      {flatItems.map(item => {
        const { node, depth, index, siblingCount } = item
        const hasChildren = Boolean(node.children?.length)
        const isExpanded = expandedSet.has(node.id)
        const isSelected = selectedSet.has(node.id)
        const isFocused = focusedId === node.id
        const Icon = node.icon

        return (
          <div
            key={node.id}
            data-tree-id={node.id}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSelected}
            aria-disabled={node.disabled}
            aria-level={depth + 1}
            aria-setsize={siblingCount}
            aria-posinset={index + 1}
            tabIndex={isFocused ? 0 : -1}
            onFocus={() => setFocusedId(node.id)}
            onKeyDown={event => handleKeyDown(event, item)}
            onClick={() => {
              if (node.disabled) return
              selectNode(node)
              // Row click also toggles; the chevron's own onClick
              // stopPropagation()s to avoid a double-toggle.
              if (hasChildren) toggleExpanded(node.id)
            }}
            style={{ paddingLeft: depth * 20 }}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 pr-2 outline-none select-none',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:ring-ring focus-visible:ring-2',
              isSelected && !multiSelect && 'bg-accent text-accent-foreground font-medium',
              node.disabled && 'pointer-events-none opacity-50'
            )}
          >
            <button
              type="button"
              tabIndex={-1}
              // Decorative only — role="treeitem" already exposes expand state.
              aria-hidden="true"
              onClick={event => {
                event.stopPropagation()
                if (hasChildren) toggleExpanded(node.id)
              }}
              className={cn(
                'text-muted-foreground flex size-5 shrink-0 items-center justify-center rounded-sm',
                !hasChildren && 'invisible'
              )}
            >
              <ChevronRightIcon
                className={cn('size-3.5 transition-transform', isExpanded && 'rotate-90')}
              />
            </button>

            {multiSelect && (
              <Checkbox
                checked={isSelected}
                disabled={node.disabled}
                onCheckedChange={() => selectNode(node)}
                onClick={event => event.stopPropagation()}
                aria-label={`Select ${node.label}`}
                className="mr-0.5"
              />
            )}

            {Icon && <Icon className="text-muted-foreground size-4 shrink-0" />}
            <span className="truncate">{node.label}</span>
          </div>
        )
      })}
    </div>
  )
}
