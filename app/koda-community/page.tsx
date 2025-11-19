import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "KODA Community | Join the KODA Revolution",
  description:
    "Become part of the vibrant KODA community. Discover how you can contribute, engage, and grow with fellow KODA enthusiasts in our decentralized ecosystem.",
}

export default function KODACommunity() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">KODA Community</h1>
        <div className="space-y-8 text-white">
          <section>
            <h2 className="text-2xl font-bold mb-4">Join the KODA Revolution</h2>
            <p>
              The KODA community is the heart and soul of our project. We believe in the power of collective
              intelligence and encourage active participation from all our members. Join us in shaping the future of
              decentralized finance!
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Ways to Get Involved</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Participate in community discussions and governance votes</li>
              <li>Contribute to KODA's open-source development</li>
              <li>Create and share KODA-related content</li>
              <li>Help onboard new users to the KODA ecosystem</li>
              <li>Organize local KODA meetups and events</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Community Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="bg-black border-primary text-white hover:bg-black/80">
                <Link href="https://t.me/k0bradag" target="_blank" rel="noopener noreferrer">
                  Join Telegram Channel
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-black border-primary text-white hover:bg-black/80">
                <Link href="https://discord.gg/BeNxna8YZ2" target="_blank" rel="noopener noreferrer">
                  Join Discord Server
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-black border-primary text-white hover:bg-black/80">
                <Link href="https://twitter.com/k0bracurrency" target="_blank" rel="noopener noreferrer">
                  Follow on Twitter
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-black border-primary text-white hover:bg-black/80">
                <Link href="https://github.com/kobradag" target="_blank" rel="noopener noreferrer">
                  Contribute on GitHub
                </Link>
              </Button>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Community Initiatives</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>KODA Ambassador Program: Represent KODA in your local community</li>
              <li>KODA Grants: Funding for community-driven projects and developments</li>
              <li>KODA Hackathons: Regular coding competitions to foster innovation</li>
              <li>KODA Education Initiative: Free resources to learn about blockchain and KODA</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Community Governance</h2>
            <p>
              KODA believes in decentralized decision-making. As a community member, you have the power to propose and
              vote on important decisions that shape the future of KODA. Learn more about our governance process and how
              you can participate.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">KODA Rewards Program</h2>
            <p>
              Active community members can earn KODA tokens through our rewards program. Contribute to discussions,
              create content, help with development, or participate in community initiatives to earn rewards and grow
              with KODA.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
