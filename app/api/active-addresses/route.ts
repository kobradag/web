import { NextResponse } from "next/server"
import { fetchWithRetry } from "@/utils/fetchWithRetry"

// Fallback data in case the API is unavailable
const fallbackData = {
  data: [
    { x: "2025-05-02T04:00:00.000Z", y: 97 },
    { x: "2025-05-01T04:00:00.000Z", y: 151 },
    { x: "2025-04-30T04:00:00.000Z", y: 128 },
    { x: "2025-04-29T04:00:00.000Z", y: 126 },
    { x: "2025-04-28T04:00:00.000Z", y: 159 },
    { x: "2025-04-27T04:00:00.000Z", y: 179 },
    { x: "2025-04-26T04:00:00.000Z", y: 7564 },
    { x: "2025-04-25T04:00:00.000Z", y: 4942 },
    { x: "2025-04-24T04:00:00.000Z", y: 103 },
    { x: "2025-04-23T04:00:00.000Z", y: 228 },
    { x: "2025-04-22T04:00:00.000Z", y: 143 },
    { x: "2025-04-21T04:00:00.000Z", y: 109 },
    { x: "2025-04-20T04:00:00.000Z", y: 1148 },
    { x: "2025-04-19T04:00:00.000Z", y: 842 },
    { x: "2025-04-18T04:00:00.000Z", y: 108 },
    { x: "2025-04-17T04:00:00.000Z", y: 89 },
    { x: "2025-04-16T04:00:00.000Z", y: 43 },
    { x: "2025-04-15T04:00:00.000Z", y: 29 },
    { x: "2025-04-14T04:00:00.000Z", y: 42 },
    { x: "2025-04-13T04:00:00.000Z", y: 62 },
    { x: "2025-04-12T04:00:00.000Z", y: 49 },
    { x: "2025-04-11T04:00:00.000Z", y: 34 },
    { x: "2025-04-10T04:00:00.000Z", y: 54 },
    { x: "2025-04-09T04:00:00.000Z", y: 31 },
    { x: "2025-04-08T04:00:00.000Z", y: 27 },
    { x: "2025-04-07T04:00:00.000Z", y: 50 },
    { x: "2025-04-06T04:00:00.000Z", y: 78 },
    { x: "2025-04-05T04:00:00.000Z", y: 71 },
    { x: "2025-04-04T04:00:00.000Z", y: 57 },
    { x: "2025-04-03T04:00:00.000Z", y: 39 },
  ],
}

export async function GET() {
  try {
    const response = await fetchWithRetry(
      "https://api-v2.k0bradag.com/analytics/graphs/ActiveAddress",
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
    console.error("Error fetching active addresses data:", error)
    // Return fallback data
    return NextResponse.json(fallbackData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120", // Cache for 1 minute
      },
    })
  }
}
