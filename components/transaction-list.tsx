"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hash, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useBlockchain } from "@/contexts/BlockchainContext"

interface Transaction {
  txId: string
  outputs: [string, string][]
  timestamp?: number
}

export function TransactionList() {
  const { blocks, isConnected } = useBlockchain()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const processedTxIds = useRef(new Set<string>())
  const MAX_TRANSACTIONS = 20
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract transactions from blocks
  useEffect(() => {
    if (!blocks || blocks.length === 0) return

    const newTransactions: Transaction[] = []

    // Process blocks to extract transactions
    blocks.forEach((block) => {
      const blockTimestamp = block.timestamp || Date.now()

      // Check if block has transactions
      if (block.txs && Array.isArray(block.txs)) {
        block.txs.forEach((tx) => {
          // Skip already processed transactions
          if (processedTxIds.current.has(tx.txId)) return

          // Add to processed set
          processedTxIds.current.add(tx.txId)

          // Add transaction with timestamp from block
          newTransactions.push({
            ...tx,
            timestamp: blockTimestamp,
          })
        })
      }
    })

    // Update transactions state if we have new ones
    if (newTransactions.length > 0) {
      setTransactions((prev) => {
        // Combine new transactions with existing ones
        const combined = [...newTransactions, ...prev]
        // Keep only the MAX_TRANSACTIONS most recent
        return combined.slice(0, MAX_TRANSACTIONS)
      })
    }
  }, [blocks])

  // Clear old transaction IDs periodically to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      // If we have more than 1000 processed IDs, clear them and keep only the current ones
      if (processedTxIds.current.size > 1000) {
        const currentTxIds = new Set(transactions.map((tx) => tx.txId))
        processedTxIds.current = currentTxIds
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [transactions])

  if (!isConnected) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
        <p className="text-yellow-500">Connecting to transaction stream...</p>
      </div>
    )
  }

  // Get only the MAX_TRANSACTIONS most recent transactions
  const displayTransactions = transactions.slice(0, MAX_TRANSACTIONS)

  return (
    <div className="h-full" ref={containerRef}>
      {displayTransactions.length === 0 ? (
        <div className="text-center p-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block"
          >
            <Hash className="w-6 h-6 text-primary" />
          </motion.div>
          <p className="mt-2 text-white/60 text-sm">Waiting for transactions...</p>
        </div>
      ) : (
        <div className="space-y-1 relative">
          <AnimatePresence initial={false}>
            {displayTransactions.map((transaction, index) => {
              // Get the first output for display
              const firstOutput = transaction.outputs && transaction.outputs.length > 0 ? transaction.outputs[0] : null

              const recipientAddress = firstOutput ? firstOutput[0] : "Unknown"
              const amount = firstOutput ? firstOutput[1] : "0"

              // Format the amount (convert from satoshis to whole coins)
              const formattedAmount = (Number.parseInt(amount) / 100000000).toFixed(2)

              // Format the address to show a truncated version
              const formattedAddress =
                recipientAddress.length > 20
                  ? `${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 6)}`
                  : recipientAddress

              return (
                <motion.div
                  key={transaction.txId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-black/80 border border-primary/20 py-1 px-2 sm:px-3 hover:bg-black/90 transition-colors">
                    <div className="flex items-center justify-between w-full whitespace-nowrap overflow-hidden">
                      <div className="flex items-center space-x-1 min-w-0 max-w-[40%]">
                        <Hash className="w-3 h-3 text-primary flex-shrink-0" />
                        <Link
                          href={`/txs/${transaction.txId}`}
                          className="font-mono text-xs text-primary hover:underline truncate"
                        >
                          {transaction.txId.substring(0, 8)}...
                        </Link>
                      </div>
                      <div className="flex items-center space-x-1 min-w-0 max-w-[60%] overflow-hidden">
                        <span className="font-mono text-xs text-green-400 truncate">{formattedAmount} KODA</span>
                        <ArrowRight className="w-3 h-3 flex-shrink-0 text-white/60" />
                        <Link
                          href={`/addresses/${recipientAddress}`}
                          className="font-mono text-xs text-white/60 hover:text-white/80 hover:underline truncate"
                          title={recipientAddress}
                          onClick={(e) => {
                            // Prevent default navigation
                            e.preventDefault()
                            // Navigate to the address page
                            window.location.href = `/addresses/${recipientAddress}`
                            // This forces a full page navigation which will reset scroll position
                          }}
                        >
                          {formattedAddress}
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
