import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"
import { generateBreadcrumbSchema, SITE_URL } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "About KODA | Revolutionary Cryptocurrency on BLOCKDAG",
  description:
    "Learn about KODA, the innovative cryptocurrency built on BLOCKDAG technology. Discover how KODA is revolutionizing the world of digital assets and decentralized finance.",
}

export default function AboutKODA() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About KODA", url: `${SITE_URL}/about-koda` },
  ])

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-24 mt-16">
          <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">About KODA</h1>
          <div className="space-y-8 text-white">
            <section>
              <h2 className="text-2xl font-bold mb-4">What is KODA?</h2>
              <p>
                KODA is a revolutionary cryptocurrency built on the cutting-edge BLOCKDAG network. It combines the viral
                appeal of meme coins with real-world utility, offering users a unique blend of fun and functionality in
                the world of digital assets.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">The KODA Vision</h2>
              <p>
                Our vision is to create a decentralized financial ecosystem that's accessible, efficient, and secure for
                everyone. KODA aims to bridge the gap between traditional finance and the exciting world of
                cryptocurrencies, making it easier for people to participate in the digital economy.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">Key Features of KODA</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Lightning-fast transactions powered by BLOCKDAG technology</li>
                <li>Enhanced security through advanced cryptographic techniques</li>
                <li>Real utility in DeFi, NFTs, and smart contracts</li>
                <li>Community-driven development and governance</li>
                <li>Eco-friendly mining with the KODAHASH algorithm</li>
                <li>Innovative tokenomics designed for long-term value</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">The KODA Community</h2>
              <p>
                At the heart of KODA is our vibrant and passionate community. We believe in the power of collective
                intelligence and encourage active participation from all our members. Join us in shaping the future of
                decentralized finance!
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
