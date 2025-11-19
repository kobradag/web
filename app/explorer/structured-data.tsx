"\"use client"

import Script from "next/script"

export function ExplorerStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "KODA Blockchain Explorer",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Explore the KODA blockchain with real-time transaction data, block information, and wallet analytics. Search for transactions, blocks, and addresses on the BLOCKDAG network.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
    featureList: "Block explorer, Transaction search, Address lookup, Network statistics, UTXO tracking",
    screenshot: "https://www.k0bradag.com/api/og",
    softwareVersion: "1.0",
  }

  return (
    <Script
      id="explorer-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
