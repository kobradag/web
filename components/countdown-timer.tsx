"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { getHalvingInfo } from "@/utils/api"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [nextHalvingInfo, setNextHalvingInfo] = useState({
    date: "",
    amount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const fetchHalvingData = async () => {
      try {
        const halvingData = await getHalvingInfo()
        if (halvingData && halvingData.nextHalvingTimestamp) {
          setNextHalvingInfo({
            date: halvingData.nextHalvingDate,
            amount: halvingData.nextHalvingAmount,
          })

          // Use the timestamp directly from the API
          const targetTimestamp = halvingData.nextHalvingTimestamp * 1000

          const updateTimer = () => {
            const now = Date.now()
            const difference = targetTimestamp - now

            if (difference > 0) {
              setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
              })
            } else {
              clearInterval(timer)
              setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
          }

          updateTimer()
          timer = setInterval(updateTimer, 1000)
          setIsLoading(false)
        } else {
          throw new Error("Invalid halving data received")
        }
      } catch (error) {
        console.error("Error fetching halving data:", error)
        setIsLoading(false)
      }
    }

    fetchHalvingData()

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-black/50 border-[#FFD700] gold-border">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 gold-text text-center">LOADING HALVING DATA...</h2>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="bg-black/50 border-[#FFD700] gold-border">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2 gold-text text-center">HALVING COUNTDOWN</h2>
          {nextHalvingInfo.date && (
            <p className="text-center text-white/80 mb-4">
              Next reward reduction to <span className="text-[#FFD700]">{nextHalvingInfo.amount}</span> KODA on{" "}
              <span className="text-[#FFD700]">{nextHalvingInfo.date}</span>
            </p>
          )}
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-3xl font-bold gold-text glow-effect">{String(value).padStart(2, "0")}</div>
                <div className="text-sm text-[#FFD700] uppercase">{key}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
