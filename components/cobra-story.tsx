"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CobraStory() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-black/50 border-vibrant-blue hover:border-deep-purple transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-center vibrant-gradient font-cinzel">
            The Legend of KODA: More Than Just a Meme Coin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 font-raleway mb-4">
            In the heart of the digital realm, where blockchain technology and meme culture intersect, emerged KODA - a
            cryptocurrency unlike any other. Born from the wisdom of the ancient cobra and the innovation of the
            BLOCKDAG network, KODA represents the perfect fusion of humor and utility in the world of decentralized
            finance.
          </p>
          <p className="text-white/80 font-raleway mb-4">
            Legend has it that KODA was inspired by a wise cobra named Koda, whose golden scales shimmered like the most
            precious of cryptocurrencies. Koda shared ancient wisdom about balance, power, and responsibility -
            principles that became the foundation of KODA's blockchain philosophy.
          </p>
          <p className="text-white/80 font-raleway mb-4">
            As the first meme coin on the BLOCKDAG network, KODA combines the viral nature of meme coins with the
            technical prowess of advanced blockchain technology. It offers lightning-fast transactions, enhanced
            security, and a level of scalability that sets it apart in the crowded cryptocurrency market.
          </p>
          <p className="text-white/80 font-raleway">
            But KODA is more than just a digital asset; it's a movement. It represents a community of visionaries who
            believe in the power of decentralized finance to transform the global economy. With KODA, you're not just
            investing in a coin; you're becoming part of a revolution that's redefining the future of money.
          </p>
          <p className="text-white/80 font-raleway mt-4">
            Join the KODA ecosystem today and experience the perfect balance of fun and functionality in the world of
            cryptocurrency. Remember, in the realm of KODA, every transaction is a step towards a more decentralized,
            equitable financial future.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
