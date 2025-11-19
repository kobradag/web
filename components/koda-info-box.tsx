"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MemoryStickIcon as Memory } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface KodaInfo {
  mempoolSize: number
  serverVersion: string
}

export function KodaInfoBox() {
  const [data, setData] = useState<KodaInfo>({
    mempoolSize: 0,
    serverVersion: "",
  })

  useEffect(() => {
    const updateData = async () => {
      try {
        const response = await fetch("https://api.k0bradag.com/info/kobrad")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const newData = await response.json()
        setData(newData)
      } catch (err) {
        console.error("Error fetching KODA info:", err)
      }
    }

    updateData()
    const intervalId = setInterval(updateData, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Memory className="w-6 h-6 text-white" />
          <span>KODA INFO</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-white">Mempool size</TableCell>
                <TableCell className="text-white">{data.mempoolSize}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-white">Server version</TableCell>
                <TableCell className="text-white">{data.serverVersion}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  )
}
