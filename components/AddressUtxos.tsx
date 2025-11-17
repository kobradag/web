"use client"

import { useState, useEffect, useRef } from "react"
import { getAddressUtxos } from "@/lib/api"
import { formatNumber } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/Pagination"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AddressUtxos({ addr }: { addr: string }) {
  // Ensure the address is properly formatted
  const formattedAddress = addr.replace("kobra%3A", "kobra:")

  const [utxos, setUtxos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Add retry mechanism variables
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 5
  const retryIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchUtxos = async () => {
      try {
        const data = await getAddressUtxos(formattedAddress)
        setUtxos(data || [])
        setTotalPages(Math.ceil((data?.length || 0) / 10))
        setLoading(false)
        setError(null)

        // Clear any existing retry interval if successful
        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current)
          retryIntervalRef.current = null
        }
      } catch (error) {
        console.error("Error fetching UTXOs:", error)

        // If we haven't reached max retries, schedule another attempt
        if (retryCount < maxRetries) {
          setRetryCount((prev) => prev + 1)
        } else {
          // Only set error after all retries fail
          setError("Failed to load UTXOs after multiple attempts")
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
    fetchUtxos()

    // Set up retry interval if needed
    if (retryCount > 0 && retryCount < maxRetries && !retryIntervalRef.current) {
      retryIntervalRef.current = setInterval(fetchUtxos, 1000) // Retry every second
    }

    // Cleanup interval on unmount
    return () => {
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current)
      }
    }
  }, [formattedAddress, retryCount])

  const handleTxClick = (txId: string) => {
    router.push(`/transactions/${txId}`)
  }

  if (loading) {
    return (
      <Card className="bg-gray-900 border-primary mt-6">
        <CardHeader>
          <CardTitle className="text-white">UTXOs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-white text-center">
            {retryCount > 0 ? `Loading UTXOs... (Attempt ${retryCount}/${maxRetries})` : "Loading UTXOs..."}
          </p>
        </CardContent>
      </Card>
    )
  }

  const paginatedUtxos = utxos.slice((page - 1) * 10, page * 10)

  return (
    <Card className="bg-gray-900 border-primary mt-6">
      <CardHeader>
        <CardTitle className="text-white">UTXOs</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
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
          </div>
        ) : utxos.length > 0 ? (
          <>
            <Table className="border-collapse [&_tr]:h-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Transaction ID</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Block DAA Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUtxos.map((utxo) => (
                  <TableRow key={`${utxo.outpoint.transactionId}-${utxo.outpoint.index}`}>
                    <TableCell className="text-white py-1.5 px-2">
                      <div className="flex items-center gap-1">
                        <a
                          href={`/transactions/${utxo.outpoint.transactionId}`}
                          className="text-primary hover:text-primary/80 hover:underline cursor-pointer break-all text-xs"
                          onClick={(e) => {
                            e.preventDefault()
                            handleTxClick(utxo.outpoint.transactionId)
                          }}
                        >
                          {utxo.outpoint.transactionId}
                        </a>
                        <CopyButton text={utxo.outpoint.transactionId} className="scale-75" />
                      </div>
                    </TableCell>
                    <TableCell className="text-white py-1.5 px-2">
                      {formatNumber(utxo.utxoEntry.amount / 100000000)} KODA
                    </TableCell>
                    <TableCell className="text-white py-1.5 px-2">{utxo.utxoEntry.blockDaaScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-white">No UTXOs found for this address.</p>
        )}
      </CardContent>
    </Card>
  )
}
