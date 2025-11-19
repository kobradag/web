"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCoinSupply, getHalving, getBlockReward } from "@/utils/api"
import { formatNumber } from "@/lib/utils"
import moment from "moment"
import type React from "react"

export function CoinSupplyBox() {
  const [circCoins, setCircCoins] = useState("-")
  const [blockReward, setBlockReward] = useState("-")
  const [halvingDate, setHalvingDate] = useState("-")
  const [halvingAmount, setHalvingAmount] = useState("-")
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [error, setError] = useState<string | null>(null)

  const fetchCoinSupply = useCallback(async () => {
    try {
      const coinSupplyResp = await getCoinSupply()
      setCircCoins(Math.round(coinSupplyResp.circulatingSupply / 100000000).toString())
      setError(null)
    } catch (error) {
      console.error("Error fetching coin supply:", error)
      setError("Failed to update coin supply")
    }
  }, [])

  const fetchBlockReward = useCallback(async () => {
    try {
      const blockRewardResp = await getBlockReward()
      setBlockReward((blockRewardResp.blockreward * 0.98).toFixed(2))
      setError(null)
    } catch (error) {
      console.error("Error fetching block reward:", error)
      setError("Failed to update block reward")
    }
  }, [])

  const fetchHalvingInfo = useCallback(async () => {
    try {
      const halvingResp = await getHalving()
      setHalvingDate(moment(halvingResp.nextHalvingTimestamp * 1000).format("YYYY-MM-DD HH:mm"))
      setHalvingAmount((halvingResp.nextHalvingAmount * 0.98).toFixed(2))
      setError(null)
    } catch (error) {
      console.error("Error fetching halving info:", error)
      setError("Failed to update halving information")
    }
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchCoinSupply(), fetchBlockReward(), fetchHalvingInfo()])
    }

    fetchAllData() // Initial fetch

    const intervalId = setInterval(() => {
      fetchAllData()
    }, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [fetchCoinSupply, fetchBlockReward, fetchHalvingInfo])

  useEffect(() => {
    const updateCountdown = () => {
      const halvingTimestamp = moment(halvingDate, "YYYY-MM-DD HH:mm").valueOf()
      const now = Date.now()
      const distance = halvingTimestamp - now

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeRemaining({ days, hours, minutes, seconds })
      }
    }

    const countdownInterval = setInterval(updateCountdown, 1000)
    return () => clearInterval(countdownInterval)
  }, [halvingDate])

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Coins className="w-6 h-6 text-white" />
          <span>Coin Supply</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm mb-2"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-2">
                <InfoRow label="Total" value={`${formatNumber(Number.parseInt(circCoins))} KODA`} />
                <InfoRow label="Max (approx.)" value="445,000,000 KODA" />
                <InfoRow label="Mined" value={`${((Number.parseInt(circCoins) / 445000000) * 100).toFixed(2)}%`} />
                <InfoRow label="Block reward" value={`${blockReward} KODA`} />
                <InfoRow
                  label="Reward reduction"
                  value={
                    <>
                      <span className="text-white">{halvingDate}</span>
                      <div className="text-sm text-white">to {halvingAmount} KODA</div>
                      <div className="text-sm text-white">
                        {timeRemaining.days}D {timeRemaining.hours}H {timeRemaining.minutes}M {timeRemaining.seconds}S
                      </div>
                    </>
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-white">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  )
}
