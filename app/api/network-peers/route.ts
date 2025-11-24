import { NextResponse } from "next/server"

// Sample data to use as fallback
const FALLBACK_DATA = [
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

        // Process the data to match the expected format
        let processedData = {
          date: new Date().toISOString(),
          geoRequestsToday: 0,
          count: 0,
          peers: [],
        }

        if (data && Array.isArray(data)) {
          // Handle the format where the API returns a direct array of peers
          processedData.peers = data.map((peer, index) => ({
            country: peer.country,
            city: peer.city,
            lat: peer.lat,
            lon: peer.lon,
            userAgent: peer.userAgent,
            isOutbound: peer.isOutbound,
            connectedFor: peer.connectedFor || peer.timeConnected,
            error: peer.error,
          }))
          processedData.count = processedData.peers.length
        } else if (data && Array.isArray(data.peers)) {
          // Handle the format where the API returns an object with a peers array
          processedData = {
            date: data.date || new Date().toISOString(),
            geoRequestsToday: data.geoRequestsToday || 0,
            count: data.count || data.peers.length,
            peers: data.peers.map((peer) => ({
              country: peer.country,
              city: peer.city,
              lat: peer.lat,
              lon: peer.lon,
              userAgent: peer.userAgent,
              isOutbound: peer.isOutbound,
              connectedFor: peer.connectedFor || peer.timeConnected,
              error: peer.error,
            })),
          }
        }

        console.log(`Processed ${processedData.peers.length} peers from API`)

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

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching network peers:", error)

      // Create a mock response with the expected format
      const mockResponse = {
        date: new Date().toISOString(),
        geoRequestsToday: 0,
        count: FALLBACK_DATA.length,
        peers: FALLBACK_DATA,
      }

      // Add cache prevention headers to the response
      return new NextResponse(JSON.stringify(mockResponse), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
    }
  } catch (error) {
    console.error("Unexpected error in network-peers API route:", error)

    // Create a mock response with the expected format
    const mockResponse = {
      date: new Date().toISOString(),
      geoRequestsToday: 0,
      count: FALLBACK_DATA.length,
      peers: FALLBACK_DATA,
    }

    // Return mock data in case of any error with cache prevention headers
    return new NextResponse(JSON.stringify(mockResponse), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
