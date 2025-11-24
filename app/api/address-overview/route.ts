import { NextResponse } from "next/server"

// Interface for the new API response structure
interface HoldersStatsResponse {
  totalHolders: number
  totalSupply: number
  top10Percentage: string
  top100Percentage: string
  top1000Percentage: string
}

// Interface for our internal response structure
interface AddressOverviewResponse {
  holdersCount: number
  top10HoldersPct: string
  top100HoldersPct: string
  top1000HoldersPct: string
}

// Mock data for when the API is unavailable
const mockAddressOverview: AddressOverviewResponse = {
  holdersCount: 4314,
  top10HoldersPct: "53.99",
  top100HoldersPct: "68.62",
  top1000HoldersPct: "83.70",
}

export async function GET() {
  try {
    console.log("Fetching holders stats from API...")

    // Try to fetch from the actual API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

    try {
      const response = await fetch("https://api-v2.k0bradag.com/api/holders-stats", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
        cache: "no-store", // Ensure we don't use cached data
      })

      clearTimeout(timeoutId)

      // Log the response status
      console.log(`API response status: ${response.status}`)

      // If the response is successful, return the actual data
      if (response.ok) {
        const data: HoldersStatsResponse = await response.json()
        console.log("API data received:", data)

        // Transform the data to match our internal structure
        const transformedData: AddressOverviewResponse = {
          holdersCount: data.totalHolders,
          top10HoldersPct: data.top10Percentage,
          top100HoldersPct: data.top100Percentage,
          top1000HoldersPct: data.top1000Percentage,
        }

        return NextResponse.json(transformedData)
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching holders stats:", error)

      // Return mock data with header indicating fallback
      const response = NextResponse.json(mockAddressOverview)
      response.headers.set("x-using-fallback", "true")
      return response
    }
  } catch (error) {
    console.error("Unexpected error in address-overview API route:", error)
    // Return mock data in case of any error
    const response = NextResponse.json(mockAddressOverview)
    response.headers.set("x-using-fallback", "true")
    return response
  }
}
