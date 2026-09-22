import { cva } from 'class-variance-authority'
import { controlHeightClassNames } from '../../lib/control-size'

export const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
      },
      // Same height + horizontal padding scale as every other single-line
      // control (Button, Input, Select...) — min-w mirrors the height so an
      // icon-only toggle stays roughly square instead of shrink-wrapping.
      size: {
        xs: `${controlHeightClassNames.xs} min-w-7 px-2.5`,
        sm: `${controlHeightClassNames.sm} min-w-8 px-3`,
        default: `${controlHeightClassNames.default} min-w-9 px-3`,
        lg: `${controlHeightClassNames.lg} min-w-10 px-3.5`
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
