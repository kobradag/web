"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, TrendingDown, Clock, BarChart3 } from "lucide-react"
import { HalvingSchedule } from "./halving-schedule"

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-white"
      >
        KODA TOKENOMICS
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-black/50 border-primary h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Coins className="h-6 w-6" />
                SUPPLY METRICS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <span className="text-white">Max Supply:</span>
                  <span className="text-white font-bold">445,000,000 KODA</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <span className="text-white">Initial Block Reward:</span>
                  <span className="text-white font-bold">10 KODA</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <span className="text-white">Block Time:</span>
                  <span className="text-white font-bold">1 second</span>
                </div>
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <span className="text-white">Launch Date:</span>
                  <span className="text-white font-bold">May 25, 2024</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-white">Distribution:</span>
                  <span className="text-white font-bold">Fair Launch (No Pre-sale)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-black/50 border-primary h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                ECONOMIC MODEL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-b border-primary/20 pb-4">
                  <TrendingDown className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Deflationary Mechanism</h3>
                    <p className="text-white/80">
                      Transaction fee burning gradually reduces total supply, increasing scarcity over time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-primary/20 pb-4">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Halving Schedule</h3>
                    <p className="text-white/80">
                      Block rewards are reduced by 50% approximately every year, controlling inflation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coins className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Mining Incentives</h3>
                    <p className="text-white/80">
                      GPU-friendly KODAHASH algorithm promotes decentralized mining and fair distribution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HalvingSchedule />
      </motion.div>
    </section>
  )
}
