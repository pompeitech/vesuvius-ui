import type { Issue } from '@pompeitech/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@pompeitech/vesuvius-ui'

const NONE_VALUE = 'none'

type ParentEpicSelectProps = {
  /** The issue being edited — excluded from its own epic options. */
  issue: Pick<Issue, 'id' | 'parentId' | 'type'>
  /** Every issue in the same project — filtered down to epics here. */
  projectIssues: Issue[]
  onChange: (parentId: string | undefined) => void
  className?: string
}

/**
 * "Principale" — picks which epic (if any) this issue belongs to. Shared
 * by the Board card's inline picker and the issue detail sidebar so the
 * epic-option logic (same project, epics only, not itself) can't drift
 * between the two.
 */
export function ParentEpicSelect({
  issue,
  projectIssues,
  onChange,
  className
}: ParentEpicSelectProps) {
  const epicOptions = projectIssues.filter(
    candidate => candidate.type === 'epic' && candidate.id !== issue.id
  )

  return (
    <Select
      value={issue.parentId ?? NONE_VALUE}
      onValueChange={value => onChange(value === NONE_VALUE ? undefined : value)}
    >
      <SelectTrigger size="sm" className={className}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE_VALUE}>None</SelectItem>
        {epicOptions.map(epic => (
          <SelectItem key={epic.id} value={epic.id}>
            {epic.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
