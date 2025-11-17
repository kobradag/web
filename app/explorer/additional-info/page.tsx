import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NetworkMap } from "@/components/network-map"
import { MiningCalculator } from "@/components/mining-calculator"
import { WalletCategorySummary } from "@/components/wallet-category-summary"
import { GlobeVisualization } from "@/components/globe-visualization"
import { BlockchainProvider } from "@/contexts/BlockchainContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Wallet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddressStats } from "@/components/address-stats"
import { HourlyTransactionStats } from "@/components/hourly-transaction-stats"

export const metadata = {
  title: "KODA Network - Additional Information",
  description: "Additional information about the KODA network, including network nodes and mining calculator.",
}

export default function AdditionalInfoPage() {
  return (
    <BlockchainProvider>
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-12 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-8">
            <h1 className="text-4xl font-bold text-center vibrant-gradient">KODA Network - Additional Information</h1>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="network" className="w-full mb-8">
            <div className="flex justify-center mb-4">
              <TabsList className="bg-gray-800 border border-gray-700">
                <TabsTrigger
                  value="network"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  <Network className="mr-2 h-5 w-5" /> Network Information
                </TabsTrigger>
                <TabsTrigger
                  value="wallet"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-sm"
                >
                  <Wallet className="mr-2 h-5 w-5" /> Wallet Information
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="network" className="space-y-8">
              {/* Mining Calculator */}
              <Card className="bg-black/50 border-primary">
                <CardHeader>
                  <CardTitle className="text-white">Mining Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <MiningCalculator />
                </CardContent>
              </Card>

              {/* 3D Globe Visualization */}
              <Card className="bg-black/50 border-primary">
                <CardHeader>
                  <CardTitle className="text-white">🌐 KODA Network Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <GlobeVisualization />
                </CardContent>
              </Card>

              {/* Network Map (KODA Network Nodes) */}
              <Card className="bg-black/50 border-primary">
                <CardHeader>
                  <CardTitle className="text-white">Network Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <NetworkMap />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-8">
              {/* KODA Holder Statistics - Moved from top-wallets page */}
              <div className="mb-8">
                <AddressStats />
              </div>

              {/* Wallet Category Summary */}
              <Card className="bg-black/50 border-primary">
                <CardHeader>
                  <CardTitle className="text-white">Wallet Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <WalletCategorySummary />
                </CardContent>
              </Card>

              {/* Hourly Transaction Stats - New component */}
              <Card className="bg-black/50 border-primary">
                <CardHeader>
                  <CardTitle className="text-white">Transaction Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <HourlyTransactionStats />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </main>
    </BlockchainProvider>
  )
}
