"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { io } from "socket.io-client"

interface Block {
  block_hash: string
  txs: string[]
  blueScore: number
  timestamp: string
  hash?: string
  verboseData?: {
    hash?: string
  }
}

// Update the BlockchainContextType interface to include setIsConnected and setBlocks
interface BlockchainContextType {
  blocks: Block[]
  blueScore: number
  isConnected: boolean
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}

// Update the default context value to include empty functions for setIsConnected and setBlocks
const BlockchainContext = createContext<BlockchainContextType>({
  blocks: [],
  blueScore: 0,
  isConnected: false,
  setBlocks: () => {},
  setIsConnected: () => {},
})

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [blueScore, setBlueScore] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const MAX_BLOCKS = 20

  useEffect(() => {
    const socket = io("wss://de6.k0bradag.com", {
      path: "/ws/socket.io",
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on("connect", () => {
      console.log("Socket.IO connection established for blockchain context")
      setIsConnected(true)

      // Join rooms and request initial data
      socket.emit("join-room", "blocks")
      socket.emit("join-room", "bluescore")
      socket.emit("join-room", "transactions")
      socket.emit("get-blocks", { limit: MAX_BLOCKS })
      socket.emit("get-transactions", { limit: 10 })
    })

    socket.on("connect_error", (error) => {
      console.error("Connection error for blockchain context:", error)
      setIsConnected(false)
    })

    socket.on("disconnect", () => {
      console.log("Socket connection closed for blockchain context")
      setIsConnected(false)
    })

    // Get initial blocks
    socket.on("blocks", (newBlocks) => {
      console.log("Received initial blocks in context:", newBlocks)
      if (Array.isArray(newBlocks) && newBlocks.length > 0) {
        // Only keep the most recent MAX_BLOCKS
        setBlocks(newBlocks.slice(0, MAX_BLOCKS))
      }
    })

    // Listen for new blocks
    socket.on("new-block", (block) => {
      console.log("New block received in context:", block)
      setBlocks((prevBlocks) => {
        // Ensure we have a unique ID for each block
        const blockHash = block.block_hash || block.hash || block.verboseData?.hash

        // Check if this block is already in our list
        if (
          prevBlocks.some((existingBlock) => existingBlock.block_hash === blockHash || existingBlock.hash === blockHash)
        ) {
          return prevBlocks
        }

        // Add the new block and keep only the most recent MAX_BLOCKS
        const newBlocks = [block, ...prevBlocks].slice(0, MAX_BLOCKS)
        return newBlocks
      })
    })

    // Listen for blue score updates
    socket.on("bluescore", (data) => {
      if (data && typeof data.blueScore === "number") {
        setBlueScore(data.blueScore)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  // Update the provider to include setBlocks and setIsConnected in the context value
  return (
    <BlockchainContext.Provider
      value={{
        blocks,
        blueScore,
        isConnected,
        setBlocks,
        setIsConnected,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  )
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (!context) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}
