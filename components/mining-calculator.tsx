"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calculator } from "lucide-react"
import { getBlockReward, getMarketData, getBlockdagInfo } from "@/utils/api"

export function MiningCalculator() {
  // User inputs
  const [userHashrate, setUserHashrate] = useState(1) // Default 1 GH/s
  const [networkHashrate, setNetworkHashrate] = useState(1000) // Default 1000 GH/s
  const [blockReward, setBlockReward] = useState(150) // Default 150 KODA
  const [coinPrice, setCoinPrice] = useState(0.01) // Default $0.01

  // Calculated outputs
  const [dailyCoins, setDailyCoins] = useState(0)
  const [dailyValue, setDailyValue] = useState(0)

  // Fetch real data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch block reward
        const rewardData = await getBlockReward()
        if (rewardData && rewardData.blockreward) {
          setBlockReward(Number.parseFloat(rewardData.blockreward))
        }

        // Fetch price data
        const marketData = await getMarketData()
        if (marketData && marketData.price) {
          setCoinPrice(marketData.price)
        }

        // Fetch network hashrate from blockdag info
        const blockdagInfo = await getBlockdagInfo()
        if (blockdagInfo && blockdagInfo.difficulty) {
          // Network hashrate is typically difficulty * 2
          const calculatedHashrate = blockdagInfo.difficulty * 2
          // Convert to GH/s (from H/s)
          setNetworkHashrate(calculatedHashrate / 1e9)
        }
      } catch (error) {
        console.error("Error fetching mining calculator data:", error)
      }
    }

    fetchData()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Calculate mining rewards whenever inputs change
  useEffect(() => {
    // Formula: (86400 × BLOCK_REWARD) ÷ NETWORK_HASHRATE × USER_HASHRATE
    const coinsPerDay = ((86400 * blockReward) / networkHashrate) * userHashrate
    setDailyCoins(coinsPerDay)

    // Calculate USD value
    setDailyValue(coinsPerDay * coinPrice)
  }, [userHashrate, networkHashrate, blockReward, coinPrice])

  // Format number with commas and specified decimal places
  const formatNumber = (num: number, decimals = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  // Handle hashrate input change
  const handleHashrateChange = (value: number[]) => {
    setUserHashrate(value[0])
  }

  // Handle hashrate input field change
  const handleHashrateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0.1 && value <= 10) {
      setUserHashrate(value)
    }
  }

  return (
    <Card className="bg-black/50 border-primary overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent py-2 px-4">
        <CardTitle className="flex items-center gap-1 text-white text-sm">
          <Calculator className="h-4 w-4" />
          Mining Reward Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid gap-3">
          {/* User Hashrate Input with Network Hashrate Display */}
          <div className="grid grid-cols-5 gap-2 items-center">
            <div className="col-span-3">
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="hashrate" className="text-white text-xs">
                  Your Hashrate
                </Label>
                <span className="text-xs text-gray-400">Network: {formatNumber(networkHashrate, 2)} GH/s</span>
              </div>
              <Slider
                id="hashrate-slider"
                min={0.1}
                max={10}
                step={0.1}
                value={[userHashrate]}
                onValueChange={handleHashrateChange}
                className="py-1"
              />
            </div>
            <div className="col-span-1 text-xs text-gray-400 text-right">GH/s</div>
            <div className="col-span-1">
              <Input
                type="number"
                value={userHashrate}
                onChange={handleHashrateInputChange}
                min={0.1}
                max={10}
                step={0.1}
                className="bg-gray-800 text-white border-gray-700 h-7 text-xs"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-800/50 p-2 rounded-lg border border-gray-700">
              <div className="text-xs text-gray-400">Daily Mining</div>
              <div className="text-sm font-bold text-primary">
                {formatNumber(dailyCoins, 4)} <span className="text-white text-xs">KODA</span>
              </div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded-lg border border-gray-700">
              <div className="text-xs text-gray-400">Daily Value</div>
              <div className="text-sm font-bold text-green-500">
                ${formatNumber(dailyValue, 2)} <span className="text-white text-xs">USD</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
