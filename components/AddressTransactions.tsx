"use client"

import { useState, useEffect, useRef } from "react"
import { getFullTransactionsFromAddress } from "@/lib/api"
import { formatNumber } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/Pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { Loader2 } from "lucide-react"

interface Output {
  id: number
  transaction_id: string
  index: number
  amount: number
  script_public_key: string
  script_public_key_address: string
  script_public_key_type: string
  accepting_block_hash: string | null
}

interface Input {
  id: number
  transaction_id: string
  index: number
  previous_outpoint_hash: string
  previous_outpoint_index: string
  previous_outpoint_resolved: any
  previous_outpoint_address: string | null
  previous_outpoint_amount: number | null
  signature_script: string
  sig_op_count: string
}

interface Transaction {
  subnetwork_id: string
  transaction_id: string
  hash: string
  mass: string
  block_hash: string[]
  block_time: number
  is_accepted: boolean
  accepting_block_hash: string
  accepting_block_blue_score: number
  inputs: Input[]
  outputs: Output[]
}

export function AddressTransactions({ addr }: { addr: string }) {
  // Ensure the address is properly formatted
  const formattedAddress = addr.replace("kobra%3A", "kobra:")

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add retry mechanism variables
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 5
  const retryIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!formattedAddress) return

      try {
        const data = await getFullTransactionsFromAddress(formattedAddress)

        if (Array.isArray(data)) {
          setTransactions(data)
        } else {
          console.warn("Unexpected transactions data format:", data)
          setTransactions([])
        }
        setError(null)
        setLoading(false)

        // Clear any existing retry interval if successful
        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current)
          retryIntervalRef.current = null
        }
      } catch (err) {
        console.error("Error fetching transactions:", err)

        // If we haven't reached max retries, schedule another attempt
        if (retryCount < maxRetries) {
          setRetryCount((prev) => prev + 1)
        } else {
          // Only set error after all retries fail
          setError("Failed to load transactions after multiple attempts. Please try again later.")
          setLoading(false)

          // Clear retry interval
          if (retryIntervalRef.current) {
            clearInterval(retryIntervalRef.current)
            retryIntervalRef.current = null
          }
        }
      }
    }

    // Initial fetch
    fetchTransactions()

    // Set up retry interval if needed
    if (retryCount > 0 && retryCount < maxRetries && !retryIntervalRef.current) {
      retryIntervalRef.current = setInterval(fetchTransactions, 1000) // Retry every second
    }

    // Cleanup interval on unmount
    return () => {
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current)
      }
    }
  }, [formattedAddress, retryCount])

  // Calculate total pages based on transactions length and items per page
  const totalPages = Math.max(1, Math.ceil(transactions.length / itemsPerPage))

  // Get current page transactions
  const currentTransactions = transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  // Find outputs that belong to the current address
  const getAddressAmount = (tx: Transaction, address: string): number => {
    let amount = 0

    // Check outputs for the address
    tx.outputs.forEach((output) => {
      if (output.script_public_key_address === address) {
        amount += output.amount
      }
    })

    return amount
  }

  // Format timestamp from milliseconds to YYYY-MM-DD HH:MM:SS
  const formatTimestamp = (timestamp: number): string => {
    try {
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

  if (error) {
    return (
      <Card className="bg-red-500/10 border-red-500/20">
        <CardContent className="p-4 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              setRetryCount(0)
              setError(null)
            }}
            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors"
          >
            Try Again
          </button>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-primary">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-white text-center">
            {retryCount > 0
              ? `Loading transactions... (Attempt ${retryCount}/${maxRetries})`
              : "Loading transactions..."}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="bg-gray-900 border-primary">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center text-white">No transactions found for this address.</CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-primary">
      <CardHeader>
        <CardTitle className="text-white">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border-collapse [&_tr]:h-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white w-1/2">Transaction ID</TableHead>
              <TableHead className="text-white">Time</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.map((tx) => {
              const amount = getAddressAmount(tx, formattedAddress)
              const formattedAmount = formatNumber(amount / 100000000)

              return (
                <TableRow key={tx.transaction_id}>
                  <TableCell className="text-white py-1.5 px-2 font-mono">
                    <div className="flex items-center gap-1">
                      <a
                        href={`/transactions/${tx.transaction_id}`}
                        className="text-primary hover:underline break-all text-xs"
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = `/transactions/${tx.transaction_id}`
                        }}
                      >
                        {tx.transaction_id}
                      </a>
                      <CopyButton text={tx.transaction_id} className="scale-75" />
                    </div>
                  </TableCell>
                  <TableCell className="text-white py-1.5 px-2 whitespace-nowrap">
                    {formatTimestamp(tx.block_time)}
                  </TableCell>
                  <TableCell className="text-white py-1.5 px-2 whitespace-nowrap">{formattedAmount} KODA</TableCell>
                  <TableCell className="text-white py-1.5 px-2">
                    <span className={tx.is_accepted ? "text-green-500" : "text-red-500"}>
                      {tx.is_accepted ? "Accepted" : "Not Accepted"}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
