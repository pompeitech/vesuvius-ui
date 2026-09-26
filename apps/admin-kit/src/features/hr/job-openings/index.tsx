import {
  getCandidates,
  getDepartments,
  getJobOpenings,
  type Candidate,
  type Department,
  type JobOpening
} from '@pompeitech/mock-data'
import { DataTable, Typography } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { buildJobOpeningColumns } from './components/columns'

export async function loader() {
  const [jobOpenings, departments, candidates] = await Promise.all([
    getJobOpenings({ pageSize: 100 }),
    getDepartments({ pageSize: 50 }),
    getCandidates({ pageSize: 500 })
  ])
  return {
    jobOpenings: jobOpenings.data,
    departments: departments.data,
    candidates: candidates.data
  }
}

export function Component() {
  const { jobOpenings, departments, candidates } = useLoaderData() as {
    jobOpenings: JobOpening[]
    departments: Department[]
    candidates: Candidate[]
  }
  const navigate = useNavigate()

  const departmentsById = useMemo(() => new Map(departments.map(d => [d.id, d])), [departments])
  const candidateCountByJob = useMemo(() => {
    const counts = new Map<string, number>()
    for (const candidate of candidates) {
      counts.set(candidate.jobOpeningId, (counts.get(candidate.jobOpeningId) ?? 0) + 1)
    }
    return counts
  }, [candidates])

  const columns = useMemo(
    () => buildJobOpeningColumns(departmentsById, candidateCountByJob),
    [departmentsById, candidateCountByJob]
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Typography as="h1" variant="h3">
          Job Openings
        </Typography>
        <Typography variant="muted">
          Every open, on-hold, and closed position — open one for its candidate pipeline.
        </Typography>
      </div>

      <DataTable
        columns={columns}
        data={jobOpenings}
        getRowId={row => row.id}
        onRowClick={row => navigate(`/hr/recruiting-pipeline/${row.id}`)}
        searchPlaceholder="Search positions..."
      />
    </div>
  )
}
