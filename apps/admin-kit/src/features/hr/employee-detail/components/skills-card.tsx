import { Badge, Card, CardContent, CardHeader, CardTitle } from '@pompeitech/vesuvius-ui'

/** Skill/tool tags — kept as a compact chip list rather than another info-field grid row. */
export function SkillsCard({ skills }: { skills: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}
