"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { UsersIcon } from "lucide-react"

// Define the data structure
interface HoldersStats {
  totalHolders: number
  totalSupply: number
  top10Percentage: string
  top100Percentage: string
  top1000Percentage: string
}

// Static fallback data that will always be available
const FALLBACK_DATA: HoldersStats = {
  totalHolders: 15782,
  totalSupply: 21000000,
  top10Percentage: "12.5",
  top100Percentage: "28.7",
  top1000Percentage: "45.2",
}

export function HoldersStats() {
  // Always initialize with fallback data
  const [stats, setStats] = useState<HoldersStats>(FALLBACK_DATA)
  const [loading, setLoading] = useState(false) // Start with false to show data immediately
  const [isLiveData, setIsLiveData] = useState(false)

  useEffect(() => {
    // Define the fetch function inside useEffect
    const fetchData = async () => {
      try {
        setLoading(true)

        // Use a simple fetch with minimal options
        const response = await fetch("/api/holders-stats", {
          method: "GET",
          cache: "no-store",
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data)
          setIsLiveData(true)
        } else {
          // If response is not OK, silently fall back to static data
          console.log(`API responded with status: ${response.status}`)
        }
      } catch (error) {
        // On error, silently fall back to static data
        console.log("Using fallback data due to fetch error")
      } finally {
        setLoading(false)
      }
    }

    // Call the fetch function
    fetchData()

    // No need for interval if we're having issues with the basic fetch
    // We can add this back once the basic functionality works
  }, [])

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <UsersIcon className="w-6 h-6 text-white" />
          <span>KODA HOLDERS STATISTICS</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {!isLiveData && (
              <div className="text-amber-400 text-xs text-center mb-2 bg-amber-400/10 py-1 px-2 rounded">
                Showing estimated data
              </div>
            )}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-white">Total Holders</TableCell>
                  <TableCell className="text-white font-bold">{stats.totalHolders.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Top 10 Holders</TableCell>
                  <TableCell className="text-white font-bold">{stats.top10Percentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Top 100 Holders</TableCell>
                  <TableCell className="text-white font-bold">{stats.top100Percentage}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-white">Top 1000 Holders</TableCell>
                  <TableCell className="text-white font-bold">{stats.top1000Percentage}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
