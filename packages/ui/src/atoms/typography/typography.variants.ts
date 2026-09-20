import { cva } from 'class-variance-authority'
import type { JSX } from 'react'

export const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 font-heading text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 font-heading text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 font-heading text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 font-heading text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 font-heading text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 font-heading text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2'
    }
  },
  defaultVariants: {
    variant: 'p'
  }
})

export type TypographyVariant = NonNullable<Parameters<typeof typographyVariants>[0]>['variant']

export const TYPOGRAPHY_DEFAULT_TAG: Record<
  NonNullable<TypographyVariant>,
  keyof JSX.IntrinsicElements
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
  list: 'ul'
}
