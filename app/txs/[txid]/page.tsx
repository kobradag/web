import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TransactionDetails } from "@/components/transaction-details"

export default function TransactionPage({ params }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <TransactionDetails txid={params.txid} />
      <Footer />
    </main>
  )
}
