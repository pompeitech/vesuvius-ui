import { useZodForm } from '@admin/form'
import type { ProductStatus } from '@pompeitech/mock-data'
import { type StepperStep, toast } from '@pompeitech/vesuvius-ui'
import { useState } from 'react'
import { FAKE_DATA } from './sample-data'
import {
  type ProductWizardInput,
  type ProductWizardOutput,
  productWizardSchema,
  STEP_FIELDS,
  STEP_META
} from './schema'

type UseProductWizardOptions = {
  defaultValues: ProductWizardInput
  onSaved: (values: ProductWizardOutput, status: ProductStatus) => void
}

export function useProductWizard({ defaultValues, onSaved }: UseProductWizardOptions) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [draftSaved, setDraftSaved] = useState(false)

  const form = useZodForm(productWizardSchema, { defaultValues })

  function onSubmit(values: ProductWizardOutput) {
    onSaved(values, values.status)
  }

  /** Validates only the current step, then advances — or submits, on the last step. */
  async function goNext() {
    const valid = await form.trigger(STEP_FIELDS[activeStep])
    if (!valid) return
    setCompletedSteps(prev => new Set(prev).add(activeStep))
    if (activeStep === STEP_META.length - 1) {
      form.handleSubmit(onSubmit)()
      return
    }
    setActiveStep(step => step + 1)
  }

  function goToPrevious() {
    setActiveStep(step => Math.max(0, step - 1))
  }

  /** Jumps to any step already reached — never skips ahead of the furthest completed one. */
  function goToStep(index: number) {
    const furthestAllowed = Math.max(0, ...Array.from(completedSteps).map(s => s + 1))
    if (index <= furthestAllowed) setActiveStep(index)
  }

  function fillStep(index: number) {
    form.reset({ ...form.getValues(), ...FAKE_DATA[index] })
    setCompletedSteps(prev => new Set(prev).add(index))
    toast.success(`"${STEP_META[index]?.title}" filled with sample data.`)
  }

  function fillWizard() {
    form.reset(
      FAKE_DATA.reduce((values, step) => ({ ...values, ...step }), {
        ...form.getValues()
      })
    )
    setCompletedSteps(new Set(STEP_META.map((_, index) => index)))
    toast.success('All steps now have sample data for faster testing.')
  }

  function clearTestData() {
    form.reset(defaultValues)
    setCompletedSteps(new Set())
    setActiveStep(0)
    toast.info('Test data cleared.')
  }

  function saveDraft() {
    setDraftSaved(true)
    toast.success('Draft saved.')
  }

  /** Validates every step (not just the current one) and jumps to the first invalid step if any fail. */
  async function handleSaveProduct() {
    const valid = await form.trigger()
    if (!valid) {
      const errorFields = Object.keys(form.formState.errors)
      const stepIndex = STEP_FIELDS.findIndex(fields =>
        fields.some(field => errorFields.includes(field))
      )
      if (stepIndex !== -1) setActiveStep(stepIndex)
      toast.error('Fix the highlighted fields before saving.')
      return
    }
    form.handleSubmit(onSubmit)()
  }

  const stepperSteps: StepperStep[] = STEP_META.map((step, index) => ({
    ...step,
    status: completedSteps.has(index) ? 'completed' : index === activeStep ? 'active' : 'upcoming'
  }))

  return {
    form,
    activeStep,
    completedSteps,
    draftSaved,
    stepperSteps,
    goNext,
    goToPrevious,
    goToStep,
    fillStep,
    fillWizard,
    clearTestData,
    saveDraft,
    handleSaveProduct
  }
}
