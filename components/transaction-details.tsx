"use client"

import { useState, useEffect } from "react"
import { CopyButton } from "@/components/copy-button"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Update the getTransaction function to use the actual API:

// Replace the dummy getTransaction function with this implementation:
async function getTransaction(txid: string) {
  try {
    const response = await fetch(`https://api.k0bradag.com/transactions/${txid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching transaction:", error)
    throw error
  }
}

export function TransactionDetails({ txid, initialData = null }) {
  const [transaction, setTransaction] = useState(initialData)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(!initialData)
  const [retryCount, setRetryCount] = useState(0)
  const [retryTimer, setRetryTimer] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const MAX_RETRIES = 10

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        console.log("Fetching transaction:", txid)

        // Use the getTransaction utility function
        const data = await getTransaction(txid)
        console.log("Transaction data:", data)

        setTransaction(data)
        setLoading(false)
        setIsRetrying(false)
      } catch (err) {
        console.error("Error fetching transaction:", err)

        // If we're still under the max retry count, schedule another attempt
        if (retryCount < MAX_RETRIES) {
          setIsRetrying(true)
          setRetryTimer(retryCount + 1)
          setRetryCount((prevCount) => prevCount + 1)
        } else {
          setError("Failed to load transaction details after multiple attempts")
          setLoading(false)
          setIsRetrying(false)
        }
      }
    }

    if (loading && !isRetrying && !initialData) {
      fetchTransaction()
    }
  }, [txid, loading, retryCount, isRetrying, initialData])

  // Handle retry timer countdown
  useEffect(() => {
    let timerId

    if (isRetrying && retryTimer > 0) {
      timerId = setTimeout(() => {
        setRetryTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    if (isRetrying && retryTimer === 0) {
      setLoading(true)
      setIsRetrying(false)
    }

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isRetrying, retryTimer])

  // Manual retry function
  const handleManualRetry = () => {
    setError(null)
    setRetryCount(0)
    setLoading(true)
  }

  // Format timestamp from milliseconds to YYYY-MM-DD HH:MM:SS
  const formatTimestamp = (timestamp: number): string => {
    try {
      if (!timestamp) return "N/A"

      const date = new Date(timestamp)

      // Format: YYYY-MM-DD HH:MM:SS
      return date
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d+Z$/, "")
    } catch (error) {
      console.error("Error formatting timestamp:", error)
      return "Invalid date"
    }
  }

  // Normalize transaction data from different sources
  const normalizeTransaction = (tx) => {
    if (!tx) return null

    console.log("Normalizing transaction data:", tx)

    // Handle server-side API format
    if (tx.transaction_id || tx.txid) {
      return {
        txid: tx.transaction_id || tx.txid || txid,
        blockHash: tx.block_hash?.[0] || tx.blockHash || null,
        blockTime: tx.block_time || tx.blockTime || null,
        size: tx.mass || tx.size || "N/A",
        fee: tx.fee || "0",
        inputs:
          tx.inputs?.map((input, index) => ({
            index: input.index || index,
            address: input.address || null,
            value: input.value || 0,
            previousOutpointHash: input.previous_outpoint_hash || input.previousOutpointHash,
            previousOutpointIndex: input.previous_outpoint_index || input.previousOutpointIndex,
          })) || [],
        outputs:
          tx.outputs?.map((output, index) => ({
            index: output.index || index,
            address: output.script_public_key_address || output.address,
            value: output.amount ? (output.amount / 100000000).toFixed(8) : output.value || 0,
          })) || [],
        isAccepted: tx.is_accepted || (tx.blockHash ? true : false),
      }
    }

    // Return the original data if it doesn't match any known format
    return tx
  }

  const normalizedTx = normalizeTransaction(transaction)

  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">Transaction Details</h1>

      {isRetrying ? (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
              <p className="text-yellow-500 text-lg font-medium">Transaction not found yet. Retrying...</p>
            </div>
            <p className="text-yellow-400 mb-4">
              Attempt {retryCount} of {MAX_RETRIES} - Next retry in {retryTimer} seconds
            </p>
            <p className="text-sm text-yellow-500/70">
              Recent transactions may take a few moments to appear in the database
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
          <p className="text-sm text-gray-400 mt-2">Transaction ID: {txid}</p>
          <Button
            onClick={handleManualRetry}
            className="mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
          >
            Try Again
          </Button>
        </div>
      ) : normalizedTx ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-medium text-gray-300">Transaction ID</h2>
              <div className="flex items-center space-x-2">
                <p className="text-sm bg-gray-800 p-2 rounded font-mono break-all">{txid}</p>
                <CopyButton text={txid} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-300 mb-2">Details</h2>
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Hash</span>
                    {normalizedTx.blockHash ? (
                      <Link
                        href={`/blocks/${normalizedTx.blockHash}`}
                        className="text-blue-400 hover:underline font-mono text-sm truncate max-w-[200px]"
                      >
                        {normalizedTx.blockHash}
                      </Link>
                    ) : (
                      <span className="text-yellow-400">Unconfirmed</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp</span>
                    <span>
                      {normalizedTx.blockTime ? (
                        <span title={formatTimestamp(normalizedTx.blockTime)}>
                          {typeof normalizedTx.blockTime === "number" && normalizedTx.blockTime > 1000000000000
                            ? formatDistanceToNow(new Date(normalizedTx.blockTime), { addSuffix: true })
                            : formatDistanceToNow(new Date(normalizedTx.blockTime * 1000), { addSuffix: true })}
                        </span>
                      ) : (
                        <span className="text-yellow-400">Pending</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Size</span>
                    <span>
                      {normalizedTx.size} {typeof normalizedTx.size === "number" ? "bytes" : ""}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee</span>
                    <span>{normalizedTx.fee} KODA</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-300 mb-2">Status</h2>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    {normalizedTx.blockHash || normalizedTx.isAccepted ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-400">Confirmed</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-400">Pending</span>
                      </>
                    )}
                  </div>

                  {normalizedTx.blockHash && (
                    <div className="mt-4 text-sm text-gray-400">
                      Confirmed in block{" "}
                      <Link href={`/blocks/${normalizedTx.blockHash}`} className="text-blue-400 hover:underline">
                        {normalizedTx.blockHash.substring(0, 8)}...
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-300">Inputs</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800/50 text-left">
                      <th className="p-3 text-gray-400">Index</th>
                      <th className="p-3 text-gray-400">Previous Outpoint / Address</th>
                      <th className="p-3 text-gray-400 text-right">Value / Index</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {normalizedTx.inputs?.map((input, index) => (
                      <tr key={`input-${index}`} className="hover:bg-gray-800/30">
                        <td className="p-3">{input.index || index}</td>
                        <td className="p-3">
                          {input.address ? (
                            <Link
                              href={`/addresses/${input.address}`}
                              className="text-blue-400 hover:underline font-mono text-sm"
                            >
                              {input.address}
                            </Link>
                          ) : input.previousOutpointHash ? (
                            <Link
                              href={`/transactions/${input.previousOutpointHash}`}
                              className="text-blue-400 hover:underline font-mono text-sm"
                            >
                              {input.previousOutpointHash}
                            </Link>
                          ) : (
                            <span className="text-gray-500">No address (coinbase)</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {input.value !== undefined ? `${input.value} KODA` : input.previousOutpointIndex}
                        </td>
                      </tr>
                    ))}
                    {(!normalizedTx.inputs || normalizedTx.inputs.length === 0) && (
                      <tr>
                        <td colSpan={3} className="p-3 text-center text-gray-500">
                          No inputs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-300">Outputs</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800/50 text-left">
                      <th className="p-3 text-gray-400">Index</th>
                      <th className="p-3 text-gray-400">Address</th>
                      <th className="p-3 text-gray-400 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {normalizedTx.outputs?.map((output, index) => (
                      <tr key={`output-${index}`} className="hover:bg-gray-800/30">
                        <td className="p-3">{output.index || index}</td>
                        <td className="p-3">
                          {output.address ? (
                            <Link
                              href={`/addresses/${output.address}`}
                              className="text-blue-400 hover:underline font-mono text-sm"
                            >
                              {output.address}
                            </Link>
                          ) : (
                            <span className="text-gray-500">No address (OP_RETURN)</span>
                          )}
                        </td>
                        <td className="p-3 text-right">{output.value || 0} KODA</td>
                      </tr>
                    ))}
                    {(!normalizedTx.outputs || normalizedTx.outputs.length === 0) && (
                      <tr>
                        <td colSpan={3} className="p-3 text-center text-gray-500">
                          No outputs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}
