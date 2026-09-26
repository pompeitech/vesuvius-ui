import { Form } from '@admin/form'
import type { ProductStatus } from '@pompeitech/mock-data'

import { type ProductWizardInput, type ProductWizardOutput, STEP_META } from './schema'
import { WIZARD_STEP_COMPONENTS } from './steps'
import { useProductWizard } from './use-product-wizard'
import { WizardFooter } from './wizard-footer'
import { WizardHeader } from './wizard-header'
import { WizardSidebar } from './wizard-sidebar'

export type ProductWizardFormProps = {
  mode: 'add' | 'edit'
  defaultValues: ProductWizardInput
  onSaved: (values: ProductWizardOutput, status: ProductStatus) => void
}

export function ProductWizardForm({ mode, defaultValues, onSaved }: ProductWizardFormProps) {
  const wizard = useProductWizard({ defaultValues, onSaved })
  const ActiveStep = WIZARD_STEP_COMPONENTS[wizard.activeStep]

  return (
    <Form {...wizard.form}>
      <div className="flex h-full flex-col gap-6">
        <WizardHeader
          mode={mode}
          onFillStep={wizard.fillStep}
          onFillWizard={wizard.fillWizard}
          onClearTestData={wizard.clearTestData}
          onSaveDraft={wizard.saveDraft}
          onSave={wizard.handleSaveProduct}
        />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="min-h-0 overflow-y-auto pr-1">{ActiveStep && <ActiveStep />}</div>

          <WizardSidebar
            completedCount={wizard.completedSteps.size}
            totalSteps={STEP_META.length}
            draftSaved={wizard.draftSaved}
            steps={wizard.stepperSteps}
            activeStep={wizard.activeStep}
            onStepClick={wizard.goToStep}
            onReset={wizard.clearTestData}
          />
        </div>

        <WizardFooter
          activeStep={wizard.activeStep}
          totalSteps={STEP_META.length}
          stepTitle={STEP_META[wizard.activeStep]?.title ?? ''}
          mode={mode}
          onPrevious={wizard.goToPrevious}
          onNext={wizard.goNext}
        />
      </div>
    </Form>
  )
}
