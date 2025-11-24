"use client"

import { useEffect, useState } from "react"

interface TransactionStats {
  updated: string
  stats: {
    last24Hours: {
      totalTransactions: number
      uniqueAddresses: number
      totalAmount: number
    }
  }
}

// Custom formatter for KODA amounts with 8 decimal places
const formatKodaAmount = (amount: number): string => {
  // Format with exactly 8 decimal places
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  }).format(amount)
}

export function TransactionStatsBox() {
  const [stats, setStats] = useState<TransactionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallbackData, setUsingFallbackData] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        // Add cache-busting parameter to prevent stale data
        const cacheBuster = new Date().getTime()
        // Use our internal API route instead of directly calling the external API
        const response = await fetch(`/api/transaction-stats?_=${cacheBuster}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
          next: { revalidate: 0 },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch transaction statistics: ${response.status}`)
        }

        const data = await response.json()

        // Validate the data structure
        if (!data || !data.stats || !data.stats.last24Hours) {
          console.error("Invalid data structure received:", data)
          throw new Error("Invalid data structure received")
        }

        setStats(data)

        // Check if we're using fallback data (this is optional)
        const currentTime = new Date()
        const updatedTime = new Date(data.updated)
        const timeDiff = Math.abs(currentTime.getTime() - updatedTime.getTime())
        // If the data is more than 1 hour old, it's likely fallback data
        setUsingFallbackData(timeDiff > 60 * 60 * 1000)
      } catch (err) {
        console.error("Error fetching transaction stats:", err)
        setError("Failed to load transaction statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse text-primary">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center h-40 text-red-400">{error}</div>
  }

  return (
    <div>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/70 p-4 rounded-lg border border-primary/20 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-primary overflow-hidden text-ellipsis">
              {stats.stats.last24Hours.totalTransactions.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-900/70 p-4 rounded-lg border border-primary/20 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Unique Addresses</h3>
            <p className="text-3xl font-bold text-primary overflow-hidden text-ellipsis">
              {stats.stats.last24Hours.uniqueAddresses.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-900/70 p-4 rounded-lg border border-primary/20 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Total Amount (KODA)</h3>
            <p className="text-2xl md:text-xl lg:text-2xl font-bold text-primary overflow-hidden text-ellipsis w-full text-center">
              {formatKodaAmount(stats.stats.last24Hours.totalAmount)}
            </p>
          </div>
        </div>
      )}
      <div className="text-xs text-gray-400 text-center mt-4">
        Last updated: {stats ? formatDate(stats.updated) : "N/A"}
        {usingFallbackData && <span className="text-amber-400 ml-2">(Demo Data)</span>}
      </div>
    </div>
  )
}
