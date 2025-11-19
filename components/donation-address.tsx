"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/copy-button"
import { QRCode } from "@/components/QRCode"
import { AlertCircle, Heart } from "lucide-react"

export function DonationAddress() {
  const [showQR, setShowQR] = useState(false)
  const donationAddress = "kobra:qpscc6kzu2ny8ga7tr72csftgxjnmzc0658355tgs9k45qpn0vm0qzlfenraj"

  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Heart className="h-5 w-5 text-red-500" />
          Support KODA Development
        </CardTitle>
        <CardDescription className="text-white/70">
          Your donations help us continue improving the KODA ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-primary/30 bg-black/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/70">KODA Donation Address:</span>
              <CopyButton value={donationAddress} />
            </div>
            <p className="mt-1 break-all text-xs text-white">{donationAddress}</p>
          </div>

          {showQR && (
            <div className="flex justify-center p-2 bg-white rounded-lg">
              <QRCode value={donationAddress} size={200} />
            </div>
          )}

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-500">
                Please ensure you're sending KODA tokens only. Sending other cryptocurrencies to this address may result
                in permanent loss of funds.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-white border-primary/50 hover:bg-primary/20"
          onClick={() => setShowQR(!showQR)}
        >
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </Button>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/80 text-black"
          onClick={() => window.open(`https://explorer.k0bradag.com/address/${donationAddress}`, "_blank")}
        >
          View on Explorer
        </Button>
      </CardFooter>
    </Card>
  )
}
