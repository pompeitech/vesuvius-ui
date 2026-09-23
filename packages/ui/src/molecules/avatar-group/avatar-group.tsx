import { Children, type HTMLAttributes, type ReactNode, useState } from 'react'
import type { AvatarProps } from '../../atoms/avatar/avatar'
import { avatarVariants } from '../../atoms/avatar/avatar.variants'
import { cn } from '../../lib/utils'

export type AvatarGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
  max?: number
  size?: AvatarProps['size']
  shape?: AvatarProps['shape']
  spacing?: number
  expandedSpacing?: number
}

export function AvatarGroup({
  children,
  max = 5,
  size = 'default',
  shape = 'circle',
  spacing = -12,
  expandedSpacing = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const [expanded, setExpanded] = useState(false)
  const items = Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  const margin = expanded ? expandedSpacing : spacing

  return (
    <div
      data-slot="avatar-group"
      className={cn('flex items-center', className)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      {...props}
    >
      {visible.map((child, index) => (
        <div
          key={index}
          className={cn(
            'ring-background ring-2 transition-[margin] duration-200 ease-out',
            shape === 'circle' ? 'rounded-full' : 'rounded-md'
          )}
          style={{
            marginLeft: index === 0 ? 0 : margin,
            zIndex: visible.length - index
          }}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            avatarVariants({ shape, size }),
            'bg-muted text-muted-foreground ring-background items-center justify-center text-xs font-medium ring-2 transition-[margin] duration-200 ease-out'
          )}
          style={{ marginLeft: margin, zIndex: 0 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
