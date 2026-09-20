import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type { VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ComponentRef, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { avatarVariants } from './avatar.variants'

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>

export const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, shape, size, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ shape, size }), className)}
      {...props}
    />
  )
)
Avatar.displayName = 'Avatar'

export const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  ComponentProps<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn('aspect-square size-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentProps<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      'bg-muted flex size-full items-center justify-center text-sm font-medium',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'
