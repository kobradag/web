import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Smartphone, Laptop, Shield } from "lucide-react"
import Image from "next/image"
import { HourlyTransactionStats } from "@/components/hourly-transaction-stats"

export const metadata = {
  title: "KODA Wallet Information | Wallet Options and Guides",
  description:
    "Information about KODA wallets, including desktop, mobile, and hardware options, along with setup guides and security tips.",
}

export default function WalletInformationPage() {
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
          <h1 className="text-4xl font-bold vibrant-gradient">Wallet Information</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Desktop Wallets</CardTitle>
              <CardDescription>Official KODA desktop wallet options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/30">
                  <Laptop className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">KODA Core Wallet</h3>
                    <p className="text-sm text-white">Full node wallet with complete blockchain validation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/30">
                  <Laptop className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">KODA Light Wallet</h3>
                    <p className="text-sm text-white">Lightweight wallet for faster setup and less storage</p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/wallet-guide">Download Desktop Wallet</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Mobile Wallets</CardTitle>
              <CardDescription>KODA mobile wallet applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/30">
                  <Smartphone className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">KODA Mobile (Android)</h3>
                    <p className="text-sm text-white">Official Android wallet application</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/30">
                  <Smartphone className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">KODA Mobile (iOS)</h3>
                    <p className="text-sm text-white">Official iOS wallet application</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild variant="outline">
                    <Link href="https://play.google.com/store" target="_blank">
                      Google Play
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="https://apps.apple.com" target="_blank">
                      App Store
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Web Wallet</CardTitle>
              <CardDescription>Browser-based KODA wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/30">
                  <ExternalLink className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-medium">KODA Web Wallet</h3>
                    <p className="text-sm text-white">Secure browser-based wallet for easy access</p>
                  </div>
                </div>
                <div className="aspect-video relative bg-black/20 rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg?key=cmru4" alt="KODA Web Wallet Preview" fill className="object-cover" />
                </div>
                <Button asChild className="w-full">
                  <Link href="/webwallet">Access Web Wallet</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Wallet Security Tips</CardTitle>
              <CardDescription>Best practices for securing your KODA wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex gap-4 p-4 rounded-lg bg-black/30">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Backup Your Wallet</h3>
                    <p className="text-sm text-white">
                      Always backup your wallet seed phrase and store it in a secure location offline.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-black/30">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Use Strong Passwords</h3>
                    <p className="text-sm text-white">
                      Create unique, complex passwords for your wallet and never share them.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-black/30">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Enable 2FA</h3>
                    <p className="text-sm text-white">
                      Use two-factor authentication whenever available for additional security.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-black/30">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">Keep Software Updated</h3>
                    <p className="text-sm text-white">
                      Always update to the latest wallet version to benefit from security improvements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-white">Resources</CardTitle>
              <CardDescription>Helpful resources for KODA wallet users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button asChild variant="outline" className="h-auto py-4 flex-col bg-transparent">
                  <Link href="/wallet-guide">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Wallet Guide</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col bg-transparent">
                  <Link href="/faq">
                    <ExternalLink className="h-6 w-6 mb-2" />
                    <span>FAQ</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col bg-transparent">
                  <Link href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Whitepaper</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col bg-transparent">
                  <Link href="/support">
                    <Shield className="h-6 w-6 mb-2" />
                    <span>Support</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <HourlyTransactionStats />
        </div>
      </div>
      <Footer />
    </main>
  )
}
