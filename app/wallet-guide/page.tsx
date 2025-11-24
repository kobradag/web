import type { Metadata } from "next"
import WalletGuideClientPage from "./wallet-guide-page"

export const metadata: Metadata = {
  title: "KODA Wallet Guide | How to Create and Use Your KODA Wallet",
  description:
    "Learn how to create, secure, and use your KODA cryptocurrency wallet with this step-by-step guide. Includes instructions for both web wallet and desktop wallet options.",
}

export default function WalletGuidePage() {
  return <WalletGuideClientPage />
}
