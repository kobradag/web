import { NextResponse } from "next/server"

// Mock market data for when the external API is unavailable
const mockMarketData = {
  price: 0.00001234,
  marketCap: 5500000,
  volume24h: 250000,
  priceChange24h: 2.5,
}

export async function GET() {
  try {
    // Try to fetch from the actual API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

    try {
      // Using XeggeX API to get KODA market data
      const response = await fetch("https://api.xeggex.com/api/v2/market/getlist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // If the response is successful, find KODA market data
      if (response.ok) {
        const markets = await response.json()
        const kodaMarket = markets.find((market: any) => market.symbol === "KODA/USDT")

        if (kodaMarket) {
          return NextResponse.json({
            price: Number.parseFloat(kodaMarket.lastPrice || "0"),
            marketCap:
              Number.parseFloat(kodaMarket.primaryCirculation || "0") * Number.parseFloat(kodaMarket.lastPrice || "0"),
            volume24h: Number.parseFloat(kodaMarket.volumeUsdNumber || "0"),
            priceChange24h: Number.parseFloat(kodaMarket.changePercentNumber || "0"),
          })
        }

        // If KODA market not found, use mock data
        return NextResponse.json(mockMarketData)
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching market data:", error)
      return NextResponse.json(mockMarketData)
    }
  } catch (error) {
    console.error("Unexpected error in market-data API route:", error)
    // Return mock data in case of any error
    return NextResponse.json(mockMarketData)
  }
}
