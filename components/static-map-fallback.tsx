"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface PeerNode {
  id: string
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

export function StaticMapFallback({ nodes }: { nodes: PeerNode[] }) {
  const [showDetails, setShowDetails] = useState(false)

  // Filter nodes with geolocation data
  const nodesWithGeo = nodes.filter((node) => node.lat && node.lon)

  if (nodesWithGeo.length === 0) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <h3 className="text-yellow-500 font-medium mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          No Nodes with Geolocation Data
        </h3>
        <p className="text-white/80">
          None of the network nodes have geolocation data, which is required to display them on a map. This is likely
          due to the API not returning location information for these IP addresses.
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-[400px] w-full bg-black rounded-lg overflow-hidden">
      {/* Static world map background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-map-dark-Yx9Yd9Yx9Yd9Yx9Yd9Yx9Yd9Yx9Yd9.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Grid lines for better visualization */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`col-${i}`} className="border-r border-white/30 h-full" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`row-${i}`} className="border-b border-white/30 w-full" />
        ))}
      </div>

      {/* Node markers */}
      {nodesWithGeo.map((node, index) => {
        // Convert lat/lon to x/y coordinates (simple approximation)
        // Map coordinates: lat: -90 to 90, lon: -180 to 180
        // Convert to percentage: x: 0 to 100%, y: 0 to 100%
        const x = ((node.lon! + 180) / 360) * 100
        const y = ((90 - node.lat!) / 180) * 100

        return (
          <div
            key={index}
            className="absolute w-3 h-3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-150 transition-transform"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => setShowDetails((prev) => !prev)}
            title={`${node.city || "Unknown"}, ${node.country || "Unknown"}`}
          >
            {/* Pulse effect for nodes */}
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
          </div>
        )
      })}

      {/* Info overlay */}
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
          <h4 className="text-white font-medium mb-2">Active Nodes</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            {nodesWithGeo.map((node, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>
                  {node.city || "Unknown"}, {node.country || "Unknown"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-2 right-2 bg-black/80 p-2 rounded text-xs text-white/80">
        Click on a node to see details
      </div>
    </div>
  )
}
