import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "KODA Technology | BLOCKDAG and KODAHASH Explained",
  description:
    "Dive deep into the innovative technology behind KODA. Learn about BLOCKDAG architecture and the KODAHASH mining algorithm that power this revolutionary cryptocurrency.",
}

export default function KODATechnology() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">KODA Technology</h1>
        <div className="space-y-8 text-white">
          <section>
            <h2 className="text-2xl font-bold mb-4">BLOCKDAG: The Foundation of KODA</h2>
            <p>
              BLOCKDAG (Directed Acyclic Graph) is the revolutionary technology that powers KODA. Unlike traditional
              blockchain, BLOCKDAG allows for multiple chains of blocks to coexist and interconnect, dramatically
              increasing transaction speed and scalability.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Parallel processing of transactions</li>
              <li>Significantly higher throughput compared to linear blockchains</li>
              <li>Reduced confirmation times for enhanced user experience</li>
              <li>Improved resistance to centralization</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">KODAHASH: KODA's Unique Mining Algorithm</h2>
            <p>
              KODAHASH is our proprietary mining algorithm, designed to optimize performance, security, and fairness in
              the KODA network. Key features include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>GPU-centric design for widespread accessibility</li>
              <li>Enhanced ASIC resistance to maintain decentralization</li>
              <li>Energy-efficient computation to reduce environmental impact</li>
              <li>Balanced reward distribution to incentivize network participation</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Smart Contracts and DApps</h2>
            <p>
              KODA supports advanced smart contract functionality, enabling developers to build decentralized
              applications (DApps) on our platform. This opens up a world of possibilities for DeFi, NFTs, and other
              blockchain-based solutions.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Security Measures</h2>
            <p>
              Security is paramount in the KODA ecosystem. We employ state-of-the-art cryptographic techniques, regular
              security audits, and a bug bounty program to ensure the safety of our users' assets and data.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
