"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react"

interface AddressOverview {
  holdersCount: number
  top10HoldersPct: string
  top100HoldersPct: string
  top1000HoldersPct: string
}

export function AddressStats() {
  const [data, setData] = useState<AddressOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchAddressStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/address-overview?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Address stats data received:", result)

      // Check if we're using fallback data
      setUsingFallback(response.headers.get("x-using-fallback") === "true")

      setData(result)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Failed to fetch address overview:", err)
      setError("Failed to load holder statistics")

      // Use hardcoded data as fallback
      setData({
        holdersCount: 4314,
        top10HoldersPct: "53.99",
        top100HoldersPct: "68.62",
        top1000HoldersPct: "83.70",
      })
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddressStats()

    // Set up refresh interval - every 5 minutes
    const interval = setInterval(() => {
      fetchAddressStats()
    }, 300000) // 300000ms = 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">KODA Holder Statistics</h2>
        <div className="flex items-center gap-2">
          {usingFallback && (
            <div className="flex items-center text-yellow-400 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Using cached data</span>
            </div>
          )}
          <button
            onClick={() => fetchAddressStats()}
            className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
            disabled={loading}
            title="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Holders */}
        <Card className="bg-black/50 border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/70">Total Holders</h3>
              <Users className="h-4 w-4 text-primary" />
            </div>
            {loading ? (
              <Skeleton className="h-7 w-20 bg-gray-700" />
            ) : (
              <p className="text-2xl font-bold text-white">{data?.holdersCount?.toLocaleString() || "N/A"}</p>
            )}
          </CardContent>
        </Card>

        {/* Top 10 Holders */}
        <Card className="bg-black/50 border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/70">Top 10 Holders</h3>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </div>
            {loading ? (
              <Skeleton className="h-7 w-20 bg-gray-700" />
            ) : (
              <p className="text-2xl font-bold text-white">
                {data?.top10HoldersPct ? `${data.top10HoldersPct}%` : "N/A"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Top 100 Holders */}
        <Card className="bg-black/50 border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/70">Top 100 Holders</h3>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            {loading ? (
              <Skeleton className="h-7 w-20 bg-gray-700" />
            ) : (
              <p className="text-2xl font-bold text-white">
                {data?.top100HoldersPct ? `${data.top100HoldersPct}%` : "N/A"}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Top 1000 Holders */}
        <Card className="bg-black/50 border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/70">Top 1000 Holders</h3>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </div>
            {loading ? (
              <Skeleton className="h-7 w-20 bg-gray-700" />
            ) : (
              <p className="text-2xl font-bold text-white">
                {data?.top1000HoldersPct ? `${data.top1000HoldersPct}%` : "N/A"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {lastUpdated && (
        <div className="mt-2 text-xs text-white/50 text-right">Last updated: {lastUpdated.toLocaleTimeString()}</div>
      )}
    </div>
  )
}
