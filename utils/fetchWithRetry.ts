// Let's improve the fetchWithRetry utility to handle caching issues better

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  retryDelay = 1000,
): Promise<Response> {
  let lastError: Error | null = null

  // Add cache-busting parameter to URL if it doesn't already have one
  const urlObj = new URL(url)
  if (!urlObj.searchParams.has("_")) {
    urlObj.searchParams.append("_", Date.now().toString())
  }

  // Ensure headers include cache control
  const headers = {
    ...options.headers,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Create a new AbortController for each attempt
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(urlObj.toString(), {
        ...options,
        headers,
        signal: controller.signal,
        cache: "no-store",
      })

      clearTimeout(timeoutId)

      // If successful, return the response
      return response
    } catch (error) {
      lastError = error as Error
      console.warn(`Fetch attempt ${attempt + 1} failed:`, error)

      // If this was the last attempt, don't wait
      if (attempt < maxRetries - 1) {
        // Wait before retrying, with exponential backoff
        await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
      }
    }
  }

  // If we've exhausted all retries, throw the last error
  throw lastError || new Error("Failed to fetch after multiple retries")
}

/**
 * Fetches JSON data with timeout and retry functionality
 * @param url The URL to fetch from
 * @param options Fetch options
 * @param timeout Timeout in milliseconds
 * @param retries Number of retries
 * @returns Parsed JSON data
 */
export async function fetchJsonWithRetry<T>(
  url: string,
  options: RequestInit = {},
  timeout = 5000,
  retries = 2,
): Promise<T> {
  const response = await fetchWithRetry(url, options, retries, timeout)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}
