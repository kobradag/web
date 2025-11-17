import { NextResponse } from "next/server"
import { fetchWithRetry } from "@/utils/fetchWithRetry"

// Fallback data in case the API is unavailable
const fallbackData = {
  updated: new Date().toISOString(),
  stats: {
    last24Hours: {
      totalTransactions: 52270,
      uniqueAddresses: 103,
      totalAmount: 1016838931.42770004, // Ensuring 8 decimal places
    },
  },
}

export async function GET() {
  try {
    // Add a cache-busting parameter to prevent stale data
    const cacheBuster = new Date().getTime()
    const response = await fetchWithRetry(
      `https://api-v2.k0bradag.com/transaction-stats?_=${cacheBuster}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      },
      3, // Number of retry attempts
    )

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    // Validate the data structure
    if (!data || !data.stats || !data.stats.last24Hours) {
      console.error("Invalid data structure received from API:", data)
      throw new Error("Invalid data structure")
    }

    // Ensure we have 8 decimal places for totalAmount
    if (data?.stats?.last24Hours?.totalAmount) {
      // Convert to number and ensure 8 decimal places precision
      const amount = Number(data.stats.last24Hours.totalAmount)
      data.stats.last24Hours.totalAmount = Number.parseFloat(amount.toFixed(8))
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error fetching transaction stats:", error)

    // Return fallback data
    return NextResponse.json(fallbackData, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  }
}
