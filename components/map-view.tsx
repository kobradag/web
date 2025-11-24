"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Define the peer node type
interface PeerNode {
  id: string // Using id instead of ip
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

// Define central node
const centralNode = {
  lat: 0,
  lon: 0,
  city: "Central Node",
  country: "KODA Network",
}

interface MapViewProps {
  peers: PeerNode[]
}

export default function MapView({ peers }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Function to clear all markers and lines from the map
  const clearMapFeatures = () => {
    // Remove all markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Remove all line layers and sources
    if (map.current) {
      const mapInstance = map.current
      peers.forEach((peer) => {
        if (peer.id && mapInstance.getLayer(`line-${peer.id}`)) {
          mapInstance.removeLayer(`line-${peer.id}`)
        }
        if (peer.id && mapInstance.getSource(`line-${peer.id}`)) {
          mapInstance.removeSource(`line-${peer.id}`)
        }
      })
    }
  }

  // Function to add a connection line between central node and a peer
  const addConnectionLine = (mapInstance: mapboxgl.Map, peer: PeerNode) => {
    try {
      // Add source for the line
      mapInstance.addSource(`line-${peer.id}`, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [centralNode.lon, centralNode.lat],
              [peer.lon!, peer.lat!],
            ],
          },
        },
      })

      // Add line layer
      mapInstance.addLayer({
        id: `line-${peer.id}`,
        type: "line",
        source: `line-${peer.id}`,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": peer.isOutbound ? "#33ffff" : "#ffaa00",
          "line-width": 1.2,
          "line-opacity": 0.7,
        },
      })
    } catch (err) {
      console.error(`Error adding line for peer ${peer.id}:`, err)
    }
  }

  // Function to add markers and lines to the map
  const addMapFeatures = (peerData: PeerNode[]) => {
    if (!map.current || !mapLoaded) return

    clearMapFeatures()

    const mapInstance = map.current

    // Add central node marker
    const centralEl = document.createElement("div")
    centralEl.className = "central-marker"
    centralEl.style.width = "15px"
    centralEl.style.height = "15px"
    centralEl.style.backgroundColor = "#00ff00"
    centralEl.style.borderRadius = "50%"
    centralEl.style.border = "2px solid #ffffff"

    const centralMarker = new mapboxgl.Marker(centralEl)
      .setLngLat([centralNode.lon, centralNode.lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(`
        <strong>Central KODA Node</strong><br>
        ${centralNode.city}, ${centralNode.country}
      `),
      )
      .addTo(mapInstance)

    markersRef.current.push(centralMarker)

    // Add peer markers and connection lines
    peerData.forEach((peer) => {
      if (peer.lat && peer.lon) {
        // Create marker element
        const el = document.createElement("div")
        el.className = "marker"
        el.style.width = "10px"
        el.style.height = "10px"
        el.style.backgroundColor = peer.isOutbound ? "#00ffcc" : "#ffaa00"
        el.style.borderRadius = "50%"
        el.style.border = "1px solid #ffffff"

        // Create and add marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([peer.lon, peer.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
            <strong>${peer.city || "Unknown"}, ${peer.country || "Unknown"}</strong><br>
            ${peer.userAgent || "Unknown"}<br>
            Connected: ${peer.connectedFor || "Unknown"}
          `),
          )
          .addTo(mapInstance)

        markersRef.current.push(marker)

        // Add connection line if map is loaded
        if (mapLoaded) {
          addConnectionLine(mapInstance, peer)
        }
      }
    })
  }

  // Update the map initialization to use a more reliable public token and add more error handling
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    let mapInitialized = false
    setIsLoading(true)

    try {
      // Set Mapbox access token - using a more reliable public token
      mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NWVuYzAzaDMyeXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"

      // Create map instance with error handling
      const initMap = () => {
        try {
          console.log("Initializing Mapbox map...")
          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/dark-v11", // Updated to a more recent style
            center: [0, 20],
            zoom: 1.3,
            attributionControl: false, // Disable attribution for cleaner look
            preserveDrawingBuffer: true, // This can help with rendering in some browsers
          })

          // Handle map load
          map.current.on("load", () => {
            console.log("Map loaded successfully")
            mapInitialized = true
            setMapLoaded(true)
            setIsLoading(false)
            if (peers.length > 0) {
              addMapFeatures(peers)
            }
          })

          // Handle map load error
          map.current.on("error", (e) => {
            console.error("Map error:", e)
            setMapError(true)
            setIsLoading(false)
          })
        } catch (err) {
          console.error("Error in map initialization:", err)
          setMapError(true)
          setIsLoading(false)
        }
      }

      // Try to initialize the map with a timeout
      initMap()

      // Set a timeout to check if map initialized successfully
      const timeoutId = setTimeout(() => {
        if (!mapInitialized) {
          console.error("Map initialization timed out")
          setMapError(true)
          setIsLoading(false)
        }
      }, 10000) // 10 second timeout

      // Cleanup function
      return () => {
        clearTimeout(timeoutId)
        if (map.current) {
          map.current.remove()
          map.current = null
        }
      }
    } catch (err) {
      console.error("Error initializing map:", err)
      setMapError(true)
      setIsLoading(false)
    }
  }, [])

  // Update map when peers change
  useEffect(() => {
    if (map.current && mapLoaded && peers.length > 0) {
      addMapFeatures(peers)
    }
  }, [peers, mapLoaded])

  if (isLoading && !mapError) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-black/30 rounded-md">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          <p className="text-white font-medium">Loading map...</p>
          <p className="text-white/70 text-sm">This may take a few moments</p>
        </div>
      </div>
    )
  }

  if (mapError) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-black/30 rounded-md">
        <div className="text-center p-6 max-w-md">
          <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-400 text-lg font-medium mb-2">Map failed to load</p>
          <p className="text-white/80 mb-4">
            This could be due to network issues, browser compatibility, or missing WebGL support.
          </p>
          <p className="text-white/60 text-sm mb-2">Please try refreshing the page or using a different browser.</p>
          {debugInfo && (
            <div className="mt-4 p-2 bg-black/50 rounded text-xs text-red-300 font-mono overflow-auto max-h-[100px]">
              {debugInfo}
            </div>
          )}
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="h-[400px] w-full rounded-md overflow-hidden" />
}
