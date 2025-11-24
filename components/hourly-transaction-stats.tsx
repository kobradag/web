"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface TransactionStat {
  timestamp: string
  transactions_user: number
  unique_wallets: number
}

interface TransactionStatsResponse {
  data: TransactionStat[]
  isDemo?: boolean
}

export function HourlyTransactionStats({ standalone = false }: { standalone?: boolean }) {
  const [stats, setStats] = useState<TransactionStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/hourly-transaction-stats")
        if (!res.ok) {
          throw new Error(`Failed to fetch transaction stats: ${res.status}`)
        }
        const data: TransactionStatsResponse = await res.json()
        setStats(data.data.reverse()) // Oldest to newest
        setIsDemo(data.isDemo || false)
        setError(null)
      } catch (err) {
        console.error("Error fetching transaction stats:", err)
        setError("Failed to load transaction statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const chartData = {
    labels: stats.map((row) => new Date(row.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
    datasets: [
      {
        label: "User Transactions",
        data: stats.map((row) => row.transactions_user),
        borderColor: "#00ff99",
        backgroundColor: "rgba(0, 255, 153, 0.1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: "Unique Wallets",
        data: stats.map((row) => row.unique_wallets),
        borderColor: "#00ffff",
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e0ffe0",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#b0ffb0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#b0ffb0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  const content = (
    <>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-sm text-gray-400">Please try again later</p>
        </div>
      ) : (
        <>
          {isDemo && (
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-md p-3 mb-4 text-yellow-300 text-sm">
              Note: Displaying demo data. Real-time data is currently unavailable.
            </div>
          )}
          <div className="h-[400px] w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </>
  )

  if (standalone) {
    return (
      <Card className="bg-black/50 border-primary">
        <CardHeader>
          <CardTitle className="text-white">🟢 KODA – Last 24h Stats</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    )
  }

  return content
}
