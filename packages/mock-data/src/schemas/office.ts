import { z } from 'zod'

/**
 * A physical company location — city/country double as the exact string
 * `Employee.location`/`Shift.location` use elsewhere ("Milan, IT"), so an
 * employee's assigned office and this list line up without a separate id
 * reference. Managed on the Offices settings page; the Time Clock's
 * office picker and geofencing both read from the same list.
 */
export const officeSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  country: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  isHeadquarters: z.boolean()
})

export type Office = z.infer<typeof officeSchema>
