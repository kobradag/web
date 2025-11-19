import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Add a cache-busting query parameter
    const timestamp = new Date().getTime()
    const response = await fetch(`https://api-v2.k0bradag.com/api/payments?_=${timestamp}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Kobra-Explorer/1.0",
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching payments from external API:", error)
    return NextResponse.json({ error: "Failed to fetch recent payments" }, { status: 500 })
  }
}
