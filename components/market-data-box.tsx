"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { DollarSign, AlertCircle, RefreshCw } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MarketDataBox() {
  const [price, setPrice] = useState<string>("-")
  const [marketCap, setMarketCap] = useState<string>("-")
  const [volume, setVolume] = useState<string>("-")
  const [priceChange, setPriceChange] = useState<string>("-")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [rawData, setRawData] = useState<any>(null)

  const fetchMarketData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Fetching market data from XeggeX API...")
      const response = await fetch("https://api.xeggex.com/api/v2/market/getlist", {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const markets = await response.json()
      console.log("XeggeX API response received:", markets.length, "markets")

      const kodaMarket = markets.find((market: any) => market.symbol === "KODA/USDT")

      if (kodaMarket) {
        console.log("KODA market data found:", kodaMarket)
        setRawData(kodaMarket)

        // Process price - handle very small numbers properly
        const lastPrice = Number.parseFloat(kodaMarket.lastPrice || "0")
        setPrice(lastPrice.toFixed(8))

        // Calculate market cap properly
        const circSupply = Number.parseFloat(kodaMarket.primaryCirculation || "0")
        if (lastPrice > 0 && circSupply > 0) {
          const marketCapValue = lastPrice * circSupply
          setMarketCap(marketCapValue.toString())
        } else {
          setMarketCap("0")
        }

        // Get volume directly from API
        const volumeData = kodaMarket.volumeUsdNumber || 0
        setVolume(volumeData.toString())

        // Get price change directly from API
        const changePercent = kodaMarket.changePercentNumber || 0
        setPriceChange(changePercent.toString())

        setLastUpdated(new Date())
      } else {
        console.warn("KODA market data not found in API response")
        setError("KODA market data not found")
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
      setError(`Failed to fetch market data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMarketData()
    const interval = setInterval(fetchMarketData, 30000) // 30 seconds
    return () => clearInterval(interval)
  }, [fetchMarketData])

  // For debugging
  useEffect(() => {
    if (rawData) {
      console.log("Raw data from API:", rawData)
      console.log("Processed values:", {
        price,
        marketCap,
        volume,
        priceChange,
      })
    }
  }, [rawData, price, marketCap, volume, priceChange])

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-white" />
            <span>Market Data</span>
          </div>
          {lastUpdated && <div className="text-xs text-gray-400">Updated: {lastUpdated.toLocaleTimeString()}</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
            <p className="text-red-400 mb-4">{error}</p>
            <Button
              onClick={fetchMarketData}
              variant="outline"
              className="flex items-center gap-2 border-white/20 hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-white">Price</TableCell>
                  <TableCell className="text-white">
                    {loading ? <Skeleton className="h-4 w-20" /> : `$${price} / KODA`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Market Cap</TableCell>
                  <TableCell className="text-white">
                    {loading ? (
                      <Skeleton className="h-4 w-24" />
                    ) : (
                      `$${formatNumber(Number.parseFloat(marketCap) || 0)}`
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Volume 24h</TableCell>
                  <TableCell className="text-white">
                    {loading ? <Skeleton className="h-4 w-24" /> : `$${formatNumber(Number.parseFloat(volume) || 0)}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Price Change 24h</TableCell>
                  <TableCell
                    className={
                      Number.parseFloat(priceChange) > 0
                        ? "text-green-500"
                        : Number.parseFloat(priceChange) < 0
                          ? "text-red-500"
                          : "text-white"
                    }
                  >
                    {loading ? <Skeleton className="h-4 w-16" /> : `${priceChange}%`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
