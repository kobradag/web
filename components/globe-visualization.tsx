"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

type PeerData = {
  country?: string
  city?: string
  lat?: number
  lon?: number
  userAgent: string
  isOutbound: boolean
  connectedFor: string
  error?: string
}

type ApiResponse = {
  date: string
  geoRequestsToday: number
  count: number
  peers: PeerData[]
}

// Sample data to use as fallback
const FALLBACK_DATA: PeerData[] = [
  {
    country: "United States",
    city: "San Francisco",
    lat: 37.7749,
    lon: -122.4194,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "1d 2h",
  },
  {
    country: "United States",
    city: "New York",
    lat: 40.7128,
    lon: -74.006,
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "3h 15m",
  },
  {
    country: "United Kingdom",
    city: "London",
    lat: 51.5074,
    lon: -0.1278,
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "2d 5h",
  },
  {
    country: "Japan",
    city: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "12h 30m",
  },
  {
    country: "Singapore",
    city: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "5h 45m",
  },
  {
    country: "Germany",
    city: "Berlin",
    lat: 52.52,
    lon: 13.405,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "4d 8h",
  },
  {
    country: "Australia",
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "6h 12m",
  },
  {
    country: "Brazil",
    city: "São Paulo",
    lat: -23.5505,
    lon: -46.6333,
    userAgent: "kobrad:1.0.2",
    isOutbound: true,
    connectedFor: "1d 5h",
  },
]

// Colors for the visualization
const GLOW_COLOR_LIGHT = "#00ff00" // Bright green glow
const RING_COLOR_LIGHT = "#ffffff" // White ring
const ARC_COLOR_LIGHT = "rgba(255, 255, 255, 0.6)" // Changed from solid white to semi-transparent white

const GLOW_COLOR_DARK = "#008000" // Darker green glow
const RING_COLOR_DARK = "#808080" // Gray ring
const ARC_COLOR_DARK = "rgba(128, 128, 128, 0.4)" // Darker semi-transparent gray

export function GlobeVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [peers, setPeers] = useState<PeerData[]>([])
  const [peerCount, setPeerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visualizationType, setVisualizationType] = useState<"globe" | "flat">("globe")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [hoverInfo, setHoverInfo] = useState<{
    country?: string
    city?: string
    userAgent?: string
    connectedFor?: string
    isOutbound?: boolean
    x: number
    y: number
  } | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Store the mapping between 3D points and peer data
  const pointsRef = useRef<Map<string, PeerData>>(new Map())

  useEffect(() => {
    if (!isClient) return

    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isCurrentlyVisible =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.width > 0 &&
          rect.height > 0 &&
          window.getComputedStyle(containerRef.current).display !== "none"

        setIsVisible(isCurrentlyVisible)
      }
    }

    // Check visibility initially and on resize/scroll
    checkVisibility()
    window.addEventListener("resize", checkVisibility)
    window.addEventListener("scroll", checkVisibility)

    return () => {
      window.removeEventListener("resize", checkVisibility)
      window.removeEventListener("scroll", checkVisibility)
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          // Force re-render when container becomes visible with dimensions
          setIsVisible(true)
        }
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [isClient])

  useEffect(() => {
    setIsClient(true)

    // Fetch node data from our internal API route
    const fetchNodeData = async () => {
      try {
        setIsLoading(true)

        // Use our internal API route instead of the external one
        const response = await fetch("/api/network-peers?t=" + new Date().getTime(), {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || `API request failed with status ${response.status}`)
        }

        const data: ApiResponse = await response.json()

        // Set the peers data and count
        setPeers(data.peers || [])
        // Use the actual count from the API, or fall back to the length of the peers array
        setPeerCount(data.peers?.length || 0)
        setUsingMockData(false)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to fetch node data:", err)

        // Use the sample data as fallback
        setPeers(FALLBACK_DATA)
        setPeerCount(FALLBACK_DATA.length)
        setUsingMockData(true)
        setError("Failed to load live node data. Using sample data instead.")
        setIsLoading(false)
      }
    }

    fetchNodeData()
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current || peers.length === 0 || !isVisible) return

    // Clear the points mapping when recreating the globe
    pointsRef.current.clear()

    // Dynamically import Three.js and Three-Globe to avoid SSR issues
    const initGlobe = async () => {
      try {
        // Add a safety check to ensure the container is still in the DOM
        if (!containerRef.current) {
          console.log("Container ref is no longer available")
          return
        }

        const THREE = await import("three")
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls")
        const ThreeGlobe = await import("three-globe")

        // Add another safety check after the imports
        if (!containerRef.current) {
          console.log("Container ref is no longer available after imports")
          return
        }

        // Clear any existing content
        while (containerRef.current?.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }

        // Get dimensions with a safety check
        const width = containerRef.current?.clientWidth || 800
        const height = containerRef.current?.clientHeight || 400

        // Create renderer with better quality
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)

        // Add another safety check before appending
        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement)
        } else {
          console.log("Container ref is no longer available when appending renderer")
          return
        }

        // Create scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)

        // Create camera
        const camera = new THREE.PerspectiveCamera(
          60,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.z = 240

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
        scene.add(ambientLight)

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        // Add point light in the center
        const pointLight = new THREE.PointLight(0x3a228a, 1.5, 300)
        pointLight.position.set(0, 0, 0)
        scene.add(pointLight)

        // Filter out peers without location data
        const validPeers = peers.filter((peer) => peer.lat !== undefined && peer.lon !== undefined && !peer.error)

        // Define colors based on theme
        const glowColor = isDarkMode ? GLOW_COLOR_DARK : GLOW_COLOR_LIGHT
        const ringColor = isDarkMode ? RING_COLOR_DARK : RING_COLOR_LIGHT
        const arcColor = isDarkMode ? ARC_COLOR_DARK : ARC_COLOR_LIGHT

        // Create arcs data
        const arcsData = []

        // Find outbound peers
        const outboundPeers = validPeers.filter((peer) => peer.isOutbound)
        const inboundPeers = validPeers.filter((peer) => !peer.isOutbound)

        // Track which peers have connections
        const connectedPeers = new Set()

        // Connect each outbound peer to several inbound peers
        outboundPeers.forEach((outPeer) => {
          // Connect to 3-6 random inbound peers (increased from 2-4)
          const numConnections = Math.min(inboundPeers.length, Math.floor(Math.random() * 4) + 3)
          const shuffled = [...inboundPeers].sort(() => 0.5 - Math.random())

          for (let i = 0; i < numConnections; i++) {
            if (shuffled[i] && outPeer.lat && outPeer.lon && shuffled[i].lat && shuffled[i].lon) {
              arcsData.push({
                startLat: outPeer.lat,
                startLng: outPeer.lon,
                endLat: shuffled[i].lat,
                endLng: shuffled[i].lon,
                color: arcColor,
                animateDots: true, // Add animated dots along the arcs
              })

              // Mark these peers as connected
              connectedPeers.add(validPeers.indexOf(outPeer))
              connectedPeers.add(validPeers.indexOf(shuffled[i]))
            }
          }
        })

        // If we have very few connections, add more random ones
        if (arcsData.length < 10 && validPeers.length > 1) {
          // Increased from 5 to 10
          for (let i = 0; i < 15; i++) {
            // Increased from 10 to 15
            const startIdx = Math.floor(Math.random() * validPeers.length)
            let endIdx
            do {
              endIdx = Math.floor(Math.random() * validPeers.length)
            } while (endIdx === startIdx)

            const startPeer = validPeers[startIdx]
            // Fix: Declare targetIdx before using it
            const targetIdx = endIdx
            const endPeer = validPeers[targetIdx]

            if (startPeer.lat && startPeer.lon && endPeer.lat && endPeer.lon) {
              arcsData.push({
                startLat: startPeer.lat,
                startLng: startPeer.lon,
                endLat: endPeer.lat,
                endLng: endPeer.lon,
                color: arcColor,
                animateDots: true, // Add animated dots along the arcs
              })

              // Mark these peers as connected
              connectedPeers.add(startIdx)
              connectedPeers.add(endIdx)
            }
          }
        }

        // Ensure every peer has at least one connection
        for (let i = 0; i < validPeers.length; i++) {
          if (!connectedPeers.has(i)) {
            // This peer doesn't have any connections yet
            // Find a random peer to connect to (that's not itself)
            let targetIdx
            do {
              targetIdx = Math.floor(Math.random() * validPeers.length)
            } while (targetIdx === i)

            const sourcePeer = validPeers[i]
            const targetPeer = validPeers[targetIdx]

            if (sourcePeer.lat && sourcePeer.lon && targetPeer.lat && targetPeer.lon) {
              arcsData.push({
                startLat: sourcePeer.lat,
                startLng: sourcePeer.lon,
                endLat: targetPeer.lat,
                endLng: targetPeer.lon,
                color: arcColor,
                animateDots: true,
              })

              // Mark this peer as connected
              connectedPeers.add(i)
            }
          }
        }

        // Create custom points with HTML labels
        const customPoints = validPeers
          .map((peer, index) => {
            if (!peer.lat || !peer.lon) return null

            // Create a unique key for this point
            const key = `${peer.lat},${peer.lon}`

            // Store the peer data in our ref map
            pointsRef.current.set(key, peer)

            return {
              lat: peer.lat,
              lng: peer.lon,
              size: peer.isOutbound ? 0.8 : 0.6,
              color: peer.isOutbound ? 0xffcc00 : glowColor,
              id: index, // Add an ID to help with identification
            }
          })
          .filter(Boolean)

        // Create globe with more modern styling
        const Globe = new ThreeGlobe.default()
          // Use a high-quality Earth texture
          .globeImageUrl(
            isDarkMode
              ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
              : "//unpkg.com/three-globe/example/img/earth-day.jpg",
          ) // Changed to daytime texture
          .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
          // Enhanced appearance
          .atmosphereColor("#3a228a")
          .atmosphereAltitude(0.15)
          .atmosphereColor("#3a228a")
          .arcColor("color")
          .arcDashLength(0.8)
          .arcDashGap(0.3)
          .arcDashAnimateTime(3000) // Changed from 1000 to 3000 for slower animation
          .arcStroke(0.5) // Reduced from 1.2 to 1.0 for less intensity
          .arcDashInitialGap(() => Math.random() * 2)
          .arcAltitude(0.25) // Add this line to make arcs curve more
          .arcsData(arcsData)
          .pointsData(customPoints)
          .pointColor("color")
          .pointAltitude(0.01) // Very close to the surface
          .pointRadius("size")
          .pointsMerge(false)
          .pointsTransitionDuration(200)
          .ringsData(customPoints)
          .ringColor(() => ringColor)
          .ringMaxRadius(1)
          .ringPropagationSpeed(3)
          .ringRepeatPeriod(700)

        scene.add(Globe)

        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.rotateSpeed = 0.5
        controls.enableZoom = true
        controls.enablePan = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.3
        controls.minDistance = 180
        controls.maxDistance = 500

        // Setup raycaster for hover detection
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // Add mouse move handler with direct DOM event
        const handleMouseMove = (event: MouseEvent) => {
          if (!containerRef.current) return

          // Get container bounds
          const rect = containerRef.current.getBoundingClientRect()

          // Calculate mouse position in normalized device coordinates
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

          // Update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera)

          // Find all intersected objects
          const intersects = raycaster.intersectObjects(scene.children, true)

          // Check if we hit any points
          let foundPoint = false

          for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object

            // Try to find the parent object that has userData
            let currentObj = obj
            while (currentObj && !foundPoint) {
              // Check if this is a point from our globe
              if (currentObj.type === "Mesh" && currentObj.__globeObjType === "point") {
                // Get the lat/lng from the object
                const pointObj = currentObj.__data
                if (pointObj && pointObj.lat && pointObj.lng) {
                  const key = `${pointObj.lat},${pointObj.lng}`
                  const peerData = pointsRef.current.get(key)

                  if (peerData) {
                    // Show tooltip with country info
                    setHoverInfo({
                      country: peerData.country,
                      city: peerData.city,
                      userAgent: peerData.userAgent,
                      connectedFor: peerData.connectedFor,
                      isOutbound: peerData.isOutbound,
                      x: event.clientX,
                      y: event.clientY,
                    })
                    foundPoint = true
                    break
                  }
                }
              }

              // Move up to parent
              currentObj = currentObj.parent
            }

            if (foundPoint) break
          }

          // If we didn't find any points, hide the tooltip
          if (!foundPoint) {
            setHoverInfo(null)
          }
        }

        // Add the event listener
        containerRef.current.addEventListener("mousemove", handleMouseMove)

        // Handle resize
        const handleResize = () => {
          if (!containerRef.current) return
          const width = containerRef.current.clientWidth || 800
          const height = containerRef.current.clientHeight || 400
          renderer.setSize(width, height)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
        }

        window.addEventListener("resize", handleResize)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize)
          if (containerRef.current) {
            containerRef.current.removeEventListener("mousemove", handleMouseMove)
          }
          scene.remove(Globe)
          renderer.dispose()
          controls.dispose()
        }
      } catch (error) {
        console.error("Error initializing globe:", error)
        // Show error message in container
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<div class="flex items-center justify-center h-full text-white">Failed to load 3D Globe. Please check your browser compatibility.</div>'
        }
      }
    }

    initGlobe()
  }, [isClient, peers, visualizationType, isDarkMode, isVisible])

  // Count peers with valid location data
  const validPeerCount = peers.filter((peer) => peer.lat !== undefined && peer.lon !== undefined && !peer.error).length
  const vpnCount = peers.filter((peer) => peer.error?.includes("VPN/LOCALHOST")).length
  const totalPeerCount = peers.length

  return (
    <Card className="border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-white/10 py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-white">
          🌐 KODA Network Nodes
          {usingMockData && <span className="ml-2 text-xs text-yellow-500 font-normal">(Demo Data)</span>}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setVisualizationType("globe")}
            className={`px-2 py-1 text-xs rounded ${
              visualizationType === "globe" ? "bg-green-500 text-black" : "bg-gray-700 text-white"
            }`}
          >
            3D Globe
          </Button>
          <Button
            onClick={() => setVisualizationType("flat")}
            className={`px-2 py-1 text-xs rounded ${
              visualizationType === "flat" ? "bg-green-500 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Flat Map
          </Button>
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="outline"
            size="icon"
            className="bg-black/30 text-white border-primary/50 hover:bg-primary/20"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {isLoading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="text-white">Loading node data...</div>
            </div>
          ) : (
            <>
              <div ref={containerRef} className="w-full h-[400px]" />
              {error && (
                <div className="absolute top-4 right-4 bg-black/70 p-2 rounded text-xs text-white backdrop-blur-sm border border-white/10">
                  {error}
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/70 p-2 rounded text-xs text-white backdrop-blur-sm border border-white/10">
                <p>
                  • <span className="text-green-400">Green dots</span> represent active KODA network nodes (
                  {validPeerCount} visible of {totalPeerCount} total)
                </p>
                {vpnCount > 0 && (
                  <p>
                    • {vpnCount} {vpnCount === 1 ? "node" : "nodes"} using VPN/localhost (not shown on map)
                  </p>
                )}
                <p>
                  • <span className="text-white/60">White animated lines</span> show connections between network nodes
                </p>
                <p>• Drag to rotate, scroll to zoom</p>
                <p>
                  • <span className="text-yellow-400">Hover over nodes</span> to see location details
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      {hoverInfo && (
        <div
          className="fixed bg-black/90 text-white text-xs p-3 rounded-md border border-green-500/50 backdrop-blur-sm z-50 pointer-events-none shadow-lg shadow-green-500/20"
          style={{
            left: `${hoverInfo.x}px`,
            top: `${hoverInfo.y - 10}px`,
            transform: "translate(10px, -100%)",
            minWidth: "150px",
          }}
        >
          <div className="font-bold text-sm mb-1">
            {hoverInfo.country || "Unknown Location"}
            {hoverInfo.city ? `, ${hoverInfo.city}` : ""}
          </div>
          {hoverInfo.userAgent && <div className="mb-1">Client: {hoverInfo.userAgent}</div>}
          {hoverInfo.connectedFor && <div className="mb-1">Connected: {hoverInfo.connectedFor}</div>}
          <div className={`${hoverInfo.isOutbound ? "text-yellow-400" : "text-green-400"} font-medium`}>
            {hoverInfo.isOutbound ? "Outbound" : "Inbound"} connection
          </div>
        </div>
      )}
    </Card>
  )
}
