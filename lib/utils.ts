import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(timestamp: number | string): string {
  if (!timestamp) return "N/A"

  // Convert to number if it's a string
  const timestampNum = typeof timestamp === "string" ? Number.parseInt(timestamp) : timestamp

  // Check if timestamp is in milliseconds (13 digits) or seconds (10 digits)
  const date = timestampNum.toString().length >= 13 ? new Date(timestampNum) : new Date(timestampNum * 1000)

  // Format the date as YYYY-MM-DD HH:MM:SS
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  // Return formatted date with original timestamp in parentheses
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (${timestampNum})`
}
