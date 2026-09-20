import { cva } from 'class-variance-authority'
import { controlHeightClassNames } from '../../lib/control-size'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary-emphasis underline-offset-4 hover:underline'
      },
      size: {
        xs: `${controlHeightClassNames.xs} rounded-md px-2.5 text-xs`,
        sm: `${controlHeightClassNames.sm} rounded-md px-3 text-xs`,
        default: `${controlHeightClassNames.default} px-4 text-sm`,
        lg: `${controlHeightClassNames.lg} rounded-md px-6 text-sm`,
        'icon-xs': 'size-7',
        'icon-sm': 'size-8',
        icon: 'size-9',
        'icon-lg': 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
