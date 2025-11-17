"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { formatNumber } from "@/lib/utils"
import { getAddressBalance, getAddressTxCount, getAddressUtxos, getTransactionsFromAddress } from "@/lib/api"

interface AddressInfo {
  balance: number
  txCount: number
  utxoCount: number
}

interface Transaction {
  transaction_id: string
  amount: number
  block_time: number
}

export function AddressInfoPage() {
  const { addr } = useParams<{ addr: string }>()
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAddressInfo = async () => {
      if (!addr) return

      try {
        setLoading(true)
        const [balance, txCount, utxos, txData] = await Promise.all([
          getAddressBalance(addr),
          getAddressTxCount(addr),
          getAddressUtxos(addr),
          getTransactionsFromAddress(addr, 20, 0),
        ])

        setAddressInfo({
          balance: balance / 100000000, // Convert from sompis to KODA
          txCount,
          utxoCount: utxos.length,
        })

        setTransactions(txData.transactions)
        setError(null)
      } catch (err) {
        console.error("Error fetching address info:", err)
        setError("Failed to load address information")
      } finally {
        setLoading(false)
      }
    }

    fetchAddressInfo()
  }, [addr])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (loading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/50 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Address Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Balance</h3>
              <p className="text-2xl font-bold">{formatNumber(addressInfo?.balance || 0)} KODA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Transactions</h3>
              <p className="text-2xl font-bold">{formatNumber(addressInfo?.txCount || 0)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">UTXOs</h3>
              <p className="text-2xl font-bold">{formatNumber(addressInfo?.utxoCount || 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/50 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.transaction_id}>
                    <TableCell className="font-mono">{tx.transaction_id}</TableCell>
                    <TableCell>{formatNumber(tx.amount / 100000000)} KODA</TableCell>
                    <TableCell>{new Date(tx.block_time * 1000).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No recent transactions found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
