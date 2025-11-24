"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { RecentPaymentsPopup } from "./recent-payments-popup"

function CountdownToJuly() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-07-22T00:00:00")

    const updateTimer = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="font-mono text-xl font-bold">
      {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m{" "}
      {String(timeLeft.seconds).padStart(2, "0")}s
    </span>
  )
}

export function WalletIpForm() {
  const [ip, setIp] = useState("e.g. xxx.xxx.xxx.xxx")
  const [wallet, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingIp, setIsCheckingIp] = useState(false)
  const [ipStatus, setIpStatus] = useState<"valid" | "invalid" | null>(null)
  const [statusType, setStatusType] = useState<"success" | "error" | "">("")
  const [isMobile, setIsMobile] = useState(false)
  const [isPaymentsPopupOpen, setIsPaymentsPopupOpen] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const checkIp = async () => {
    if (!ip.trim() || ip === "e.g. xxx.xxx.xxx.xxx") return
    setIsCheckingIp(true)
    setIpStatus(null)
    try {
      const res = await fetch(`/api/check-node-ip?ip=${encodeURIComponent(ip)}`)
      const data = await res.json()
      setIpStatus(data.exists ? "valid" : "invalid")
    } catch (error) {
      setIpStatus("invalid")
    }
    setIsCheckingIp(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("")
    try {
      const res = await fetch("/api/submit-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip, wallet }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus("✅ Wallet successfully linked to node IP!")
        setStatusType("success")
        setWallet("")
      } else {
        setStatus(data.error || data.message || "❌ Failed to link wallet to node IP.")
        setStatusType("error")
      }
    } catch (error) {
      setStatus("❌ An error occurred. Please try again later.")
      setStatusType("error")
    }
    setIsLoading(false)
  }

  const resetForm = () => {
    setIp("e.g. xxx.xxx.xxx.xxx")
    setWallet("")
    setIpStatus(null)
    setStatus("")
  }

  return (
    <Card className="w-full bg-black/40 backdrop-blur-lg border border-white/20 shadow-lg glass-card">
      <CardHeader className="py-3 px-4 bg-gradient-to-r from-black/60 to-black/40 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-white">Link Wallet to Node IP</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Associate your wallet address with your node&apos;s IP address
            </CardDescription>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center text-red-500">
              <span className="text-sm font-medium mr-2">Ends in:</span>
              <CountdownToJuly />
            </div>
            <Button
              onClick={() => setIsPaymentsPopupOpen(true)}
              className="mt-2 bg-green-600/80 hover:bg-green-600 text-white text-xs px-2 py-1 h-auto"
            >
              Recent Payments
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="ip" className="text-gray-300 text-sm">
              Node IP Address:
            </Label>
            <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-2"}`}>
              <div className="relative flex-1">
                <Input
                  id="ip"
                  value={ip}
                  onChange={(e) => {
                    setIp(e.target.value)
                    setIpStatus(null)
                  }}
                  placeholder="e.g. xxx.xxx.xxx.xxx"
                  required
                  className="bg-black/60 border-white/20 text-white pr-10 h-10 text-sm"
                  onFocus={(e) => {
                    if (e.target.value === "e.g. xxx.xxx.xxx.xxx") {
                      setIp("")
                    }
                  }}
                />
                {ipStatus && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {ipStatus === "valid" ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              <Button
                type="button"
                onClick={checkIp}
                disabled={isCheckingIp || !ip.trim() || ip === "e.g. xxx.xxx.xxx.xxx"}
                className={`bg-black/60 hover:bg-black/80 border border-white/10 text-white h-10 px-3 text-sm ${isMobile ? "w-full" : ""}`}
              >
                {isCheckingIp ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : "Check IP"}
              </Button>
            </div>
            {ipStatus === "invalid" && (
              <p className="text-xs text-red-400 mt-0.5">This IP is not currently connected to the network.</p>
            )}
            {ipStatus === "valid" && (
              <p className="text-xs text-green-400 mt-0.5">IP is valid and connected to the network.</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="wallet" className="text-gray-300 text-sm">
              Wallet Address:
            </Label>
            <Input
              id="wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="e.g. kobra:qpjlggt9nqles2q5..."
              required
              className="bg-black/60 border-white/10 text-white h-10 text-sm"
            />
          </div>

          <div className={`${isMobile ? "flex flex-col space-y-2" : "flex space-x-2"} pt-1`}>
            <Button
              type="submit"
              disabled={isLoading || ipStatus !== "valid"}
              className={`bg-gradient-to-r from-[#00ff00] to-[#00cc00] hover:from-[#00ff00]/80 hover:to-[#00cc00]/80 text-black font-medium h-10 text-sm ${isMobile ? "w-full" : "flex-1"}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Processing...
                </span>
              ) : (
                "Link Wallet to Node"
              )}
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              className={`bg-black/60 hover:bg-black/80 border border-white/10 text-white h-10 px-3 text-sm ${isMobile ? "w-full" : ""}`}
            >
              Reset
            </Button>
          </div>

          {status && (
            <div
              className={`mt-2 p-2 rounded-md border text-sm ${
                statusType === "success"
                  ? "bg-black/60 border-[#00ff00]/30 text-[#00ff00]"
                  : "bg-black/60 border-red-500/30 text-red-400"
              }`}
            >
              {status}
            </div>
          )}
        </form>
      </CardContent>

      {/* Recent Payments Popup */}
      <RecentPaymentsPopup isOpen={isPaymentsPopupOpen} onClose={() => setIsPaymentsPopupOpen(false)} />
    </Card>
  )
}
