import type { Product } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
  Typography
} from '@pompeitech/vesuvius-ui'
import { CopyIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

type DetailHeaderProps = {
  product: Product
  variantCount: number
}

/** Title, status/summary chips, and the Add Variant/Edit/more-actions row. */
export function DetailHeader({ product, variantCount }: DetailHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {product.name}
        </Typography>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge
            variant={product.status === 'active' ? 'success' : 'secondary'}
            className="capitalize"
          >
            {product.status}
          </Badge>
          <span>·</span>
          <span>{variantCount} variants</span>
          <span>·</span>
          <span>{product.category}</span>
          <span>·</span>
          <span>{product.stock > 0 ? 'Stocked product' : 'Out of stock'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => toast.info("Adding variants isn't wired up in this demo.")}>
          <PlusIcon />
          Add Variant
        </Button>
        <Button variant="outline" onClick={() => navigate(`/ecommerce/edit-product/${product.id}`)}>
          <PencilIcon />
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontalIcon />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success(`Duplicated "${product.name}".`)}>
              <CopyIcon />
              Clone
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
