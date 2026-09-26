import { useEffect, useState } from 'react'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
})

/** A ticking wall clock — the anchor of the page, so "now" is never a stale render. */
export function LiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight">
        {timeFormatter.format(now)}
      </p>
      <p className="text-sm text-muted-foreground">{dateFormatter.format(now)}</p>
    </div>
  )
}
