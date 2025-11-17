import { redirect } from "next/navigation"

export const metadata = {
  title: "KODA WebWallet | Coming Soon",
  description: "The KODA WebWallet is coming soon. Stay tuned for updates!",
}

export default function WebWalletPage() {
  redirect("https://wallet.k0bradag.com/")
}
