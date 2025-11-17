"use client"

import { motion } from "framer-motion"
import { Github, Globe, MessageCircle, Wallet2, Send, Twitter, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { icon: Globe, text: "EXPLORER", href: "#" },
  { icon: Github, text: "REPOSITORY", href: "#" },
  { icon: MessageCircle, text: "JOIN DISCORD", href: "#" },
  { icon: Wallet2, text: "WEB WALLET", href: "#" },
  { icon: Send, text: "JOIN TELEGRAM", href: "#" },
  { icon: Twitter, text: "FOLLOW US ON TWITTER", href: "#" },
  { icon: Heart, text: "SUPPORT US", href: "#" },
]

export function SocialLinks() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2">
      {links.map((link, index) => (
        <motion.div
          key={link.text}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start space-x-2 hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-300"
            asChild
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon className="h-5 w-5" />
              <span>{link.text}</span>
            </a>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
