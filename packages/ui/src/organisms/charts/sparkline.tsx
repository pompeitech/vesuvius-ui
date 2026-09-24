export type SparklineProps = {
  data: number[]
  width?: number
  height?: number
  color?: string
  filled?: boolean
  className?: string
}

export function Sparkline({
  data,
  width = 100,
  height = 32,
  color = 'currentColor',
  filled = false,
  className
}: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data.map((value, i) => {
    const x = i * stepX
    const y = height - ((value - min) / range) * height
    return [x, y] as const
  })
  const linePoints = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {filled && <polygon points={areaPoints} fill={color} fillOpacity={0.12} stroke="none" />}
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
