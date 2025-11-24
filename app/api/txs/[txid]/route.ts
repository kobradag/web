import { NextResponse } from "next/server"
import { getTransaction } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { txid: string } }) {
  try {
    const txid = params.txid
    console.log("API route /api/txs/[txid] called with:", txid)

    const transaction = await getTransaction(txid)

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Error fetching transaction in /api/txs/[txid]:", error)
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}
