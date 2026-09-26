import { getPayrollRun, type PayrollRun } from '@pompeitech/mock-data'
import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmployeeTable } from './components/employee-table'
import { SummaryCards } from './components/summary-cards'

export async function loader({ params }: LoaderFunctionArgs) {
  const run = params.period ? getPayrollRun(params.period) : undefined
  if (!run) {
    throw new Response('Payroll run not found', { status: 404 })
  }
  return run
}

export function Component() {
  const run = useLoaderData() as PayrollRun

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          {run.label}
        </Typography>
        <Typography variant="muted">Payroll run breakdown for every employee.</Typography>
      </div>

      <SummaryCards run={run} />

      <Card>
        <CardContent>
          <EmployeeTable rows={run.rows} />
        </CardContent>
      </Card>
    </div>
  )
}
