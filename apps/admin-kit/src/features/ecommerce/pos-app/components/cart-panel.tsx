import type { PaymentMethod, Product } from '@pompeitech/mock-data'
import { Button, cn } from '@pompeitech/vesuvius-ui'
import { CreditCardIcon, MinusIcon, PlusIcon, QrCodeIcon, WalletIcon, XIcon } from 'lucide-react'
import { currency } from '../../_shared/format'

export type CartEntry = { product: Product; quantity: number }

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: typeof WalletIcon }[] = [
  { value: 'cash', label: 'Cash', icon: WalletIcon },
  { value: 'debit_card', label: 'Debit', icon: CreditCardIcon },
  { value: 'credit_card', label: 'Scan', icon: QrCodeIcon }
]

type CartPanelProps = {
  entries: CartEntry[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: PaymentMethod
  onSelectPaymentMethod: (method: PaymentMethod) => void
  onIncrement: (productId: string) => void
  onDecrement: (productId: string) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
}

/** The "Draft" column — the running sale, tax/total, payment method, and checkout. Not persisted across navigation: a POS sale in progress resetting when you leave the terminal is correct, not a bug. */
export function CartPanel({
  entries,
  subtotal,
  tax,
  total,
  paymentMethod,
  onSelectPaymentMethod,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout
}: CartPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-md border">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {entries.length === 0 ? (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="text-sm text-muted-foreground">Tap a product to add it to the sale.</p>
          </div>
        ) : (
          entries.map(({ product, quantity }, index) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border-b px-3 py-2.5 last:border-b-0"
            >
              <span className="w-4 shrink-0 text-xs text-muted-foreground">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground">{product.category}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6"
                  onClick={() => onDecrement(product.id)}
                  aria-label={`Remove one ${product.name}`}
                >
                  <MinusIcon className="size-3" />
                </Button>
                <span className="w-5 text-center text-sm tabular-nums">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6"
                  onClick={() => onIncrement(product.id)}
                  aria-label={`Add one more ${product.name}`}
                >
                  <PlusIcon className="size-3" />
                </Button>
              </div>
              <span className="w-16 shrink-0 text-right text-sm font-medium tabular-nums">
                {currency.format(product.price * quantity)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 shrink-0 text-muted-foreground"
                onClick={() => onRemove(product.id)}
                aria-label={`Remove ${product.name} from sale`}
              >
                <XIcon className="size-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums">{currency.format(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="tabular-nums">{currency.format(tax)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t pt-1 text-base font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{currency.format(total)}</span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSelectPaymentMethod(value)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-md border py-2.5 text-xs transition-colors',
                paymentMethod === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'hover:bg-muted'
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <Button
          className="mt-3 w-full"
          size="lg"
          disabled={entries.length === 0}
          onClick={onCheckout}
        >
          Checkout {currency.format(total)}
        </Button>
      </div>
    </div>
  )
}
