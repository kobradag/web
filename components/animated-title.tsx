"use client"

import type React from "react"

interface AnimatedTitleProps {
  children: React.ReactNode
}

export function AnimatedTitle({ children }: AnimatedTitleProps) {
  return <h1 className="text-4xl font-bold mb-8 animate-fade-in-left">{children}</h1>
}
