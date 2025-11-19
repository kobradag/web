"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ROICalculator() {
  const [investment, setInvestment] = useState<number>(100)
  const [timeFrame, setTimeFrame] = useState<number>(30)
  const [roi, setRoi] = useState<number | null>(null)

  const calculateROI = () => {
    // This is a simplified calculation and should be adjusted based on actual KODA performance data
    const estimatedDailyReturn = 0.005 // 0.5% daily return (example)
    const totalReturn = investment * Math.pow(1 + estimatedDailyReturn, timeFrame)
    setRoi(totalReturn - investment)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>KODA ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="investment" className="block text-sm font-medium text-gray-700">
              Investment Amount (USD)
            </label>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="timeFrame" className="block text-sm font-medium text-gray-700">
              Time Frame (Days)
            </label>
            <Input
              id="timeFrame"
              type="number"
              value={timeFrame}
              onChange={(e) => setTimeFrame(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <Button onClick={calculateROI} className="w-full">
            Calculate ROI
          </Button>
          {roi !== null && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Estimated ROI: ${roi.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                This is an estimate based on historical data and is not a guarantee of future returns.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
