import { HeroSection } from "@/components/hero-section"
import { CryptoStats } from "@/components/crypto-stats"
import { AboutKoda } from "@/components/about-koda"
import { TechnicalDetails } from "@/components/technical-details"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { Roadmap } from "@/components/roadmap"
import { PartnershipSection } from "@/components/partnership-section"
import { KodaFAQ } from "@/components/koda-faq"
import { SupportSection } from "@/components/support-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KODA Network - Home",
  description:
    "Discover KODA, a revolutionary cryptocurrency built on BLOCKDAG technology. Fast transactions, GPU mining, and enterprise-ready blockchain solutions.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <article itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="KODA Network - Revolutionary BLOCKDAG Cryptocurrency" />
        <meta
          itemProp="description"
          content="KODA is a revolutionary cryptocurrency built on BLOCKDAG technology, offering lightning-fast transactions, enhanced security, and real utility."
        />

        <section aria-label="Hero Section">
          <HeroSection />
        </section>

        <section aria-label="Cryptocurrency Statistics">
          <CryptoStats />
        </section>

        <section aria-label="About KODA">
          <AboutKoda />
        </section>

        <section aria-label="Technical Details">
          <TechnicalDetails />
        </section>

        <section aria-label="Tokenomics">
          <TokenomicsSection />
        </section>

        <section aria-label="Roadmap">
          <Roadmap />
        </section>

        <section aria-label="Partnerships">
          <PartnershipSection />
        </section>

        <section aria-label="Frequently Asked Questions">
          <KodaFAQ />
        </section>

        <section aria-label="Support">
          <SupportSection />
        </section>
      </article>
    </div>
  )
}
