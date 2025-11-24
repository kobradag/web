import { BlockOverview } from "@/components/block-overview"
import { MarketDataBox } from "@/components/market-data-box"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlocksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">KODA Blocks</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BlockOverview lines={40} />
          </div>
          <div>
            <MarketDataBox />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
