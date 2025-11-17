"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Shield, Terminal, Download, FileCode, Key, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WalletGuideClientPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string, commandId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(commandId)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const CommandBlock = ({ command, id }: { command: string; id: string }) => (
    <div className="relative bg-black/80 p-3 rounded-md font-mono text-sm my-2 overflow-x-auto group">
      <pre className="whitespace-pre-wrap break-all">{command}</pre>
      <button
        onClick={() => copyToClipboard(command, id)}
        className="absolute top-2 right-2 p-1 rounded-md hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
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
          className="text-4xl font-bold text-center mb-12 vibrant-gradient"
        >
          KODA CLI Wallet Guide
        </motion.h1>

        <div className="max-w-3xl mx-auto mb-8 text-center text-white">
          <p>
            This guide explains how to set up and use the KODA Command Line Interface (CLI) wallet. Unlike graphical
            wallets, the CLI wallet provides advanced functionality through command-line operations.
          </p>
        </div>

        <Card className="bg-black/50 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Getting Started with CLI Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" /> Download and Setup
              </h3>
              <div className="mt-4 space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Download the KODA Core Files Archive for your operating system:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>Windows: xxx-win64.zip</li>
                      <li>Mac: xxx-osx.zip</li>
                      <li>Linux: xxx-linux.zip</li>
                    </ul>
                  </li>
                  <li>Extract the files to a location of your choice (e.g., C:\kobra\)</li>
                  <li>
                    You'll find several executable files, including <code>kobrawallet.exe</code> which is the CLI wallet
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" /> Using Batch Files
              </h3>
              <div className="mt-4 space-y-4">
                <p>
                  The CLI wallet requires command line parameters to run. For convenience, create batch (.bat) files for
                  each operation:
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Right-click in your KODA folder and select "Create → New text document"</li>
                  <li>
                    Rename it to the operation name (e.g., <code>create-wallet.bat</code>)
                  </li>
                  <li>Open the file with Notepad and add the command line for the operation</li>
                  <li>
                    Add <code>pause</code> as the last line to keep the console window open
                  </li>
                </ol>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Example Batch File:</h4>
                  <CommandBlock id="batch-example" command={`kobrawallet.exe create\n\npause`} />
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Basic Wallet Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">1</span> Create a Wallet
              </h3>
              <div className="mt-4 space-y-4">
                <p>Create a batch file with the following content:</p>
                <CommandBlock id="create-wallet" command={`kobrawallet.exe create\n\npause`} />
                <p>
                  You'll be asked to set a password. A <code>keys.json</code> file will be created in
                  <code>%local\\appdata%\\kobrawallet\\kobra-mainnet</code> folder.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-500 flex items-center gap-2">
                    <Shield className="h-5 w-5" /> Important Security Note
                  </h4>
                  <p className="text-yellow-500/90">
                    Don't forget your password! Without it, you won't be able to access your wallet unless you've backed
                    up your seed phrase.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">2</span> Backup Your Wallet
              </h3>
              <div className="mt-4 space-y-4">
                <p>There are two ways to backup your wallet:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    <strong>Method 1:</strong> Copy your <code>keys.json</code> file to a safe location
                  </li>
                  <li>
                    <strong>Method 2:</strong> Create a batch file with the following content:
                    <CommandBlock id="dump-wallet" command={`kobrawallet.exe dump-unencrypted-data\n\npause`} />
                    <p>
                      You'll be shown a set of 24 words (seed phrase). Write them down in the same order and keep them
                      secure.
                    </p>
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">3</span> Restore a Wallet
              </h3>
              <div className="mt-4 space-y-4">
                <p>To restore your wallet from a seed phrase, create a batch file with:</p>
                <CommandBlock id="restore-wallet" command={`kobrawallet.exe create --import\n\npause`} />
                <p>You'll be asked to enter your seed phrase and set a new password.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">4</span> Run the Wallet Daemon
              </h3>
              <div className="mt-4 space-y-4">
                <p>
                  Before performing wallet operations, you need to run the wallet daemon. Make sure you have a node
                  running with the <code>--utxoindex</code> parameter.
                </p>
                <p>For a local node, create a batch file with:</p>
                <CommandBlock id="start-daemon" command={`kobrawallet.exe start-daemon\n\npause`} />
                <p>For a remote node:</p>
                <CommandBlock
                  id="start-daemon-remote"
                  command={`kobrawallet.exe start-daemon -s 192.168.1.50\n\npause`}
                />
                <p>
                  Replace <code>192.168.1.50</code> with your node's IP address. The daemon will connect to the node and
                  sync your wallet.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Managing Addresses and Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">1</span> Create a Public Address
              </h3>
              <div className="mt-4 space-y-4">
                <p>Create a batch file with:</p>
                <CommandBlock id="new-address" command={`kobrawallet.exe new-address\n\npause`} />
                <p>
                  This will generate a new public address in the format <code>kobra:qblablabla</code>. You can create
                  multiple addresses as needed.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">2</span> View Your Addresses
              </h3>
              <div className="mt-4 space-y-4">
                <p>To see all your generated addresses, create a batch file with:</p>
                <CommandBlock id="show-addresses" command={`kobrawallet.exe show-addresses\n\npause`} />
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">3</span> Check Your Balance
              </h3>
              <div className="mt-4 space-y-4">
                <p>Create a batch file with:</p>
                <CommandBlock id="balance" command={`kobrawallet.exe balance\n\npause`} />
                <p>For detailed balance per address:</p>
                <CommandBlock id="balance-verbose" command={`kobrawallet.exe balance -v\n\npause`} />
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">4</span> Send Coins
              </h3>
              <div className="mt-4 space-y-4">
                <p>To send coins, create a batch file with:</p>
                <CommandBlock
                  id="send-coins"
                  command={`kobrawallet.exe send -v <amount> -t <destination_address>\n\npause`}
                />
                <p>
                  Replace <code>&lt;amount&gt;</code> with the number of KODA to send and{" "}
                  <code>&lt;destination_address&gt;</code> with the recipient's address.
                </p>
                <p>To send all your coins:</p>
                <CommandBlock
                  id="send-all"
                  command={`kobrawallet.exe send --send-all -t <destination_address>\n\npause`}
                />
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Advanced Features: Multi-Signature Wallets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" /> Create a Multi-Signature Wallet
              </h3>
              <div className="mt-4 space-y-4">
                <p>
                  Multi-signature wallets require multiple keys to authorize transactions, providing enhanced security
                  or collaborative control.
                </p>
                <h4 className="font-bold mt-4">2-of-3 Self-Custody Example:</h4>
                <CommandBlock
                  id="multisig-self"
                  command={`kobrawallet.exe create --min-signatures=2 --num-private-keys=3 --num-public-keys=3\n\npause`}
                />
                <p>
                  This creates a wallet where any 2 out of 3 keys are needed to spend funds. You'll receive extended
                  public keys and seed phrases for each key.
                </p>

                <h4 className="font-bold mt-4">3-of-5 Collaborative Example:</h4>
                <p>Each member creates a wallet with:</p>
                <CommandBlock
                  id="multisig-collab"
                  command={`kobrawallet.exe create --min-signatures=3 --num-private-keys=1 --num-public-keys=5\n\npause`}
                />
                <p>
                  Each person generates one private key and shares their extended public key with all other members.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">1</span> Create an Unsigned Transaction
              </h3>
              <div className="mt-4 space-y-4">
                <CommandBlock
                  id="create-unsigned"
                  command={`kobrawallet.exe create-unsigned-transaction --send-amount=100 -t <destination_address>\n\npause`}
                />
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">2</span> Sign a Transaction
              </h3>
              <div className="mt-4 space-y-4">
                <p>To verify transaction details before signing:</p>
                <CommandBlock id="parse-tx" command={`kobrawallet.exe parse -t <unsigned_transaction>\n\npause`} />
                <p>To sign the transaction:</p>
                <CommandBlock id="sign-tx" command={`kobrawallet.exe sign -t <unsigned_transaction>\n\npause`} />
                <p>
                  For multi-signature wallets, the partially signed transaction must be passed to other signers until
                  the required number of signatures is reached.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/20 p-1 rounded-full">3</span> Broadcast a Transaction
              </h3>
              <div className="mt-4 space-y-4">
                <CommandBlock
                  id="broadcast-tx"
                  command={`kobrawallet.exe broadcast -t <signed_transaction>\n\npause`}
                />
                <p>
                  This sends the fully signed transaction to the KODA network. You'll receive a transaction ID that can
                  be used to track the transaction status.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-primary mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" /> Protect Your Seed Phrase
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Write it down on paper (not digitally)</li>
                  <li>Store in multiple secure locations</li>
                  <li>Consider using a metal backup for fire resistance</li>
                  <li>Never share it with anyone</li>
                  <li>Be wary of phishing attempts</li>
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Key className="h-5 w-5 text-primary" /> Use Strong Passwords
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use a unique password for your wallet</li>
                  <li>Minimum 12 characters with mixed case, numbers, and symbols</li>
                  <li>Consider using a password manager</li>
                  <li>Change your password periodically</li>
                  <li>Never store your password with your seed phrase</li>
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-primary" /> Offline Signing
                </h3>
                <p>For maximum security, consider:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Creating unsigned transactions on an online device</li>
                  <li>Signing them on an offline device that holds your private keys</li>
                  <li>Broadcasting the signed transaction from the online device</li>
                </ol>
              </div>

              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Wallet className="h-5 w-5 text-primary" /> Multi-Signature Benefits
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Distributes security risk across multiple devices/locations</li>
                  <li>Prevents single points of failure</li>
                  <li>Enables collaborative control of funds</li>
                  <li>Provides protection against key compromise</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Ready to start using the KODA CLI wallet? Download the necessary files and join the KODA community!
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="https://github.com/kobradag/koda-miner-gpu" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" /> Download KODA Core Files
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
