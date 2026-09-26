import { Card, CardContent, Typography } from '@pompeitech/vesuvius-ui'

/** Shared "not built yet" placeholder for tabs with no real content behind them. */
export function EmptyTab({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-1 py-16 text-center">
        <Typography variant="p" className="font-medium">
          {title}
        </Typography>
        <Typography variant="muted">{description}</Typography>
      </CardContent>
    </Card>
  )
}
