"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RecentPaymentsPopup } from "./recent-payments-popup"
import { CreditCard } from "lucide-react"

export function PaymentsButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsPopupOpen(true)}
        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Recent Payments
      </Button>
      <RecentPaymentsPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}
