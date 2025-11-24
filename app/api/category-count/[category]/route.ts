import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
  const { category } = params

  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 })
  }

  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime()
    const url = `https://api-v2.k0bradag.com/api/category-chart-count/${category}?t=${timestamp}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching category count for ${category}:`, error)
    return NextResponse.json({ error: `Failed to fetch data for category ${category}` }, { status: 500 })
  }
}
