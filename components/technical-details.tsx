"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TechnicalDetails() {
  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="text-white font-cinzel">Technical Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-black text-white font-raleway"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              className="data-[state=active]:bg-primary data-[state=active]:text-black text-white font-raleway"
            >
              Technical
            </TabsTrigger>
            <TabsTrigger
              value="tokenomics"
              className="data-[state=active]:bg-primary data-[state=active]:text-black text-white font-raleway"
            >
              Tokenomics
            </TabsTrigger>
            <TabsTrigger
              value="algorithm"
              className="data-[state=active]:bg-primary data-[state=active]:text-black text-white font-raleway"
            >
              Algorithm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="bg-black/50 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-white font-cinzel">About KODA</h3>
              <p className="text-white/80 mb-4 font-raleway">
                KOBRADAG (KODA) is a GPU-centric fork of the Kaspa blockchain, designed to enhance decentralization and
                accessibility in cryptocurrency mining.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white mb-2 font-cinzel">Key Benefits:</h4>
                  <ul className="list-disc list-inside text-white/80 space-y-2 font-raleway">
                    <li>Democratization of Mining through GPU accessibility</li>
                    <li>Enhanced decentralization and network security</li>
                    <li>Improved inclusivity and sustainability</li>
                    <li>Resistance to ASIC dominance</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4 mt-4">
            <div className="bg-black/50 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-white font-cinzel">Technical Specifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white mb-2 font-cinzel">Algorithm: KODAHASH</h4>
                  <ul className="list-disc list-inside text-white/80 space-y-2 font-raleway">
                    <li>High algorithmic efficiency</li>
                    <li>Native support for parallel processing</li>
                    <li>Optimized for general-purpose hardware</li>
                    <li>Enhanced security through modern cryptographic design</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tokenomics" className="space-y-4 mt-4">
            <div className="bg-black/50 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-white font-cinzel">Tokenomics</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2 font-cinzel">Launch Date</h4>
                    <p className="text-white/80 font-raleway">May 25, 2024</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2 font-cinzel">Max Supply</h4>
                    <p className="text-white/80 font-raleway">445 Million KODA</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2 font-cinzel">Block Reward</h4>
                    <p className="text-white/80 font-raleway">10 KODA (factor 1^2 1^12)</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2 font-cinzel">Block Time</h4>
                    <p className="text-white/80 font-raleway">1 second</p>
                  </div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2 font-cinzel">Distribution</h4>
                  <p className="text-white/80 font-raleway">
                    Fair launch with no pre-sales, ensuring equitable distribution from the start
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-4 mt-4">
            <div className="bg-black/50 p-6 rounded-lg border border-primary/30">
              <h3 className="text-xl font-bold mb-4 text-white font-cinzel">KODAHASH Algorithm</h3>
              <div className="space-y-4 font-raleway">
                <p className="text-white/80">
                  KODAHASH is our innovative mining algorithm designed to optimize performance and security in the
                  KOBRADAG network. Here are some key features:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  <li>High efficiency for GPU mining, promoting decentralization</li>
                  <li>Enhanced resistance against ASIC dominance</li>
                  <li>Improved network security through advanced cryptographic techniques</li>
                  <li>Optimized for energy efficiency, reducing environmental impact</li>
                  <li>Scalable design to accommodate future technological advancements</li>
                </ul>
                <p className="text-white/80">
                  By leveraging KODAHASH, we ensure a fair and accessible mining ecosystem for all participants while
                  maintaining the highest standards of security and performance.
                </p>
              </div>
              <a
                href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 h-10 px-4 py-2 mt-4 font-raleway"
              >
                Read the Whitepaper
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
