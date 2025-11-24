"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function TeamMembers() {
  return (
    <div id="team-members" className="w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-black/50 border-vibrant-blue hover:border-deep-purple transition-colors duration-300">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl text-center text-white font-cinzel mb-4">Our Team</h2>
            <p className="text-white/80 text-lg text-center font-raleway leading-relaxed">
              The KODA leadership team includes experts with extensive experience in blockchain technology, fintech,
              operations, information security, digital marketing, and DeFi innovation. Our experience spans leading
              startups, developing open-source code, writing advanced algorithms, exposing critical vulnerabilities,
              developing cross-network protocols, and creating financial revolutions in the DeFi world. Together, we are
              pushing the boundaries of innovation and security in crypto.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
