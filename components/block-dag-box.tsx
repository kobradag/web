"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Network } from "lucide-react"
import { getBlockdagInfo } from "@/utils/api"
import { formatNumber } from "@/lib/utils"

interface BlockDAGInfo {
  networkName: string
  blockCount: number
  headerCount: number
  virtualDaaScore: number
  hashrate: number
  difficulty: number
  blockTime: number
  lastBlock: string
  totalBlocks: number
  activeNodes: number
}

export function BlockDAGBox() {
  const [blockDAGInfo, setBlockDAGInfo] = useState<BlockDAGInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBlockDAGInfo = useCallback(async () => {
    try {
      const dagInfo = await getBlockdagInfo()
      setBlockDAGInfo({
        networkName: dagInfo.networkName || "KODA",
        blockCount: dagInfo.blockCount || 0,
        headerCount: dagInfo.headerCount || 0,
        virtualDaaScore: dagInfo.virtualDaaScore || 0,
        hashrate: dagInfo.difficulty * 2 || 0,
        difficulty: dagInfo.difficulty || 0,
        blockTime: dagInfo.blockTime || 0,
        lastBlock: dagInfo.lastBlock || "",
        totalBlocks: dagInfo.totalBlocks || 0,
        activeNodes: dagInfo.activeNodes || 0,
      })
    } catch (error) {
      console.error("Error fetching BlockDAG info:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlockDAGInfo()
    const interval = setInterval(fetchBlockDAGInfo, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [fetchBlockDAGInfo])

  function formatHashrate(hashrate: number): string {
    if (hashrate < 1e3) return `${hashrate.toFixed(2)} H/s`
    if (hashrate < 1e6) return `${(hashrate / 1e3).toFixed(2)} KH/s`
    if (hashrate < 1e9) return `${(hashrate / 1e6).toFixed(2)} MH/s`
    if (hashrate < 1e12) return `${(hashrate / 1e9).toFixed(2)} GH/s`
    return `${(hashrate / 1e12).toFixed(2)} TH/s`
  }

  const infoRows = [
    { label: "Network name", value: blockDAGInfo?.networkName },
    { label: "Block count", value: blockDAGInfo?.blockCount, format: formatNumber },
    { label: "Header count", value: blockDAGInfo?.headerCount, format: formatNumber },
    { label: "Virtual DAA Score", value: blockDAGInfo?.virtualDaaScore, format: formatNumber },
    { label: "Hashrate", value: blockDAGInfo?.hashrate, format: formatHashrate },
    { label: "Difficulty", value: blockDAGInfo?.difficulty, format: formatNumber },
    { label: "Block Time", value: blockDAGInfo?.blockTime, format: (v: number) => `${v.toFixed(2)}s` },
    { label: "Latest Block", value: blockDAGInfo?.lastBlock },
    { label: "Total Blocks", value: blockDAGInfo?.totalBlocks, format: formatNumber },
    { label: "Active Nodes", value: blockDAGInfo?.activeNodes, format: formatNumber },
  ]

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Network className="w-6 h-6 text-white" />
          <span>BLOCKDAG INFO</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Table>
            <TableBody>
              {infoRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-white">{row.label}</TableCell>
                  <TableCell className="text-white">
                    {loading ? (
                      <Skeleton className="h-4 w-20" />
                    ) : row.format ? (
                      row.format(row.value as number)
                    ) : (
                      row.value || "N/A"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  )
}
