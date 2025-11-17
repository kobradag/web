import { NextResponse } from "next/server"

// Mock coin supply data
const mockCoinSupply = {
  circulatingSupply: "22645164973137362",
  maxSupply: "50000000000000000",
}

export async function GET() {
  try {
    // Try to fetch from the actual API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

    try {
      const response = await fetch("https://api.k0bradag.com/info/coinsupply", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // If the response is successful, return the actual data
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching coin supply:", error)
      return NextResponse.json(mockCoinSupply)
    }
  } catch (error) {
    console.error("Unexpected error in coin-supply API route:", error)
    // Return mock data in case of any error
    return NextResponse.json(mockCoinSupply)
  }
}
