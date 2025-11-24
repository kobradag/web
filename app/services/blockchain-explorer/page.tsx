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
  title: "KODA Blockchain Explorer | Track Transactions & Addresses",
  description:
    "Explore the KODA blockchain with our powerful explorer. Track transactions, view wallet balances, monitor network stats, and verify transactions in real-time.",
  openGraph: {
    title: "KODA Blockchain Explorer | Track Transactions & Addresses",
    description:
      "Explore the KODA blockchain. Track transactions, view wallet balances, and monitor network stats in real-time.",
    url: `${SITE_URL}/services/blockchain-explorer`,
  },
}

const faqs = [
  {
    question: "What is the KODA Blockchain Explorer?",
    answer:
      "The KODA Blockchain Explorer is a powerful tool that allows you to search and view all transactions, addresses, and blocks on the KODA network in real-time.",
  },
  {
    question: "How do I search for a transaction?",
    answer:
      "Simply enter the transaction ID (TXID) in the search bar on the explorer page. You'll see detailed information including sender, receiver, amount, timestamp, and confirmation status.",
  },
  {
    question: "Can I track wallet balances?",
    answer:
      "Yes, enter any KODA wallet address to view its current balance, transaction history, and all incoming/outgoing transactions.",
  },
  {
    question: "Is the explorer data real-time?",
    answer:
      "Yes, the explorer updates in real-time as new blocks are added to the KODA network, typically within seconds of a transaction being broadcast.",
  },
  {
    question: "What network statistics are available?",
    answer:
      "You can view total supply, circulating supply, active addresses, transaction volume, network hashrate, and more on the explorer dashboard.",
  },
]

export default function BlockchainExplorerServicePage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "Blockchain Explorer", url: `${SITE_URL}/services/blockchain-explorer` },
  ]

  const serviceSchema = generateServiceSchema(
    "KODA Blockchain Explorer",
    "Real-time blockchain explorer for tracking KODA transactions, addresses, blocks, and network statistics",
    `${SITE_URL}/services/blockchain-explorer`,
    "Blockchain Explorer Service",
  )

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-24 mt-16">
          <h1 className="text-5xl font-bold text-center mb-6 vibrant-gradient">KODA Blockchain Explorer</h1>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            Complete transparency and real-time insights into the KODA network
          </p>

          {/* What We Offer */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Explorer Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Transaction Tracking</h3>
                    <p className="text-white/70">
                      Search and verify any transaction with detailed information including confirmations and timestamps
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Address Monitoring</h3>
                    <p className="text-white/70">
                      View wallet balances and complete transaction history for any address
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Network Statistics</h3>
                    <p className="text-white/70">
                      Real-time metrics including hashrate, difficulty, active addresses, and supply data
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Rich List & Analytics</h3>
                    <p className="text-white/70">View top wallet holders and token distribution statistics</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Who Is This For */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Who Uses the Explorer?</h2>
            <div className="space-y-4 text-white/80">
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Investors tracking their transactions and wallet balances</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Developers building on KODA who need blockchain data</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Analysts researching network activity and token distribution</span>
              </p>
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">How to Use the Explorer</h2>
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 1: Visit the Explorer</h3>
                <p className="text-white/70">Navigate to the KODA Blockchain Explorer page</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 2: Search</h3>
                <p className="text-white/70">Enter a transaction ID, wallet address, or block hash in the search bar</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 3: View Details</h3>
                <p className="text-white/70">
                  Access comprehensive information about your query including all related data
                </p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 4: Explore Network Stats</h3>
                <p className="text-white/70">Browse real-time network statistics and analytics</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Start Exploring the KODA Blockchain</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Access complete transparency and real-time data on the KODA network
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/80">
                <Link href="/explorer">Launch Explorer</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white bg-transparent">
                <Link href="/top-wallets">View Top Wallets</Link>
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  )
}
