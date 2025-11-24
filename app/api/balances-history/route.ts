import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()
    const url = `https://api-v2.k0bradag.com/api/balances-history?limit=1000&t=${timestamp}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        signal: controller.signal,
        next: { revalidate: 0 },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      clearTimeout(timeoutId)
      console.error("Error fetching balances history:", error)
      throw error
    }
  } catch (error) {
    console.error("Unexpected error in balances-history API route:", error)
    return NextResponse.json({ error: "Failed to fetch balances history" }, { status: 500 })
  }
}
