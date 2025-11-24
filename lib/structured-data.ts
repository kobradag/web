export interface OrganizationSchema {
  "@context": string
  "@type": string
  name: string
  url: string
  logo: string
  sameAs: string[]
  description: string
  address?: {
    "@type": string
    addressCountry: string
  }
  contactPoint?: {
    "@type": string
    contactType: string
    url: string
  }
}

export interface WebSiteSchema {
  "@context": string
  "@type": string
  url: string
  name: string
  description: string
  potentialAction: {
    "@type": string
    target: string
    "query-input": string
  }
}

export interface ServiceSchema {
  "@context": string
  "@type": string
  name: string
  description: string
  url: string
  provider: {
    "@type": string
    name: string
    url: string
  }
  areaServed: string
  serviceType: string
}

export interface FAQPageSchema {
  "@context": string
  "@type": string
  mainEntity: Array<{
    "@type": string
    name: string
    acceptedAnswer: {
      "@type": string
      text: string
    }
  }>
}

export interface BreadcrumbSchema {
  "@context": string
  "@type": string
  itemListElement: Array<{
    "@type": string
    position: number
    name: string
    item: string
  }>
}

export const SITE_URL = "https://www.k0bradag.com"
export const BUSINESS_NAME = "KODA Cryptocurrency"
export const SHORT_DESCRIPTION =
  "KODA is a revolutionary cryptocurrency built on BLOCKDAG technology, offering fast transactions, enhanced security, and a robust platform for decentralized finance."

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: "/images/logo192.png",
    sameAs: [
      "https://twitter.com/k0bracurrency",
      "https://t.me/k0bracurrency",
      "https://github.com/k0bracurrency",
      "https://discord.gg/koda",
    ],
    description: SHORT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Worldwide",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: `${SITE_URL}/koda-community`,
    },
  }
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: BUSINESS_NAME,
    description: SHORT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/explorer?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceUrl: string,
  serviceType: string,
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: serviceName,
    description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    serviceType,
  }
}
