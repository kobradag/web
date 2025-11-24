import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StructuredData } from "@/components/structured-data"
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema, SITE_URL } from "@/lib/structured-data"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "KODA DeFi Platform | Decentralized Finance Solutions",
  description:
    "Access decentralized finance with KODA. Trade, lend, stake, and earn rewards on our secure BLOCKDAG-powered DeFi platform.",
  openGraph: {
    title: "KODA DeFi Platform | Decentralized Finance Solutions",
    description: "Access decentralized finance with KODA. Trade, lend, stake, and earn rewards on our secure platform.",
    url: `${SITE_URL}/services/defi`,
  },
}

const faqs = [
  {
    question: "What is KODA DeFi?",
    answer:
      "KODA DeFi is our decentralized finance platform built on BLOCKDAG technology. It enables peer-to-peer financial services including trading, lending, staking, and yield farming without intermediaries.",
  },
  {
    question: "How do I start using KODA DeFi?",
    answer:
      "Connect your KODA wallet to our DeFi platform, ensure you have KODA tokens for gas fees, and start exploring services like trading, staking, or providing liquidity.",
  },
  {
    question: "What are the fees on KODA DeFi?",
    answer:
      "KODA DeFi features competitive fees powered by BLOCKDAG technology. Transaction fees are minimal compared to traditional blockchain networks, typically less than $0.01 per transaction.",
  },
  {
    question: "Is KODA DeFi secure?",
    answer:
      "Yes, KODA DeFi uses audited smart contracts and BLOCKDAG's enhanced security features. All transactions are transparent and verifiable on the blockchain.",
  },
  {
    question: "Can I earn passive income with KODA DeFi?",
    answer:
      "Yes, you can stake KODA tokens, provide liquidity to earn trading fees, or participate in yield farming to earn additional rewards.",
  },
]

export default function DeFiServicePage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "DeFi", url: `${SITE_URL}/services/defi` },
  ]

  const serviceSchema = generateServiceSchema(
    "KODA DeFi Platform",
    "Decentralized finance platform offering trading, lending, staking, and yield farming on BLOCKDAG technology",
    `${SITE_URL}/services/defi`,
    "Decentralized Finance Platform",
  )

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-24 mt-16">
          <h1 className="text-5xl font-bold text-center mb-6 vibrant-gradient">KODA DeFi Platform</h1>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            Access the full power of decentralized finance with KODA's fast, secure, and low-cost DeFi platform
          </p>

          {/* What We Offer */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">DeFi Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Decentralized Trading</h3>
                    <p className="text-white/70">Trade KODA and other tokens directly from your wallet with no KYC</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Staking Rewards</h3>
                    <p className="text-white/70">Stake your KODA tokens and earn competitive APY rewards</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Liquidity Pools</h3>
                    <p className="text-white/70">Provide liquidity and earn a share of trading fees</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Lightning-Fast Transactions</h3>
                    <p className="text-white/70">Execute trades in seconds with BLOCKDAG technology</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Who Is This For */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Who Can Benefit from KODA DeFi?</h2>
            <div className="space-y-4 text-white/80">
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Crypto traders looking for fast, low-cost transactions</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Investors seeking passive income through staking and liquidity provision</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Anyone wanting financial services without traditional banking intermediaries</span>
              </p>
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">How to Get Started</h2>
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 1: Setup Your Wallet</h3>
                <p className="text-white/70">Download and configure your KODA wallet</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 2: Acquire KODA</h3>
                <p className="text-white/70">Purchase KODA tokens from supported exchanges or mine them</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 3: Connect to DeFi</h3>
                <p className="text-white/70">Link your wallet to the KODA DeFi platform</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 4: Start Trading or Staking</h3>
                <p className="text-white/70">Choose your preferred DeFi service and start earning or trading</p>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-gray-900/50 border-primary/20 p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience DeFi with KODA?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users enjoying fast, secure, and affordable decentralized finance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/80">
                <Link href="/get-koda">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white bg-transparent">
                <Link href="/about-koda">Learn More</Link>
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  )
}
