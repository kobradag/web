"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutKoda() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <Card className="bg-black/50 border-primary">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-white">About KODA</CardTitle>
        </CardHeader>
        <CardContent className="text-white">
          <p className="text-lg mb-4">
            KODA is a groundbreaking cryptocurrency designed to redefine digital finance. Developed by a team of
            seasoned blockchain experts and financial professionals, KODA leverages cutting-edge technology and a
            robust, scalable architecture to empower individuals and businesses globally.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Our Company</h3>
              <p className="text-white/80 mb-4">
                KODA is backed by a well-established company headquartered in Dubai, UAE - a global hub for blockchain
                innovation and financial technology. Our strategic location allows us to bridge Eastern and Western
                markets, fostering global adoption of KODA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Our Expertise</h3>
              <p className="text-white/80 mb-4">
                With significant assets in the cryptocurrency space and a network of strategic partnerships, our team
                brings a wealth of experience in blockchain technology, financial markets, and regulatory compliance.
                This unique blend of expertise positions KODA at the forefront of the digital asset revolution.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2 text-white">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>Lightning-fast transactions powered by BLOCKDAG</li>
              <li>Enhanced security through advanced cryptography</li>
              <li>Scalable infrastructure for global adoption</li>
              <li>Energy-efficient KODAHASH mining algorithm</li>
              <li>Robust smart contract capabilities</li>
              <li>Strategic partnerships with leading financial institutions</li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2 text-white">Our Vision</h3>
            <p className="text-white/80">
              At KODA, we envision a future where digital assets seamlessly integrate with traditional finance,
              providing unparalleled access to financial services for individuals and businesses worldwide. Our mission
              is to drive this transformation by delivering a secure, efficient, and user-friendly cryptocurrency
              platform that meets the needs of both retail and institutional users.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2 text-white">Whitepaper</h3>
            <p className="text-white/80">
              Read our{" "}
              <a
                href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                whitepaper
              </a>{" "}
              to learn more.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
