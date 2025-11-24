import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutKODA } from "@/components/about-koda"
import { KODABenefits } from "@/components/koda-benefits"
import { TechnicalDetails } from "@/components/technical-details"
import { Roadmap } from "@/components/roadmap"
import { PartnershipCarousel } from "@/components/partnership-carousel"
import { Footer } from "@/components/footer"
import { TeamMembers } from "@/components/team-members"
import { CommunityLinks } from "@/components/community-links"
import { SupportSection } from "@/components/support-section"
import { KODAFAQ } from "@/components/koda-faq"
import { TokenomicsSection } from "@/components/tokenomics-section"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { generateBreadcrumbSchema, SITE_URL } from "@/lib/structured-data"

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: SITE_URL }])

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <HeroSection />

        <div className="container mx-auto px-4 py-24 space-y-24">
          <AboutKODA />

          <KODABenefits />

          <section id="technical-details">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">KODA Technical Information</h2>
            <TechnicalDetails />
          </section>

          <TokenomicsSection />

          <section>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">KODA Development Roadmap</h2>
            <Roadmap />
          </section>

          <section>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Strategic Partnerships</h2>
            <PartnershipCarousel />
          </section>

          <section>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">KODA Leadership Team</h2>
            <TeamMembers />
          </section>

          <KODAFAQ />

          <CommunityLinks />
          <SupportSection />

          <section className="text-center">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">KODA Network Transparency</h2>
            <p className="text-lg text-white mb-8 max-w-3xl mx-auto">
              Explore the distribution of KODA tokens across the network and view the top wallet addresses.
            </p>
            <Link
              href="/top-wallets"
              className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/80 transition-colors"
            >
              View Top KODA Wallets
            </Link>
          </section>
        </div>
        <Footer />
      </main>
    </>
  )
}
