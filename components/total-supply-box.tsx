"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CoinsIcon } from "lucide-react"
import { formatNumber } from "@/lib/utils"

export function TotalSupplyBox() {
  const totalSupply = 191859639 // This could be fetched from an API in the future

  return (
    <Card className="bg-black/90 border border-white/20 overflow-hidden relative group hover:bg-black transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <CoinsIcon className="w-6 h-6 text-white" />
          <span>Total KODA Supply</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-white"
        >
          {formatNumber(totalSupply)} KODA
        </motion.div>
      </CardContent>
    </Card>
  )
}
