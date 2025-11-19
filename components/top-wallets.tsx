"use client"

import { useEffect, useState, useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sparkles,
  BadgeCheck,
  Tag,
  AlertTriangle,
  RefreshCw,
  FishIcon as Whale,
  FishIcon as Shark,
  Fish,
  OctagonIcon as Octopus,
  SnailIcon as Crab,
} from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface WalletData {
  address: string
  apiBalance: number
}

interface CoinSupply {
  circulatingSupply: string
  maxSupply: string
}

// Update the ApiResponse interface to include scannedAddresses
interface ApiResponse {
  wallets: WalletData[]
  lastCheck: string
  scannedAddresses?: number
}

// Mock data for fallback when API is unavailable
const mockWallets: WalletData[] = [
  {
    address: "kobra:qpscc6kzu2ny8ga7tr72csftgxjnmzc0658355tgs9k45qpn0vm0qzlfenraj",
    apiBalance: 1050000000000, // 10.5M KODA
  },
  {
    address: "kobra:qrau5m8gk9snrgw8pye59klamy2fpj5ypgej852z84gqhxrtdv6nx7qrrwqm6",
    apiBalance: 850000000000, // 8.5M KODA
  },
  {
    address: "kobra:qq23x44e52ed53ex9573664v6f7m0gqhudcxrcqkvu6z2trcmxy3uxlnj67pc",
    apiBalance: 650000000000, // 6.5M KODA
  },
  {
    address: "kobra:qrqhnjulf037g6j6327x2234gfrk7dys4493y8lmcasukak3usykc9adjuwt6",
    apiBalance: 450000000000, // 4.5M KODA
  },
  {
    address: "kobra:qp9l2ej5v8qcnk95xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j",
    apiBalance: 350000000000, // 3.5M KODA
  },
  {
    address: "kobra:qzr8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jp",
    apiBalance: 250000000000, // 2.5M KODA
  },
  {
    address: "kobra:qzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jpr8g2hm2qgzpgk24xr8g0cwvmy0x",
    apiBalance: 150000000000, // 1.5M KODA
  },
  {
    address: "kobra:q5xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk9",
    apiBalance: 80000000000, // 800K KODA
  },
  {
    address: "kobra:qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jps8g2hm2q",
    apiBalance: 60000000000, // 600K KODA
  },
  {
    address: "kobra:qcnk95xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8q",
    apiBalance: 40000000000, // 400K KODA
  },
]

// Mock coin supply data
const mockCoinSupply: CoinSupply = {
  circulatingSupply: "22645164973137362",
  maxSupply: "50000000000000000",
}

export function TopWallets() {
  const [wallets, setWallets] = useState<WalletData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [coinSupply, setCoinSupply] = useState<CoinSupply | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [scannedAddresses, setScannedAddresses] = useState<number | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Add a new state for tracking the current KODA price
  const [kodaPrice, setKodaPrice] = useState<number>(0.01) // Default price

  // Use refs to store previous data to prevent UI jumps during refresh
  const prevWalletsRef = useRef<WalletData[]>([])
  const prevCoinSupplyRef = useRef<CoinSupply | null>(null)
  const prevScannedAddressesRef = useRef<number | null>(null)

  // Scroll position ref to maintain position during refresh
  const scrollPosRef = useRef<number>(0)

  // Function to format the timestamp from "2025-04-19T15:28:18.183Z" to "2025-04-19 15:28:18"
  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return "Unknown"

    // Split the timestamp at 'T'
    const [datePart, timePart] = timestamp.split("T")

    // Get only the time part without milliseconds
    const timeWithoutMs = timePart.split(".")[0]

    // Return the formatted timestamp
    return `${datePart} ${timeWithoutMs}`
  }

  // Get balance in KODA (numeric value)
  const getBalanceInKODA = (balance: number): number => {
    return Number(balance) / 100000000
  }

  const fetchData = async (isManualRefresh = false) => {
    try {
      // Save current scroll position before refresh
      scrollPosRef.current = window.scrollY

      // Only show loading state on initial load, not during refreshes
      if (!isManualRefresh && wallets.length === 0) {
        setLoading(true)
      } else {
        setIsRefreshing(true)
      }

      setError(null)

      // Use our own API route instead of fetching directly from external API
      const res = await fetch("/api/top-wallets", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000),
      })

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`)
      }

      const data: ApiResponse = await res.json()

      // If we got data from the API
      if (data.wallets && Array.isArray(data.wallets) && data.wallets.length > 0) {
        // הוסף לוג לקונסולה
        console.log("Received wallet data:", data)
        // Save previous data before updating
        prevWalletsRef.current = wallets

        setWallets(data.wallets)
        setUsingMockData(false)

        // Set the formatted timestamp
        if (data.lastCheck) {
          setLastUpdated(formatTimestamp(data.lastCheck))
        }

        // Update scanned addresses from API response
        if (data.scannedAddresses) {
          prevScannedAddressesRef.current = scannedAddresses
          setScannedAddresses(data.scannedAddresses)
        } else {
          // Default value if not provided by API
          prevScannedAddressesRef.current = scannedAddresses
          setScannedAddresses(4678)
        }

        // Also fetch coin supply
        try {
          const coinSupplyRes = await fetch("/api/coin-supply", {
            signal: AbortSignal.timeout(3000),
          }).catch(() => null)

          if (coinSupplyRes && coinSupplyRes.ok) {
            const coinSupplyData = await coinSupplyRes.json()
            prevCoinSupplyRef.current = coinSupply
            setCoinSupply(coinSupplyData)
          } else {
            prevCoinSupplyRef.current = coinSupply
            setCoinSupply(mockCoinSupply)
          }
        } catch (coinError) {
          console.error("Failed to fetch coin supply:", coinError)
          prevCoinSupplyRef.current = coinSupply
          setCoinSupply(mockCoinSupply)
        }

        // After the coin supply fetch section, add this code to fetch the price:
        try {
          const priceRes = await fetch("/api/market-data", {
            signal: AbortSignal.timeout(3000),
          }).catch(() => null)

          if (priceRes && priceRes.ok) {
            const marketData = await priceRes.json()
            if (marketData && marketData.price) {
              setKodaPrice(marketData.price)
            }
          }
        } catch (priceError) {
          console.error("Failed to fetch price data:", priceError)
          // Keep using the existing price if there's an error
        }
      } else {
        // If API returned empty data, use mock data
        console.log("API returned empty data, using mock data")
        setWallets(mockWallets)
        setCoinSupply(mockCoinSupply)
        setUsingMockData(true)
        setError("Using demo data. Live data unavailable.")

        // Still set the timestamp if available
        if (data.lastCheck) {
          setLastUpdated(formatTimestamp(data.lastCheck))
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err)

      // Use mock data as fallback
      setWallets(mockWallets)
      setCoinSupply(mockCoinSupply)
      setUsingMockData(true)
      setError("Using demo data. Live data unavailable.")

      // Set a fallback timestamp
      setLastUpdated(formatTimestamp(new Date().toISOString()))
    } finally {
      setLoading(false)
      setIsRefreshing(false)

      // Restore scroll position after refresh
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current)
      }, 0)
    }
  }

  // Manual refresh function
  const handleRefresh = () => {
    setRetryCount((prev) => prev + 1)
    fetchData(true)
  }

  useEffect(() => {
    fetchData()

    // Set up refresh interval - every 60 seconds (once per minute)
    const interval = setInterval(() => {
      fetchData(true)
    }, 60000) // 60000ms = 1 minute

    return () => clearInterval(interval)
  }, [retryCount])

  // Format balance from sompi to KODA without decimal places
  const formatBalance = (balance: number): string => {
    return Math.floor(Number(balance) / 100000000).toLocaleString()
  }

  // Locate the getWalletTag function and update it to include the new wallet addresses and tags

  // Get wallet tag if it's a known address
  const getWalletTag = (address: string): string | null => {
    if (address === "kobra:qpscc6kzu2ny8ga7tr72csftgxjnmzc0658355tgs9k45qpn0vm0qzlfenraj") {
      return "DONATION"
    }
    if (address === "kobra:qrau5m8gk9snrgw8pye59klamy2fpj5ypgej852z84gqhxrtdv6nx7qrrwqm6") {
      return "F Ø M Ø S Λ P I Ξ N S"
    }
    if (address === "kobra:qrejqvvhe62qzns5n33meavfzwx7u9nzp2pjuxqlrm04zplx92q5jjemn9sf3") {
      return "Matei40"
    }
    if (address === "kobra:qzfp7q3t254r6hxnsya8z0ce77ug8xzm73n7tdxxwy2resseuyem57gxl6m5e") {
      return "DEV-FEE"
    }
    return null
  }

  // Get wallet tier icon based on balance
  const getWalletTierIcon = (balance: number) => {
    const balanceInKoda = getBalanceInKODA(balance)

    if (balanceInKoda >= 10000000) {
      return {
        icon: <Whale className="h-5 w-5 text-yellow-400 animate-pulse" />,
        label: "Whale - 10M+ KODA",
        color: "text-yellow-400",
      }
    } else if (balanceInKoda >= 1000000) {
      return {
        icon: <Shark className="h-5 w-5 text-green-400" />,
        label: "Shark - 1M-10M KODA",
        color: "text-green-400",
      }
    } else if (balanceInKoda >= 100000) {
      return {
        icon: <Fish className="h-5 w-5 text-cyan-400" />,
        label: "Dolphin - 100K-1M KODA",
        color: "text-cyan-400",
      }
    } else if (balanceInKoda >= 10000) {
      return {
        icon: <Fish className="h-5 w-5 text-blue-400" />,
        label: "Fish - 10K-100K KODA",
        color: "text-blue-400",
      }
    } else if (balanceInKoda >= 1000) {
      return {
        icon: <Octopus className="h-5 w-5 text-purple-400" />,
        label: "Octopus - 1K-10K KODA",
        color: "text-purple-400",
      }
    } else {
      return {
        icon: <Crab className="h-5 w-5 text-red-400" />,
        label: "Crab - 10-1K KODA",
        color: "text-red-400",
      }
    }
  }

  // Format address for display (truncate in the middle)
  const formatAddress = (address: string): string => {
    if (window.innerWidth < 640) {
      // For mobile screens, show a shorter version
      return `${address.substring(0, 10)}...${address.substring(address.length - 10)}`
    }
    return address // Return the full address on larger screens
  }

  const calculateTop10Summary = () => {
    if (wallets.length === 0) return null

    const top10Wallets = wallets.slice(0, 10)
    const totalTop10Balance = top10Wallets.reduce((sum, wallet) => sum + getBalanceInKODA(wallet.apiBalance), 0)

    // Calculate percentage based on actual circulating supply from API
    let percentageOfSupply = 0
    if (coinSupply && coinSupply.circulatingSupply) {
      const circulatingSupplyKoda = Number(coinSupply.circulatingSupply) / 100000000
      percentageOfSupply = (totalTop10Balance / circulatingSupplyKoda) * 100
    }

    const averageBalance = totalTop10Balance / top10Wallets.length
    const minBalance = getBalanceInKODA(Math.min(...top10Wallets.map((w) => w.apiBalance)))
    const maxBalance = getBalanceInKODA(Math.max(...top10Wallets.map((w) => w.apiBalance)))

    return {
      totalBalance: totalTop10Balance,
      percentageOfSupply,
      averageBalance,
      minBalance,
      maxBalance,
      walletCount: top10Wallets.length,
    }
  }

  const top10Summary = calculateTop10Summary()

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4">
      <div className="mb-1">
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center">Top 100 KODA Holders</h1>
        <p className="text-xs text-white/70 text-center -mt-0.5">
          The top 100 wealthiest addresses on the KODA network, ranked by balance
        </p>
      </div>

      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 text-center mb-2 flex flex-col sm:flex-row items-center justify-center gap-1">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <p className="text-yellow-500 text-xs sm:text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="mt-1 sm:mt-0 sm:ml-1 bg-black/30 text-white border-yellow-500/50 hover:bg-yellow-500/20 h-7 text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" /> Retry
          </Button>
        </div>
      )}

      {/* Wallet ranking scale display */}
      <div className="mb-2 bg-black/30 p-1.5 rounded-lg border border-primary/30">
        <h2 className="text-sm font-medium text-white mb-1">Wallet Ranking Scale</h2>
        <div className="flex flex-wrap gap-1.5 justify-start">
          <div className="flex items-center gap-1">
            <Whale className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-white text-xs">Whale - 10M+ KODA</span>
          </div>
          <div className="flex items-center gap-1">
            <Shark className="h-3.5 w-3.5 text-green-400" />
            <span className="text-white text-xs">Shark - 1M-10M KODA</span>
          </div>
          <div className="flex items-center gap-1">
            <Fish className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-white text-xs">Dolphin - 100K-1M KODA</span>
          </div>
          <div className="flex items-center gap-1">
            <Fish className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-white text-xs">Fish - 10K-100K KODA</span>
          </div>
          <div className="flex items-center gap-1">
            <Octopus className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-white text-xs">Octopus - 1K-10K KODA</span>
          </div>
          <div className="flex items-center gap-1">
            <Crab className="h-3.5 w-3.5 text-red-400" />
            <span className="text-white text-xs">Crab - 10-1K KODA</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] sm:w-[80px] text-white">Tier</TableHead>
              <TableHead className="text-white">Address</TableHead>
              <TableHead className="w-[70px] sm:w-[100px] text-white">Tag</TableHead>
              <TableHead className="w-[85px] sm:w-[130px] text-white">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton rows while loading
              [...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px] sm:w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px] sm:w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] sm:w-[100px]" />
                  </TableCell>
                </TableRow>
              ))
            ) : wallets.length === 0 ? (
              // Message when no wallets are available
              <TableRow>
                <TableCell colSpan={4} className="text-center text-white">
                  No wallets available.
                </TableCell>
              </TableRow>
            ) : (
              // Display all wallets from the API response
              wallets.map((wallet, index) => {
                const walletTier = getWalletTierIcon(wallet.apiBalance)
                const walletTag = getWalletTag(wallet.address)
                return (
                  <TableRow key={index}>
                    <TableCell className="text-white py-1.5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              {walletTier ? <>{walletTier.icon}</> : <Sparkles className="h-5 w-5 text-gray-400" />}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black/80 text-white border-primary/30">
                            <p>{walletTier ? walletTier.label : "No Ranking"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-white max-w-[150px] sm:max-w-none py-1.5">
                      <Link
                        href={`/addresses/${wallet.address}`}
                        className="hover:underline text-primary flex items-center gap-1 truncate"
                      >
                        <span className="truncate">{formatAddress(wallet.address)}</span>
                        <BadgeCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                      </Link>
                    </TableCell>
                    <TableCell className="text-white py-1.5">
                      {walletTag && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4 text-green-400" />
                          <span className="font-bold text-green-400 whitespace-nowrap text-xs">{walletTag}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-white text-xs py-1.5">
                      <div className="flex flex-col">
                        <div className="flex items-center whitespace-nowrap">
                          <span className="truncate">{formatBalance(wallet.apiBalance)}</span>
                          <span className="ml-1">KODA</span>
                        </div>
                        <span className="text-green-400 text-[10px]">
                          $
                          {(getBalanceInKODA(wallet.apiBalance) * kodaPrice).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-1">
        <p className="text-xs text-white/60">
          Last updated: {lastUpdated ? <span className="font-medium">{lastUpdated}</span> : "Never"}
          {isRefreshing && <span className="ml-1 text-primary/70">(Refreshing...)</span>}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-black/30 text-white border-primary/50 hover:bg-primary/20 disabled:opacity-50 h-7 text-xs"
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3 mr-1" /> Refresh
            </>
          )}
        </Button>
      </div>
      {usingMockData && (
        <p className="text-xs text-yellow-500/70 text-center mt-1">
          Note: Using demo data. Live data is currently unavailable.
        </p>
      )}
      <p className="text-xs text-white/40 text-center mt-2">
        Auto-refreshes every minute. Last refresh: {lastUpdated || "Never"}
      </p>
    </div>
  )
}
