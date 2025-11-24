import { NextResponse } from "next/server"

// Mock data for when the external API is unavailable
const mockTopWallets = [
  {
    address: "kobra:qpscc6kzu2ny8ga7tr72csftgxjnmzc0658355tgs9k45qpn0vm0qzlfenraj",
    apiBalance: 1050000000000, // 10.5M KODA
  },
  {
    address: "kobra:qrau5m8gk9snrgw8pye59klamy2fpj5ypgej852z84gqhxrtdv6nx7qrrwqm6",
    apiBalance: 850000000000, // 8.5M KODA
  },
  {
    address: "kobra:qq23x44e52ed53ex9573664v6f7m0gqhudcxrcqkvu6z2trcmxy3uxlnj67pc",
    apiBalance: 650000000000, // 6.5M KODA
  },
  {
    address: "kobra:qrqhnjulf037g6j6327x2234gfrk7dys4493y8lmcasukak3usykc9adjuwt6",
    apiBalance: 450000000000, // 4.5M KODA
  },
  {
    address: "kobra:qp9l2ej5v8qcnk95xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j",
    apiBalance: 350000000000, // 3.5M KODA
  },
  {
    address: "kobra:qzr8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jp",
    apiBalance: 250000000000, // 2.5M KODA
  },
  {
    address: "kobra:qzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jpr8g2hm2qgzpgk24xr8g0cwvmy0x",
    apiBalance: 150000000000, // 1.5M KODA
  },
  {
    address: "kobra:q5xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk9",
    apiBalance: 80000000000, // 800K KODA
  },
  {
    address: "kobra:qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8qcnk95xzm3jzj5jps8g2hm2q",
    apiBalance: 60000000000, // 600K KODA
  },
  {
    address: "kobra:qcnk95xzm3jzj5jps8g2hm2qgzpgk24xr8g0cwvmy0xzs5zrw8j9l2ej5v8q",
    apiBalance: 40000000000, // 400K KODA
  },
]

export async function GET() {
  try {
    // Try to fetch from the actual API - UPDATED URL
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 seconds timeout

    try {
      // Using the new API endpoint as requested
      const response = await fetch("https://api-v2.k0bradag.com/api/top-api-balances", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // If the response is successful, return the actual data
      if (response.ok) {
        const data = await response.json()

        // Use the lastCheck from the API response instead of generating a new one
        return NextResponse.json({
          wallets: data.data || mockTopWallets,
          lastCheck: data.lastCheck || new Date().toISOString(), // Use API's timestamp or fallback to current time
          scannedAddresses: data.scannedAddresses || 4678, // Add this line
        })
      }

      // If response is not OK, throw error to use mock data
      throw new Error(`API responded with status: ${response.status}`)
    } catch (error) {
      // Clear timeout if it hasn't fired yet
      clearTimeout(timeoutId)

      // Log error and use mock data
      console.error("Error fetching top wallets:", error)

      // Return mock data with current timestamp
      return NextResponse.json({
        wallets: mockTopWallets,
        lastCheck: new Date().toISOString(),
        isMockData: true,
        scannedAddresses: 4678, // Add this line
      })
    }
  } catch (error) {
    console.error("Unexpected error in top-wallets API route:", error)
    // Return mock data in case of any error
    return NextResponse.json({
      wallets: mockTopWallets,
      lastCheck: new Date().toISOString(),
      isMockData: true,
      scannedAddresses: 4678, // Add this line
    })
  }
}
