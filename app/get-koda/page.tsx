import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Get KODA | How to Acquire KODA Cryptocurrency",
  description:
    "Learn how to acquire KODA cryptocurrency. Find out about exchanges, mining, and other methods to get KODA tokens.",
}

export default function GetKODA() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">How to Get KODA</h1>
        <div className="space-y-8 text-white">
          <section>
            <h2 className="text-2xl font-bold mb-4">Cryptocurrency Exchanges</h2>
            <p>KODA is available on several major cryptocurrency exchanges. Here are some options:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <a
                  href="https://xeggex.com/market/KODA_USDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Xeggex - KODA/USDT
                </a>
              </li>
              <li>Exchange 2 (Coming Soon)</li>
              <li>Exchange 3 (Coming Soon)</li>
            </ul>
            <p className="mt-4">
              Please note that the availability of KODA on these exchanges may vary. Always check the latest information
              on our official channels.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Mining KODA</h2>
            <p>As a GPU-mineable cryptocurrency, you can obtain KODA through mining. Here's how to get started:</p>
            <ol className="list-decimal list-inside mt-4 space-y-2">
              <li>Set up a KODA wallet</li>
              <li>Choose a mining pool</li>
              <li>Download and configure mining software</li>
              <li>Start mining and earn KODA</li>
            </ol>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button asChild variant="default" className="bg-black hover:bg-black/80 text-white border border-primary">
                <Link href="/wallet-guide">Wallet Setup Guide</Link>
              </Button>
              <Button asChild variant="outline" className="bg-black border-primary text-white hover:bg-black/80">
                <Link href="https://github.com/kobradag/koda-miner-gpu">Download Mining Software</Link>
              </Button>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">KODA Faucets</h2>
            <p>
              While not a significant source of KODA, faucets can be a way to get small amounts of KODA for free. Keep
              an eye on our community channels for information about KODA faucets.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Participate in KODA Community</h2>
            <p>Active community members can earn KODA through various initiatives:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Contribute to KODA development on GitHub</li>
              <li>Participate in bounty programs</li>
              <li>Create content about KODA</li>
              <li>Help onboard new users</li>
            </ul>
            <Button asChild className="mt-4 bg-black hover:bg-black/80 text-white border border-primary">
              <Link href="/koda-community">Join KODA Community</Link>
            </Button>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
