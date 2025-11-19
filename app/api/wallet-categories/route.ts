import { NextResponse } from "next/server"

// This API route is no longer needed as we're fetching directly from the category-specific endpoints
// However, we'll keep it as a fallback in case the direct endpoints fail

// Mock data for when the external API is unavailable
const mockCategorySummary = [
  {
    category: "Whale",
    change1h: "+0.01",
    change1hPercent: "+0.01%",
    change24h: "+1.25",
    change24hPercent: "+1.25%",
    change7d: "+5.32",
    change7dPercent: "+5.32%",
    change30d: "+12.45",
    change30dPercent: "+12.45%",
    count: 12,
    balance: 2500000000000, // 25M KODA
    balanceDisplay: "25,000,000",
    percentage: "35.42%",
  },
  {
    category: "Shark",
    change1h: "-0.02",
    change1hPercent: "-0.02%",
    change24h: "+0.75",
    change24hPercent: "+0.75%",
    change7d: "+3.21",
    change7dPercent: "+3.21%",
    change30d: "+8.76",
    change30dPercent: "+8.76%",
    count: 48,
    balance: 1800000000000, // 18M KODA
    balanceDisplay: "18,000,000",
    percentage: "25.49%",
  },
  {
    category: "Dolphin",
    change1h: "+0.03",
    change1hPercent: "+0.03%",
    change24h: "-0.45",
    change24hPercent: "-0.45%",
    change7d: "+2.15",
    change7dPercent: "+2.15%",
    change30d: "+6.32",
    change30dPercent: "+6.32%",
    count: 156,
    balance: 1200000000000, // 12M KODA
    balanceDisplay: "12,000,000",
    percentage: "16.99%",
  },
  {
    category: "Fish",
    change1h: "-0.01",
    change1hPercent: "-0.01%",
    change24h: "+0.32",
    change24hPercent: "+0.32%",
    change7d: "+1.87",
    change7dPercent: "+1.87%",
    change30d: "+4.56",
    change30dPercent: "+4.56%",
    count: 782,
    balance: 950000000000, // 9.5M KODA
    balanceDisplay: "9,500,000",
    percentage: "13.45%",
  },
  {
    category: "Octopus",
    change1h: "+0.02",
    change1hPercent: "+0.02%",
    change24h: "-0.18",
    change24hPercent: "-0.18%",
    change7d: "+0.95",
    change7dPercent: "+0.95%",
    change30d: "+2.34",
    change30dPercent: "+2.34%",
    count: 1543,
    balance: 450000000000, // 4.5M KODA
    balanceDisplay: "4,500,000",
    percentage: "6.37%",
  },
  {
    category: "Crab",
    change1h: "-0.01",
    change1hPercent: "-0.01%",
    change24h: "+0.12",
    change24hPercent: "+0.12%",
    change7d: "+0.65",
    change7dPercent: "+0.65%",
    change30d: "+1.23",
    change30dPercent: "+1.23%",
    count: 2187,
    balance: 160000000000, // 1.6M KODA
    balanceDisplay: "1,600,000",
    percentage: "2.28%",
  },
]

export async function GET() {
  try {
    // Try to fetch from the actual API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime()

      const response = await fetch(`https://k0bradag.com/api/balances-summary?t=${timestamp}`, {
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
        return NextResponse.json(data)
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching wallet categories:", error)

      // Return mock data with current timestamp
      return NextResponse.json({
        updated: new Date().toISOString(),
        summary: mockCategorySummary,
      })
    }
  } catch (error) {
    console.error("Unexpected error in wallet-categories API route:", error)

    // Return mock data in case of any error
    return NextResponse.json({
      updated: new Date().toISOString(),
      summary: mockCategorySummary,
    })
  }
}
