import type { Metadata } from "next"
import "./globals.css"
import "@/styles/payments-tooltip.css"
import type React from "react"
import { Cinzel } from "next/font/google"
import { Toaster } from "sonner"
import { StructuredData } from "@/components/structured-data"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structured-data"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.k0bradag.com"),
  title: "KODA | Revolutionary Cryptocurrency on BLOCKDAG Network",
  description:
    "KODA is a cutting-edge cryptocurrency built on the BLOCKDAG network. Experience lightning-fast transactions, enhanced security, and a robust ecosystem for decentralized finance and enterprise solutions.",
  keywords:
    "KODA, KODA cryptocurrency, BLOCKDAG, enterprise blockchain, DeFi, KODAHASH, GPU mining, fast transactions, scalable cryptocurrency, secure digital assets, crypto mining, blockchain technology, digital currency, cryptocurrency wallet, crypto investment",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.k0bradag.com",
    siteName: "KODA Cryptocurrency",
    title: "KODA - The Future of Digital Finance on BLOCKDAG",
    description:
      "Experience the KODA revolution - a cutting-edge cryptocurrency built on the BLOCKDAG network. Fast, secure, and scalable for enterprise adoption. Join KODA now!",
    images: [
      {
        url: "https://www.k0bradag.com/api/og",
        width: 1200,
        height: 630,
        alt: "KODA Cryptocurrency - Revolutionary BLOCKDAG Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KODA - Revolutionary Cryptocurrency on BLOCKDAG",
    description:
      "Join the KODA movement! Experience lightning-fast transactions, real utility, and a thriving ecosystem on the BLOCKDAG network.",
    images: ["https://www.k0bradag.com/api/og"],
    creator: "@k0bracurrency",
    site: "@k0bracurrency",
  },
  icons: {
    icon: [
      {
        url: "/images/logo32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "https://www.k0bradag.com",
    languages: {
      "en-US": "https://www.k0bradag.com",
    },
  },
  verification: {
    google: "verification_token",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="en" className={`dark ${cinzel.className}`}>
      <head>
        <link rel="canonical" href="https://k0bradag.com" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/images/logo32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/images/logo192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo192.png" sizes="192x192" />
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="bg-black text-white min-h-screen font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
