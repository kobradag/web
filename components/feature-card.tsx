"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  title: string
  description: string
  iconName: string
  source?: string
  delay?: number
}

export function FeatureCard({ title, description, iconName, source, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="bg-black/80 border border-primary/20 overflow-hidden relative group hover:bg-black/90 transition-colors duration-300">
        <CardHeader>
          <motion.div
            className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-white text-2xl">{iconName}</span>
          </motion.div>
          <CardTitle className="text-xl text-white font-cinzel">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-white font-raleway">{description}</p>
          {source && (
            <div className="pt-2">
              <p className="text-white font-raleway">{source}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
