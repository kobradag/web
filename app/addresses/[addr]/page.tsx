import { Suspense } from "react"
import { AddressOverview } from "@/components/AddressOverview"
import { AddressTransactions } from "@/components/AddressTransactions"
import { AddressUtxos } from "@/components/AddressUtxos"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Params = {
  addr: string
}

export default function AddressInfoPage({
  params,
}: {
  params: Params
}) {
  // Decode the address parameter to handle URL encoding
  const decodedAddress = decodeURIComponent(params.addr).replace("kobra%3A", "kobra:")

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">Address Overview</h1>
        <Suspense fallback={<div className="text-white">Loading address overview...</div>}>
          <AddressOverview addr={decodedAddress} />
        </Suspense>
        <Suspense fallback={<div className="text-white">Loading address details...</div>}>
          <AddressTransactions addr={decodedAddress} />
          <AddressUtxos addr={decodedAddress} />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
