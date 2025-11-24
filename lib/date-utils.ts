/**
 * Utility functions for handling dates and timestamps
 */

/**
 * Formats a timestamp (string or number) into a readable date string
 * in the format YYYY-MM-DD HH:MM:SS
 */
export function formatTimestamp(timestamp: string | number | undefined): string {
  if (!timestamp) return "Unknown"

  try {
    // If timestamp is a string, try to convert it to a number
    let timestampNum: number

    if (typeof timestamp === "string") {
      // Try to parse as number
      timestampNum = Number.parseInt(timestamp, 10)
      if (isNaN(timestampNum)) {
        return "Invalid date"
      }
    } else {
      timestampNum = timestamp as number
    }

    // Check if timestamp is reasonable
    // First, determine if it's in seconds or milliseconds
    const now = Date.now()
    const isSeconds = timestampNum < now / 1000

    // Convert to milliseconds if needed
    const timestampMs = isSeconds ? timestampNum * 1000 : timestampNum

    // Create date object
    const date = new Date(timestampMs)

    // Validate date is reasonable
    if (date.toString() === "Invalid Date" || date.getFullYear() < 2020 || date.getFullYear() > 2100) {
      return "Invalid date"
    }

    // Format date as YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (e) {
    console.error("Error formatting timestamp:", e, timestamp)
    return "Error"
  }
}

/**
 * Attempts to normalize a timestamp to a Unix timestamp (seconds since epoch)
 * Returns the original value if normalization fails
 */
export function normalizeTimestamp(timestamp: any): any {
  if (!timestamp) return timestamp

  try {
    // If it's already a number, check if it's in seconds or milliseconds
    if (typeof timestamp === "number") {
      // If it's in milliseconds (13 digits), convert to seconds
      if (timestamp > 1000000000000) {
        return Math.floor(timestamp / 1000)
      }
      return timestamp
    }

    // If it's a string, try to parse it
    if (typeof timestamp === "string") {
      // If it looks like a date string
      if (timestamp.includes("-") || timestamp.includes("/") || timestamp.includes(",") || timestamp.includes(":")) {
        const date = new Date(timestamp)
        if (!isNaN(date.getTime())) {
          return Math.floor(date.getTime() / 1000)
        }
      }

      // Try to parse as number
      const parsed = Number.parseInt(timestamp, 10)
      if (!isNaN(parsed)) {
        // If it's in milliseconds (13 digits), convert to seconds
        if (parsed > 1000000000000) {
          return Math.floor(parsed / 1000)
        }
        return parsed
      }
    }

    // Return original if we couldn't normalize
    return timestamp
  } catch (e) {
    console.error("Error normalizing timestamp:", e)
    return timestamp
  }
}
