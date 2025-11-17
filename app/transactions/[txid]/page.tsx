import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TransactionDetails } from "@/components/transaction-details"
import { getTransaction } from "@/lib/api"

export default async function TransactionPage({ params }) {
  let initialData = null

  try {
    initialData = await getTransaction(params.txid)
  } catch (err) {
    console.error("Error pre-fetching transaction:", err)
    // We'll let the client-side component handle the error
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <TransactionDetails txid={params.txid} initialData={initialData} />
      <Footer />
    </main>
  )
}
