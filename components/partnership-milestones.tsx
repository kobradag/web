"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface MilestoneItem {
  name: string
  completed: boolean
}

const partnershipMilestones = [
  {
    title: "First Partnership",
    items: [
      { name: "Mobile wallet", completed: true },
      { name: "Funding CEX", completed: true },
      { name: "Funding marketing", completed: true },
      { name: "Listing on major exchanges", completed: false },
      { name: "Strategic partnerships", completed: false },
    ],
  },
  {
    title: "Second Partnership",
    items: [
      { name: "Integration with payment providers", completed: false },
      { name: "Cross-chain compatibility", completed: false },
      { name: "Enterprise solutions", completed: false },
    ],
  },
]

export function PartnershipMilestones() {
  return (
    <div className="space-y-8">
      {partnershipMilestones.map((milestone, index) => (
        <Card key={index} className="bg-black/50 border-vibrant-blue overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-white">{milestone.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {milestone.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? "bg-green-500" : "bg-gray-700"}`}
                  >
                    {item.completed && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`${item.completed ? "text-white" : "text-gray-400"}`}>{item.name}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
