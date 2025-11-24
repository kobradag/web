"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payment {
  timestamp: string
  address: string
  amount: number
}

interface RecentPaymentsPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function RecentPaymentsPopup({ isOpen, onClose }: RecentPaymentsPopupProps) {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchPayments()
    }
  }, [isOpen])

  const fetchPayments = async () => {
    setLoading(true)
    setError(null)
    try {
      // Use our internal API route
      const response = await fetch("/api/recent-payments")

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      setPayments(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Failed to load recent payments. Please try again later.")
      console.error("Error fetching payments:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date)
  }

  const formatAddress = (address: string) => {
    if (address.length <= 20) return address
    return `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="w-full max-w-3xl max-h-[80vh] bg-black/90 border border-white/20 shadow-xl overflow-hidden">
        <CardHeader className="py-3 px-4 bg-gradient-to-r from-black/60 to-black/40 border-b border-white/10 flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-bold text-white">Recent Payments</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                <span className="ml-2 text-gray-300">Loading payments...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-400">{error}</div>
            ) : payments.length === 0 ? (
              <div className="p-6 text-center text-gray-400">No payment data available</div>
            ) : (
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-black/80 backdrop-blur-sm">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date & Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Wallet Address</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-300">{formatDate(payment.timestamp)}</td>
                      <td className="px-4 py-3 text-sm text-gray-300 font-mono">
                        <div className="group relative">
                          <span>{formatAddress(payment.address)}</span>
                          <span className="absolute left-0 -top-8 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap z-10">
                            {payment.address}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-400 font-mono">{payment.amount} KOBRA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
