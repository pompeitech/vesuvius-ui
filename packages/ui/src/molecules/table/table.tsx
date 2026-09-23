import type { HTMLAttributes, Ref, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b !bg-transparent', className)}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

export function TableFooter({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // hover/selected are also `!`-marked, not just the resting state:
        // an `!important` rule always beats a non-important one regardless
        // of specificity, so a plain (non-important) hover/selected utility
        // would never win against the resting `!bg-transparent` below once
        // it's forced important.
        'hover:!bg-muted/50 data-[state=selected]:!bg-muted !bg-transparent',
        '!border-x-0 !border-t-0 border-b transition-colors',
        className
      )}
      {...props}
    />
  )
}

export function TableHead({
  className,
  ref,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: Ref<HTMLTableCellElement>
}) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 !px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        '!border-0 !bg-transparent !py-0',
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        '!p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        '!border-0 !bg-transparent',
        className
      )}
      {...props}
    />
  )
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}
