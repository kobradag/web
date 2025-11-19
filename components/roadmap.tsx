"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

const roadmapData = [
  {
    year: 2024,
    milestones: [
      { task: "Media Social", completed: true },
      { task: "WebSite", completed: true },
      { task: "Testnet", completed: true },
      { task: "Whitepaper v1", completed: true },
      { task: "Explorer", completed: true },
      { task: "Node + Stratum Bridge", completed: true },
      { task: "test Mob Wallet", completed: true },
      { task: "Marketing", completed: true },
      { task: "Our Pool Low Fee", completed: true },
      { task: "Tier 3 CEX Listing", completed: true },
      { task: "WebWallet", completed: true },
      { task: "AI-powered Trading Bot (Beta)", completed: true }, // Added milestone
    ],
  },
  {
    year: 2025,
    milestones: [
      { task: "First Partnership", completed: true }, // Marked as completed
      { task: "DEFI Integrate", completed: false },
      { task: "NFT Integrate", completed: false },
      { task: "Listing CG", completed: true },
      { task: "Listing CMC", completed: false },
      { task: "Whitepaper v2", completed: true },
      { task: "Integration P.O.W.A.I", completed: false },
      { task: "Certik", completed: false },
      { task: "Smart contract", completed: false },
      { task: "Mobile wallet", completed: true }, // Marked as completed
      { task: "Funding CEX", completed: true }, // Marked as completed
      { task: "Tier 2 CEX Listing", completed: false },
      { task: "Funding marketing", completed: true }, // Marked as completed
      { task: "AI-driven Market Analysis Tool", completed: false },
      { task: "Launch of KODA AI Assistant", completed: false },
    ],
  },
  {
    year: 2026,
    milestones: [
      { task: "More Partnership", completed: false },
      { task: "Cooperation with businesses", completed: false },
      { task: "Web4", completed: false },
      { task: "Tier 1 CEX Listing", completed: false },
      { task: "AI-powered Decentralized Governance System", completed: false },
      { task: "Launch of KODA AI Research Lab", completed: false },
    ],
  },
]

export function Roadmap() {
  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-white">Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-12">
          {roadmapData.map((yearData, index) => (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg">
                  {yearData.year}
                </div>
                <div className="h-1 flex-grow bg-primary ml-4"></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {yearData.milestones.map((milestone, mIndex) => (
                  <motion.div
                    key={mIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + mIndex * 0.1 }}
                    className="bg-black/30 p-4 rounded-lg border border-primary/20 flex items-center"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                    ) : (
                      <Circle className="w-5 h-5 text-primary mr-2" />
                    )}
                    <p className="text-primary">{milestone.task}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
