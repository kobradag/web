"use client"

import { useEffect, useState } from "react"
import { QRCode } from "@/components/QRCode"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, CreditCard, FileText, Layers, AlertCircle, RefreshCw } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { getAddressBalance, getAddressTxCount, getAddressUtxos } from "@/lib/api"
import { Button } from "@/components/ui/button"

export function AddressOverview({ addr }: { addr: string }) {
  // Ensure the address is properly formatted
  const formattedAddress = addr.replace("kobra%3A", "kobra:")

  // State for storing API data
  const [balance, setBalance] = useState<string | null>(null)
  const [txCount, setTxCount] = useState<number | null>(null)
  const [utxoCount, setUtxoCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Fetch data from API with retry logic
  const fetchAddressData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch balance with a fallback mechanism
      let balanceData = null
      try {
        balanceData = await getAddressBalance(formattedAddress)
      } catch (balanceError) {
        console.warn("Failed to fetch balance:", balanceError)
        // Continue with other requests even if balance fails
      }

      // Fetch transaction count with a fallback mechanism
      let txCountData = null
      try {
        txCountData = await getAddressTxCount(formattedAddress)
      } catch (txError) {
        console.warn("Failed to fetch transaction count:", txError)
        // Continue with other requests even if tx count fails
      }

      // Fetch UTXOs with a fallback mechanism
      let utxosData = null
      try {
        utxosData = await getAddressUtxos(formattedAddress)
      } catch (utxoError) {
        console.warn("Failed to fetch UTXOs:", utxoError)
        // Continue with other requests even if UTXOs fail
      }

      // Process the balance data if available
      if (balanceData !== null) {
        if (typeof balanceData === "object" && balanceData !== null) {
          if ("balance" in balanceData) {
            setBalance(balanceData.balance.toString())
          } else {
            console.log("Balance data structure:", JSON.stringify(balanceData))
            setBalance(JSON.stringify(balanceData))
          }
        } else {
          setBalance(String(balanceData))
        }
      }

      // Set transaction count if available
      if (txCountData !== null) {
        setTxCount(txCountData)
      }

      // Set UTXO count if available
      if (utxosData !== null) {
        setUtxoCount(Array.isArray(utxosData) ? utxosData.length : 0)
      }

      // If all data is null, we consider it an error
      if (balanceData === null && txCountData === null && utxosData === null) {
        throw new Error("Failed to fetch any address data")
      }
    } catch (err) {
      console.error("Error fetching address data:", err)
      setError(`Failed to load address data: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Retry mechanism
  useEffect(() => {
    fetchAddressData()
  }, [formattedAddress, retryCount])

  // Add this useEffect to scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle retry button click
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  // Format balance with proper display
  const formatBalance = (balanceStr: string | null): string => {
    if (balanceStr === null) return "N/A"

    try {
      // Try to parse the balance as a number
      const balanceNum = Number.parseFloat(balanceStr)

      // Check if it's a valid number
      if (isNaN(balanceNum)) {
        console.error("Invalid balance format:", balanceStr)
        return "N/A" // Return N/A if we can't parse it
      }

      // Convert from sompi to KODA (divide by 100,000,000)
      const kodaBalance = balanceNum / 100000000

      // Format with appropriate decimal places
      return kodaBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      })
    } catch (e) {
      console.error("Error formatting balance:", e)
      return "N/A" // Return N/A if there's an error
    }
  }

  // Render error state with retry button
  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
      <p className="text-red-400 mb-4">{error}</p>
      <Button variant="outline" size="sm" onClick={handleRetry} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  )

  return (
    <Card className="bg-black/50 border-primary shadow-lg overflow-hidden mb-6">
      {/* Header with gradient background */}
      <div className="bg-black/80 p-4 text-white border-b border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wallet className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold vibrant-gradient">Address Details</h2>
          </div>
          <div className="flex items-center space-x-2">
            {!isLoading && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRetry}
                className="h-8 w-8 rounded-full"
                title="Refresh data"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {/* Address section with QR code */}
        <div className="p-4 bg-black/30 border-b border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 h-full">
            <div className="flex-grow flex flex-col justify-between h-full w-full">
              <div className="mb-auto">
                <div className="text-base font-medium text-white mb-1">ADDRESS</div>
                <div className="flex items-center">
                  <span className="font-mono text-xs sm:text-sm md:text-base text-white mr-2 break-all">
                    {formattedAddress}
                  </span>
                  <CopyButton text={formattedAddress} />
                </div>
              </div>

              {/* Show error state if there's an error */}
              {error && renderErrorState()}

              {/* Stats aligned with bottom of QR code */}
              {!error && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 md:mt-auto">
                  {/* Balance */}
                  <div className="flex items-center p-2 rounded-lg bg-black/30 border border-primary/20">
                    <div className="p-2 rounded-full bg-primary/20 mr-3">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-white font-medium">Balance</div>
                      <div className="font-bold text-sm text-white">
                        {isLoading ? (
                          <span className="animate-pulse">Loading...</span>
                        ) : (
                          <>
                            {formatBalance(balance)} <span className="text-white text-xs">KODA</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="flex items-center p-2 rounded-lg bg-black/30 border border-primary/20">
                    <div className="p-2 rounded-full bg-primary/20 mr-3">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-white font-medium">Transactions</div>
                      <div className="font-bold text-sm text-white">
                        {isLoading ? (
                          <span className="animate-pulse">Loading...</span>
                        ) : (
                          txCount?.toLocaleString() || "N/A"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* UTXOs */}
                  <div className="flex items-center p-2 rounded-lg bg-black/30 border border-primary/20">
                    <div className="p-2 rounded-full bg-primary/20 mr-3">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-white font-medium">UTXOs</div>
                      <div className="font-bold text-sm text-white">
                        {isLoading ? (
                          <span className="animate-pulse">Loading...</span>
                        ) : (
                          utxoCount?.toLocaleString() || "N/A"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* QR code on the right */}
            <div className="md:ml-4 md:self-center">
              <QRCode value={formattedAddress} size={120} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
