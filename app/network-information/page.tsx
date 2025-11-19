import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NetworkMap } from "@/components/network-map"
import { NetworkStats } from "@/components/network-stats"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Server } from "lucide-react"

export const metadata = {
  title: "KODA Network Information | Network Details and Statistics",
  description:
    "Detailed information about the KODA network, including node distribution, network health, and technical specifications.",
}

export default function NetworkInformationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-12 mt-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/explorer" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Explorer
            </Link>
          </Button>
          <h1 className="text-4xl font-bold vibrant-gradient">Network Information</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Network Overview</CardTitle>
              <CardDescription>Key metrics about the KODA network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white">Consensus Algorithm</span>
                  <span className="font-medium">BlockDAG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Block Time</span>
                  <span className="font-medium">~60 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Network Hashrate</span>
                  <span className="font-medium">1.2 PH/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Active Nodes</span>
                  <span className="font-medium">1,250+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Network Difficulty</span>
                  <span className="font-medium">3.45 T</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Technical Specifications</CardTitle>
              <CardDescription>Technical details of the KODA network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white">Mining Algorithm</span>
                  <span className="font-medium">Keccak-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Block Size</span>
                  <span className="font-medium">2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Transaction Speed</span>
                  <span className="font-medium">~1,000 TPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">P2P Port</span>
                  <span className="font-medium">8333</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">RPC Port</span>
                  <span className="font-medium">8332</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Resources</CardTitle>
              <CardDescription>Helpful resources for the KODA network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Whitepaper
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/mining-guide" className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Mining Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="https://github.com/kobra-dev" target="_blank" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    GitHub Repository
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/blocks" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Block Explorer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Network Statistics</CardTitle>
              <CardDescription>Current statistics of the KODA network</CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkStats />
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Global Node Distribution</CardTitle>
              <CardDescription>Geographic distribution of KODA nodes</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <NetworkMap />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
