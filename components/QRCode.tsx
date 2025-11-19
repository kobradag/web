"use client"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function QRCode({ value, size = 120 }: { value: string; size?: number }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate logo size based on QR code size (40% of QR code size)
  const logoSize = Math.round(size * 0.4)

  return (
    <div className="bg-white p-2 rounded-md relative flex items-center justify-center">
      <QRCodeSVG value={value} size={size} level="H" includeMargin={true} />

      {/* Overlay the logo on top of the QR code */}
      {mounted && (
        <div
          className="absolute rounded-full overflow-hidden bg-white p-1"
          style={{
            width: logoSize,
            height: logoSize,
          }}
        >
          <Image
            src="/koda-logo.png"
            alt="KODA Logo"
            width={logoSize - 2}
            height={logoSize - 2}
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
  )
}
