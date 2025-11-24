import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlockchainProvider } from "@/contexts/BlockchainContext"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "KODA Network - Revolutionary BLOCKDAG Cryptocurrency",
  description:
    "KODA is a revolutionary cryptocurrency built on BLOCKDAG technology, offering lightning-fast transactions, enhanced security, and real utility in the digital economy.",
  keywords: [
    "KODA",
    "cryptocurrency",
    "BLOCKDAG",
    "blockchain",
    "crypto",
    "digital currency",
    "GPU mining",
    "KODAHASH",
    "decentralized finance",
    "DeFi",
  ],
  authors: [{ name: "KODA Network Team" }],
  creator: "KODA Network",
  publisher: "KODA Network",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.k0bradag.com",
    title: "KODA Network - Revolutionary BLOCKDAG Cryptocurrency",
    description:
      "KODA is a revolutionary cryptocurrency built on BLOCKDAG technology, offering lightning-fast transactions, enhanced security, and real utility.",
    siteName: "KODA Network",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "KODA Network Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KODA Network - Revolutionary BLOCKDAG Cryptocurrency",
    description:
      "KODA is a revolutionary cryptocurrency built on BLOCKDAG technology, offering lightning-fast transactions and enhanced security.",
    images: ["/logo.png"],
    creator: "@k0bracurrency",
  },
  alternates: {
    canonical: "https://www.k0bradag.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="bg-black text-white min-h-screen">
        <BlockchainProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </BlockchainProvider>
      </body>
    </html>
  )
}
