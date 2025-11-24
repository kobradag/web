"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/explorer", label: "Explorer" },
    { href: "/top-wallets", label: "Top Wallets" },
    { href: "/webwallet", label: "WebWallet" },
    { href: "/wallet-guide", label: "Wallet Guide" },
    { href: "/mining-guide", label: "Mining Guide" },
    { href: "/koda-technology", label: "KODA Technology" },
    { href: "/koda-tokenomics", label: "KODA Tokenomics" },
    { href: "/koda-community", label: "KODA Community" },
    { href: "/about-koda", label: "About KODA" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 w-full border-b border-[#FFD700] bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1024_transparent_circle%20%281%29-SAyfafzPw9zapSB27fAuL7J5RALdye.png"
                alt="KODA Logo - Cobra snake in a gold circular frame"
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl font-bold gold-text">KODA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2">
            <Button asChild className="hidden md:flex">
              <Link href="/get-koda">Get KODA</Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-primary/20 border-primary hover:bg-primary/30"
                >
                  <Menu className="h-5 w-5 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[350px] bg-black/95 border-primary">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-primary/20">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1024_transparent_circle%20%281%29-SAyfafzPw9zapSB27fAuL7J5RALdye.png"
                          alt="KODA Logo - Cobra snake in a gold circular frame"
                          className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-lg font-bold gold-text">KODA</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-white hover:text-primary transition-colors py-2 border-b border-primary/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button asChild className="mt-4">
                      <Link href="/get-koda" onClick={() => setIsOpen(false)}>
                        Get KODA
                      </Link>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
