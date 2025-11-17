"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    title: "Enterprise-Grade Security",
    description:
      "KODA leverages advanced cryptographic techniques and the BLOCKDAG structure to provide unparalleled security for your digital assets.",
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Our innovative BLOCKDAG technology allows KODA to process thousands of transactions per second, making it suitable for global adoption.",
  },
  {
    title: "Smart Contract Platform",
    description:
      "KODA offers a robust smart contract platform, enabling the development of sophisticated decentralized applications and financial instruments.",
  },
  {
    title: "Energy-Efficient Mining",
    description:
      "The KODAHASH algorithm is designed for GPU mining, promoting decentralization while minimizing environmental impact.",
  },
  {
    title: "Cross-Chain Compatibility",
    description:
      "KODA is built with interoperability in mind, allowing seamless integration with other blockchain networks and traditional financial systems.",
  },
  {
    title: "Regulatory Compliance",
    description:
      "We work closely with regulatory bodies to ensure KODA meets all necessary compliance standards, making it suitable for institutional adoption.",
  },
]

export function KODABenefits() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">The KODA Advantage</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-black/50 border-primary h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
