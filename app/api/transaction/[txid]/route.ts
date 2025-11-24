import { NextResponse } from "next/server"
import { getTransaction } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { txid: string } }) {
  try {
    const txid = params.txid
    const transaction = await getTransaction(txid)

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Error fetching transaction:", error)
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}
