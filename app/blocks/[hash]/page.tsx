import { BlockInfo } from "@/components/block-info"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlockPage({ params }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">Block Details</h1>
        <BlockInfo blockHash={params.hash} />
      </div>
      <Footer />
    </main>
  )
}
