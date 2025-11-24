"use client"

import { MessageCircle, Twitter, Github, DiscIcon as Discord } from "lucide-react"

export function CommunityLinks() {
  return (
    <section id="community-links" className="text-center pb-12">
      <h2 className="text-4xl font-bold text-center mb-12 vibrant-gradient">Join Our Community</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <a
          href="https://t.me/k0bradag"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black/50 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300 font-raleway flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Telegram Channel</span>
        </a>
        <a
          href="https://twitter.com/k0bracurrency"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black/50 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300 font-raleway flex items-center gap-2"
        >
          <Twitter className="w-5 h-5" />
          <span>Twitter</span>
        </a>
        <a
          href="https://github.com/kobradag"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black/50 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300 font-raleway flex items-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>GitHub</span>
        </a>
        <a
          href="https://discord.gg/BeNxna8YZ2"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-black/50 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300 font-raleway flex items-center gap-2"
        >
          <Discord className="w-5 h-5" />
          <span>Discord</span>
        </a>
      </div>
    </section>
  )
}
