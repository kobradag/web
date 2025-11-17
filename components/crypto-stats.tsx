"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"

interface CryptoData {
  price: number
  marketCap: number
  volume24h: number
  priceHistory: { value: number; timestamp: string }[]
}

export function CryptoStats() {
  const [data, setData] = useState<CryptoData | null>(null)

  useEffect(() => {
    // Simulated data - replace with actual API call
    setData({
      price: 0.0834,
      marketCap: 1750000000,
      volume24h: 25000000,
      priceHistory: Array.from({ length: 24 }, (_, i) => ({
        value: 0.08 + Math.random() * 0.01,
        timestamp: `${i}:00`,
      })),
    })
  }, [])

  if (!data) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.price.toFixed(4)}</div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(data.marketCap / 1000000).toFixed(2)}M</div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(data.volume24h / 1000000).toFixed(2)}M</div>
        </CardContent>
      </Card>
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Price Chart (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={data.priceHistory}>
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
