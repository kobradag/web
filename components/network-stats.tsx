"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Box,
  Database,
  Hash,
  Zap,
  Network,
  Coins,
  Award,
  TrendingDown,
  PercentIcon,
  Maximize,
  DollarSign,
  BarChart,
  TrendingUp,
  LayoutGrid,
  Timer,
  Server,
  Inbox,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { getBlockdagInfo, getBlockReward, getHalving, getCoinSupply, getMarketData } from "@/utils/api"
import { formatNumber, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NetworkStatsData {
  networkName: string
  blockCount: number
  headerCount: number
  virtualDaaScore: number
  hashrate: number
  difficulty: number
  blockTime: number
  lastBlock: string
  totalBlocks: number
  activeNodes: number
  totalSupply: number
  blockReward: number
  nextHalvingDate: string
  nextHalvingAmount: number
  minedPercentage: number
  maxSupply: number
  price: number
  marketCap: number
  fdv: number
  volume24h: number
  priceChange24h: number
  priceChange1h: number
  priceChange7d: number
  priceChange30d: number
  ath: number
  athDate: string
  atl: number
  atlDate: string
  mempoolSize: string | number
  serverVersion: string
  nextHalvingTimestamp: number
}

interface CountdownTimer {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const DEFAULT_STATS: NetworkStatsData = {
  networkName: "KODA",
  blockCount: 0,
  headerCount: 0,
  virtualDaaScore: 0,
  hashrate: 0,
  difficulty: 32372623.59,
  blockTime: 0,
  lastBlock: "",
  totalBlocks: 0,
  activeNodes: 0,
  totalSupply: 0,
  blockReward: 4.9,
  nextHalvingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  nextHalvingAmount: 4.41,
  minedPercentage: 0,
  maxSupply: 445000000,
  price: 0,
  marketCap: 0,
  fdv: 0,
  volume24h: 0,
  priceChange24h: 0,
  priceChange1h: 0,
  priceChange7d: 0,
  priceChange30d: 0,
  ath: 0,
  athDate: "",
  atl: 0,
  atlDate: "",
  mempoolSize: "N/A",
  serverVersion: "N/A",
  nextHalvingTimestamp: Math.floor(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() / 1000),
}

const fetchWithTimeout = async (url: string, options = {}, timeout = 5000) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export function NetworkStats() {
  const [stats, setStats] = useState<NetworkStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [partialSuccess, setPartialSuccess] = useState(false)
  const statsRef = useRef<NetworkStatsData | null>(null)
  const [countdown, setCountdown] = useState<CountdownTimer>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = async () => {
    try {
      setRefreshing(true)
      const newStats = { ...DEFAULT_STATS }
      let hadPartialFailure = false

      // Try to fetch kobrad info with timeout
      try {
        const kobradResponse = await fetchWithTimeout(
          "https://api.k0bradag.com/info/kobrad",
          {
            cache: "no-store",
            next: { revalidate: 0 },
          },
          3000,
        )

        if (kobradResponse.ok) {
          const kobradInfo = await kobradResponse.json()
          newStats.mempoolSize = kobradInfo.mempoolSize || "N/A"
          newStats.serverVersion = kobradInfo.serverVersion || "N/A"
        } else {
          console.warn("Failed to fetch kobrad info:", kobradResponse.status)
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error fetching kobrad info:", err)
        hadPartialFailure = true
      }

      // Fetch other data with individual try/catch blocks
      try {
        const blockdagInfo = await getBlockdagInfo()
        if (blockdagInfo) {
          newStats.networkName = blockdagInfo.networkName || "KODA"
          newStats.blockCount = blockdagInfo.blockCount || 0
          newStats.headerCount = blockdagInfo.headerCount || 0
          newStats.virtualDaaScore = blockdagInfo.virtualDaaScore || 0
          newStats.hashrate = blockdagInfo.difficulty * 2 || 0
          newStats.difficulty = blockdagInfo.difficulty || 32372623.59
          newStats.blockTime = blockdagInfo.blockTime || 0
          newStats.lastBlock = blockdagInfo.lastBlock || ""
          newStats.totalBlocks = blockdagInfo.totalBlocks || 0
          newStats.activeNodes = blockdagInfo.activeNodes || 0
        } else {
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error fetching blockdag info:", err)
        hadPartialFailure = true
      }

      try {
        const blockRewardInfo = await getBlockReward()
        if (blockRewardInfo) {
          newStats.blockReward = blockRewardInfo.blockreward * 0.98 || 4.9
        } else {
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error fetching block reward:", err)
        hadPartialFailure = true
      }

      try {
        const halvingInfo = await getHalving()
        if (halvingInfo) {
          // Store the full date string from the API including time and UTC
          newStats.nextHalvingDate = halvingInfo.nextHalvingDate || "N/A"
          newStats.nextHalvingTimestamp = halvingInfo.nextHalvingTimestamp || 0
          // Apply 2% reduction to the nextHalvingAmount
          newStats.nextHalvingAmount = halvingInfo.nextHalvingAmount * 0.98 || 4.41
        } else {
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error fetching halving info:", err)
        hadPartialFailure = true
      }

      try {
        const coinSupplyInfo = await getCoinSupply()
        if (coinSupplyInfo) {
          const totalSupply = coinSupplyInfo.circulatingSupply / 100000000 // Convert from sompis to KODA
          newStats.totalSupply = totalSupply
          newStats.minedPercentage = (totalSupply / newStats.maxSupply) * 100
        } else {
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error fetching coin supply:", err)
        hadPartialFailure = true
      }

      // In the fetchStats function, update the market data section
      try {
        const marketData = await getMarketData()
        if (marketData) {
          newStats.price = marketData.price
          newStats.fdv = marketData.fdv
          newStats.volume24h = marketData.volume24h
          newStats.priceChange24h = marketData.priceChange24h
          newStats.priceChange1h = marketData.priceChange1h
          newStats.priceChange7d = marketData.priceChange7d
          newStats.priceChange30d = marketData.priceChange30d
          newStats.ath = marketData.ath
          newStats.athDate = marketData.athDate
          newStats.atl = marketData.atl
          newStats.atlDate = marketData.atlDate

          // Calculate Market Cap correctly as Price × Total Supply
          if (newStats.price && newStats.totalSupply) {
            newStats.marketCap = newStats.price * newStats.totalSupply
          }

          // If we're using fallback data, mark as partial success
          if (marketData.price === 0.000123 && marketData.fdv === 54735000) {
            console.log("Using fallback market data")
            hadPartialFailure = true
          }
        } else {
          hadPartialFailure = true
        }
      } catch (err) {
        console.warn("Error processing market data:", err)
        hadPartialFailure = true
      }

      statsRef.current = newStats
      setStats(newStats)
      setPartialSuccess(hadPartialFailure)
      setError(null)
    } catch (err) {
      console.error("Error fetching network stats:", err)
      setError("Failed to load network statistics. Please try again later.")
      // Try to use any previously fetched data
      if (statsRef.current) {
        setStats(statsRef.current)
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchStats() // Initial fetch

    const fetchInterval = setInterval(fetchStats, 60000) // Update every 60 seconds (increased from 30s)

    return () => {
      clearInterval(fetchInterval)
    }
  }, [])

  const formatLargeNumber = (value: number): string => {
    if (value < 1e3) return `${value.toFixed(2)}`
    if (value < 1e6) return `${(value / 1e3).toFixed(2)} K`
    if (value < 1e9) return `${(value / 1e6).toFixed(2)} M`
    if (value < 1e12) return `${(value / 1e9).toFixed(2)} G`
    if (value < 1e15) return `${(value / 1e12).toFixed(2)} T`
    return `${(value / 1e15).toFixed(2)} P`
  }

  const formatHashrate = (hashrate: number): string => {
    return `${formatLargeNumber(hashrate)}H/s`
  }

  const calculateCountdown = useCallback((timestamp: number) => {
    const now = Math.floor(Date.now() / 1000)
    const difference = timestamp - now

    if (difference > 0) {
      const days = Math.floor(difference / (24 * 60 * 60))
      const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((difference % (60 * 60)) / 60)
      const seconds = Math.floor(difference % 60)

      setCountdown({ days, hours, minutes, seconds })
    }
  }, [])

  useEffect(() => {
    if (stats?.nextHalvingTimestamp) {
      calculateCountdown(stats.nextHalvingTimestamp)
      const timer = setInterval(() => calculateCountdown(stats.nextHalvingTimestamp), 1000)
      return () => clearInterval(timer)
    }
  }, [stats?.nextHalvingTimestamp, calculateCountdown])

  // Calculate daily target value (86400 seconds in a day × Block Reward × Price)
  const calculateDailyTarget = () => {
    if (stats?.blockReward && stats?.price) {
      const dailyTarget = 86400 * stats.blockReward * stats.price
      return `$${formatNumber(dailyTarget)}`
    }
    return "N/A"
  }

  // Define the stats data in sections for better organization
  const allStats = [
    { icon: DollarSign, label: "Price", value: stats?.price ? `$${stats.price.toFixed(6)} USD` : "N/A" },
    { icon: BarChart, label: "Market Cap", value: stats?.marketCap ? formatCurrency(stats.marketCap) : "N/A" },
    { icon: BarChart, label: "FDV", value: stats?.fdv ? formatCurrency(stats.fdv) : "N/A" },
    { icon: TrendingUp, label: "Volume 24h", value: stats?.volume24h ? formatCurrency(stats.volume24h) : "N/A" },
    {
      icon: TrendingDown,
      label: "Price Change 1h",
      value: stats?.priceChange1h ? `${stats.priceChange1h.toFixed(2)}%` : "N/A",
      className: stats?.priceChange1h && stats.priceChange1h < 0 ? "text-red-500" : "text-green-500",
    },
    {
      icon: TrendingDown,
      label: "Price Change 24h",
      value: stats?.priceChange24h ? `${stats.priceChange24h.toFixed(2)}%` : "N/A",
      className: stats?.priceChange24h && stats.priceChange24h < 0 ? "text-red-500" : "text-green-500",
    },
    {
      icon: TrendingDown,
      label: "Price Change 7d",
      value: stats?.priceChange7d ? `${stats.priceChange7d.toFixed(2)}%` : "N/A",
      className: stats?.priceChange7d && stats.priceChange7d < 0 ? "text-red-500" : "text-green-500",
    },
    {
      icon: TrendingDown,
      label: "Price Change 30d",
      value: stats?.priceChange30d ? `${stats.priceChange30d.toFixed(2)}%` : "N/A",
      className: stats?.priceChange30d && stats.priceChange30d < 0 ? "text-red-500" : "text-green-500",
    },
    {
      icon: Award,
      label: "ATH",
      value: stats?.ath ? `$${stats.ath.toFixed(6)} USD` : "N/A",
      tooltip: stats?.athDate ? new Date(stats.athDate).toLocaleDateString() : "",
    },
    { icon: Network, label: "Network Name", value: stats?.networkName },
    {
      icon: Coins,
      label: "Total Supply",
      value: stats?.totalSupply ? `${formatNumber(Math.floor(stats.totalSupply))} KODA` : "N/A",
    },
    { icon: Box, label: "Block Count", value: stats?.blockCount },
    { icon: Database, label: "Header Count", value: stats?.headerCount },
    { icon: Activity, label: "Virtual DAA Score", value: stats?.virtualDaaScore },
    { icon: Zap, label: "Network Hashrate", value: stats?.hashrate ? formatHashrate(stats.hashrate) : "N/A" },
    { icon: Hash, label: "Difficulty", value: stats?.difficulty ? formatLargeNumber(stats.difficulty) : "N/A" },
    { icon: Award, label: "Block Reward", value: stats?.blockReward ? `${stats.blockReward.toFixed(2)} KODA` : "N/A" },
    {
      icon: DollarSign,
      label: "Daily Target",
      value: calculateDailyTarget(),
    },
    {
      icon: TrendingDown,
      label: "Reward Reduction",
      value: stats?.nextHalvingDate
        ? `${stats?.nextHalvingDate} to ${stats?.nextHalvingAmount ? stats.nextHalvingAmount.toFixed(2) : "4.41"} KODA`
        : "N/A",
    },
    {
      icon: Timer,
      label: "Halving Countdown",
      value: `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`,
      className:
        countdown.days < 10 ? "text-red-500 font-bold" : countdown.days < 20 ? "text-yellow-500" : "text-green-500",
    },
    {
      icon: PercentIcon,
      label: "Mined",
      value: stats?.minedPercentage ? `${stats.minedPercentage.toFixed(2)}%` : "N/A",
    },
    {
      icon: Maximize,
      label: "Max (approx.)",
      value: stats?.maxSupply ? `${formatNumber(stats.maxSupply)} KODA` : "N/A",
    },
    {
      icon: Inbox,
      label: "Mempool Size",
      value: stats?.mempoolSize || "N/A",
      highlight: true,
    },
    {
      icon: Server,
      label: "Server Version",
      value: stats?.serverVersion || "N/A",
      highlight: true,
    },
  ]

  if (error && !stats) {
    return (
      <Card className="bg-black/90 border-primary overflow-hidden relative group hover:bg-black transition-colors duration-300 w-full">
        <CardHeader className="border-b border-white/10 py-2 px-4">
          <CardTitle className="flex items-center space-x-2 text-white text-base">
            <LayoutGrid className="w-4 h-4 text-white" />
            <span>KODA Network Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center text-red-500 flex flex-col items-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="mb-2">{error}</p>
            <Button
              onClick={fetchStats}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              disabled={refreshing}
            >
              {refreshing ? "Retrying..." : "Retry"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/90 border-primary overflow-hidden relative group hover:bg-black transition-colors duration-300 w-full">
      <CardHeader className="border-b border-white/10 py-2 px-4 flex flex-row justify-between items-center">
        <CardTitle className="flex items-center space-x-2 text-white text-base">
          <LayoutGrid className="w-4 h-4 text-white" />
          <span>KODA Network Statistics</span>
          {partialSuccess && (
            <span className="text-xs text-yellow-500 ml-2 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Partial data
            </span>
          )}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-full bg-black/30 border-primary/30 hover:bg-primary/20"
          onClick={fetchStats}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 text-primary ${refreshing ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent className="p-3">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {allStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex items-start space-x-2 bg-black/40 p-2 rounded-md ${
                    stat.highlight ? "ring-1 ring-primary/30" : ""
                  }`}
                  title={stat.tooltip}
                >
                  <div className={`p-1 ${stat.highlight ? "bg-primary/20" : "bg-primary/10"} rounded-full`}>
                    <stat.icon className={`w-3 h-3 ${stat.highlight ? "text-primary" : "text-primary"}`} />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">{stat.label}</p>
                    <div className={`text-xs font-bold ${stat.className || "text-white"}`}>
                      {loading ? (
                        <div className="h-3 w-16 bg-gray-700 animate-pulse rounded"></div>
                      ) : typeof stat.value === "number" ? (
                        formatNumber(stat.value)
                      ) : (
                        stat.value || "N/A"
                      )}
                    </div>
                    {stat.tooltip && <p className="text-xs text-white/40">{stat.tooltip}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
