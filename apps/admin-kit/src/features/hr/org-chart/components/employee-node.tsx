import type { Employee } from '@pompeitech/mock-data'
import { cn, UserAvatar } from '@pompeitech/vesuvius-ui'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { UsersIcon } from 'lucide-react'

export type EmployeeNodeData = {
  employee: Employee
  departmentName: string
  departmentColor: string
  directReportCount: number
}

/**
 * One box in the org chart: avatar, name, title, a department color chip,
 * and a "N direct reports" badge. `Handle`s are the anchor points React
 * Flow draws edges from/to — top for "reports to", bottom for "direct
 * reports", matching the top-to-bottom dagre layout.
 */
export function EmployeeNode({ data, selected }: NodeProps & { data: EmployeeNodeData }) {
  const { employee, departmentName, departmentColor, directReportCount } = data

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm transition-colors',
        selected && 'border-primary ring-2 ring-primary/30'
      )}
      style={{ width: 240 }}
    >
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
      <UserAvatar name={employee.name} src={employee.avatarUrl} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{employee.name}</p>
        <p className="truncate text-xs text-muted-foreground">{employee.jobTitle}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: `color-mix(in oklab, ${departmentColor} 20%, transparent)`,
              color: departmentColor
            }}
          >
            {departmentName}
          </span>
          {directReportCount > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <UsersIcon className="size-3" />
              {directReportCount}
            </span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
    </div>
  )
}
