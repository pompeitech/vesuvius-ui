import type { Issue } from '@pompeitech/mock-data'
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@pompeitech/vesuvius-ui'
import { LinkIcon, PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

type LinkedIssuesSectionProps = {
  issue: Pick<Issue, 'id'>
  projectIssues: Issue[]
  linkedIssueIds: string[]
  onLinkedIssueIdsChange: (ids: string[]) => void
  onNavigateToIssue: (issueId: string) => void
}

/** "Ticket collegati" — a small same-project cross-link list, added/removed here, each chip clickable to jump to that issue. */
export function LinkedIssuesSection({
  issue,
  projectIssues,
  linkedIssueIds,
  onLinkedIssueIdsChange,
  onNavigateToIssue
}: LinkedIssuesSectionProps) {
  const [open, setOpen] = useState(false)
  const linkedIssues = linkedIssueIds
    .map(id => projectIssues.find(candidate => candidate.id === id))
    .filter((candidate): candidate is Issue => candidate !== undefined)
  const candidates = projectIssues.filter(
    candidate => candidate.id !== issue.id && !linkedIssueIds.includes(candidate.id)
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Linked tickets</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <PlusIcon /> Link ticket
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="end">
            <Command>
              <CommandInput placeholder="Search issues..." />
              <CommandList>
                <CommandEmpty>No issues found.</CommandEmpty>
                <CommandGroup>
                  {candidates.map(candidate => (
                    <CommandItem
                      key={candidate.id}
                      value={`${candidate.key} ${candidate.title}`}
                      onSelect={() => {
                        onLinkedIssueIdsChange([...linkedIssueIds, candidate.id])
                        setOpen(false)
                      }}
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {candidate.key}
                      </span>
                      <span className="truncate">{candidate.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {linkedIssues.length === 0 ? (
        <p className="text-sm text-muted-foreground">No linked tickets.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {linkedIssues.map(linked => (
            <Badge key={linked.id} variant="outline" className="gap-1.5 py-1 pr-1 pl-2">
              <LinkIcon className="size-3" />
              <button
                type="button"
                className="hover:underline"
                onClick={() => onNavigateToIssue(linked.id)}
              >
                {linked.key}
              </button>
              <button
                type="button"
                aria-label={`Remove link to ${linked.key}`}
                onClick={() =>
                  onLinkedIssueIdsChange(linkedIssueIds.filter(id => id !== linked.id))
                }
                className="rounded-full outline-none hover:bg-muted-foreground/20"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
