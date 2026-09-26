import { Button, ToggleGroup, ToggleGroupItem, Typography } from '@pompeitech/vesuvius-ui'
import { DownloadIcon, PlusIcon } from 'lucide-react'

/** Title + the date-range toggle and Export/New Transaction actions. */
export function FinanceHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          Ecommerce App
        </Typography>
        <Typography variant="muted">
          Finance overview — revenue, costs, and every transaction.
        </Typography>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup type="single" defaultValue="1y" variant="outline">
          <ToggleGroupItem value="1y">1 Year</ToggleGroupItem>
          <ToggleGroupItem value="3m">3 Months</ToggleGroupItem>
          <ToggleGroupItem value="30d">30 Days</ToggleGroupItem>
        </ToggleGroup>
        <Button variant="outline">
          <DownloadIcon />
          Export
        </Button>
        <Button>
          <PlusIcon />
          New Transaction
        </Button>
      </div>
    </div>
  )
}
