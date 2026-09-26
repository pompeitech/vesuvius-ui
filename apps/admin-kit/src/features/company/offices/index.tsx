import type { Office } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
  toast
} from '@pompeitech/vesuvius-ui'
import {
  MapPinIcon,
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { useOfficesStore } from '../_shared/offices-store'
import { OfficeDialog } from './components/office-dialog'
import type { OfficeFormOutput } from './schema'

export function Component() {
  const [offices, setOffices] = useOfficesStore()
  const [dialogTarget, setDialogTarget] = useState<Office | 'new' | undefined>()

  const handleSubmit = (values: OfficeFormOutput) => {
    if (dialogTarget && dialogTarget !== 'new') {
      setOffices(prev => prev.map(o => (o.id === dialogTarget.id ? { ...o, ...values } : o)))
      toast.success(`Updated ${values.name}.`)
    } else {
      const office: Office = { id: crypto.randomUUID(), ...values }
      setOffices(prev => [...prev, office])
      toast.success(`Added ${office.name}.`)
    }
  }

  const handleDelete = (office: Office) => {
    setOffices(prev => prev.filter(o => o.id !== office.id))
    toast.success(`Removed ${office.name}.`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Typography as="h1" variant="h3">
            Offices
          </Typography>
          <Typography variant="muted">
            Every company location — the Time Clock's "Assigned to" picker and on-site geofencing
            both read this list.
          </Typography>
        </div>
        <Button onClick={() => setDialogTarget('new')}>
          <PlusIcon />
          Add Office
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offices.map(office => (
          <Card key={office.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div className="flex items-start gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <MapPinIcon className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-1.5 text-base">
                    {office.name}
                    {office.isHeadquarters && (
                      <StarIcon className="size-3.5 fill-highlight text-highlight" />
                    )}
                  </CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {office.city}, {office.country}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreVerticalIcon />
                    <span className="sr-only">Office actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setDialogTarget(office)}>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onSelect={() => handleDelete(office)}>
                    <Trash2Icon />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{office.address}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {office.lat.toFixed(4)}, {office.lng.toFixed(4)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <OfficeDialog
        office={dialogTarget}
        onOpenChange={open => !open && setDialogTarget(undefined)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
