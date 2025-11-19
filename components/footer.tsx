"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Footer() {
  return (
    <motion.footer
      className="bg-black/50 border-t border-primary/20 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-white font-cinzel mb-2">2024-2025 © KODA - All Rights Reserved</p>
        <p className="text-white font-raleway mb-4 text-sm sm:text-base">
          KODA: Revolutionizing digital finance with advanced BLOCKDAG technology.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4">
          <Link href="/about-koda" className="text-white hover:text-white/80 transition-colors text-sm sm:text-base">
            About
          </Link>
          <Link
            href="https://drive.google.com/file/d/18PXy2fTbPbWFOg382Kkexal1A829OI2n/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 transition-colors text-sm sm:text-base"
          >
            Whitepaper
          </Link>
          <Link
            href="/koda-community"
            className="text-white hover:text-white/80 transition-colors text-sm sm:text-base"
          >
            Community
          </Link>
          <Link href="/faq" className="text-white hover:text-white/80 transition-colors text-sm sm:text-base">
            FAQ
          </Link>
        </div>
        <p className="text-white font-raleway text-xs sm:text-sm max-w-3xl mx-auto">
          KODA is a revolutionary cryptocurrency built on the BLOCKDAG network, offering fast transactions, enhanced
          security, and a robust platform for decentralized finance and enterprise blockchain solutions.
        </p>
      </div>
    </motion.footer>
  )
}
