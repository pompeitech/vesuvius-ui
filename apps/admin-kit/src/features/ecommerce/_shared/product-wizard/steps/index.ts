import { StepBasics } from './step-basics'
import { StepDimensions } from './step-dimensions'
import { StepInventory } from './step-inventory'
import { StepPricing } from './step-pricing'

export { StepBasics, StepDimensions, StepInventory, StepPricing }

/** One entry per step, same order as `STEP_META`/`STEP_FIELDS` in ../schema — indexed by `activeStep`. */
export const WIZARD_STEP_COMPONENTS = [StepBasics, StepPricing, StepInventory, StepDimensions]
