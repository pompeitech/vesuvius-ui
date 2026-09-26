import { Field } from '@admin/form'
import { PRODUCTS } from '@pompeitech/mock-data'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator
} from '@pompeitech/vesuvius-ui'
import { PlusIcon, XIcon } from 'lucide-react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { currency } from '../../format'
import { PRODUCT_OPTIONS, type OrderFormInput } from '../schema'

/** One line's live total — re-reads the catalog price for whichever product is currently selected on this row. */
function LineTotal({ index }: { index: number }) {
  const [productId, quantity] = useWatch<OrderFormInput>({
    name: [`items.${index}.productId`, `items.${index}.quantity`]
  }) as [string, string]
  const product = PRODUCTS.find(p => p.id === productId)
  const total = (product?.price ?? 0) * (Number(quantity) || 0)

  return (
    <span className="text-sm tabular-nums text-muted-foreground">{currency.format(total)}</span>
  )
}

/** The products on this order — each row a quantity of a catalog item, its price resolved live. */
export function ItemsSection() {
  const { control } = useFormContext<OrderFormInput>()
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
        <CardDescription>Add the products included in this order.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {fields.length > 0 && (
          <div className="hidden grid-cols-[1fr_6rem_6rem_2rem] gap-3 px-1 text-xs font-medium text-muted-foreground sm:grid">
            <span>Product</span>
            <span>Quantity</span>
            <span className="text-right">Total</span>
            <span />
          </div>
        )}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[1fr_6rem_6rem_2rem]"
          >
            <Field.Select
              name={`items.${index}.productId`}
              placeholder="Select product"
              options={PRODUCT_OPTIONS}
            />
            <Field.NumberInput name={`items.${index}.quantity`} placeholder="1" min={1} />
            <div className="flex h-9 items-center justify-end sm:pr-1">
              <LineTotal index={index} />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-0.5 justify-self-start text-muted-foreground sm:justify-self-auto"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <XIcon />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => append({ productId: '', quantity: '1' })}
        >
          <PlusIcon />
          Add item
        </Button>
        <Separator />
        <OrderTotals />
      </CardContent>
    </Card>
  )
}

/** Subtotal/shipping/tax/discount/total, recomputed live from the current items + the Payment section's fields. */
function OrderTotals() {
  const items = useWatch<OrderFormInput>({ name: 'items' }) as OrderFormInput['items']
  const shippingCost = Number(useWatch<OrderFormInput>({ name: 'shippingCost' }) ?? 0)
  const discount = Number(useWatch<OrderFormInput>({ name: 'discount' }) ?? 0)

  const subtotal = items.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.productId)
    return sum + (product?.price ?? 0) * (Number(item.quantity) || 0)
  }, 0)
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax - discount

  return (
    <dl className="flex flex-col gap-1.5 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="tabular-nums">{currency.format(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Shipping</dt>
        <dd className="tabular-nums">{currency.format(shippingCost)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Tax (8%)</dt>
        <dd className="tabular-nums">{currency.format(tax)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Discount</dt>
        <dd className="tabular-nums">-{currency.format(discount)}</dd>
      </div>
      <Separator className="my-1" />
      <div className="flex justify-between">
        <dt className="text-base font-semibold">Total</dt>
        <dd className="text-base font-semibold tabular-nums">{currency.format(total)}</dd>
      </div>
    </dl>
  )
}
