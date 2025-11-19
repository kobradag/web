import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NetworkStats } from "@/components/network-stats"
import { BlockExplorer } from "@/components/block-explorer"
import { TransactionList } from "@/components/transaction-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExplorerSearch } from "@/components/explorer-search"
import { BlockchainProvider } from "@/contexts/BlockchainContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Info } from "lucide-react"
// Add the import for the structured data component
import { ExplorerStructuredData } from "./structured-data"

export const metadata = {
  title: "KODA Network Explorer | Real-time Blockchain Statistics",
  description: "Explore real-time statistics, blocks, and transactions on the KODA BLOCKDAG network.",
}

export default function ExplorerPage() {
  return (
    <BlockchainProvider>
      <>
        <ExplorerStructuredData />
        <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
          <Header />
          <div className="container mx-auto px-4 py-12 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-8">
              <h1 className="text-4xl font-bold text-center vibrant-gradient">KODA Network Explorer</h1>
              <Button
                asChild
                className="mt-4 sm:mt-0 bg-primary text-black font-bold border-2 border-primary hover:bg-primary/80 px-6 py-2 text-base shadow-lg shadow-primary/20 animate-pulse hover:animate-none"
              >
                <Link href="/explorer/additional-info" className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Additional Information
                </Link>
              </Button>
            </div>

            <Card className="bg-black/50 border-primary mb-8">
              <CardContent className="pt-6">
                <ExplorerSearch />
              </CardContent>
            </Card>

            <div className="space-y-8">
              {/* Network Stats */}
              <NetworkStats />

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-black/50 border-primary">
                  <CardHeader>
                    <CardTitle className="text-white">Latest Blocks</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <BlockExplorer />
                  </CardContent>
                </Card>

                <Card className="bg-black/50 border-primary">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <TransactionList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </>
    </BlockchainProvider>
  )
}
