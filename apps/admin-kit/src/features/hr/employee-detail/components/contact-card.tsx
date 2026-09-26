import type { Employee } from '@pompeitech/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'
import { CakeIcon, MailIcon, MapPinIcon, PhoneIcon, ShieldAlertIcon } from 'lucide-react'
import { InfoField } from '../../_shared/info-field'

const birthDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})

/** Work/personal email, phone, home address, birth date, and who to call in an emergency. */
export function ContactCard({ employee }: { employee: Employee }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & personal</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InfoField label="Work email" icon={MailIcon}>
          {employee.email}
        </InfoField>
        <InfoField label="Personal email" icon={MailIcon}>
          {employee.personalEmail ?? <span className="text-muted-foreground">Not on file</span>}
        </InfoField>
        <InfoField label="Phone" icon={PhoneIcon}>
          {employee.phone}
        </InfoField>
        <InfoField label="Birth date" icon={CakeIcon}>
          {birthDateFormatter.format(new Date(employee.birthDate))}
        </InfoField>
        <InfoField label="Address" icon={MapPinIcon}>
          {employee.address}
        </InfoField>
        <InfoField label="Emergency contact" icon={ShieldAlertIcon}>
          {employee.emergencyContactName}
          <span className="block text-muted-foreground">{employee.emergencyContactPhone}</span>
        </InfoField>
      </CardContent>
    </Card>
  )
}
