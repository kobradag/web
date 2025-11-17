"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedStatsCardProps {
  title: string
  value: string | number
  change?: number
  delay?: number
}

export function AnimatedStatsCard({ title, value, change, delay = 0 }: AnimatedStatsCardProps) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay * 100}ms` }}>
      <Card className="bg-gray-900/50 border-gray-800 overflow-hidden relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <CardHeader>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <p className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
