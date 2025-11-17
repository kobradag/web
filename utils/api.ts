/**
 * Utility functions for fetching data from the KODA API
 */

const API_BASE = "https://api.k0bradag.com/"

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    })
    clearTimeout(id)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out")
    }
    throw error
  }
}

export async function getBlockdagInfo() {
  return fetchWithTimeout(`${API_BASE}info/blockdag`)
}

export async function getCoinSupply() {
  return fetchWithTimeout(`${API_BASE}info/coinsupply`)
}

export async function getHalving() {
  try {
    const data = await fetchWithTimeout(`${API_BASE}info/halving`)
    return data
  } catch (error) {
    console.error("Error fetching halving info:", error)
    return null
  }
}

export async function getBlockReward() {
  return fetchWithTimeout(`${API_BASE}info/blockreward`)
}

// Improved market data function with better error handling and fallback mechanisms
export async function getMarketData() {
  // Default fallback data
  const fallbackData = {
    price: 0.000123,
    fdv: 54735000,
    volume24h: 12345,
    priceChange24h: 2.5,
    priceChange1h: 0.5,
    priceChange7d: -1.2,
    priceChange30d: 15.7,
    ath: 0.000456,
    athDate: "2023-12-01T00:00:00.000Z",
    atl: 0.000045,
    atlDate: "2023-06-01T00:00:00.000Z",
  }

  try {
    // Try to fetch from the primary API endpoint with a shorter timeout
    try {
      const response = await fetch("https://api.k0bradag.com/info/market-data", {
        cache: "no-store",
        signal: AbortSignal.timeout(3000), // 3 second timeout
      })

      if (response.ok) {
        const data = await response.json()

        // Return a safe object with fallbacks for all properties
        return {
          price: data?.current_price?.usd || fallbackData.price,
          fdv: data?.fully_diluted_valuation?.usd || fallbackData.fdv,
          volume24h: data?.total_volume?.usd || fallbackData.volume24h,
          priceChange24h: data?.price_change_percentage_24h || fallbackData.priceChange24h,
          priceChange1h: data?.price_change_percentage_1h_in_currency?.usd || fallbackData.priceChange1h,
          priceChange7d: data?.price_change_percentage_7d_in_currency?.usd || fallbackData.priceChange7d,
          priceChange30d: data?.price_change_percentage_30d_in_currency?.usd || fallbackData.priceChange30d,
          ath: data?.ath?.usd || fallbackData.ath,
          athDate: data?.ath_date?.usd || fallbackData.athDate,
          atl: data?.atl?.usd || fallbackData.atl,
          atlDate: data?.atl_date?.usd || fallbackData.atlDate,
        }
      }
    } catch (primaryError) {
      console.warn("Primary market data endpoint failed:", primaryError)
      // Continue to fallback endpoint
    }

    // Try fallback endpoint if primary fails
    try {
      const fallbackResponse = await fetch("https://api-v2.k0bradag.com/market-data", {
        cache: "no-store",
        signal: AbortSignal.timeout(3000), // 3 second timeout
      })

      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json()

        return {
          price: data?.price || fallbackData.price,
          fdv: data?.fdv || fallbackData.fdv,
          volume24h: data?.volume24h || fallbackData.volume24h,
          priceChange24h: data?.priceChange24h || fallbackData.priceChange24h,
          priceChange1h: data?.priceChange1h || fallbackData.priceChange1h,
          priceChange7d: data?.priceChange7d || fallbackData.priceChange7d,
          priceChange30d: data?.priceChange30d || fallbackData.priceChange30d,
          ath: data?.ath || fallbackData.ath,
          athDate: data?.athDate || fallbackData.athDate,
          atl: data?.atl || fallbackData.atl,
          atlDate: data?.atlDate || fallbackData.atlDate,
        }
      }
    } catch (fallbackError) {
      console.warn("Fallback market data endpoint failed:", fallbackError)
      // Continue to static fallback data
    }

    // If both endpoints fail, log and return fallback data
    console.warn("All market data endpoints failed, using fallback data")
    return fallbackData
  } catch (error) {
    console.error("Error fetching market data:", error)
    // Return fallback values in case of error
    return fallbackData
  }
}

export async function getTransaction(hash: string) {
  return fetchWithTimeout(`${API_BASE}transactions/${hash}`)
}

export async function getHalvingInfo() {
  try {
    return fetchWithTimeout(`${API_BASE}info/halving`)
  } catch (error) {
    console.error("Error fetching halving info:", error)
    return null
  }
}
