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
  title: "KODA Mining Services | GPU Mining with KODAHASH Algorithm",
  description:
    "Mine KODA cryptocurrency with our efficient KODAHASH algorithm. GPU-friendly mining with competitive rewards and eco-friendly approach. Start mining KODA today.",
  openGraph: {
    title: "KODA Mining Services | GPU Mining with KODAHASH Algorithm",
    description:
      "Mine KODA cryptocurrency with our efficient KODAHASH algorithm. GPU-friendly mining with competitive rewards.",
    url: `${SITE_URL}/services/mining`,
  },
}

const faqs = [
  {
    question: "What is KODA mining?",
    answer:
      "KODA mining is the process of validating transactions on the KODA network using the KODAHASH algorithm. Miners use GPU power to solve cryptographic puzzles and earn KODA tokens as rewards.",
  },
  {
    question: "What equipment do I need to mine KODA?",
    answer:
      "You need a computer with a compatible GPU (NVIDIA or AMD), stable internet connection, and the KODA mining software. We recommend GPUs with at least 4GB of VRAM for optimal performance.",
  },
  {
    question: "How much can I earn from KODA mining?",
    answer:
      "Mining rewards depend on your hardware's hashrate, network difficulty, and block rewards. Use our mining calculator to estimate your potential earnings based on your specific setup.",
  },
  {
    question: "Is KODA mining profitable?",
    answer:
      "Profitability depends on electricity costs, hardware efficiency, and KODA's market value. KODAHASH is designed to be energy-efficient, making it more accessible than traditional mining algorithms.",
  },
  {
    question: "How do I start mining KODA?",
    answer:
      "Download the KODA mining software, configure your wallet address, and start the mining process. Our mining guide provides step-by-step instructions for beginners.",
  },
]

export default function MiningServicePage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "Mining", url: `${SITE_URL}/services/mining` },
  ]

  const serviceSchema = generateServiceSchema(
    "KODA Cryptocurrency Mining",
    "Professional GPU mining services for KODA cryptocurrency using the efficient KODAHASH algorithm",
    `${SITE_URL}/services/mining`,
    "Cryptocurrency Mining",
  )

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-24 mt-16">
          <h1 className="text-5xl font-bold text-center mb-6 vibrant-gradient">KODA Mining Services</h1>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            Join the KODA mining community and earn rewards by securing the network with our GPU-friendly KODAHASH
            algorithm
          </p>

          {/* What We Offer */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">GPU-Friendly Algorithm</h3>
                    <p className="text-white/70">
                      KODAHASH is optimized for consumer GPUs, making mining accessible without expensive ASIC hardware
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Competitive Rewards</h3>
                    <p className="text-white/70">Earn KODA tokens with fair block rewards and regular payouts</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Energy Efficient</h3>
                    <p className="text-white/70">Lower power consumption compared to traditional mining algorithms</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                    <p className="text-white/70">Active community and technical support to help you optimize mining</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Who Is This For */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Who Should Mine KODA?</h2>
            <div className="space-y-4 text-white/80">
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Cryptocurrency enthusiasts looking to earn passive income</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>GPU owners wanting to put their hardware to profitable use</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary text-2xl">•</span>
                <span>Investors who want to accumulate KODA while supporting the network</span>
              </p>
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Mining Process</h2>
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 1: Setup Your Wallet</h3>
                <p className="text-white/70">Download and configure your KODA wallet to receive mining rewards</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 2: Download Mining Software</h3>
                <p className="text-white/70">Get the official KODA miner compatible with your GPU</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 3: Configure & Start</h3>
                <p className="text-white/70">Enter your wallet address, select your mining pool, and start mining</p>
              </Card>
              <Card className="bg-gray-900/50 border-primary/20 p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Step 4: Monitor & Optimize</h3>
                <p className="text-white/70">
                  Track your hashrate, earnings, and optimize settings for best performance
                </p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Mining KODA?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join our mining community and start earning KODA tokens today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/80">
                <Link href="/mining-guide">View Mining Guide</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white bg-transparent">
                <Link href="/get-koda">Download Wallet</Link>
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  )
}
