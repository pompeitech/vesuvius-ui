import { cva } from 'class-variance-authority'

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md'
    },
    size: {
      sm: 'size-6',
      default: 'size-8',
      lg: 'size-10',
      xl: 'size-14'
    }
  },
  defaultVariants: {
    shape: 'circle',
    size: 'default'
  }
})
