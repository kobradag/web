"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, AlertCircle, RefreshCw, Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NetworkNodesFallback } from "./network-nodes-fallback"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
// Add the import for the WalletCategorySummary component at the top of the file
// Remove this line:
// import { WalletCategorySummary } from "./wallet-category-summary"

// Define the peer node type based on the API response
interface PeerNode {
  id: string // Changed from ip to id
  country?: string
  city?: string
  lat?: number
  lon?: number
  userAgent?: string
  isOutbound?: boolean
  timeConnected?: string
  connectedFor?: string
  error?: string
}

// Mock data for fallback when API is unavailable
const mockPeers: PeerNode[] = [
  {
    id: "node-001",
    country: "Russia",
    city: "Moscow",
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "8h 48m",
  },
  {
    id: "node-002",
    country: "United States",
    city: "Phoenix",
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "1d 11h",
  },
  {
    id: "node-003",
    country: "Russia",
    city: "Moscow",
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "1d 20h",
  },
  {
    id: "node-004",
    country: "Hong Kong",
    city: "Sham Shui Po",
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "17h 22m",
  },
  {
    id: "node-005",
    country: "Poland",
    city: "Warsaw",
    userAgent: "kobrad:1.0.1",
    isOutbound: true,
    connectedFor: "2d 13h",
  },
  {
    id: "node-006",
    country: "Germany",
    city: "Berlin",
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "3d 5h",
  },
  {
    id: "node-007",
    country: "Japan",
    city: "Tokyo",
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "12h 30m",
  },
  {
    id: "node-008",
    country: "Brazil",
    city: "São Paulo",
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "5h 15m",
  },
  {
    id: "node-009",
    country: "Australia",
    city: "Sydney",
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "1d 8h",
  },
  {
    id: "node-010",
    country: "Canada",
    city: "Toronto",
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "4d 2h",
  },
]

export function NetworkMap() {
  const [peers, setPeers] = useState<PeerNode[]>([])
  const [filteredPeers, setFilteredPeers] = useState<PeerNode[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false) // New state for background refreshes
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "stats">("table")
  const [retryCount, setRetryCount] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [showDemoData, setShowDemoData] = useState(false)
  const [dataUpdated, setDataUpdated] = useState(false) // Visual indicator for data updates
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "inbound" | "outbound">("all")
  const [filterVersion, setFilterVersion] = useState<string>("all")
  const [filterCountry, setFilterCountry] = useState<string>("all")
  const containerRef = useRef<HTMLDivElement>(null)
  const contentHeight = useRef<number | null>(null)

  // Update the fetchNetworkNodes function to show all nodes
  const fetchNetworkNodes = async (isInitialLoad = false) => {
    try {
      // Only set loading on initial load, otherwise use refreshing
      if (isInitialLoad) {
        setLoading(true)
      } else {
        setRefreshing(true)
      }

      // Store the current height of the content to maintain it during refresh
      if (containerRef.current && !isInitialLoad) {
        contentHeight.current = containerRef.current.clientHeight
      }

      // Add timestamp to prevent caching
      const timestamp = new Date().getTime()

      // Fetch data from the API with cache-busting timestamp
      const response = await fetch(`/api/network-nodes?t=${timestamp}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        // Sort by connectedFor to get the most recent connections first
        const sortedData = [...data].sort((a, b) => {
          // Try to parse the connectedFor string to get a comparable value
          // Format is typically like "8h 48m" or "1d 11h"
          const getTimeInMinutes = (timeStr = "") => {
            const days = timeStr.match(/(\d+)d/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)d/)?.[1] || "0") : 0
            const hours = timeStr.match(/(\d+)h/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)h/)?.[1] || "0") : 0
            const minutes = timeStr.match(/(\d+)m/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)m/)?.[1] || "0") : 0
            return days * 24 * 60 + hours * 60 + minutes
          }

          const timeA = getTimeInMinutes(a.connectedFor)
          const timeB = getTimeInMinutes(b.connectedFor)

          // Sort by connection time (ascending - most recent first)
          return timeA - timeB
        })

        // Add unique IDs if they don't exist
        const dataWithIds = sortedData.map((node, index) => ({
          ...node,
          id: node.id || `node-${index}`,
        }))

        // No longer limiting to 10 records - show all nodes
        setPeers(dataWithIds)
        setShowDemoData(false)
        setError(null)

        // Show visual indicator that data was updated
        if (!isInitialLoad) {
          setDataUpdated(true)
          setTimeout(() => setDataUpdated(false), 2000)
        }
      } else {
        // Fallback to mock data if API returns empty array
        console.log("API returned empty data, using mock data")
        setPeers(mockPeers) // No longer limiting mock data
        setShowDemoData(true)
        setError("Using demo data. API returned empty response.")
      }

      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      console.error("Failed to fetch network nodes:", err)
      // Use mock data as fallback
      setPeers(mockPeers) // No longer limiting mock data
      setShowDemoData(true)
      setError("Using demo data. Failed to fetch from API.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Apply filters and search to peers
  useEffect(() => {
    let result = [...peers]

    // Apply connection type filter
    if (filterType !== "all") {
      result = result.filter((node) => (filterType === "inbound" ? !node.isOutbound : node.isOutbound))
    }

    // Apply version filter
    if (filterVersion !== "all") {
      result = result.filter((node) => node.userAgent === filterVersion)
    }

    // Apply country filter
    if (filterCountry !== "all") {
      result = result.filter((node) => node.country === filterCountry)
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (node) =>
          (node.country && node.country.toLowerCase().includes(term)) ||
          (node.city && node.city.toLowerCase().includes(term)) ||
          (node.userAgent && node.userAgent.toLowerCase().includes(term)) ||
          (node.connectedFor && node.connectedFor.toLowerCase().includes(term)),
      )
    }

    setFilteredPeers(result)
  }, [peers, searchTerm, filterType, filterVersion, filterCountry])

  useEffect(() => {
    fetchNetworkNodes(true) // Initial fetch (true = initial load)

    // Set up a refresh interval - every 30 seconds
    const interval = setInterval(() => {
      console.log("Refreshing network nodes data...")
      fetchNetworkNodes(false) // Background refresh (false = not initial load)
    }, 30000)

    return () => clearInterval(interval)
  }, [retryCount])

  const handleRefresh = () => {
    setRetryCount((prev) => prev + 1)
    fetchNetworkNodes(false) // Manual refresh (false = not initial load)
  }

  const toggleViewMode = (mode: "table" | "stats") => {
    setViewMode(mode)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setFilterType("all")
    setFilterVersion("all")
    setFilterCountry("all")
  }

  // Get unique versions and countries for filters
  const uniqueVersions = [...new Set(peers.map((p) => p.userAgent).filter(Boolean))]
  const uniqueCountries = [...new Set(peers.map((p) => p.country).filter(Boolean))]

  // Calculate network stats from filtered peers
  const networkStats = {
    totalNodes: filteredPeers.length,
    outboundNodes: filteredPeers.filter((node) => node.isOutbound).length,
    inboundNodes: filteredPeers.filter((node) => !node.isOutbound).length,
    // Count unique countries, filtering out nodes with errors
    countries: [...new Set(filteredPeers.filter((p) => p.country && !p.error).map((p) => p.country))].length,
    // Count nodes with Unknown (VPN/LOCALHOST) errors - updated to match the actual error message
    geoipErrors: filteredPeers.filter((p) => p.error && p.error.includes("Unknown")).length,
    // Count other errors
    otherErrors: filteredPeers.filter((p) => p.error && !p.error.includes("Unknown")).length,
    // Get version distribution
    versions: [...new Set(filteredPeers.map((p) => p.userAgent))].reduce(
      (acc, version) => {
        acc[version || "Unknown"] = filteredPeers.filter((p) => p.userAgent === version).length
        return acc
      },
      {} as Record<string, number>,
    ),
    // Get country distribution
    countryDistribution: filteredPeers.reduce(
      (acc, peer) => {
        if (peer.country) {
          acc[peer.country] = (acc[peer.country] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    ),
  }

  // Set a minimum height for the content container to prevent layout shifts
  const minContentHeight = contentHeight.current ? `${contentHeight.current}px` : "auto"

  // Helper function to determine version color
  const getVersionColor = (version: string) => {
    return version === "kobrad:1.0.3" ? "text-green-500" : "text-red-500"
  }

  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader className="pb-1 pt-1 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 xs:gap-0">
        <CardTitle className="text-white flex items-center gap-1 text-sm xs:text-base">
          <Server className="h-4 w-4" />
          KODA Network Nodes
          {lastUpdated && (
            <span className="text-xs text-white/50 ml-1 hidden xs:inline flex items-center">
              Updated: {lastUpdated}
              {refreshing && <RefreshCw className="ml-1 h-3 w-3 animate-spin" />}
            </span>
          )}
        </CardTitle>
        <div className="flex gap-1 w-full xs:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-black/30 text-white border-primary/50 hover:bg-primary/20 text-xs xs:text-xs h-7 relative"
          >
            {refreshing ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Refreshing...
              </>
            ) : (
              <>Refresh</>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        {/* Search and filter bar - reduce spacing */}
        <div className="mb-2 flex flex-col gap-1">
          <div className="flex flex-col xs:flex-row gap-1">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 py-1 h-8 bg-black/30 border-primary/20 text-white placeholder:text-white/50 text-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className={`bg-black/30 text-white border-primary/50 hover:bg-primary/20 h-8 px-2 py-0 ${showFilters ? "bg-primary/20" : ""}`}
            >
              <Filter className="h-3 w-3 mr-1" /> Filters
              {(filterType !== "all" || filterVersion !== "all" || filterCountry !== "all") && (
                <Badge variant="info" className="ml-1 px-1 py-0 text-xs">
                  {(filterType !== "all" ? 1 : 0) +
                    (filterVersion !== "all" ? 1 : 0) +
                    (filterCountry !== "all" ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter options - improve mobile layout */}
          {showFilters && (
            <div className="p-2 bg-black/30 rounded-md border border-primary/20 grid grid-cols-1 sm:grid-cols-3 gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div>
                <label className="text-xs text-white/70 mb-0.5 block">Connection Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as "all" | "inbound" | "outbound")}
                  className="w-full bg-black/50 border border-primary/20 rounded-md text-white text-xs p-1 h-8"
                >
                  <option value="all">All Types</option>
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-white/70 mb-0.5 block">Version</label>
                <select
                  value={filterVersion}
                  onChange={(e) => setFilterVersion(e.target.value)}
                  className="w-full bg-black/50 border border-primary/20 rounded-md text-white text-xs p-1 h-8"
                >
                  <option value="all">All Versions</option>
                  {uniqueVersions.map((version) => (
                    <option key={version} value={version}>
                      {version}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/70 mb-0.5 block">Country</label>
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="w-full bg-black/50 border border-primary/20 rounded-md text-white text-xs p-1 h-8"
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="bg-black/30 text-white border-primary/50 hover:bg-primary/20 h-8 text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Combined Stats and Table View */}
        <div
          ref={containerRef}
          className={`transition-all duration-300 ${dataUpdated ? "bg-primary/5" : ""}`}
          style={{ minHeight: loading ? "400px" : minContentHeight }}
        >
          {loading ? (
            <div className="h-[400px] w-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="text-white/70 text-sm">Loading network nodes...</p>
              </div>
            </div>
          ) : filteredPeers.length > 0 ? (
            <div className="space-y-2">
              {/* Network Stats Summary - Compact version */}
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-1 mb-2">
                <div className="bg-black/30 p-1.5 rounded-md border border-primary/20 text-center">
                  <p className="text-xs text-white/70">Total Nodes</p>
                  <p className="text-sm text-green-500 font-medium">{networkStats.totalNodes}</p>
                </div>
                <div className="bg-black/30 p-1.5 rounded-md border border-primary/20 text-center">
                  <p className="text-xs text-white/70">Countries</p>
                  <p className="text-sm text-white font-medium">{networkStats.countries}</p>
                </div>
                <div className="bg-black/30 p-1.5 rounded-md border border-primary/20 text-center">
                  <p className="text-xs text-white/70">Version 1.0.3</p>
                  <p className="text-sm text-green-500 font-medium">
                    {networkStats.versions["kobrad:1.0.3"] || 0}/{networkStats.totalNodes}
                  </p>
                </div>
              </div>

              {/* Wallet Category Summary */}
              {/* Remove this entire block:
              <div className="mb-4">
                <WalletCategorySummary />
              </div>
              */}

              {/* Table View */}
              <NetworkNodesFallback nodes={filteredPeers} refreshing={refreshing} />
            </div>
          ) : (
            // Show "no results" message when filtered peers is empty
            <div className="h-[300px] xs:h-[400px] w-full flex items-center justify-center bg-black/30 rounded-md">
              <div className="text-center p-4">
                <AlertCircle className="h-8 w-8 xs:h-10 xs:w-10 text-yellow-500 mx-auto mb-2" />
                <p className="text-yellow-500 mb-2 text-sm xs:text-base">No matching nodes found</p>
                <p className="text-white/70 text-xs xs:text-sm">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="mt-4 bg-black/30 text-white border-primary/50 hover:bg-primary/20 text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="mt-2 p-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
              <p className="text-yellow-500 text-xs">{error}</p>
            </div>
          )}

          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mt-1 text-xs text-white/60 gap-1 xs:gap-0">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span>Inactive</span>
              </div>
            </div>
            <div>
              {filteredPeers.length !== peers.length ? (
                <>
                  Showing {filteredPeers.length} of {peers.length} nodes
                </>
              ) : (
                <>Total nodes: {peers.length}</>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
