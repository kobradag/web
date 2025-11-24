"use client"

import { useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download, ArrowRight } from "lucide-react"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToTechnicalDetails = useCallback(() => {
    const technicalDetailsSection = document.getElementById("technical-details")
    if (technicalDetailsSection) {
      technicalDetailsSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_hsl(var(--primary)/0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--background))_100%)]" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 pt-32 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 mx-auto"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <Image
              src="/images/1024-transparent-circle-20-1.jpg)-saXqL7GR53eBXpshYoZPbBFfMzN3rn.png"
              alt="KODA Cryptocurrency Logo"
              width={160}
              height={160}
              className="object-contain relative z-10"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
        >
          KODA
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6 font-light tracking-wide"
        >
          Revolutionizing Digital Finance with BLOCKDAG
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base sm:text-lg text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the future of cryptocurrency with unparalleled transaction speeds, enterprise-grade security, and
          innovative BLOCKDAG technology powering the next generation of digital finance.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-full font-semibold glow-effect hover-lift group"
            onClick={scrollToTechnicalDetails}
          >
            Discover KODA
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-effect border-border hover:bg-muted/50 text-base px-8 py-6 rounded-full font-semibold hover-lift bg-transparent"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/18PXy2fTbPbWFOg382Kkexal1A829OI2n/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Whitepaper
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-effect border-border hover:bg-muted/50 text-base px-8 py-6 rounded-full font-semibold hover-lift bg-transparent"
            asChild
          >
            <a href="/whitepaper-v2" target="_blank" rel="noopener noreferrer">
              Whitepaper V2
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-effect border-border hover:bg-muted/50 text-base px-6 py-6 rounded-full font-semibold hover-lift flex items-center gap-2 bg-transparent"
            asChild
          >
            <a href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
