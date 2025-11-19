const API_BASE = "https://api.k0bradag.com/"

function formatAddress(address: string): string {
  return address.replace("kobra%3A", "kobra:")
}

// Update the fetchWithTimeout function to have a longer timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        "Access-Control-Allow-Origin": "*",
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

export async function getBlock(hash: string) {
  const response = await fetchWithTimeout(`${API_BASE}blocks/${hash}`)
  return response
}

export async function getTransaction(hash: string) {
  const response = await fetchWithTimeout(`${API_BASE}transactions/${hash}`)
  return response
}

export async function getBlockdagInfo() {
  return fetchWithTimeout(`${API_BASE}info/blockdag`)
}

export async function getCoinSupply() {
  return fetchWithTimeout(`${API_BASE}info/coinsupply`)
}

export async function getAddressBalance(addr: string) {
  const formattedAddr = formatAddress(addr)
  const response = await fetchWithTimeout(`${API_BASE}addresses/${formattedAddr}/balance`)
  return response.balance
}

export async function getAddressTxCount(addr: string) {
  const formattedAddr = formatAddress(addr)
  const response = await fetchWithTimeout(`${API_BASE}addresses/${formattedAddr}/transactions-count`)
  return response.total
}

export async function getAddressUtxos(addr: string) {
  const formattedAddr = formatAddress(addr)
  return fetchWithTimeout(`${API_BASE}addresses/${formattedAddr}/utxos`)
}

export async function getHalving() {
  const response = await fetchWithTimeout(`${API_BASE}info/halving`)
  return response
}

export async function getTransactionsFromAddress(addr: string, limit = 20, offset = 0) {
  const formattedAddr = formatAddress(addr)
  try {
    const response = await fetch(
      `${API_BASE}addresses/${formattedAddr}/full-transactions?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      transactions: data.transactions || [],
      total: data.total || 0,
    }
  } catch (error) {
    console.error("Error fetching address transactions:", error)
    throw error
  }
}

export async function getTransactions(tx_list: string[]) {
  return fetchWithTimeout(`${API_BASE}transactions/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transactionIds: tx_list }),
  })
}

export async function searchByHashOrAddress(query: string) {
  try {
    if (query.length === 64) {
      // First try as block hash
      const blockResponse = await fetch(`${API_BASE}blocks/${query}`)
      const blockData = await blockResponse.json()

      if (blockData.detail === "Block not found") {
        // If not a block, try as transaction
        return { type: "transaction", hash: query }
      }

      return { type: "block", hash: query }
    }

    if (query.startsWith("kobra:")) {
      // Handle as address
      return { type: "address", address: query }
    }

    throw new Error("Invalid search query")
  } catch (error) {
    console.error("Search error:", error)
    throw error
  }
}

export async function getFullTransactionsFromAddress(address: string) {
  const formattedAddr = formatAddress(address)
  try {
    const response = await fetch(`https://api.k0bradag.com/addresses/${formattedAddr}/full-transactions`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching full transactions:", error)
    throw error
  }
}
