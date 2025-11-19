"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Server } from "lucide-react"

interface MempoolServerData {
  mempoolSize: string | number
  serverVersion: string
  isUtxoIndexed?: boolean
  isSynced?: boolean
  p2pIdHashed?: string
}

export function MempoolServerInfo({ className = "" }: { className?: string }) {
  const [data, setData] = useState<MempoolServerData>({
    mempoolSize: 0,
    serverVersion: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.k0bradag.com/info/kobrad", {
          cache: "no-store",
          next: { revalidate: 0 },
        })

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`)
        }

        const newData = await response.json()
        console.log("Mempool server data:", newData)

        setData({
          mempoolSize: newData.mempoolSize,
          serverVersion: newData.serverVersion,
          isUtxoIndexed: newData.isUtxoIndexed,
          isSynced: newData.isSynced,
          p2pIdHashed: newData.p2pIdHashed,
        })

        setError(null)
      } catch (err) {
        console.error("Error fetching mempool and server info:", err)
        setError("Failed to load server data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 30000) // Update every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-black/80 border border-primary/20 overflow-hidden relative group hover:bg-black/90 transition-colors duration-300">
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Database className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-white/60">Mempool Size</p>
                {loading ? (
                  <div className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
                ) : error ? (
                  <p className="text-sm font-bold text-red-400">Error</p>
                ) : (
                  <p className="text-sm font-bold text-white">{data.mempoolSize}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-black/80 border border-primary/20 overflow-hidden relative group hover:bg-black/90 transition-colors duration-300">
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Server className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-white/60">Server Version</p>
                {loading ? (
                  <div className="h-4 w-16 bg-gray-700 animate-pulse rounded"></div>
                ) : error ? (
                  <p className="text-sm font-bold text-red-400">Error</p>
                ) : (
                  <p className="text-sm font-bold text-white">{data.serverVersion}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
