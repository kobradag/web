"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { CopyButton } from "@/components/copy-button"
import Link from "next/link"
import { formatDate, formatNumber } from "@/lib/utils"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlockInfo {
  hash: string
  blueScore: number
  bits: number
  timestamp: number
  version: number
  isChainBlock: boolean
  parents: string[]
  children: string[]
  merkleRoot: string
  acceptedMerkleRoot: string
  utxoCommitment: string
  nonce: number
  daaScore: number
  blueWork: string
  pruningPoint: string
  transactions: any[]
}

export function BlockInfo({ blockHash }: { blockHash: string }) {
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryTimer, setRetryTimer] = useState(0)
  const MAX_RETRIES = 3

  const fetchBlockInfo = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch block data with extended timeout
      console.log(`Fetching block data for hash: ${blockHash}`)
      const block = await fetchWithExtendedTimeout(`https://api.k0bradag.com/blocks/${blockHash}`, 30000)

      // Limit the number of transactions to process for very large blocks
      let transactionsToProcess = block.transactions
      const MAX_TRANSACTIONS = 100
      let transactionLimitMessage = null

      if (block.transactions.length > MAX_TRANSACTIONS) {
        console.log(
          `Block has ${block.transactions.length} transactions. Limiting to ${MAX_TRANSACTIONS} for performance.`,
        )
        transactionsToProcess = block.transactions.slice(0, MAX_TRANSACTIONS)
        transactionLimitMessage = `Showing first ${MAX_TRANSACTIONS} of ${block.transactions.length} transactions for performance reasons.`
      }

      // Fetch transaction details with a separate timeout
      console.log(`Fetching transaction details for ${transactionsToProcess.length} transactions`)
      let txInfo = []
      try {
        if (transactionsToProcess.length > 0) {
          const txIds = transactionsToProcess.map((tx: any) => tx.verboseData.transactionId)
          txInfo = await fetchTransactionsWithRetry(txIds)
        }
      } catch (txError) {
        console.warn("Error fetching transaction details:", txError)
        // Continue with empty transaction details rather than failing completely
      }

      setBlockInfo({
        hash: block.verboseData.hash,
        blueScore: block.header.blueScore,
        bits: block.header.bits,
        timestamp: block.header.timestamp,
        version: block.header.version,
        isChainBlock: block.verboseData.isChainBlock,
        parents: block.header.parents[0].parentHashes,
        children: block.verboseData.childrenHashes || [],
        merkleRoot: block.header.hashMerkleRoot,
        acceptedMerkleRoot: block.header.acceptedIdMerkleRoot,
        utxoCommitment: block.header.utxoCommitment,
        nonce: block.header.nonce,
        daaScore: block.header.daaScore,
        blueWork: block.header.blueWork,
        pruningPoint: block.header.pruningPoint,
        transactions: transactionsToProcess.map((tx: any) => ({
          ...tx,
          details: txInfo.find((t: any) => t.transaction_id === tx.verboseData.transactionId),
        })),
      })

      // If we limited transactions, show a warning
      if (transactionLimitMessage) {
        setError(transactionLimitMessage)
      }

      setIsRetrying(false)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching block info:", err)

      // If we're still under the max retry count, schedule another attempt
      if (retryCount < MAX_RETRIES) {
        const nextRetryDelay = Math.pow(2, retryCount) * 1000 // Exponential backoff
        console.log(`Retry ${retryCount + 1}/${MAX_RETRIES} scheduled in ${nextRetryDelay}ms`)

        setIsRetrying(true)
        setRetryTimer(Math.round(nextRetryDelay / 1000))
        setRetryCount((prevCount) => prevCount + 1)

        // Schedule the next retry
        const timerId = setTimeout(() => {
          setIsRetrying(false)
          fetchBlockInfo()
        }, nextRetryDelay)

        return () => clearTimeout(timerId)
      } else {
        setError(
          "Failed to load block information after multiple attempts. This block may be very large or the network might be experiencing issues.",
        )
        setIsRetrying(false)
        setLoading(false)
      }
    }
  }

  // Helper function to fetch with extended timeout
  const fetchWithExtendedTimeout = async (url: string, timeout: number, options: any = {}) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
          ...(options.headers || {}),
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. The block may be very large or the network might be experiencing high load.",
        )
      }
      throw error
    }
  }

  // Helper function to fetch transactions with retry logic
  const fetchTransactionsWithRetry = async (txIds: string[], attempts = 0) => {
    const MAX_TX_PER_REQUEST = 25
    const MAX_ATTEMPTS = 2

    try {
      // For large transaction lists, split into smaller batches
      if (txIds.length > MAX_TX_PER_REQUEST) {
        console.log(`Splitting ${txIds.length} transactions into batches of ${MAX_TX_PER_REQUEST}`)
        const batches = []
        for (let i = 0; i < txIds.length; i += MAX_TX_PER_REQUEST) {
          batches.push(txIds.slice(i, i + MAX_TX_PER_REQUEST))
        }

        // Process batches sequentially to avoid overwhelming the API
        let results = []
        for (const batch of batches) {
          const batchResults = await fetchWithExtendedTimeout(`https://api.k0bradag.com/transactions/search`, 20000, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactionIds: batch }),
          })
          results = [...results, ...batchResults]
        }
        return results
      } else {
        // For smaller lists, fetch all at once
        return await fetchWithExtendedTimeout(`https://api.k0bradag.com/transactions/search`, 20000, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionIds: txIds }),
        })
      }
    } catch (error) {
      if (attempts < MAX_ATTEMPTS) {
        console.log(`Transaction fetch failed, retrying (${attempts + 1}/${MAX_ATTEMPTS})`)
        return fetchTransactionsWithRetry(txIds, attempts + 1)
      }
      throw error
    }
  }

  // Extended fetchWithExtendedTimeout to support options
  // const fetchWithExtendedTimeout = async (url: string, timeout: number, options = {}) => {
  //   const controller = new AbortController()
  //   const timeoutId = setTimeout(() => controller.abort(), timeout)

  //   try {
  //     const response = await fetch(url, {
  //       ...options,
  //       signal: controller.signal,
  //       headers: {
  //         'Cache-Control': 'no-cache',
  //         ...(options.headers || {}),
  //       }
  //     })

  //     clearTimeout(timeoutId)

  //     if (!response.ok) {
  //       throw new Error(`API responded with status: ${response.status}`)
  //     }

  //     return await response.json()
  //   } catch (error) {
  //     clearTimeout(timeoutId)
  //     if (error.name === 'AbortError') {
  //       throw new Error('Request timed out. The data may be very large or the network might be experiencing high load.')
  //     }
  //     throw error
  //   }
  // }

  // Update retry timer countdown
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    if (isRetrying && retryTimer > 0) {
      timerId = setTimeout(() => {
        setRetryTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isRetrying, retryTimer])

  // Initial fetch
  useEffect(() => {
    fetchBlockInfo()
  }, [blockHash])

  // Manual retry handler
  const handleManualRetry = () => {
    setRetryCount(0)
    setError(null)
    setLoading(true)
    fetchBlockInfo()
  }

  if (isRetrying) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <RefreshCw className="h-6 w-6 text-yellow-500 animate-spin" />
            <p className="text-yellow-500 text-lg font-medium">Loading block information...</p>
          </div>
          <p className="text-yellow-400 mb-4">
            Attempt {retryCount} of {MAX_RETRIES} - Next retry in {retryTimer} seconds
          </p>
          <p className="text-sm text-yellow-500/70">
            Large blocks may take longer to load due to the number of transactions they contain.
          </p>
        </div>
      </div>
    )
  }

  if (error && !blockInfo) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 mb-4">{error}</p>
        <p className="text-gray-400 mb-6">Block Hash: {blockHash}</p>
        <Button onClick={handleManualRetry} className="bg-red-500/20 hover:bg-red-500/30 text-red-400">
          Try Again
        </Button>
      </div>
    )
  }

  if (loading && !blockInfo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <RefreshCw className="h-6 w-6 text-primary animate-spin" />
          <p className="text-primary text-lg">Loading block information...</p>
        </div>
        <Skeleton className="h-[600px] w-full" />
        <p className="text-center text-sm text-white/60">
          Large blocks with many transactions may take longer to load.
        </p>
      </div>
    )
  }

  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Block Information</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {error && blockInfo && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-500 text-sm">{error}</p>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <Table className="[&_td]:py-1.5">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-white">Hash</TableCell>
                <TableCell className="font-mono text-white">
                  {blockInfo?.hash}
                  <CopyButton text={blockInfo?.hash || ""} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-white">Blue Score</TableCell>
                <TableCell className="text-white">{blockInfo?.blueScore}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-white">Timestamp</TableCell>
                <TableCell className="text-white">{formatDate(blockInfo?.timestamp)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-white">Is Chain Block</TableCell>
                <TableCell className="text-white">{blockInfo?.isChainBlock ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-white">Parents</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {blockInfo?.parents.map((parent, index) => (
                      <li key={index} className="text-white">
                        <Link href={`/blocks/${parent}`} className="text-primary hover:underline">
                          {parent}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-white">Transactions</h3>
            {blockInfo?.transactions.map((tx, index) => (
              <Card key={index} className="mb-2 bg-black/30 border-primary/20">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <Link href={`/txs/${tx.verboseData.transactionId}`} className="text-primary hover:underline">
                      {tx.verboseData.transactionId}
                    </Link>
                    <CopyButton text={tx.verboseData.transactionId} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold mb-2 text-white">Inputs</h4>
                      {tx.inputs?.map((input: any, inputIndex: number) => (
                        <div key={inputIndex} className="text-sm text-white">
                          {input.previousOutpoint.transactionId} (Index: {input.previousOutpoint.index})
                        </div>
                      ))}
                      {!tx.inputs && <div className="text-sm text-white">COINBASE (New coins)</div>}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-2 text-white">Outputs</h4>
                      {tx.outputs?.map((output: any, outputIndex: number) => (
                        <div key={outputIndex} className="text-sm text-white">
                          <Link
                            href={`/addresses/${output.verboseData.scriptPublicKeyAddress}`}
                            className="text-primary hover:underline"
                          >
                            {output.verboseData.scriptPublicKeyAddress}
                          </Link>
                          : {formatNumber(output.amount / 100000000)} KODA
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-bold text-white">Status: </span>
                    <span className={tx.details?.is_accepted ? "text-green-500" : "text-red-500"}>
                      {tx.details?.is_accepted ? "Accepted" : "Not Accepted"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

function InfoItem({
  label,
  value,
  copyable,
  list,
  link,
}: { label: string; value: any; copyable?: boolean; list?: boolean; link?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-white/60">{label}</span>
      {list ? (
        <ul className="list-disc list-inside">
          {value.map((item: string, index: number) => (
            <li key={index} className="text-white/80 break-all">
              {link ? (
                <Link href={link} className="hover:text-primary">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-white/80 break-all">
          {link ? (
            <Link href={link} className="hover:text-primary">
              {value}
            </Link>
          ) : (
            value
          )}
          {copyable && <CopyButton text={value} />}
        </span>
      )}
    </div>
  )
}

function TransactionItem({ transaction }: { transaction: any }) {
  return (
    <div className="border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <Link href={`/txs/${transaction.verboseData.transactionId}`} className="text-primary hover:underline">
          {transaction.verboseData.transactionId}
        </Link>
        <CopyButton text={transaction.verboseData.transactionId} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-bold mb-2">Inputs</h4>
          {transaction.inputs?.map((input: any, index: number) => (
            <div key={index} className="text-sm text-white/80">
              {input.previousOutpoint.transactionId} (Index: {input.previousOutpoint.index})
            </div>
          ))}
          {!transaction.inputs && <div className="text-sm text-white/80">COINBASE (New coins)</div>}
        </div>
        <div>
          <h4 className="text-sm font-bold mb-2">Outputs</h4>
          {transaction.outputs?.map((output: any, index: number) => (
            <div key={index} className="text-sm text-white/80">
              <Link href={`/addresses/${output.verboseData.scriptPublicKeyAddress}`} className="hover:text-primary">
                {output.verboseData.scriptPublicKeyAddress}
              </Link>
              : {formatNumber(output.amount / 100000000)} KODA
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 text-sm">
        <span className="font-bold">Status: </span>
        <span className={transaction.details?.is_accepted ? "text-green-500" : "text-red-500"}>
          {transaction.details?.is_accepted ? "Accepted" : "Not Accepted"}
        </span>
      </div>
    </div>
  )
}
