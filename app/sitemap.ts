import { SITE_URL } from "@/lib/structured-data"

export default async function sitemap() {
  const routes = [
    "",
    "/about-koda",
    "/explorer",
    "/blocks",
    "/top-wallets",
    "/get-koda",
    "/koda-community",
    "/koda-technology",
    "/koda-tokenomics",
    "/mining-guide",
    "/wallet-guide",
    "/faq",
    "/articles",
    "/articles/what-is-blockdag-technology",
    "/services/mining",
    "/services/defi",
    "/services/blockchain-explorer",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }))

  return routes
}
