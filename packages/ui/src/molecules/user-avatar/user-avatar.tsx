import type { ComponentProps } from 'react'
import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from '../../atoms/avatar/avatar'
import { getAvatarColorClasses, getInitials } from '../../lib/avatar-utils'
import { cn } from '../../lib/utils'

export type UserAvatarProps = Omit<AvatarProps, 'children'> & {
  name: string
  src?: string
  fallbackClassName?: string
  imageProps?: Omit<ComponentProps<typeof AvatarImage>, 'src' | 'alt'>
}

export function UserAvatar({
  name,
  src,
  shape,
  size,
  className,
  fallbackClassName,
  imageProps,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar shape={shape} size={size} className={className} {...props}>
      {src && <AvatarImage src={src} alt={name} {...imageProps} />}
      <AvatarFallback className={cn(getAvatarColorClasses(name), fallbackClassName)}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
