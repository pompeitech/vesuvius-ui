import type { Product } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Switch,
  toast,
  Typography
} from '@pompeitech/vesuvius-ui'
import { ArchiveIcon, CopyIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PRODUCT_STATUS_VARIANT } from '../../_shared/product-status'

/** Title, status/summary chips, the Active toggle, and the Edit/Clone/more-actions row. */
export function DetailHeader({ product }: { product: Product }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(product.status === 'active')

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {product.name}
        </Typography>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={PRODUCT_STATUS_VARIANT[product.status]} className="capitalize">
            {product.status}
          </Badge>
          <span>·</span>
          <span>{product.sku}</span>
          <span>·</span>
          <span>{product.category}</span>
          <span>·</span>
          <span>{product.stock > 0 ? 'Stocked product' : 'Out of stock'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-md border px-3 py-1.5">
          <Switch
            checked={active}
            onCheckedChange={checked => {
              setActive(checked)
              toast.info(
                `"${product.name}" marked ${checked ? 'active' : 'inactive'} (not persisted).`
              )
            }}
          />
          <span className="text-sm font-medium">{active ? 'Active' : 'Inactive'}</span>
        </div>
        <Button variant="outline" onClick={() => navigate(`/ecommerce/edit-product/${product.id}`)}>
          <PencilIcon />
          Edit
        </Button>
        <Button variant="outline" onClick={() => toast.success(`Duplicated "${product.name}".`)}>
          <CopyIcon />
          Clone
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontalIcon />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success(`Archived "${product.name}".`)}>
              <ArchiveIcon />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => toast.success(`Deleted "${product.name}".`)}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
