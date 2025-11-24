import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Try to fetch from the external API
    const response = await fetch("https://api-v2.k0bradag.com/api/holders-stats", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from external API:", error)

    // Return fallback data if the external API fails
    return NextResponse.json(
      {
        totalHolders: 15782,
        totalSupply: 21000000,
        top10Percentage: "12.5",
        top100Percentage: "28.7",
        top1000Percentage: "45.2",
      },
      { status: 200 },
    )
  }
}
