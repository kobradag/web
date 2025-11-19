import type { Metadata } from "next"
import FAQClientPage from "./faq-page"

export const metadata: Metadata = {
  title: "KODA FAQ | Frequently Asked Questions",
  description:
    "Find answers to commonly asked questions about KODA cryptocurrency, including technical details, tokenomics, and how to get started.",
}

export default function FAQPage() {
  return <FAQClientPage />
}
