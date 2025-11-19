import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "KODA Articles & Resources | Cryptocurrency Knowledge Base",
  description:
    "Explore in-depth articles about KODA cryptocurrency, BLOCKDAG technology, mining guides, wallet security, and the future of digital finance.",
  keywords:
    "KODA articles, cryptocurrency guides, BLOCKDAG technology, crypto mining tutorials, wallet security, digital finance education",
}

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            KODA Knowledge Base
          </h1>

          <p className="text-lg mb-12 text-center text-white">
            Explore our collection of in-depth articles about KODA cryptocurrency, BLOCKDAG technology, mining guides,
            and best practices for cryptocurrency management.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-black/50 border border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle>What is BLOCKDAG Technology?</CardTitle>
                <CardDescription>Understanding the next evolution in distributed ledger technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Explore how BLOCKDAG technology differs from traditional blockchain, offering improved scalability,
                  faster transaction speeds, and enhanced security features.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/articles/what-is-blockdag-technology" passHref>
                  <Button variant="outline" className="border-primary text-white hover:bg-primary/20 bg-transparent">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle>KODA Mining Profitability Guide</CardTitle>
                <CardDescription>Maximize your mining returns with KODA</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Learn about KODA mining profitability, hardware requirements, energy consumption considerations, and
                  strategies to optimize your mining operation.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/articles/koda-mining-profitability-guide" passHref>
                  <Button variant="outline" className="border-primary text-white hover:bg-primary/20 bg-transparent">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle>Cryptocurrency Wallet Security</CardTitle>
                <CardDescription>Best practices for securing your digital assets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Discover essential security measures to protect your cryptocurrency wallets, including cold storage
                  options, multi-signature setups, and recovery strategies.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/articles/cryptocurrency-wallet-security-best-practices" passHref>
                  <Button variant="outline" className="border-primary text-white hover:bg-primary/20 bg-transparent">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle>BLOCKDAG vs. Blockchain</CardTitle>
                <CardDescription>A comprehensive comparison of distributed ledger technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Compare BLOCKDAG and blockchain technologies across key metrics including transaction speed,
                  scalability, security features, and energy efficiency.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/articles/blockdag-vs-blockchain-comparison" passHref>
                  <Button variant="outline" className="border-primary text-white hover:bg-primary/20 bg-transparent">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black/50 border border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <CardTitle>KODA Tokenomics Explained</CardTitle>
                <CardDescription>Understanding KODA's economic model and distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Dive deep into KODA's tokenomics, including supply mechanisms, distribution strategy, mining rewards,
                  and long-term economic sustainability.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/articles/koda-tokenomics-explained" passHref>
                  <Button variant="outline" className="border-primary text-white hover:bg-primary/20 bg-transparent">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
