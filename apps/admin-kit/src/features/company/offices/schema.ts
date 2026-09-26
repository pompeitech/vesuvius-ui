import { z } from 'zod'

export const officeFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
  address: z.string().min(1, 'Address is required.'),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  isHeadquarters: z.boolean()
})

export type OfficeFormOutput = z.output<typeof officeFormSchema>

export const OFFICE_FORM_DEFAULT_VALUES = {
  name: '',
  city: '',
  country: '',
  address: '',
  lat: 0,
  lng: 0,
  isHeadquarters: false
}
