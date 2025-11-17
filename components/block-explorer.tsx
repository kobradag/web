"use client"

import { motion } from "framer-motion"
import { Hash, Clock, Box } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useBlockchain } from "@/contexts/BlockchainContext"
import { formatTimestamp } from "@/lib/date-utils"

export function BlockExplorer() {
  const { blocks, isConnected } = useBlockchain()
  const MAX_BLOCKS = 20

  if (!isConnected) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
        <p className="text-yellow-500">Connecting to block stream...</p>
      </div>
    )
  }

  // Get only the most recent MAX_BLOCKS blocks
  const displayBlocks = blocks
    .sort((a, b) => {
      // Handle different data formats
      const aScore = a.blueScore || a.blue_score || 0
      const bScore = b.blueScore || b.blue_score || 0
      return Number(bScore) - Number(aScore)
    })
    .slice(0, MAX_BLOCKS)

  return (
    <div className="h-full">
      {displayBlocks.length === 0 ? (
        <div className="text-center p-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block"
          >
            <Hash className="w-6 h-6 text-primary" />
          </motion.div>
          <p className="mt-2 text-white/60 text-sm">Loading blocks...</p>
        </div>
      ) : (
        <div className="space-y-1">
          {displayBlocks.map((block, index) => {
            // Extract block hash from different possible formats
            const blockHash = block.block_hash || block.hash || block.verboseData?.hash || ""
            // Extract transactions from different possible formats
            const txs = block.txs || block.transactions || []
            // Extract timestamp from different possible formats and convert to readable format
            const timestamp = block.timestamp || block.header?.timestamp || Date.now()
            const formattedTime = formatTimestamp(Number(timestamp))

            return (
              <motion.div
                key={blockHash || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="bg-black/80 border border-primary/20 py-1 px-3 hover:bg-black/90 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Hash className="w-3 h-3 text-primary" />
                      <Link
                        href={`/blocks/${blockHash}`}
                        className="font-mono text-xs text-primary hover:underline truncate max-w-[120px] md:max-w-[180px]"
                        onClick={(e) => {
                          // Prevent default navigation
                          e.preventDefault()
                          // Navigate to the block page
                          window.location.href = `/blocks/${blockHash}`
                          // This forces a full page navigation which will reset scroll position
                        }}
                      >
                        {blockHash}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-white/60">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{formattedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Box className="w-3 h-3" />
                        <span className="text-xs">{txs.length} txs</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
