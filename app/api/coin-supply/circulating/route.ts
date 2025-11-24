import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.k0bradag.com/info/coinsupply/circulating", {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      circulating: data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching circulating supply:", error)
    return NextResponse.json({ error: "Failed to fetch circulating supply" }, { status: 500 })
  }
}
