"use client"

import { useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download } from "lucide-react"

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
    <div ref={ref} className="relative min-h-screen md:min-h-[120vh] flex items-center justify-center overflow-hidden">
      <motion.div className="relative z-10 text-center pt-16 md:pt-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 floating mx-auto mt-12 md:-mt-12"
        >
          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1024_transparent_circle%20(1)-saXqL7GR53eBXpshYoZPbBFfMzN3rn.png"
              alt="KODA Cryptocurrency Logo - The Future of Digital Finance"
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
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-7xl font-bold mb-3 text-white"
        >
          KODA
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-2xl text-white mb-4 font-raleway"
        >
          Revolutionizing Digital Finance with BLOCKDAG Technology
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg text-white mb-4 font-raleway max-w-2xl mx-auto"
        >
          KODA is a groundbreaking cryptocurrency designed for the future of finance. It leverages the innovative
          BLOCKDAG network to deliver unparalleled transaction speeds and robust security.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-white hover:bg-white/80 text-black text-lg px-8 py-6 rounded-full hover-effect font-raleway"
            onClick={scrollToTechnicalDetails}
          >
            Learn More About KODA
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full hover-effect font-raleway"
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
            className="border-primary bg-transparent text-white hover:bg-primary/10 text-lg px-8 py-6 rounded-full hover-effect font-raleway"
            asChild
          >
            <a href="/whitepaper-v2" target="_blank" rel="noopener noreferrer">
              WhitepaperV2
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary bg-transparent text-white hover:bg-primary/10 text-lg px-8 py-6 rounded-full hover-effect font-raleway flex items-center gap-2"
            asChild
          >
            <a href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--primary)_0%,_transparent_60%)] opacity-10" />
      </div>
    </div>
  )
}
