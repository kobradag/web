"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

// Split partnerships into three groups
const partnershipGroups = [
  // First row - Exchanges
  [
    {
      name: "Binance",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Binance-XKWL70emU2Uwq8ZjYMHQcIaNgtYJW4.svg",
      url: "https://www.binance.com",
      invert: false,
      scale: 2.0, // Keeping Binance at the same size
    },
    {
      name: "Bybit",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bybit-YKf4uPTEAI5c3ALfzZwZufyvF9q0TS.svg",
      url: "https://www.bybit.com",
      invert: false,
      scale: 1.5,
    },
    {
      name: "Mexc",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mexc-TRQiJ2KP2P9N7o49EgIdeDqysbCXwt.svg",
      url: "https://www.mexc.com",
      invert: false,
      scale: 1.0,
    },
    {
      name: "XT.com",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/XT-upyplVeo0i64836Bo7YKpasnUtCmUP.png",
      url: "https://www.xt.com",
      invert: false,
      scale: 1.0,
    },
    {
      name: "LBank",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LBank-OOAxsZGvzaCWU3pSSG6nVWz30n6f9n.svg",
      url: "https://www.lbank.com",
      invert: false,
      scale: 1.5,
    },
    {
      name: "Bitfinex",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bitfinex-logo-AgZHfSnfB5f7yy7EzssPeWv1vScLxA.svg",
      url: "https://www.bitfinex.com",
      invert: false,
      scale: 1.0,
      className: "bg-transparent",
    },
    {
      name: "Gate.io",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/הורדה%20(3)-4w1Rpom6uzN4JpunZG7cP8tgF2NF7n.png",
      url: "https://gate.io",
      invert: false,
      scale: 1.0,
      className: "bg-transparent",
    },
  ],
  // Second row - Wallets and Payment Systems
  [
    {
      name: "Ledger",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ledger-r4lVVrtvul7Uppx0nVEj8e63y8MK34.svg",
      url: "https://www.ledger.com",
      invert: true,
      scale: 1.0,
    },
    {
      name: "Onekey",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Onekey-ZnrfyZY5SWtvUZ3szSSXUA11HVnxC2.svg",
      url: "https://onekey.so",
      invert: false,
      scale: 1.0,
    },
    {
      name: "Apple Pay",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/applepay-UBtRpw1ifs8Ii1nX8e0PUjf7BkrWJh.png",
      url: "https://www.apple.com/apple-pay/",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "Google Pay",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gpay-y74zTGww2sscGFaWjUEsJl6YZUv7sb.png",
      url: "https://pay.google.com",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "Visa",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa-gYEHt5jmZrn0gq9eYwaXEhhQDMjf6Z.png",
      url: "https://visa.com",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
  ],
  // Third row - Information and Technology Partners
  [
    {
      name: "CoinGecko",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coingecko-JqMtzoFrHrO0dCLh3DvysKzemNfZky.svg",
      url: "https://www.coingecko.com/en/coins/kobradag",
      invert: false,
      scale: 1.0,
    },
    {
      name: "Yahoo",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yahoo-thwxIRZGyO3gxJO8MVAb3DSDlAIqqm.png",
      url: "https://yahoo.com",
      invert: false,
      scale: 2.3, // Reduced from 3.0 to 2.3
      className: "bg-transparent",
    },
    {
      name: "CoinDesk",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coindesk-U61K39OTsvxjRB1MhEyIzCqiMAELOJ.png",
      url: "https://www.coindesk.com",
      invert: false,
      scale: 2.3, // Reduced from 3.0 to 2.3
      className: "bg-transparent",
    },
    {
      name: "GitHub",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/github-NVIphNqcJWwjDj87ohbDyySpYzD08Y.png",
      url: "https://github.com/kobradag",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "OpenAI",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openai-UuIeOp8fCo6rDos2QrlUIwU8jIG5Iz.png",
      url: "https://openai.com",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "coinbase",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/89-z2yAJop9M1TtPgmjtBlF9M0G8rrjMv.png",
      url: "https://exchange.coinbase.com",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "bitget",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/513-Qz3i6oCpeLRoVvB7N35mYOmlTrlqLA.png",
      url: "https://www.bitget.com",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
    {
      name: "kucoin",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4J58N99wagZ6tdGo5z4o7URB3fwcDAVZaMu0eXfi8-7yDRZwtASpSPAn8kQf29eMwUbCpQfp.svg",
      url: "https://www.kucoin.com",
      invert: false,
      scale: 1.25,
      className: "bg-transparent",
    },
    {
      name: "Hashrate.no",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoFull-gSrPlaEkzwxzhwsr4L0m2aODR4wABK.png",
      url: "https://www.hashrate.no/coins/KODA",
      invert: false,
      scale: 1.1,
      className: "bg-transparent",
    },
  ],
]

function CarouselRow({ partnerships, rowIndex }: { partnerships: (typeof partnershipGroups)[0]; rowIndex: number }) {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 6,
        spacing: 16,
      },
      breakpoints: {
        "(max-width: 1280px)": {
          slides: { perView: 5, spacing: 16 },
        },
        "(max-width: 1024px)": {
          slides: { perView: 4, spacing: 16 },
        },
        "(max-width: 768px)": {
          slides: { perView: 3, spacing: 12 },
        },
        "(max-width: 480px)": {
          slides: { perView: 2, spacing: 8 },
        },
      },
      loop: true,
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(
            () => {
              slider.next()
            },
            3000 + rowIndex * 500,
          ) // Stagger the animation timing for each row
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ],
  )

  return (
    <div className="relative mb-4">
      <div ref={sliderRef} className="keen-slider">
        {partnerships.map((partner, index) => (
          <div key={index} className="keen-slider__slide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="bg-black/50 border-vibrant-blue hover:border-deep-purple transition-colors duration-300 h-16 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden group">
                  <CardContent className="p-2 flex items-center justify-center w-full h-full">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        width={120}
                        height={40}
                        className={`object-contain max-w-full max-h-full transition-all duration-300 ${partner.invert ? "filter invert" : ""} ${partner.className || ""} group-hover:scale-110`}
                        style={{
                          width: "auto",
                          height: "auto",
                          mixBlendMode: "normal",
                          transform: `scale(${partner.scale || 1})`, // Using inline style for scaling
                        }}
                        loading="lazy"
                        onError={() => console.error(`Failed to load image for ${partner.name}`)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-300"
            aria-label="Next slide"
          >
            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </div>
  )
}

export function PartnershipCarousel() {
  return (
    <div className="space-y-8">
      {partnershipGroups.map((group, index) => (
        <CarouselRow key={index} partnerships={group} rowIndex={index} />
      ))}
    </div>
  )
}
