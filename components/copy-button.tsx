"use client"

import type React from "react"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button size="icon" variant="ghost" className={className} onClick={copy} {...props}>
      {isCopied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
      <span className="sr-only">Copy</span>
    </Button>
  )
}
