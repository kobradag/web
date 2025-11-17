"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchWithRetry } from "../utils/fetchWithRetry"
import { mockMarketData } from "../utils/mockData"

interface PriceData {
  timestamp: number
  price: number
}

export function PriceChart() {
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("24h")

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const data = await fetchWithRetry("https://api.xeggex.com/api/v2/ASSET/GETBYID/666b539d530d4ea3f1fee0f5")
        const currentPrice = Number.parseFloat(data.usdValue)

        const mockHistoricalData = generateMockHistoricalData(currentPrice, timeRange)
        setPriceData(mockHistoricalData)

        if (data === mockMarketData) {
          setError("Unable to fetch real-time data. Displaying mock data.")
        }
      } catch (err) {
        console.error("Error fetching price data:", err)
        setError("An unexpected error occurred. Displaying mock data.")
        const mockPrice = Number.parseFloat(mockMarketData.usdValue)
        const mockHistoricalData = generateMockHistoricalData(mockPrice, timeRange)
        setPriceData(mockHistoricalData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPriceData()
    const interval = setInterval(fetchPriceData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [timeRange])

  const generateMockHistoricalData = (currentPrice: number, range: string): PriceData[] => {
    const now = Date.now()
    const dataPoints = range === "24h" ? 24 : range === "7d" ? 7 * 24 : 30 * 24
    const interval = range === "24h" ? 3600000 : range === "7d" ? 3600000 * 6 : 3600000 * 24
    let lastPrice = currentPrice
    let trend = Math.random() > 0.5 ? 1 : -1
    let trendDuration = 0

    return Array.from({ length: dataPoints }, (_, i) => {
      const timestamp = now - (dataPoints - i - 1) * interval

      if (trendDuration <= 0) {
        trend = Math.random() > 0.5 ? 1 : -1
        trendDuration = Math.floor(Math.random() * 5) + 1
      }
      trendDuration--

      const changePercent = (Math.random() * 2 + 0.5) * trend
      lastPrice = lastPrice * (1 + changePercent / 100)

      return {
        timestamp,
        price: lastPrice,
      }
    })
  }

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem)
    if (timeRange === "24h") {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    } else if (timeRange === "7d") {
      return date.toLocaleDateString("en-US", { weekday: "short" })
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  if (isLoading) {
    return (
      <Card className="glass-card hover-effect">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl vibrant-gradient">Price Analysis</CardTitle>
          <Skeleton className="h-10 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="glass-card hover-effect">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl vibrant-gradient">Price Analysis</CardTitle>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-black/50 border-primary/20">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-primary/20">
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p className="font-bold">Note</p>
              <p>{error}</p>
            </div>
          )}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <XAxis dataKey="timestamp" stroke="#666" tickFormatter={formatXAxis} />
                <YAxis stroke="#666" domain={["auto", "auto"]} tickFormatter={(value) => `$${value.toFixed(8)}`} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(0, 255, 0, 0.2)",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(label) => new Date(label).toLocaleString("en-US")}
                  formatter={(value: number) => [`$${value.toFixed(8)}`, "Price"]}
                />
                <Line
                  type="linear"
                  dataKey="price"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
