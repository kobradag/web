import type { Metadata } from "next"
import MiningGuideClientPage from "./mining-guide-page"

export const metadata: Metadata = {
  title: "KODA Mining Guide | How to Mine KODA Cryptocurrency",
  description:
    "Learn how to mine KODA cryptocurrency with this comprehensive guide. Discover hardware requirements, software setup, mining pool configuration, and optimization tips.",
}

export default function MiningGuidePage() {
  return <MiningGuideClientPage />
}
