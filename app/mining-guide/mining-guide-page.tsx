"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function MiningGuideClientPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string, commandId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandId)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const CommandBlock = ({ command, id }: { command: string; id: string }) => (
    <div className="relative bg-black/80 p-3 rounded-md font-mono text-sm my-2 overflow-x-auto">
      <pre className="whitespace-pre-wrap break-all">{command}</pre>
      <button
        onClick={() => copyToClipboard(command, id)}
        className="absolute top-2 right-2 p-1 rounded-md hover:bg-primary/20 transition-colors"
        aria-label="Copy to clipboard"
      >
        {copiedCommand === id ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-primary" />
        )}
      </button>
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          KODA Mining Guide
        </motion.h1>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-black/50 mb-8">
            <TabsTrigger
              value="getting-started"
              className="data-[state=active]:bg-primary data-[state=active]:text-black"
            >
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="hardware" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              Hardware
            </TabsTrigger>
            <TabsTrigger value="software" className="data-[state=active]:bg-primary data-[state=active]:text-black">
              Software Setup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started">
            <Card className="bg-black/50 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Getting Started with KODA Mining</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white">
                <p>
                  Welcome to the KODA mining guide! KODA is designed to be GPU-mineable, making it accessible to a wide
                  range of miners. This guide will walk you through the process of setting up your mining operation.
                </p>

                <h3 className="text-xl font-bold mt-4">What is KODA Mining?</h3>
                <p>
                  Mining KODA involves using your computer's GPU to solve complex mathematical problems that validate
                  transactions on the KODA blockchain. In return for your computational power, you receive KODA tokens
                  as rewards.
                </p>

                <h3 className="text-xl font-bold mt-4">Mining Process Overview</h3>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Set up a KODA wallet to receive your mining rewards</li>
                  <li>Prepare your hardware (GPU-based mining rig)</li>
                  <li>Install the necessary mining software</li>
                  <li>Join a mining pool (recommended for consistent rewards)</li>
                  <li>Configure your mining software with your wallet address and pool information</li>
                  <li>Start mining and monitor your performance</li>
                </ol>

                <h3 className="text-xl font-bold mt-4">KODAHASH Algorithm</h3>
                <p>
                  KODA uses the KODAHASH algorithm, which is specifically designed to be ASIC-resistant and
                  GPU-friendly. This ensures that mining remains accessible to individual miners rather than being
                  dominated by large mining operations with specialized hardware.
                </p>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-yellow-500">Important Note</h4>
                  <p className="text-yellow-500/90">
                    Mining cryptocurrency consumes electricity and generates heat. Always ensure proper cooling for your
                    hardware and be aware of your electricity costs to maintain profitability.
                  </p>
                </div>

                <div className="mt-6">
                  <Button asChild className="bg-black hover:bg-black/80 text-white border border-primary">
                    <Link href="https://github.com/kobradag/koda-miner-gpu" target="_blank" rel="noopener noreferrer">
                      Download Mining Software
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hardware">
            <Card className="bg-black/50 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Hardware Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white">
                <p>
                  KODA is designed to be mined with GPUs, making it accessible to a wide range of miners. Here are the
                  recommended hardware specifications for mining KODA effectively:
                </p>

                <h3 className="text-xl font-bold mt-4">Minimum Requirements</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>GPU with at least 4GB VRAM</li>
                  <li>CPU: Any modern dual-core processor</li>
                  <li>RAM: 8GB DDR4</li>
                  <li>Storage: 50GB SSD (for blockchain data)</li>
                  <li>Power Supply: Depends on your GPU (typically 500W+)</li>
                  <li>Internet Connection: Stable connection with at least 5 Mbps</li>
                  <li>Operating System: Windows 10/11, Linux (Ubuntu 20.04+)</li>
                </ul>

                <h3 className="text-xl font-bold mt-4">Recommended GPUs</h3>
                <p>
                  The KODAHASH algorithm performs well on both NVIDIA and AMD GPUs. Here are some recommended models
                  sorted by performance tier:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Entry Level</h4>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NVIDIA GTX 1660 Super</li>
                      <li>NVIDIA GTX 1660 Ti</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Mid Range</h4>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NVIDIA RTX 3060</li>
                      <li>NVIDIA RTX 2070</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">High Performance</h4>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NVIDIA RTX 3080</li>
                      <li>NVIDIA RTX 3090</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Latest Generation</h4>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li>NVIDIA RTX 4070</li>
                      <li>NVIDIA RTX 4080</li>
                      <li>NVIDIA RTX 4090</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6">Multi-GPU Setup</h3>
                <p>
                  For serious mining operations, you can set up multiple GPUs in a single system. Here are additional
                  requirements for multi-GPU setups:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Motherboard with multiple PCIe slots</li>
                  <li>PCIe risers for connecting multiple GPUs</li>
                  <li>Higher capacity power supply (1000W+)</li>
                  <li>Proper cooling solution</li>
                  <li>Mining frame or open-air case</li>
                </ul>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-yellow-500">Power Consumption Note</h4>
                  <p className="text-yellow-500/90">
                    Always calculate your power consumption before setting up a mining rig. Mining can be
                    electricity-intensive, and costs vary by region. Use a power consumption calculator to estimate your
                    operational costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="software">
            <Card className="bg-black/50 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Software Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white">
                <p>
                  Setting up the software for mining KODA involves installing the necessary mining software and
                  configuring it to work with your hardware and chosen mining pool.
                </p>

                <h3 className="text-xl font-bold mt-4">Step 1: Set Up a KODA Wallet</h3>
                <p>
                  Before you start mining, you need a KODA wallet to receive your mining rewards. You can use the
                  official KODA web wallet or a desktop wallet.
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <Link href="https://wallet.k0bradag.com" className="text-primary hover:underline">
                      KODA Web Wallet
                    </Link>{" "}
                    - Easy to use, accessible from any browser
                  </li>
                  <li>
                    <Link
                      href="https://github.com/kobradag/koda-desktop-wallet/releases"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      KODA Desktop Wallet
                    </Link>{" "}
                    - Download for Windows, macOS, or Linux
                  </li>
                </ul>
                <p className="mt-2">
                  After creating your wallet, make note of your wallet address. It will start with "kobra:" and is
                  required for configuring your mining software.
                </p>

                <h3 className="text-xl font-bold mt-6">Step 2: Mining Setup Options</h3>

                <Tabs defaultValue="hiveos" className="mt-4">
                  <TabsList className="bg-black/70">
                    <TabsTrigger value="hiveos">HiveOS Setup</TabsTrigger>
                    <TabsTrigger value="windows">Windows Setup</TabsTrigger>
                    <TabsTrigger value="linux">Linux Setup</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hiveos" className="mt-4">
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">HiveOS Setup Instructions</h4>
                      <p className="mb-4">
                        Follow these steps to set up KODA mining on HiveOS without using a flightsheet:
                      </p>

                      <ol className="list-decimal list-inside space-y-3 pl-4">
                        <li>Start HiveOS with no flightsheet</li>
                        <li>Shell into HiveOS (use SSH or the shell option in the HiveOS dashboard)</li>
                        <li>
                          Navigate to your home directory:
                          <CommandBlock id="hiveos-cd-home" command="cd ~" />
                          <span className="text-xs text-white/60">
                            (This is optional but recommended to keep things organized)
                          </span>
                        </li>
                        <li>
                          Create a directory for the KODA miner:
                          <CommandBlock id="hiveos-mkdir" command="mkdir kodagpu" />
                          <span className="text-xs text-white/60">(You can choose any directory name you prefer)</span>
                        </li>
                        <li>
                          Navigate to the new directory:
                          <CommandBlock id="hiveos-cd-dir" command="cd kodagpu" />
                        </li>
                        <li>
                          Download the KODA miner:
                          <CommandBlock
                            id="hiveos-wget"
                            command="wget https://github.com/kobradag/kobra-miner-gpu/releases/download/1.0.0/kodahash-miner-linux.zip"
                          />
                        </li>
                        <li>
                          Extract the downloaded file:
                          <CommandBlock id="hiveos-unzip" command="unzip kodahash-miner-linux.zip" />
                        </li>
                        <li>
                          Navigate to the miner directory:
                          <CommandBlock id="hiveos-cd-miner" command="cd miner" />
                          <span className="text-xs text-white/60">
                            (Hit tab to autocomplete the directory name if needed - the default directory might have a
                            strange structure)
                          </span>
                        </li>
                        <li>
                          Make the miner executable:
                          <CommandBlock id="hiveos-chmod" command="chmod +x kobra-miner" />
                        </li>
                        <li>
                          Create a new persistent screen session to run the miner:
                          <CommandBlock id="hiveos-screen" command="screen -S miner" />
                        </li>
                        <li>
                          Navigate back to the miner directory:
                          <CommandBlock id="hiveos-cd-back" command="cd ~/kodagpu/miner" />
                          <span className="text-xs text-white/60">
                            (Hit tab to autocomplete the directory name if needed)
                          </span>
                        </li>
                        <li>
                          Set your GPU overclocking settings:
                          <CommandBlock id="hiveos-nvtool" command="nvtool --setclocks XXXX" />
                          <span className="text-xs text-white/60">(Replace XXXX with your desired clock settings)</span>
                        </li>
                        <li>
                          Start the miner:
                          <CommandBlock
                            id="hiveos-start-miner"
                            command="./kobra-miner -s <IP of NODE> --mining-address <mining address>"
                          />
                          <span className="text-xs text-white/60">
                            (Replace &lt;IP of NODE&gt; with your mining pool address and &lt;mining address&gt; with
                            your KODA wallet address)
                          </span>
                        </li>
                      </ol>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
                        <h4 className="font-bold text-yellow-500">Important Notes</h4>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-yellow-500/90">
                          <li>
                            Make sure you set your overclocking settings before running the miner using nvtool or
                            nvidia-smi
                          </li>
                          <li>
                            If you don't want to use nvtool from the command line, you can run it directly in HiveOS
                            using the "run command" option at the top
                          </li>
                          <li>
                            To reattach to the screen session later, use the command: <code>screen -r miner</code>
                          </li>
                          <li>
                            To detach from the screen session without stopping the miner, press <code>Ctrl+A</code>{" "}
                            followed by <code>D</code>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="windows" className="mt-4">
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Windows Setup</h4>
                      <p className="mb-4">Follow these steps to set up KODA mining on Windows:</p>

                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Download the KODA miner for Windows from the official website or GitHub repository</li>
                        <li>Extract the downloaded ZIP file to a folder of your choice</li>
                        <li>Create a batch file (start.bat) with your mining configuration</li>
                        <li>Run the batch file to start mining</li>
                      </ol>

                      <div className="mt-4">
                        <h4 className="font-bold">Example start.bat file:</h4>
                        <CommandBlock
                          id="windows-bat"
                          command={`kobra-miner.exe -s pool.k0bradag.com:3333 --mining-address kobra:your_wallet_address.worker_name`}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="linux" className="mt-4">
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Linux Setup</h4>
                      <p className="mb-4">Follow these steps to set up KODA mining on Linux:</p>

                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Download the KODA miner for Linux</li>
                        <li>Extract the downloaded file</li>
                        <li>Make the miner executable</li>
                        <li>Create a shell script with your mining configuration</li>
                        <li>Run the script to start mining</li>
                      </ol>

                      <div className="mt-4">
                        <h4 className="font-bold">Example commands:</h4>
                        <CommandBlock
                          id="linux-commands"
                          command={`wget https://github.com/kobradag/kobra-miner-gpu/releases/download/1.0.0/kodahash-miner-linux.zip
unzip kodahash-miner-linux.zip
cd miner
chmod +x kobra-miner
./kobra-miner -s pool.k0bradag.com:3333 --mining-address kobra:your_wallet_address.worker_name`}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <h3 className="text-xl font-bold mt-6">Step 3: Monitor Your Mining</h3>
                <p>
                  Once your miner is running, you should see output in the console showing your hashrate, accepted
                  shares, and other information. You can also monitor your mining performance through your mining pool's
                  dashboard.
                </p>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-green-500">Success Indicators</h4>
                  <p className="text-green-500/90">
                    When mining successfully, you should see:
                    <br />- Connection to the pool established
                    <br />- Accepted shares being submitted
                    <br />- Hashrate information displayed
                    <br />- GPU temperature and power usage statistics
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-yellow-500">Troubleshooting</h4>
                  <p className="text-yellow-500/90">
                    Common issues:
                    <br />- Connection errors: Check your internet connection and pool address
                    <br />- Low hashrate: Update GPU drivers or check for hardware issues
                    <br />- Rejected shares: Verify your wallet address is correct
                    <br />- Crashes: Reduce overclocking or update mining software
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-white/60 mb-4">
            Ready to start mining KODA? Download the necessary software and join our mining community!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="default"
              className="bg-black hover:bg-black/80 text-white border border-primary"
            >
              <Link href="https://github.com/kobradag/koda-miner-gpu" target="_blank" rel="noopener noreferrer">
                Download Mining Software
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-black border-primary text-white hover:bg-black/80"
            >
              <Link href="https://discord.gg/BeNxna8YZ2" target="_blank" rel="noopener noreferrer">
                Join Discord Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
