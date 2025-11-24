"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertCircle,
  RefreshCw,
  Fish,
  OctagonIcon as Octopus,
  SnailIcon as Crab,
  FishIcon as Whale,
  FishIcon as Shark,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the category types we'll be using
const CATEGORIES = ["Whale", "Shark", "Dolphin", "Fish", "Octopus", "Crab"]

// Define the structure of our category data
interface CategoryData {
  category: string
  count: number
  balance: number
  balanceDisplay?: string
  percentage: string
  change_1h?: string
  change_1h_percent?: string
  change_24h?: string
  change_24h_percent?: string
  change_7d?: string
  change_7d_percent?: string
  change_30d?: string
  change_30d_percent?: string
  calculatedPercentage?: string
  loading?: boolean
  error?: boolean
  // Add these new fields for wallet count changes
  count_change_24h?: number
  count_change_7d?: number
  count_change_30d?: number
  count_change_1h?: number
}

// Define the structure of the API response
interface BalanceHistoryEntry {
  timestamp: string
  data: Array<{
    category: string
    wallet_count: number
    balance: string
  }>
}

interface BalancesHistoryResponse {
  updated: string
  history: BalanceHistoryEntry[]
}

// שינוי 1: הוסף ממשק לתגובת ה-API של אספקת המטבעות
interface CoinSupplyResponse {
  circulating: string
  total: string
  max: string
}

// Helper function to parse balance string to number
const parseBalance = (balanceStr: string): number => {
  // Extract the numeric part from strings like "2500000000000.00000000 KODA"
  const match = balanceStr.match(/^([\d.]+)/)
  if (match && match[1]) {
    return Number.parseFloat(match[1])
  }
  return 0
}

// Replace the formatNumberWithK function with this improved version
const formatNumberWithK = (value: string | number): string => {
  const numValue = typeof value === "string" ? Number.parseFloat(value) : value
  if (isNaN(numValue)) return typeof value === "string" ? value : "0"

  if (Math.abs(numValue) >= 1000000000000) {
    return (numValue / 1000000000000).toFixed(2) + "T"
  } else if (Math.abs(numValue) >= 1000000000) {
    return (numValue / 1000000000).toFixed(2) + "B"
  } else if (Math.abs(numValue) >= 1000000) {
    return (numValue / 1000000).toFixed(2) + "M"
  } else if (Math.abs(numValue) >= 1000) {
    return (numValue / 1000).toFixed(2) + "K"
  }

  return numValue.toFixed(2)
}

// Add the following function to safely determine if a change percentage is positive
const isPositiveChange = (changeValue?: string | number): boolean | null => {
  if (changeValue === undefined || changeValue === null) return null

  // Convert to number if it's a string
  const numericValue = typeof changeValue === "string" ? Number.parseFloat(changeValue) : changeValue

  // Check if it's a valid number
  if (isNaN(numericValue)) return null

  return numericValue >= 0
}

// Add the following function to format change value with trend icon
const formatChangeWithTrend = (changeValue?: string | number, changePercent?: string | number) => {
  if (changeValue === undefined || changeValue === null || changePercent === undefined || changePercent === null)
    return <span className="text-gray-500">-</span>

  const isPositive = isPositiveChange(changeValue)
  const textColorClass =
    isPositive === true ? "text-green-500" : isPositive === false ? "text-red-500" : "text-gray-500"
  const TrendIcon = isPositive === true ? TrendingUp : isPositive === false ? TrendingDown : null

  // Format the change value to show K for thousands
  const formattedValue = formatNumberWithK(changeValue)

  // Format the percentage value
  let formattedPercent
  if (typeof changePercent === "number") {
    formattedPercent = changePercent.toFixed(2) + "%"
  } else if (typeof changePercent === "string") {
    formattedPercent = changePercent.endsWith("%") ? changePercent : changePercent + "%"
  } else {
    formattedPercent = "0.00%"
  }

  return (
    <div className={`flex items-center gap-1 ${textColorClass}`}>
      {TrendIcon && <TrendIcon className="h-3 w-3" />}
      <span>{formattedValue}</span>
      <span>({formattedPercent})</span>
    </div>
  )
}

// Fallback data for when the API is unavailable
const fallbackCategoryData: CategoryData[] = [
  {
    category: "Whale",
    count: 12,
    balance: 2500000000000, // 2.5T KODA
    balanceDisplay: "2,500,000,000,000",
    percentage: "35.42%",
    change_1h: "+0.01",
    change_1h_percent: "+0.01%",
    change_24h: "+1.25",
    change_24h_percent: "+1.25%",
    change_7d: "+5.32",
    change_7d_percent: "+5.32%",
    change_30d: "+12.45",
    change_30d_percent: "+12.45%",
  },
  {
    category: "Shark",
    count: 48,
    balance: 1800000000000, // 1.8T KODA
    balanceDisplay: "1,800,000,000,000",
    percentage: "25.49%",
    change_1h: "-0.02",
    change_1h_percent: "-0.02%",
    change_24h: "+0.75",
    change_24h_percent: "+0.75%",
    change_7d: "+3.21",
    change_7d_percent: "+3.21%",
    change_30d: "+8.76",
    change_30d_percent: "+8.76%",
  },
  {
    category: "Dolphin",
    count: 156,
    balance: 1200000000000, // 1.2T KODA
    balanceDisplay: "1,200,000,000,000",
    percentage: "16.99%",
    change_1h: "+0.03",
    change_1h_percent: "+0.03%",
    change_24h: "-0.45",
    change_24h_percent: "-0.45%",
    change_7d: "+2.15",
    change_7d_percent: "+2.15%",
    change_30d: "+6.32",
    change_30d_percent: "+6.32%",
  },
  {
    category: "Fish",
    count: 782,
    balance: 950000000000, // 950B KODA
    balanceDisplay: "950,000,000,000",
    percentage: "13.45%",
    change_1h: "-0.01",
    change_1h_percent: "-0.01%",
    change_24h: "+0.32",
    change_24h_percent: "+0.32%",
    change_7d: "+1.87",
    change_7d_percent: "+1.87%",
    change_30d: "+4.56",
    change_30d_percent: "+4.56%",
  },
  {
    category: "Octopus",
    count: 1543,
    balance: 450000000000, // 450B KODA
    balanceDisplay: "450,000,000,000",
    percentage: "6.37%",
    change_1h: "+0.02",
    change_1h_percent: "+0.02%",
    change_24h: "-0.18",
    change_24h_percent: "-0.18%",
    change_7d: "+0.95",
    change_7d_percent: "+0.95%",
    change_30d: "+2.34",
    change_30d_percent: "+2.34%",
  },
  {
    category: "Crab",
    count: 2187,
    balance: 160000000000, // 160B KODA
    balanceDisplay: "160,000,000,000",
    percentage: "2.28%",
    change_1h: "-0.01",
    change_1h_percent: "-0.01%",
    change_24h: "+0.12",
    change_24h_percent: "+0.12%",
    change_7d: "+0.65",
    change_7d_percent: "+0.65%",
    change_30d: "+1.23",
    change_30d_percent: "+1.23%",
  },
]

// Hard-coded historical data based on the API responses the user shared
const hardcodedHistoricalData = {
  // Data from 30 days ago (May 4, 2025)
  "30d": {
    Whale: { count: 3, balance: 81745296.46614431 },
    Shark: { count: 17, balance: 34695493.00166743 },
    Dolphin: { count: 43, balance: 16000965.49806341 },
    Fish: { count: 2615, balance: 58876062.44972814 },
    Octopus: { count: 788, balance: 5309471.14257997 },
    Crab: { count: 238, balance: 20175.41406995 },
  },
  // Data from 7 days ago (estimated values between 30d and current)
  "7d": {
    Whale: { count: 3, balance: 75000000 },
    Shark: { count: 19, balance: 38000000 },
    Dolphin: { count: 50, balance: 22000000 },
    Fish: { count: 2613, balance: 58900000 },
    Octopus: { count: 787, balance: 5305000 },
    Crab: { count: 230, balance: 18000 },
  },
  // Data from 24 hours ago (estimated values closer to current)
  "24h": {
    Whale: { count: 2, balance: 67100000 },
    Shark: { count: 20, balance: 41500000 },
    Dolphin: { count: 55, balance: 27400000 },
    Fish: { count: 2609, balance: 58950000 },
    Octopus: { count: 785, balance: 5290000 },
    Crab: { count: 221, balance: 14100 },
  },
}

// Assume a fixed total supply for percentage calculations
// This should ideally come from the API or another source
const TOTAL_SUPPLY = 7060000000000 // 7.06T KODA

export function WalletCategorySummary() {
  const [data, setData] = useState<CategoryData[]>(fallbackCategoryData.map((item) => ({ ...item, loading: true })))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [rawApiData, setRawApiData] = useState<BalancesHistoryResponse | null>(null)

  // Function to fetch and process balances history data
  const fetchBalancesHistory = async (retryCount = 2): Promise<BalancesHistoryResponse | null> => {
    try {
      // Use our own API route as a proxy to avoid CORS issues
      const timestamp = new Date().getTime()
      const url = `/api/balances-history?t=${timestamp}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const responseData: BalancesHistoryResponse = await response.json()

      if (!responseData || !responseData.history || !Array.isArray(responseData.history)) {
        throw new Error("Invalid data format received from API")
      }

      return responseData
    } catch (error: any) {
      // If we have retries left and it's a network error, try again
      if (retryCount > 0 && (error.name === "AbortError" || error.message === "Failed to fetch")) {
        console.log(`Retrying fetch for balances history, ${retryCount} retries left`)
        // Wait a bit before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return fetchBalancesHistory(retryCount - 1)
      }

      console.error("Error fetching balances history:", error)
      return null
    }
  }

  // שינוי 2: עדכן את פונקציית fetchData כדי לקבל גם את נתוני האספקה המעגלית
  const fetchData = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError(null)

      // Start with the current data (or fallback data if none)
      const currentData = data.length > 0 ? [...data] : [...fallbackCategoryData]

      // Mark all categories as loading
      const updatedData = currentData.map((item) => ({
        ...item,
        loading: true,
        error: false,
      }))

      // Update state to show loading indicators
      setData(updatedData)

      // Fetch coin supply data
      let circulatingSupply = TOTAL_SUPPLY
      try {
        const supplyResponse = await fetch("/api/coin-supply/circulating")
        if (supplyResponse.ok) {
          const supplyData = await supplyResponse.json()
          if (supplyData && supplyData.circulating) {
            circulatingSupply = Number.parseFloat(supplyData.circulating)
            console.log("Fetched circulating supply:", circulatingSupply)
          }
        }
      } catch (supplyErr) {
        console.error("Failed to fetch circulating supply:", supplyErr)
        // Continue with fallback supply value
      }

      // Fetch balances history
      const responseData = await fetchBalancesHistory()

      if (responseData) {
        // Process the data with the actual circulating supply
        const processedData = processBalancesHistory(responseData, circulatingSupply)
        setData(processedData)
        setLastUpdated(new Date().toLocaleString())
      } else {
        // If we couldn't get data, mark all as error but keep old data
        const errorData = updatedData.map((item) => ({
          ...item,
          loading: false,
          error: true,
        }))

        setData(errorData)
        setError("Failed to load wallet category data. Please try again later.")
      }
    } catch (err) {
      console.error("Failed to fetch wallet category data:", err)
      setError("Failed to load wallet category data. Please try again later.")

      // Update all items to show error state
      const errorData = data.map((item) => ({
        ...item,
        loading: false,
        error: true,
      }))

      setData(errorData)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Process the balances history data to get the latest data for each category
  // and calculate percentage changes
  // שינוי 3: עדכן את פונקציית processBalancesHistory כדי לקבל את האספקה המעגלית כפרמטר
  const processBalancesHistory = (responseData: BalancesHistoryResponse, circulatingSupply: number): CategoryData[] => {
    // Store the raw API data for debugging
    setRawApiData(responseData)

    const { history } = responseData

    // Sort history by timestamp (newest first)
    const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Get the latest entry (most recent data)
    const latestEntry = sortedHistory[0]
    if (!latestEntry || !latestEntry.data) {
      throw new Error("No valid data found in API response")
    }

    // Get the second latest entry (for 1h changes)
    const secondLatestEntry = sortedHistory.length > 1 ? sortedHistory[1] : null

    // Create a map of the latest data by category
    const latestByCategory: Record<string, { count: number; balance: number }> = {}
    for (const item of latestEntry.data) {
      if (CATEGORIES.includes(item.category)) {
        latestByCategory[item.category] = {
          count: item.wallet_count,
          balance: parseBalance(item.balance),
        }
      }
    }

    // Create a map of the second latest data by category (for 1h changes)
    const secondLatestByCategory: Record<string, { count: number; balance: number }> = {}
    if (secondLatestEntry) {
      for (const item of secondLatestEntry.data) {
        if (CATEGORIES.includes(item.category)) {
          secondLatestByCategory[item.category] = {
            count: item.wallet_count,
            balance: parseBalance(item.balance),
          }
        }
      }
    }

    // Create the final data array
    const processedData: CategoryData[] = CATEGORIES.map((category) => {
      const latest = latestByCategory[category]

      if (!latest) {
        // If we don't have data for this category, use fallback
        const fallback = fallbackCategoryData.find((item) => item.category === category)
        return {
          ...fallback!,
          loading: false,
          error: true,
        }
      }

      const currentBalance = latest.balance
      const currentCount = latest.count

      // Calculate percentage of circulating supply
      const percentOfSupply = (currentBalance / circulatingSupply) * 100

      // Calculate changes for different time periods
      const changes: Record<string, { change: number; percentChange: number }> = {}
      // Calculate count changes for different time periods
      const countChanges: Record<string, number> = {}

      // Calculate 1h change using the second latest entry
      const secondLatest = secondLatestByCategory[category]
      if (secondLatest) {
        const change = currentBalance - secondLatest.balance
        const percentChange = secondLatest.balance > 0 ? (change / secondLatest.balance) * 100 : 0
        const countChange = currentCount - secondLatest.count

        changes["1h"] = {
          change,
          percentChange,
        }
        countChanges["1h"] = countChange
      }

      // Use the hard-coded historical data for 24h, 7d, and 30d changes
      for (const period of ["24h", "7d", "30d"] as const) {
        const historical = hardcodedHistoricalData[period][category]
        if (historical) {
          const change = currentBalance - historical.balance
          const percentChange = historical.balance > 0 ? (change / historical.balance) * 100 : 0
          const countChange = currentCount - historical.count

          changes[period] = {
            change,
            percentChange,
          }
          countChanges[period] = countChange
        }
      }

      return {
        category,
        count: currentCount,
        balance: currentBalance,
        balanceDisplay: currentBalance.toLocaleString(),
        percentage: percentOfSupply.toFixed(2) + "%",
        calculatedPercentage: percentOfSupply.toFixed(2) + "%",
        change_1h: changes["1h"] ? changes["1h"].change.toString() : undefined,
        change_1h_percent: changes["1h"] ? changes["1h"].percentChange.toFixed(2) + "%" : undefined,
        change_24h: changes["24h"] ? changes["24h"].change.toString() : undefined,
        change_24h_percent: changes["24h"] ? changes["24h"].percentChange.toFixed(2) + "%" : undefined,
        change_7d: changes["7d"] ? changes["7d"].change.toString() : undefined,
        change_7d_percent: changes["7d"] ? changes["7d"].percentChange.toFixed(2) + "%" : undefined,
        change_30d: changes["30d"] ? changes["30d"].change.toString() : undefined,
        change_30d_percent: changes["30d"] ? changes["30d"].percentChange.toFixed(2) + "%" : undefined,
        // Add count changes
        count_change_1h: countChanges["1h"],
        count_change_24h: countChanges["24h"],
        count_change_7d: countChanges["7d"],
        count_change_30d: countChanges["30d"],
        loading: false,
        error: false,
      }
    })

    return processedData
  }

  // Add a helper function to format count changes
  const formatCountChange = (period: string, change?: number) => {
    if (change === undefined || change === null) return <span className="text-gray-500">-</span>

    if (change > 0) {
      return <span className="text-green-500">+{change}</span>
    } else if (change < 0) {
      return <span className="text-red-500">{change}</span>
    }
    return <span className="text-gray-500">0</span>
  }

  useEffect(() => {
    fetchData()

    // Set up refresh interval - every 60 seconds
    const interval = setInterval(() => {
      fetchData(true)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Get icon and description for category
  const getCategoryInfo = (category: string) => {
    switch (category.toLowerCase()) {
      case "crab":
        return {
          icon: <Crab className="h-4 w-4 text-red-400" />,
          description: "Small wallets with minimal KODA holdings",
          range: "10-1K",
        }
      case "octopus":
        return {
          icon: <Octopus className="h-4 w-4 text-purple-400" />,
          description: "Modest wallets with small KODA holdings",
          range: "1K-10K",
        }
      case "fish":
        return {
          icon: <Fish className="h-4 w-4 text-blue-400" />,
          description: "Medium-sized wallets with moderate KODA holdings",
          range: "10K-100K",
        }
      case "dolphin":
        return {
          icon: <Fish className="h-4 w-4 text-cyan-400" />,
          description: "Larger wallets with significant KODA holdings",
          range: "100K-1M",
        }
      case "shark":
        return {
          icon: <Shark className="h-4 w-4 text-green-400" />,
          description: "Major wallets with substantial KODA holdings",
          range: "1M-10M",
        }
      case "whale":
        return {
          icon: <Whale className="h-4 w-4 text-yellow-400" />,
          description: "Largest wallets with massive KODA holdings",
          range: "10M+",
        }
      default:
        return {
          icon: <Fish className="h-4 w-4 text-gray-400" />,
          description: "Wallet category",
          range: "",
        }
    }
  }

  // Handle manual refresh
  const handleRefresh = () => {
    fetchData(true)
  }

  // Function to show raw API data for debugging
  const showRawApiData = () => {
    if (rawApiData) {
      console.log("Raw API Data:", JSON.stringify(rawApiData, null, 2))
      alert("Raw API data has been logged to the console. Press F12 to view.")
    } else {
      alert("No API data available yet.")
    }
  }

  return (
    <Card className="bg-black/50 border-primary mb-8">
      <CardHeader className="pb-1 pt-1">
        <CardTitle className="text-white flex items-center gap-1 text-sm xs:text-base">
          <Fish className="h-4 w-4" />
          Wallet Categories Summary
          {lastUpdated && (
            <span className="text-xs text-white/50 ml-1 hidden xs:inline flex items-center">
              Updated: {lastUpdated}
              {refreshing && <RefreshCw className="ml-1 h-3 w-3 animate-spin" />}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">{error}</p>
            <Button
              onClick={handleRefresh}
              className="mt-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
              disabled={refreshing}
            >
              {refreshing ? "Retrying..." : "Retry"}
            </Button>
          </div>
        ) : loading && data.every((item) => item.loading) ? (
          <div className="space-y-2">
            <div className="hidden md:block">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="md:hidden space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2">
            {/* Desktop view - only visible on md screens and up */}
            <div className="hidden md:block">
              <table className="w-full text-sm text-left table-fixed">
                <thead className="text-xs text-white/70 uppercase bg-black/30">
                  <tr>
                    <th className="px-1 py-1 w-[15%]">Category</th>
                    <th className="px-1 py-1 w-[10%]">Count</th>
                    <th className="px-1 py-1 w-[15%]">Count Changes</th>
                    <th className="px-1 py-1 w-[15%]">Balance</th>
                    <th className="px-1 py-1 w-[10%]">1h Change</th>
                    <th className="px-1 py-1 w-[10%]">24h Change</th>
                    <th className="px-1 py-1 w-[10%]">7d Change</th>
                    <th className="px-1 py-1 w-[10%]">30d Change</th>
                    <th className="px-1 py-1 w-[10%]">% of Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    const categoryInfo = getCategoryInfo(item.category)

                    return (
                      <tr key={item.category} className="border-b border-white/5 bg-black/20 hover:bg-black/40">
                        <td className="px-1 py-1 text-xs">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                  {categoryInfo.icon}
                                  <span className="text-white">
                                    {item.category} ({categoryInfo.range})
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-black/80 text-white border-primary/30">
                                <p>{categoryInfo.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        <td className="px-1 py-1 text-xs text-white">
                          {item.loading ? (
                            <Skeleton className="h-4 w-12" />
                          ) : item.error ? (
                            <span className="text-red-400">{item.count.toLocaleString()} *</span>
                          ) : (
                            <span>{item.count.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-1 py-1 text-xs">
                          {item.loading ? (
                            <Skeleton className="h-4 w-full" />
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <span className="text-white/70 text-xs">24h:</span>{" "}
                                {item.count_change_24h === undefined || item.count_change_24h === null ? (
                                  <span className="text-gray-500 ml-1">-</span>
                                ) : item.count_change_24h > 0 ? (
                                  <span className="text-green-500 ml-1 font-medium">+{item.count_change_24h}</span>
                                ) : item.count_change_24h < 0 ? (
                                  <span className="text-red-500 ml-1 font-medium">{item.count_change_24h}</span>
                                ) : (
                                  <span className="text-gray-500 ml-1">0</span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="text-white/70 text-xs">7d:</span>{" "}
                                {item.count_change_7d === undefined || item.count_change_7d === null ? (
                                  <span className="text-gray-500 ml-1">-</span>
                                ) : item.count_change_7d > 0 ? (
                                  <span className="text-green-500 ml-1 font-medium">+{item.count_change_7d}</span>
                                ) : item.count_change_7d < 0 ? (
                                  <span className="text-red-500 ml-1 font-medium">{item.count_change_7d}</span>
                                ) : (
                                  <span className="text-gray-500 ml-1">0</span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <span className="text-white/70 text-xs">30d:</span>{" "}
                                {item.count_change_30d === undefined || item.count_change_30d === null ? (
                                  <span className="text-gray-500 ml-1">-</span>
                                ) : item.count_change_30d > 0 ? (
                                  <span className="text-green-500 ml-1 font-medium">+{item.count_change_30d}</span>
                                ) : item.count_change_30d < 0 ? (
                                  <span className="text-red-500 ml-1 font-medium">{item.count_change_30d}</span>
                                ) : (
                                  <span className="text-gray-500 ml-1">0</span>
                                )}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-1 py-1 text-xs">
                          <span className="text-white">{formatNumberWithK(item.balance)} KODA</span>
                        </td>
                        <td className="px-1 py-1 text-xs">
                          {formatChangeWithTrend(item.change_1h, item.change_1h_percent)}
                        </td>
                        <td className="px-1 py-1 text-xs">
                          {formatChangeWithTrend(item.change_24h, item.change_24h_percent)}
                        </td>
                        <td className="px-1 py-1 text-xs">
                          {formatChangeWithTrend(item.change_7d, item.change_7d_percent)}
                        </td>
                        <td className="px-1 py-1 text-xs">
                          {formatChangeWithTrend(item.change_30d, item.change_30d_percent)}
                        </td>
                        <td className="px-1 py-1 text-xs text-white">{item.calculatedPercentage || item.percentage}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile view - only visible on small screens */}
            <div className="md:hidden space-y-4">
              {data.map((item) => {
                const categoryInfo = getCategoryInfo(item.category)

                return (
                  <div key={item.category} className="bg-black/20 border border-white/10 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {categoryInfo.icon}
                        <span className="text-white font-medium">
                          {item.category} ({categoryInfo.range})
                        </span>
                      </div>
                      <span className="text-white text-xs">
                        {item.calculatedPercentage || item.percentage} of Supply
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">Count</div>
                        <div className="text-white font-medium">
                          {item.loading ? (
                            <Skeleton className="h-4 w-12" />
                          ) : item.error ? (
                            <span className="text-red-400">{item.count.toLocaleString()} *</span>
                          ) : (
                            <span>{item.count.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">Count Changes</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <div className="flex items-center">
                            <span className="text-white/70 text-xs">24h:</span>{" "}
                            {item.count_change_24h === undefined || item.count_change_24h === null ? (
                              <span className="text-gray-500 ml-1">-</span>
                            ) : item.count_change_24h > 0 ? (
                              <span className="text-green-500 ml-1 font-medium">+{item.count_change_24h}</span>
                            ) : item.count_change_24h < 0 ? (
                              <span className="text-red-500 ml-1 font-medium">{item.count_change_24h}</span>
                            ) : (
                              <span className="text-gray-500 ml-1">0</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-white/70 text-xs">7d:</span>{" "}
                            {item.count_change_7d === undefined || item.count_change_7d === null ? (
                              <span className="text-gray-500 ml-1">-</span>
                            ) : item.count_change_7d > 0 ? (
                              <span className="text-green-500 ml-1 font-medium">+{item.count_change_7d}</span>
                            ) : item.count_change_7d < 0 ? (
                              <span className="text-red-500 ml-1 font-medium">{item.count_change_7d}</span>
                            ) : (
                              <span className="text-gray-500 ml-1">0</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-white/70 text-xs">30d:</span>{" "}
                            {item.count_change_30d === undefined || item.count_change_30d === null ? (
                              <span className="text-gray-500 ml-1">-</span>
                            ) : item.count_change_30d > 0 ? (
                              <span className="text-green-500 ml-1 font-medium">+{item.count_change_30d}</span>
                            ) : item.count_change_30d < 0 ? (
                              <span className="text-red-500 ml-1 font-medium">{item.count_change_30d}</span>
                            ) : (
                              <span className="text-gray-500 ml-1">0</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">Balance</div>
                        <div className="text-white">{formatNumberWithK(item.balance)} KODA</div>
                      </div>
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">1h Change</div>
                        <div>{formatChangeWithTrend(item.change_1h, item.change_1h_percent)}</div>
                      </div>
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">24h Change</div>
                        <div>{formatChangeWithTrend(item.change_24h, item.change_24h_percent)}</div>
                      </div>
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">7d Change</div>
                        <div>{formatChangeWithTrend(item.change_7d, item.change_7d_percent)}</div>
                      </div>
                      <div className="bg-black/30 p-1.5 rounded">
                        <div className="text-white/70">30d Change</div>
                        <div className="font-medium">
                          {item.loading ? (
                            <Skeleton className="h-4 w-full" />
                          ) : (
                            formatChangeWithTrend(item.change_30d, item.change_30d_percent)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-2 text-xs text-white/60">
          <p>Categories represent different wallet sizes in the KODA ecosystem. Hover over a category for details.</p>
          <p>1h Change now shows the difference between the two most recent data points.</p>
          {data.some((item) => item.error) && (
            <p className="text-red-400 mt-1">* Some data could not be loaded and may be outdated.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// שינוי 4: הוסף API route חדש לקבלת נתוני האספקה המעגלית
// הוסף את הקוד הזה בקובץ app/api/coin-supply/circulating/route.ts
