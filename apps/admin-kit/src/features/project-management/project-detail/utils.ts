import type { Issue } from '@pompeitech/mock-data'

export type GanttTask = {
  id: string
  text: string
  start: Date
  end: Date
  duration: number
  progress: number
  type: 'task' | 'milestone'
  /** Set on a non-epic issue that belongs to one of this project's epics. */
  parent?: string
}

const ISSUE_PROGRESS: Record<Issue['status'], number> = {
  backlog: 0,
  todo: 0,
  in_progress: 45,
  in_review: 80,
  done: 100
}

const MS_PER_DAY = 86_400_000

/**
 * Maps issues onto Gantt bars — most issues have a real `startDate`/`dueDate`
 * pair from the generator, but plenty legitimately don't (an unscheduled
 * backlog item), so anything missing one falls back to a plausible short
 * span off its `createdAt` rather than being silently dropped from the
 * timeline. Issues with a `parentId` nest under their epic via plain
 * `parent` linkage — a `type: "task"` bar with children already renders as
 * an expandable/collapsible group (collapsed by default; click the arrow
 * to open it), verified live. Two fields from `@svar-ui/react-gantt`'s own
 * `ITask` type definitions are deliberately NOT used, both reproducibly
 * crashing this library version's internal rollup computation with
 * "Cannot read properties of null (reading 'forEach')" — likely PRO-only
 * code paths documented in the types but not implemented in the
 * open-source build: `type: "summary"` (tried for epics, crashes even with
 * no children set `open`) and `open: true` (crashes when set on a task,
 * epic or not — isolated by testing each field independently). Orphan
 * non-epic issues stay flat top-level bars, same as before.
 */
export function buildGanttTasks(issues: Issue[]): GanttTask[] {
  const issueIds = new Set(issues.map(issue => issue.id))

  return issues.map(issue => {
    const created = new Date(issue.createdAt)
    const start = issue.startDate ? new Date(issue.startDate) : created
    const end = issue.dueDate ? new Date(issue.dueDate) : new Date(start.getTime() + 5 * MS_PER_DAY)
    const duration = Math.max(1, Math.round((end.getTime() - start.getTime()) / MS_PER_DAY))
    const isEpic = issue.type === 'epic'
    // A parent only nests the task if that epic is actually in this same
    // batch — always true in practice (parentId never crosses projects,
    // per the generator), but guards against ever handing the library a
    // dangling reference it can't resolve.
    const parentId =
      !isEpic && issue.parentId && issueIds.has(issue.parentId) ? issue.parentId : undefined

    const task: GanttTask = {
      id: issue.id,
      text: `${issue.key} ${issue.title}`,
      start,
      end,
      duration,
      progress: ISSUE_PROGRESS[issue.status],
      type: 'task'
    }
    if (parentId) task.parent = parentId
    return task
  })
}
