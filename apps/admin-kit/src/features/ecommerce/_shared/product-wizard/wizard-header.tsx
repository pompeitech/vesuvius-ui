import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Typography
} from '@pompeitech/vesuvius-ui'
import { ChevronDownIcon, SparklesIcon } from 'lucide-react'
import { STEP_META } from './schema'

type WizardHeaderProps = {
  mode: 'add' | 'edit'
  onFillStep: (index: number) => void
  onFillWizard: () => void
  onClearTestData: () => void
  onSaveDraft: () => void
  onSave: () => void
}

/** Title + the "Test data" quick-fill menu + the draft/save actions — same row on every step. */
export function WizardHeader({
  mode,
  onFillStep,
  onFillWizard,
  onClearTestData,
  onSaveDraft,
  onSave
}: WizardHeaderProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-start justify-between gap-4">
      <div>
        <Typography as="h1" variant="h3">
          {mode === 'add' ? 'Add Product' : 'Edit Product'}
        </Typography>
        <Typography variant="muted">
          Move through the product setup in order so identity, pricing, inventory, and unit data
          stay aligned before launch.
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              <SparklesIcon />
              Test data
              <ChevronDownIcon className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick fill</DropdownMenuLabel>
            {STEP_META.map((step, index) => (
              <DropdownMenuItem key={step.title} onClick={() => onFillStep(index)}>
                {step.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onFillWizard}>Fill entire wizard</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onClearTestData}>
              Clear test data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="button" variant="outline" onClick={onSaveDraft}>
          Save draft
        </Button>
        <Button type="button" onClick={onSave}>
          {mode === 'add' ? 'Save Product' : 'Update product'}
        </Button>
      </div>
    </div>
  )
}
