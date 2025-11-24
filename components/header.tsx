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
    { href: "/koda-technology", label: "Technology" },
    { href: "/koda-tokenomics", label: "Tokenomics" },
    { href: "/koda-community", label: "Community" },
    { href: "/about-koda", label: "About" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 w-full glass-effect border-b border-border/50 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src="/images/1024-transparent-circle-20-281-29.png"
                alt="KODA Logo"
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              KODA
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full glow-effect"
            >
              <Link href="/get-koda">Get KODA</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden glass-effect border-border hover:bg-muted/50 rounded-full bg-transparent"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[350px] glass-effect border-l border-border">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <img
                          src="/images/1024-transparent-circle-20-281-29.png"
                          alt="KODA Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        KODA
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-4 py-3 text-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button asChild className="mt-6 bg-primary hover:bg-primary/90 rounded-full font-semibold">
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
