import type { Metadata } from "next"
import TokenomicsClientPage from "./tokenomics-page"

export const metadata: Metadata = {
  title: "KODA Tokenomics | Understanding KODA's Economic Model",
  description:
    "Explore the tokenomics of KODA cryptocurrency. Learn about KODA's supply, distribution, and economic incentives that drive its sustainable growth and value.",
}

export default function TokenomicsPage() {
  return <TokenomicsClientPage />
}
