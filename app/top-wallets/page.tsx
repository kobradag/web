import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopWallets } from "@/components/top-wallets"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata = {
  title: "KODA Top Wallets | Richest Addresses on the KODA Network",
  description:
    "Explore the top 100 richest addresses on the KODA blockchain network, ranked by balance and UTXO count.",
}

export default function TopWalletsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">KODA Top Wallets</h1>

        <Card className="bg-black/50 border-primary mb-6">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-white">Top 100 KODA Holders</CardTitle>
            <CardDescription className="text-white/70 mt-0">
              The wealthiest addresses on the KODA network, ranked by balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopWallets />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">About KODA Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">
                KODA wallets are secured by cryptographic keys, allowing users to store, send, and receive KODA tokens
                safely. Each wallet has a unique address that serves as its identifier on the blockchain.
              </p>
              <p className="text-white/80">
                The distribution of KODA tokens across wallets provides insights into the network's decentralization and
                adoption. This page tracks the top 100 addresses by balance to provide transparency into KODA's
                distribution.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Understanding UTXOs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">
                KODA uses the UTXO (Unspent Transaction Output) model, similar to Bitcoin. Each UTXO represents a
                portion of KODA that can be spent in future transactions.
              </p>
              <p className="text-white/80">
                A higher UTXO count typically indicates more frequent transaction activity. Addresses with many UTXOs
                may represent exchanges, mining pools, or active traders in the KODA ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
