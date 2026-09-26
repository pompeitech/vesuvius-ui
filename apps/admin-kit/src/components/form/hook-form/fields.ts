import { FieldCheckbox, FieldSwitch } from './field-checkbox'
import { FieldDatePicker } from './field-date-picker'
import { FieldNumberInput } from './field-number-input'
import { FieldRadioGroup } from './field-radio-group'
import { FieldMultiSelect, FieldSelect } from './field-select'
import { FieldSlider } from './field-slider'
import { FieldText, FieldTextarea } from './field-text'
import { FieldUpload } from './field-upload'

export const Field = {
  Text: FieldText,
  Textarea: FieldTextarea,
  NumberInput: FieldNumberInput,
  Select: FieldSelect,
  MultiSelect: FieldMultiSelect,
  Checkbox: FieldCheckbox,
  Switch: FieldSwitch,
  RadioGroup: FieldRadioGroup,
  Slider: FieldSlider,
  DatePicker: FieldDatePicker,
  Upload: FieldUpload
}
