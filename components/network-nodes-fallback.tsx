"use client"

import { useState, useEffect } from "react"
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Node {
  id: string
  country?: string
  city?: string
  userAgent?: string
  isOutbound?: boolean
  connectedFor?: string
  error?: string
}

interface NetworkNodesFallbackProps {
  nodes: Node[]
  refreshing?: boolean
}

type SortField = "location" | "version" | "type" | "connected"
type SortDirection = "asc" | "desc"

export function NetworkNodesFallback({ nodes, refreshing = false }: NetworkNodesFallbackProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("connected")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const nodesPerPage = 10

  // Sort nodes
  const sortedNodes = [...nodes].sort((a, b) => {
    if (sortField === "location") {
      const aLocation = a.country || "Unknown"
      const bLocation = b.country || "Unknown"
      return sortDirection === "asc" ? aLocation.localeCompare(bLocation) : bLocation.localeCompare(aLocation)
    }

    if (sortField === "version") {
      const aVersion = a.userAgent || "Unknown"
      const bVersion = b.userAgent || "Unknown"
      return sortDirection === "asc" ? aVersion.localeCompare(bVersion) : bVersion.localeCompare(aVersion)
    }

    if (sortField === "type") {
      // Sort by outbound/inbound
      if (a.isOutbound === b.isOutbound) return 0
      if (sortDirection === "asc") {
        return a.isOutbound ? 1 : -1
      } else {
        return a.isOutbound ? -1 : 1
      }
    }

    if (sortField === "connected") {
      // Try to parse the connectedFor string to get a comparable value
      const getTimeInMinutes = (timeStr = "") => {
        const days = timeStr.match(/(\d+)d/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)d/)?.[1] || "0") : 0
        const hours = timeStr.match(/(\d+)h/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)h/)?.[1] || "0") : 0
        const minutes = timeStr.match(/(\d+)m/)?.[1] ? Number.parseInt(timeStr.match(/(\d+)m/)?.[1] || "0") : 0
        return days * 24 * 60 + hours * 60 + minutes
      }

      const timeA = getTimeInMinutes(a.connectedFor)
      const timeB = getTimeInMinutes(b.connectedFor)

      return sortDirection === "asc" ? timeA - timeB : timeB - timeA
    }

    return 0
  })

  // Calculate total pages
  const totalPages = Math.ceil(sortedNodes.length / nodesPerPage)

  // Ensure current page is valid when nodes change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [nodes.length, currentPage, totalPages])

  // Get current nodes
  const indexOfLastNode = currentPage * nodesPerPage
  const indexOfFirstNode = indexOfLastNode - nodesPerPage
  const currentNodes = sortedNodes.slice(indexOfFirstNode, indexOfLastNode)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 inline ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 inline ml-1" />
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className={`transition-all duration-300 ${refreshing ? "opacity-70" : "opacity-100"}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left table-fixed">
            <thead className="text-xs text-white/70 uppercase bg-black/30">
              <tr>
                <th
                  scope="col"
                  className="px-1 py-1 cursor-pointer hover:bg-black/40 w-[25%]"
                  onClick={() => handleSort("location")}
                >
                  Location {renderSortIndicator("location")}
                </th>
                <th
                  scope="col"
                  className="px-1 py-1 cursor-pointer hover:bg-black/40 w-[25%]"
                  onClick={() => handleSort("version")}
                >
                  Version {renderSortIndicator("version")}
                </th>
                <th
                  scope="col"
                  className="px-1 py-1 cursor-pointer hover:bg-black/40 w-[20%]"
                  onClick={() => handleSort("type")}
                >
                  Type {renderSortIndicator("type")}
                </th>
                <th
                  scope="col"
                  className="px-1 py-1 cursor-pointer hover:bg-black/40 w-[15%]"
                  onClick={() => handleSort("connected")}
                >
                  Connected {renderSortIndicator("connected")}
                </th>
                <th scope="col" className="px-1 py-1 w-[15%]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNodes.map((node) => (
                <tr
                  key={`${node.id}-${refreshing ? "refreshing" : "static"}`}
                  className="border-b border-white/5 bg-black/20 hover:bg-black/40"
                >
                  <td className="px-1 py-1 text-xs truncate">
                    {node.error ? (
                      <div className="flex items-center text-yellow-500">
                        <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{node.error}</span>
                      </div>
                    ) : (
                      <span className="text-white truncate">
                        {node.country ? `${node.country}, ${node.city}` : "Unknown"}
                      </span>
                    )}
                  </td>
                  <td className="px-1 py-1 text-xs text-white truncate">
                    <div className="flex items-center">
                      <span className="truncate">{node.userAgent || "Unknown"}</span>
                      {node.userAgent && node.userAgent !== "kobrad:1.0.3" && (
                        <span className="ml-1 text-xs text-yellow-500 font-medium whitespace-nowrap flex-shrink-0">
                          Update needed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-1 py-1">
                    <Badge variant={node.isOutbound ? "info" : "warning"} className="text-xs px-1 py-0">
                      {node.isOutbound ? "Outbound" : "Inbound"}
                    </Badge>
                  </td>
                  <td className="px-1 py-1 text-xs text-white truncate">{node.connectedFor || "Unknown"}</td>
                  <td className="px-1 py-1">
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1 flex-shrink-0"></span>
                      <span className="text-xs text-white">Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - make more compact */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-2 py-0.5 text-xs rounded ${currentPage === 1 ? "bg-black/20 text-white/30" : "bg-black/40 text-white hover:bg-primary/20"}`}
          >
            &laquo;
          </button>

          {/* Show limited page numbers with ellipsis for better UX */}
          {[...Array(totalPages)].map((_, i) => {
            // Show first page, last page, and pages around current page
            if (
              i === 0 || // First page
              i === totalPages - 1 || // Last page
              (i >= currentPage - 2 && i <= currentPage + 1) // Pages around current
            ) {
              return (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-2 py-0.5 text-xs rounded ${currentPage === i + 1 ? "bg-primary/30 text-white" : "bg-black/40 text-white hover:bg-primary/20"}`}
                >
                  {i + 1}
                </button>
              )
            }

            // Show ellipsis for gaps
            if (i === 1 && currentPage > 3) {
              return (
                <span key="ellipsis-start" className="px-1 py-0.5 text-xs text-white/50">
                  ...
                </span>
              )
            }

            if (i === totalPages - 2 && currentPage < totalPages - 3) {
              return (
                <span key="ellipsis-end" className="px-1 py-0.5 text-xs text-white/50">
                  ...
                </span>
              )
            }

            return null
          })}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 py-0.5 text-xs rounded ${currentPage === totalPages ? "bg-black/20 text-white/30" : "bg-black/40 text-white hover:bg-primary/20"}`}
          >
            &raquo;
          </button>
        </div>
      )}

      <div className="text-xs text-white/50 text-center mt-1">
        Showing {indexOfFirstNode + 1}-{Math.min(indexOfLastNode, sortedNodes.length)} of {sortedNodes.length} nodes
      </div>
    </div>
  )
}
