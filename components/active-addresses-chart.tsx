"use client"

import { useEffect, useState } from "react"

interface ActiveAddressData {
  date: string
  value: number
}

export function ActiveAddressesChart() {
  const [data, setData] = useState<ActiveAddressData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Use static data to ensure we have something to display
    const staticData = [
      { x: "2025-05-02T04:00:00.000Z", y: 97 },
      { x: "2025-05-01T04:00:00.000Z", y: 151 },
      { x: "2025-04-30T04:00:00.000Z", y: 128 },
      { x: "2025-04-29T04:00:00.000Z", y: 126 },
      { x: "2025-04-28T04:00:00.000Z", y: 159 },
      { x: "2025-04-27T04:00:00.000Z", y: 179 },
      { x: "2025-04-26T04:00:00.000Z", y: 7564 },
      { x: "2025-04-25T04:00:00.000Z", y: 4942 },
      { x: "2025-04-24T04:00:00.000Z", y: 103 },
      { x: "2025-04-23T04:00:00.000Z", y: 228 },
      { x: "2025-04-22T04:00:00.000Z", y: 143 },
      { x: "2025-04-21T04:00:00.000Z", y: 109 },
      { x: "2025-04-20T04:00:00.000Z", y: 1148 },
      { x: "2025-04-19T04:00:00.000Z", y: 842 },
      { x: "2025-04-18T04:00:00.000Z", y: 108 },
      { x: "2025-04-17T04:00:00.000Z", y: 89 },
      { x: "2025-04-16T04:00:00.000Z", y: 43 },
      { x: "2025-04-15T04:00:00.000Z", y: 29 },
      { x: "2025-04-14T04:00:00.000Z", y: 42 },
      { x: "2025-04-13T04:00:00.000Z", y: 62 },
      { x: "2025-04-12T04:00:00.000Z", y: 49 },
      { x: "2025-04-11T04:00:00.000Z", y: 34 },
      { x: "2025-04-10T04:00:00.000Z", y: 54 },
      { x: "2025-04-09T04:00:00.000Z", y: 31 },
      { x: "2025-04-08T04:00:00.000Z", y: 27 },
      { x: "2025-04-07T04:00:00.000Z", y: 50 },
      { x: "2025-04-06T04:00:00.000Z", y: 78 },
      { x: "2025-04-05T04:00:00.000Z", y: 71 },
      { x: "2025-04-04T04:00:00.000Z", y: 57 },
      { x: "2025-04-03T04:00:00.000Z", y: 39 },
    ]

    try {
      // Format the data for display
      const formattedData = staticData.map((item) => {
        const date = new Date(item.x)
        return {
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          value: item.y,
          rawDate: item.x,
        }
      })

      // Sort by date (ascending)
      const sortedData = formattedData.sort((a, b) => {
        const dateA = new Date(a.rawDate)
        const dateB = new Date(b.rawDate)
        return dateA.getTime() - dateB.getTime()
      })

      setData(sortedData)
      setLoading(false)
    } catch (err) {
      console.error("Error preparing active addresses data:", err)
      setError("Failed to prepare active addresses data")
      setLoading(false)
    }
  }, [])

  // Find max value for scaling
  const maxValue = Math.max(...data.map((item) => item.value))

  // Function to calculate bar height as percentage of max
  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-pulse text-primary">Loading chart data...</div>
      </div>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center h-80 text-red-400">{error}</div>
  }

  return (
    <div className="w-full">
      {/* Line chart using SVG */}
      <div className="h-80 w-full relative">
        <svg className="w-full h-full" viewBox={`0 0 ${data.length * 30} 100`} preserveAspectRatio="none">
          {/* Background grid lines */}
          <line x1="0" y1="25" x2={data.length * 30} y2="25" stroke="#333333" strokeDasharray="2,2" />
          <line x1="0" y1="50" x2={data.length * 30} y2="50" stroke="#333333" strokeDasharray="2,2" />
          <line x1="0" y1="75" x2={data.length * 30} y2="75" stroke="#333333" strokeDasharray="2,2" />

          {/* Area fill under the line */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.6)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </linearGradient>
          <path
            d={`
              M0,${100 - getBarHeight(data[0].value)}
              ${data.map((item, index) => `L${index * 30},${100 - getBarHeight(item.value)}`).join(" ")}
              L${(data.length - 1) * 30},100
              L0,100
              Z
            `}
            fill="url(#areaGradient)"
          />

          {/* Connect points with line */}
          <polyline
            points={data.map((item, index) => `${index * 30},${100 - getBarHeight(item.value)}`).join(" ")}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />

          {/* Data points */}
          {data.map((item, index) => (
            <g key={index}>
              <circle cx={index * 30} cy={100 - getBarHeight(item.value)} r="3" fill="hsl(var(--primary))" />
              <title>{`${item.date}: ${item.value.toLocaleString()} addresses`}</title>
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-2">
          {data
            .filter((_, i) => i % 5 === 0)
            .map((item, index) => (
              <div key={index} className="text-xs text-gray-400">
                {item.date}
              </div>
            ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between py-2">
          <div className="text-xs text-gray-400">{maxValue.toLocaleString()}</div>
          <div className="text-xs text-gray-400">{Math.round(maxValue * 0.75).toLocaleString()}</div>
          <div className="text-xs text-gray-400">{Math.round(maxValue * 0.5).toLocaleString()}</div>
          <div className="text-xs text-gray-400">{Math.round(maxValue * 0.25).toLocaleString()}</div>
          <div className="text-xs text-gray-400">0</div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        Note: The chart shows the number of unique active addresses per day
      </div>
    </div>
  )
}
