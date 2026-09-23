import type { HTMLAttributes } from 'react'
import {
  type Breakpoint,
  GAP_CLASSES,
  type Gap,
  type Responsive,
  resolveResponsive
} from '../../lib/responsive'
import { cn } from '../../lib/utils'

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

const DIRECTION_CLASSES: Record<Breakpoint, Record<Direction, string>> = {
  base: {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
  },
  sm: {
    row: 'sm:flex-row',
    column: 'sm:flex-col',
    'row-reverse': 'sm:flex-row-reverse',
    'column-reverse': 'sm:flex-col-reverse'
  },
  md: {
    row: 'md:flex-row',
    column: 'md:flex-col',
    'row-reverse': 'md:flex-row-reverse',
    'column-reverse': 'md:flex-col-reverse'
  },
  lg: {
    row: 'lg:flex-row',
    column: 'lg:flex-col',
    'row-reverse': 'lg:flex-row-reverse',
    'column-reverse': 'lg:flex-col-reverse'
  },
  xl: {
    row: 'xl:flex-row',
    column: 'xl:flex-col',
    'row-reverse': 'xl:flex-row-reverse',
    'column-reverse': 'xl:flex-col-reverse'
  }
}

const ALIGN_CLASSES: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline'
}

const JUSTIFY_CLASSES: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: Responsive<Direction>
  align?: Align
  justify?: Justify
  wrap?: boolean
  gap?: Responsive<Gap>
}

export function Stack({
  direction = 'column',
  align,
  justify,
  wrap,
  gap = 0,
  className,
  ...props
}: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(
        'flex',
        ...resolveResponsive(direction, DIRECTION_CLASSES),
        ...resolveResponsive(gap, GAP_CLASSES),
        align && ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    />
  )
}
