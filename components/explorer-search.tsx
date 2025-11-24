"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchByHashOrAddress } from "@/lib/api"
import { toast } from "sonner"

export function ExplorerSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast.error("Please enter a search query")
      return
    }

    setIsSearching(true)

    try {
      const result = await searchByHashOrAddress(searchQuery.trim())

      switch (result.type) {
        case "block":
          router.push(`/blocks/${result.hash}`)
          break
        case "transaction":
          router.push(`/txs/${result.hash}`)
          break
        case "address":
          router.push(`/addresses/${result.address}`)
          break
        default:
          toast.error("Invalid search query")
      }
    } catch (error) {
      console.error("Search error:", error)
      toast.error("No results found. Please check your input and try again.")
    } finally {
      setIsSearching(false)
      setSearchQuery("")
    }
  }

  return (
    <div className="bg-black/80 p-4 rounded-lg border border-primary/20">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search wallet address (kobra:...) or transaction ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-transparent text-white placeholder:text-white/60 border-white/20"
          disabled={isSearching}
        />
        <Button
          type="submit"
          variant="ghost"
          className="text-white hover:bg-white/10"
          disabled={isSearching}
          aria-label="Search the KODA blockchain for addresses, transactions, or blocks"
        >
          <Search className="w-4 h-4 mr-2" aria-hidden="true" />
          {isSearching ? "Searching..." : "SEARCH"}
        </Button>
      </form>
      <p className="text-xs text-white/60 mt-2">
        Enter a KODA wallet address starting with &quot;kobra:&quot; or a 64-character transaction/block hash
      </p>
    </div>
  )
}
