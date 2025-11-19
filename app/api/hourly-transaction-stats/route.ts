import { NextResponse } from "next/server"
import { fetchWithRetry } from "@/utils/fetchWithRetry"

// Fallback data in case the API is unavailable
const fallbackData = {
  updated: new Date().toISOString(),
  data: Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    transactions_user: Math.floor(Math.random() * 500) + 100,
    unique_wallets: Math.floor(Math.random() * 50) + 10,
  })),
}

export async function GET() {
  try {
    const response = await fetchWithRetry(
      "https://api-v2.k0bradag.com/api/transaction-stats",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      3, // Number of retry attempts
    )

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
      },
    })
  } catch (error) {
    console.error("Error fetching hourly transaction stats:", error)

    // Return fallback data
    return NextResponse.json(fallbackData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120", // Cache for 1 minute
      },
    })
  }
}
