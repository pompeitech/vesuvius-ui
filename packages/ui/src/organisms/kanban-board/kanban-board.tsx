import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core'
import { useMemo, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type KanbanColumn<TColumnId extends string = string> = {
  id: TColumnId
  title: ReactNode
  count?: number
}

export type KanbanBoardProps<TItem, TColumnId extends string = string> = {
  columns: KanbanColumn<TColumnId>[]
  items: TItem[]
  getItemId: (item: TItem) => string
  getItemColumn: (item: TItem) => TColumnId
  onItemMove: (item: TItem, columnId: TColumnId) => void
  renderItem: (item: TItem) => ReactNode
  className?: string
  columnClassName?: string
  columnWidth?: string
}

type DropTarget = {
  type: 'item' | 'column'
  columnId: string
  itemId?: string
}

function DropPlaceholder() {
  return (
    <div
      aria-label="Drop position"
      className="border-primary bg-primary/10 text-primary flex min-h-20 items-center justify-center rounded-md border-2 border-dashed px-3 text-xs font-medium"
    >
      Drop card here
    </div>
  )
}

function DraggableItem({
  id,
  columnId,
  children
}: {
  id: string
  columnId: string
  children: ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef
  } = useDraggable({
    id
  })
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `item:${id}`,
    data: { type: 'item', itemId: id, columnId }
  })

  return (
    <div
      ref={node => {
        setDraggableRef(node)
        setDroppableRef(node)
      }}
      {...listeners}
      {...attributes}
      className="transition-[margin,opacity] duration-150"
    >
      {children}
    </div>
  )
}

function BoardColumn<TItem, TColumnId extends string>({
  column,
  items,
  getItemId,
  renderItem,
  columnClassName,
  columnWidth,
  activeId,
  activeColumnId,
  overTarget
}: {
  column: KanbanColumn<TColumnId>
  items: TItem[]
  getItemId: (item: TItem) => string
  renderItem: (item: TItem) => ReactNode
  columnClassName?: string
  columnWidth: string
  activeId: string | null
  activeColumnId: string | null
  overTarget: DropTarget | null
}) {
  const { setNodeRef } = useDroppable({
    id: `column:${column.id}`,
    data: { type: 'column', columnId: column.id }
  })
  const isTarget = activeId !== null && overTarget?.columnId === column.id
  const activeIndex = items.findIndex(item => getItemId(item) === activeId)
  const targetIndex =
    overTarget?.type === 'item'
      ? items.findIndex(item => getItemId(item) === overTarget.itemId)
      : items.length
  const placeholderIndex = isTarget
    ? Math.max(0, targetIndex < 0 ? items.length : targetIndex)
    : activeColumnId === column.id
      ? activeIndex
      : -1

  return (
    <section
      ref={setNodeRef}
      aria-label={typeof column.title === 'string' ? column.title : undefined}
      className={cn(
        'bg-muted/30 flex h-full min-w-0 shrink-0 flex-col gap-2 rounded-md border p-3 transition-all',
        isTarget && 'border-primary bg-primary/5 ring-primary/20 shadow-md ring-2',
        columnClassName
      )}
      style={{ flex: '1 1 0', minWidth: columnWidth }}
    >
      <header className="flex shrink-0 items-center justify-between px-1">
        <span className="text-sm font-medium">{column.title}</span>
        {column.count !== undefined && (
          <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {column.count}
          </span>
        )}
      </header>
      <div className="min-h-16 min-w-0 flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col gap-2">
          {items.map((item, index) => {
            const id = getItemId(item)
            const isActive = id === activeId
            return (
              <div key={id} className="contents">
                {placeholderIndex === index && <DropPlaceholder />}
                {!isActive && (
                  <DraggableItem id={id} columnId={column.id}>
                    {renderItem(item)}
                  </DraggableItem>
                )}
              </div>
            )
          })}
          {placeholderIndex === items.length && <DropPlaceholder />}
          {items.length === 0 && placeholderIndex < 0 && (
            <div className="text-muted-foreground flex min-h-20 items-center justify-center rounded-md border border-dashed text-xs">
              No cards
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function KanbanBoard<TItem, TColumnId extends string = string>({
  columns,
  items,
  getItemId,
  getItemColumn,
  onItemMove,
  renderItem,
  className,
  columnClassName,
  columnWidth = '16rem'
}: KanbanBoardProps<TItem, TColumnId>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null)
  const [overTarget, setOverTarget] = useState<DropTarget | null>(null)

  const activeItem = useMemo(
    () => items.find(item => getItemId(item) === activeId),
    [activeId, getItemId, items]
  )

  const resetDrag = () => {
    setActiveId(null)
    setActiveColumnId(null)
    setOverTarget(null)
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    const id = String(active.id)
    const item = items.find(candidate => getItemId(candidate) === id)
    setActiveId(id)
    setActiveColumnId(item ? getItemColumn(item) : null)
    setOverTarget(item ? { type: 'column', columnId: getItemColumn(item) } : null)
  }

  const handleDragOver = ({ over }: DragOverEvent) => {
    if (!over) return
    const data = over.data.current as DropTarget | undefined
    if (data) setOverTarget(data)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) {
      const data = over.data.current as DropTarget | undefined
      const columnId = data?.columnId ?? String(over.id).replace('column:', '')
      const item = items.find(candidate => getItemId(candidate) === active.id)
      const column = columns.find(candidate => candidate.id === columnId)
      if (item && column && getItemColumn(item) !== column.id) {
        onItemMove(item, column.id)
      }
    }
    resetDrag()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={resetDrag}
      onDragEnd={handleDragEnd}
    >
      <div className={cn('flex h-full w-full min-w-0 gap-4 overflow-x-auto pb-2', className)}>
        {columns.map(column => (
          <BoardColumn
            key={column.id}
            column={column}
            items={items.filter(item => getItemColumn(item) === column.id)}
            getItemId={getItemId}
            renderItem={renderItem}
            columnClassName={columnClassName}
            columnWidth={columnWidth}
            activeId={activeId}
            activeColumnId={activeColumnId}
            overTarget={overTarget}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <div className="rotate-[1deg] cursor-grabbing shadow-xl">{renderItem(activeItem)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
