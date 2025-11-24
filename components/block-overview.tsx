"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Pause, Dice1Icon as Dice } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { io } from "socket.io-client"

interface Block {
  block_hash: string
  txs: string[]
  blueScore: number
  timestamp: string | number
}

interface BlockOverviewProps {
  small?: boolean
  lines?: number
}

export function BlockOverview({ small = false, lines = 40 }: BlockOverviewProps) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [tempBlocks, setTempBlocks] = useState<Block[]>([])
  const [keepUpdating, setKeepUpdating] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const keepUpdatingRef = useRef(keepUpdating)
  keepUpdatingRef.current = keepUpdating

  // Convert Unix timestamp to human-readable date
  const formatTimestamp = (timestamp: string | number | undefined): string => {
    if (!timestamp) return "Unknown date"

    try {
      let unixTimestamp: number

      // Convert timestamp to number if it's a string
      if (typeof timestamp === "string") {
        unixTimestamp = Number.parseInt(timestamp, 10)
        if (isNaN(unixTimestamp)) {
          return "Invalid date"
        }
      } else {
        unixTimestamp = timestamp
      }

      // Use the timestamp directly as milliseconds
      const date = new Date(unixTimestamp)

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date"
      }

      // Format as "YYYY-MM-DD HH:MM:SS"
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      const seconds = String(date.getSeconds()).padStart(2, "0")

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    } catch (e) {
      console.error("Error formatting timestamp:", e)
      return "Error formatting date"
    }
  }

  useEffect(() => {
    const socket = io(`wss://de6.k0bradag.com`, {
      path: "/ws/socket.io",
    })

    socket.on("connect", () => {
      console.log("Socket.IO connection established")
      setIsConnected(true)
    })

    socket.on("blocks", (newBlocks: any[]) => {
      console.log("Received blocks data:", newBlocks)
      setBlocks(newBlocks)
    })

    socket.on("disconnect", () => {
      console.log("Socket connection closed")
      setIsConnected(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (keepUpdatingRef.current) {
      setTempBlocks(blocks)
    }
  }, [blocks])

  // Remove duplicate blocks based on block_hash
  const uniqueBlocks = tempBlocks.filter(
    (block, index, self) => index === self.findIndex((b) => b.block_hash === block.block_hash),
  )

  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dice className={`h-6 w-6 ${isConnected && keepUpdating ? "animate-spin" : ""}`} />
            <span>LATEST BLOCKS</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setKeepUpdating(!keepUpdating)}>
            {keepUpdating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>TXs</TableHead>
              <TableHead>Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueBlocks.length === 0
              ? Array.from({ length: lines }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                  </TableRow>
                ))
              : uniqueBlocks
                  .sort((a, b) => b.blueScore - a.blueScore)
                  .slice(0, lines)
                  .map((block) => (
                    <TableRow key={block.block_hash}>
                      <TableCell>{formatTimestamp(block.timestamp)}</TableCell>
                      <TableCell>{block.txs.length}</TableCell>
                      <TableCell>
                        <Link href={`/blocks/${block.block_hash}`} className="text-primary hover:underline">
                          {block.block_hash}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
