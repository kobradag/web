"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useCompletion } from 'ai/react'
// import { AITechComparison } from '@/components/ai-tech-comparison'

export default function TechnologyPage() {
  // const [topic, setTopic] = useState('')
  // const { complete, completion, isLoading } = useCompletion({
  //   api: '/api/tech-explanation',
  // })

  // const handleExplanation = async () => {
  //   if (topic) {
  //     await complete(`Explain ${topic} in the context of KODA and BLOCKDAG technology.`)
  //   }
  // }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16 text-white">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">
          KODA Technology: BLOCKDAG and KODAHASH
        </h1>

        <section className="mb-12">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-3xl font-bold vibrant-gradient">
                BLOCKDAG: The Next Evolution in Blockchain
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="text-lg mb-4 text-white">
                BLOCKDAG (Directed Acyclic Graph) represents a significant leap forward in blockchain technology. Unlike
                traditional blockchains, BLOCKDAG allows for multiple chains of blocks to coexist and interconnect,
                dramatically increasing transaction speed and scalability.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-white">
                <li>Parallel processing of transactions</li>
                <li>Significantly higher throughput compared to linear blockchains</li>
                <li>Reduced confirmation times for enhanced user experience</li>
                <li>Improved resistance to centralization</li>
              </ul>
              <h3 className="text-2xl font-bold mb-4 vibrant-gradient">Technical Advantages of BLOCKDAG</h3>
              <ul className="list-disc list-inside mb-4 space-y-2 text-white">
                <li>Scalability: Can process thousands of transactions per second</li>
                <li>Low Latency: Transaction confirmations in seconds, not minutes</li>
                <li>Fairness: Miners with varying computational power can participate equally</li>
                <li>Resilience: Network remains operational even if some nodes fail</li>
              </ul>
              <h3 className="text-2xl font-bold mb-4 vibrant-gradient">BLOCKDAG vs Traditional Blockchain</h3>
              <table className="w-full mb-4 text-white">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-2">Feature</th>
                    <th className="text-left p-2">BLOCKDAG</th>
                    <th className="text-left p-2">Traditional Blockchain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/20">
                    <td className="p-2">Structure</td>
                    <td className="p-2">Directed Acyclic Graph</td>
                    <td className="p-2">Linear Chain</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-2">Scalability</td>
                    <td className="p-2">High</td>
                    <td className="p-2">Limited</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-2">Transaction Speed</td>
                    <td className="p-2">Very Fast</td>
                    <td className="p-2">Slower</td>
                  </tr>
                  <tr>
                    <td className="p-2">Consensus Mechanism</td>
                    <td className="p-2">GHOSTDAG</td>
                    <td className="p-2">Varies (e.g., PoW, PoS)</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-3xl font-bold vibrant-gradient">
                KODAHASH: Powering KODA's Unique Mining Algorithm
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="text-lg mb-4 text-white">
                KODAHASH is our proprietary mining algorithm, designed to optimize performance, security, and fairness
                in the KODA network. It's built on the following principles:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 text-white">
                <li>GPU-centric design for widespread accessibility</li>
                <li>Enhanced ASIC resistance to maintain decentralization</li>
                <li>Energy-efficient computation to reduce environmental impact</li>
                <li>Balanced reward distribution to incentivize network participation</li>
              </ul>
              <h3 className="text-2xl font-bold mb-4 vibrant-gradient">KODAHASH Technical Specifications</h3>
              <ul className="list-disc list-inside mb-4 space-y-2 text-white">
                <li>Algorithm Family: Memory-hard, GPU-optimized</li>
                <li>Memory Requirement: 4GB per mining instance</li>
                <li>Time Complexity: O(n log n)</li>
                <li>Space Complexity: O(n)</li>
                <li>Proof-of-Work: Based on solving complex mathematical puzzles</li>
              </ul>
              <h3 className="text-2xl font-bold mb-4 vibrant-gradient">KODAHASH Mining Process</h3>
              <ol className="list-decimal list-inside mb-4 space-y-2 text-white">
                <li>Initialize mining parameters based on current network state</li>
                <li>Generate a unique nonce for the current block</li>
                <li>Apply KODAHASH algorithm to the block data and nonce</li>
                <li>Verify if the resulting hash meets the current difficulty target</li>
                <li>If target is met, submit the block to the network; if not, repeat from step 2</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-3xl font-bold vibrant-gradient">The KODA Advantage</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="text-lg mb-4 text-white">
                By combining BLOCKDAG's advanced structure with KODAHASH's innovative mining approach, KODA offers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white">
                <li>Lightning-fast transaction speeds (up to 10,000 TPS)</li>
                <li>Unparalleled scalability for future growth</li>
                <li>A truly decentralized and fair mining ecosystem</li>
                <li>Robust security against various attack vectors</li>
                <li>A foundation for advanced DeFi applications and smart contracts</li>
              </ul>
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4 vibrant-gradient">Future Developments</h3>
                <p className="mb-2 text-white">
                  The KODA team is continuously working on improving and expanding our technology. Some of our upcoming
                  developments include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white">
                  <li>Implementation of zero-knowledge proofs for enhanced privacy</li>
                  <li>Cross-chain interoperability protocols</li>
                  <li>Layer-2 scaling solutions for even higher throughput</li>
                  <li>Advanced smart contract capabilities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Removed AI Technology Explainer section */}
      </div>
      {/* Removed <AITechComparison /> */}
      <Footer />
    </main>
  )
}
