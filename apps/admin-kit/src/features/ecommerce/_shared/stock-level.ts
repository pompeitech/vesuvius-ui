export type StockLevel = 'Low' | 'Medium' | 'High'

export function stockLevel(stock: number): StockLevel {
  if (stock <= 30) return 'Low'
  if (stock <= 150) return 'Medium'
  return 'High'
}

export const STOCK_LEVEL_TEXT_COLOR: Record<StockLevel, string> = {
  Low: 'text-destructive',
  Medium: 'text-warning',
  High: 'text-success'
}

export const STOCK_LEVEL_BAR_COLOR: Record<StockLevel, string> = {
  Low: 'bg-destructive',
  Medium: 'bg-warning',
  High: 'bg-success'
}

export const STOCK_LEVEL_OPTIONS = (['Low', 'Medium', 'High'] satisfies StockLevel[]).map(
  level => ({
    label: level,
    value: level
  })
)
