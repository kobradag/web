import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "KODA Tokenomics | Understanding KODA's Economic Model",
  description:
    "Explore the tokenomics of KODA cryptocurrency. Learn about KODA's supply, distribution, and economic incentives that drive its sustainable growth and value.",
}

export default function KODATokenomics() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">KODA Tokenomics</h1>
        <div className="space-y-8 text-white">
          <section>
            <h2 className="text-2xl font-bold mb-4">Token Supply and Distribution</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Max Supply: 445 Million KODA</li>
              <li>Block Reward: 10 KODA (factor 1^2 1^12)</li>
              <li>Block Time: 1 second</li>
              <li>Launch Date: May 25, 2024</li>
              <li>Distribution: Fair launch with no pre-sales, ensuring equitable distribution from the start</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Deflationary Mechanism</h2>
            <p>
              KODA implements a deflationary model through transaction fee burning. A portion of each transaction fee is
              permanently removed from circulation, gradually reducing the total supply over time and potentially
              increasing scarcity and value.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Staking and Governance</h2>
            <p>
              KODA holders can stake their tokens to earn rewards and participate in network governance. This
              incentivizes long-term holding and active participation in the KODA ecosystem.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Economic Incentives</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Mining Rewards: Incentivize network security and decentralization</li>
              <li>Staking Rewards: Encourage long-term holding and network participation</li>
              <li>DeFi Yield Farming: Provide liquidity incentives for KODA-based DeFi protocols</li>
              <li>NFT Marketplace Fees: Generate revenue from KODA's NFT ecosystem</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Long-term Sustainability</h2>
            <p>
              KODA's tokenomics are designed with long-term sustainability in mind. The combination of a capped supply,
              deflationary mechanism, and diverse economic incentives aims to create a balanced and thriving ecosystem
              that can support KODA's growth for years to come.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
