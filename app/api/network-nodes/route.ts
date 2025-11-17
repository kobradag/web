import { NextResponse } from "next/server"

// Mock data for when the external API is unavailable
const mockPeers = [
  {
    id: "node-001",
    country: "Russia",
    city: "Moscow",
    lat: 55.7522,
    lon: 37.6156,
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "8h 48m",
  },
  {
    id: "node-002",
    country: "United States",
    city: "Phoenix",
    lat: 33.4484,
    lon: -112.074,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "1d 11h",
  },
  {
    id: "node-003",
    country: "Russia",
    city: "Moscow",
    lat: 55.7522,
    lon: 37.6156,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "1d 20h",
  },
  {
    id: "node-004",
    country: "Hong Kong",
    city: "Sham Shui Po",
    lat: 22.33023,
    lon: 114.15945,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "17h 22m",
  },
  {
    id: "node-005",
    country: "Poland",
    city: "Warsaw",
    lat: 52.2248,
    lon: 21.0254,
    userAgent: "kobrad:1.0.1",
    isOutbound: true,
    connectedFor: "2d 13h",
  },
  {
    id: "node-006",
    country: "Germany",
    city: "Berlin",
    lat: 52.52,
    lon: 13.405,
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "3d 5h",
  },
  {
    id: "node-007",
    country: "Japan",
    city: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "12h 30m",
  },
  {
    id: "node-008",
    country: "Brazil",
    city: "São Paulo",
    lat: -23.5505,
    lon: -46.6333,
    userAgent: "kobrad:1.0.3",
    isOutbound: false,
    connectedFor: "5h 15m",
  },
  {
    id: "node-009",
    country: "Australia",
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    userAgent: "kobrad:1.0.3",
    isOutbound: true,
    connectedFor: "1d 8h",
  },
  {
    id: "node-010",
    country: "Canada",
    city: "Toronto",
    lat: 43.6532,
    lon: -79.3832,
    userAgent: "kobrad:1.0.2",
    isOutbound: false,
    connectedFor: "4d 2h",
  },
]

// Update the GET function to properly handle the API response format
export async function GET() {
  try {
    // Try to fetch from the actual API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 seconds timeout

    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime()

      // Using the updated API endpoint with timestamp
      const response = await fetch(`https://api-v2.k0bradag.com/api/peers-geo?t=${timestamp}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // If the response is successful, return the actual data
      if (response.ok) {
        const data = await response.json()
        console.log("API response received:", data)

        // Process the data to remove IP addresses and handle the specific format
        let processedData = []

        if (data && Array.isArray(data.peers)) {
          // Handle the format you shared in your message
          processedData = data.peers.map((peer, index) => ({
            id: `node-${index + 1}`,
            country: peer.country,
            city: peer.city,
            lat: peer.lat,
            lon: peer.lon,
            userAgent: peer.userAgent,
            isOutbound: peer.isOutbound,
            connectedFor: peer.connectedFor || peer.timeConnected,
            error: peer.error,
          }))

          console.log(`Processed ${processedData.length} peers from API`)

          // Add cache prevention headers to the response
          return new NextResponse(JSON.stringify(processedData), {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          })
        } else if (Array.isArray(data)) {
          // Handle if the API returns a direct array
          processedData = data.map((peer, index) => ({
            id: `node-${index + 1}`,
            country: peer.country,
            city: peer.city,
            lat: peer.lat,
            lon: peer.lon,
            userAgent: peer.userAgent,
            isOutbound: peer.isOutbound,
            connectedFor: peer.connectedFor || peer.timeConnected,
            error: peer.error,
          }))

          console.log(`Processed ${processedData.length} peers from API`)

          // Add cache prevention headers to the response
          return new NextResponse(JSON.stringify(processedData), {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          })
        }

        // If we couldn't process the data properly, use mock data
        console.log("Could not process API data, using mock data")

        // Add cache prevention headers to the response
        return new NextResponse(JSON.stringify(mockPeers), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching network nodes:", error)

      // Add cache prevention headers to the response
      return new NextResponse(JSON.stringify(mockPeers), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    }
  } catch (error) {
    console.error("Unexpected error in network-nodes API route:", error)
    // Return mock data in case of any error with cache prevention headers
    return new NextResponse(JSON.stringify(mockPeers), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
