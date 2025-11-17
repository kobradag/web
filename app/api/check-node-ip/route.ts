import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ip = searchParams.get("ip")

  if (!ip) {
    return NextResponse.json({ error: "IP parameter is required" }, { status: 400 })
  }

  try {
    // Updated API endpoint with the correct URL
    const response = await fetch(`https://api-v2.k0bradag.com/api/check-ip?ip=${encodeURIComponent(ip)}`)

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      return NextResponse.json({ error: `API responded with status: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("API response data:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking IP:", error)
    return NextResponse.json(
      { error: "Failed to check IP", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
