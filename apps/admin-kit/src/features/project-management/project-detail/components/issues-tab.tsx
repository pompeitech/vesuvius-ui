import type { Issue, Member } from '@pompeitech/mock-data'
import { DataTable } from '@pompeitech/vesuvius-ui'
import { useMemo } from 'react'
import { buildIssueColumns } from './issues-columns'

type IssuesTabProps = {
  issues: Issue[]
  membersById: Map<string, Member>
  onOpenIssue: (issue: Issue) => void
}

/** Every issue on the project as a sortable, filterable table — click a row for the full detail. */
export function IssuesTab({ issues, membersById, onOpenIssue }: IssuesTabProps) {
  const columns = useMemo(() => buildIssueColumns(membersById), [membersById])

  return (
    <DataTable
      columns={columns}
      data={issues}
      getRowId={row => row.id}
      searchPlaceholder="Search issues..."
      onRowClick={onOpenIssue}
    />
  )
}
