"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ViewToggle() {
  const [view, setView] = useState<"transactions" | "utxos">("transactions")

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-gray-900 rounded-md p-1 w-full max-w-md">
        <Button
          variant="ghost"
          className={`flex-1 rounded-sm text-lg py-3 ${view === "transactions" ? "bg-gray-800 text-white" : "text-white/70 hover:text-white"}`}
          onClick={() => setView("transactions")}
        >
          Transactions History
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 rounded-sm text-lg py-3 ${view === "utxos" ? "bg-gray-800 text-white" : "text-white/70 hover:text-white"}`}
          onClick={() => setView("utxos")}
        >
          UTXOs
        </Button>
      </div>
    </div>
  )
}
