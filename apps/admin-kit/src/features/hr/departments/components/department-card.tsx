import type { Department, Employee } from '@pompeitech/mock-data'
import {
  AvatarGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
  UserAvatar
} from '@pompeitech/vesuvius-ui'
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useNavigate } from 'react-router'

type DepartmentCardProps = {
  department: Department
  head: Employee | undefined
  members: Employee[]
  onEdit: () => void
  onDelete: () => void
}

/** One department: name, description, head, a stack of its members' avatars, and an actions menu. */
export function DepartmentCard({
  department,
  head,
  members,
  onEdit,
  onDelete
}: DepartmentCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/hr/department-detail/${department.id}`)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ')
          navigate(`/hr/department-detail/${department.id}`)
      }}
      className="cursor-pointer transition-colors hover:bg-muted/50"
    >
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{department.name}</CardTitle>
          <Typography variant="muted">{department.description}</Typography>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              onClick={event => event.stopPropagation()}
            >
              <MoreVerticalIcon />
              <span className="sr-only">Department actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onEdit}>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={onDelete}>
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {head && (
          <div className="flex items-center gap-2">
            <UserAvatar name={head.name} src={head.avatarUrl} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{head.name}</p>
              <p className="truncate text-xs text-muted-foreground">{head.jobTitle}</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          {members.length > 0 ? (
            <AvatarGroup max={6} size="sm">
              {members.map(member => (
                <UserAvatar key={member.id} name={member.name} src={member.avatarUrl} size="sm" />
              ))}
            </AvatarGroup>
          ) : (
            <span />
          )}
          <span className="text-sm text-muted-foreground">
            {members.length} {members.length === 1 ? 'person' : 'people'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
