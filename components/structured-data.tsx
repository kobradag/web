"use client"

import Script from "next/script"

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KODA Network",
    alternateName: "KODA Cryptocurrency",
    url: "https://www.k0bradag.com",
    logo: "https://www.k0bradag.com/logo.png",
    description:
      "KODA is a revolutionary cryptocurrency built on the BLOCKDAG network, offering lightning-fast transactions, enhanced security, and a robust ecosystem for decentralized finance.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["English", "Hebrew"],
      url: "https://www.k0bradag.com/koda-community",
    },
    sameAs: [
      "https://twitter.com/k0bracurrency",
      "https://discord.gg/koda",
      "https://t.me/kodacommunity",
      "https://github.com/koda-network",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Global",
    },
  }

  const cryptoCurrencySchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "KODA Cryptocurrency",
    description:
      "KODA is a next-generation cryptocurrency powered by BLOCKDAG technology, offering fast transactions, GPU mining, and enterprise-ready blockchain solutions.",
    brand: {
      "@type": "Brand",
      name: "KODA Network",
    },
    category: "Cryptocurrency",
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: "https://www.k0bradag.com/get-koda",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "320",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KODA Network",
    url: "https://www.k0bradag.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.k0bradag.com/explorer?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const blockchainServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Blockchain Explorer",
    provider: {
      "@type": "Organization",
      name: "KODA Network",
    },
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "KODA Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Blockchain Explorer",
            description: "Real-time KODA blockchain explorer with transaction tracking and wallet analytics",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Wallet",
            description: "Secure web-based wallet for managing KODA cryptocurrency",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mining Services",
            description: "GPU mining solutions for KODA cryptocurrency with real-time profitability calculator",
          },
        },
      ],
    },
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="cryptocurrency-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cryptoCurrencySchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blockchainServiceSchema) }}
      />
    </>
  )
}
