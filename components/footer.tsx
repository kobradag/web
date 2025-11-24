"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/90 border-t border-[#FFD700] mt-24"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1024_transparent_circle%20%281%29-SAyfafzPw9zapSB27fAuL7J5RALdye.png"
                alt="KODA Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold gold-text">KODA</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              KODA is a revolutionary cryptocurrency built on the BLOCKDAG network, offering lightning-fast
              transactions, enhanced security, and real utility for the future of digital finance.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/k0bracurrency"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                href="https://discord.gg/koda"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </Link>
              <Link
                href="https://t.me/kodacommunity"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explorer" className="text-gray-400 hover:text-primary transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link href="/top-wallets" className="text-gray-400 hover:text-primary transition-colors">
                  Top Wallets
                </Link>
              </li>
              <li>
                <Link href="/webwallet" className="text-gray-400 hover:text-primary transition-colors">
                  WebWallet
                </Link>
              </li>
              <li>
                <Link href="/mining-guide" className="text-gray-400 hover:text-primary transition-colors">
                  Mining Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/koda-technology" className="text-gray-400 hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/koda-tokenomics" className="text-gray-400 hover:text-primary transition-colors">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/about-koda" className="text-gray-400 hover:text-primary transition-colors">
                  About KODA
                </Link>
              </li>
              <li>
                <Link href="/whitepaper-v2" className="text-gray-400 hover:text-primary transition-colors">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 KODA Network. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
