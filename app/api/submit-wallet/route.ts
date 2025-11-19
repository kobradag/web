import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ip, wallet } = body

    if (!ip || !wallet) {
      return NextResponse.json({ error: "IP and wallet parameters are required" }, { status: 400 })
    }

    // Use the new API endpoint
    const apiEndpoint = "https://api-v2.k0bradag.com/api/save-wallet"

    console.log(`Submitting wallet to new endpoint: ${apiEndpoint}`)
    console.log(`Data: IP=${ip}, Wallet=${wallet}`)

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip, wallet }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`Successfully submitted to ${apiEndpoint}:`, data)
        return NextResponse.json(data || { success: true })
      } else {
        const errorText = await response.text()
        console.log(`Failed with status ${response.status} for ${apiEndpoint}: ${errorText}`)

        // Try fallback to the check-ip endpoint as a last resort
        return await tryFallbackEndpoint(ip, wallet)
      }
    } catch (error) {
      console.error(`Error with endpoint ${apiEndpoint}:`, error)

      // Try fallback to the check-ip endpoint as a last resort
      return await tryFallbackEndpoint(ip, wallet)
    }
  } catch (error) {
    console.error("Error submitting wallet:", error)
    return NextResponse.json(
      { error: "Failed to submit wallet", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

async function tryFallbackEndpoint(ip: string, wallet: string) {
  console.log("Trying fallback endpoint...")

  try {
    // Try the check-ip endpoint as a fallback
    const checkIpUrl = `https://api-v2.k0bradag.com/api/check-ip?ip=${encodeURIComponent(ip)}&wallet=${encodeURIComponent(wallet)}`
    const response = await fetch(checkIpUrl, {
      method: "GET",
    })

    if (response.ok) {
      const data = await response.json()
      console.log("Fallback successful via check-ip endpoint")
      return NextResponse.json({
        success: true,
        message: "Wallet linked successfully via fallback endpoint",
        data,
      })
    } else {
      const errorText = await response.text()
      console.log(`Fallback also failed with status ${response.status}: ${errorText}`)
      return NextResponse.json(
        { error: "Failed to submit wallet to any endpoint", details: `API responded with status: ${response.status}` },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error with fallback attempt:", error)
    return NextResponse.json(
      { error: "All endpoints failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
