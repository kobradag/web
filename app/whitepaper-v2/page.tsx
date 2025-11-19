import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "KOBRADAG Whitepaper V2",
  description: "The official KOBRADAG (KODA) Whitepaper V2 - Learn about our GPU-centric approach to blockchain mining",
}

export default function WhitepaperV2Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12 border-b border-gray-800 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">KOBRADAG Whitepaper V2</h1>
          <p className="text-white">Date: April 2025</p>

          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-black flex items-center gap-2">
              <a href="https://api-v2.k0bradag.com/api/whitepaperV2.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download PDF Version
              </a>
            </Button>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Overview</h2>
          <p className="mb-4">
            KOBRADAG (KODA) is a next-generation fork of the Kaspa blockchain, built to preserve the core values of
            decentralization and accessibility through a novel, GPU-focused approach to mining.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Introduction</h2>
          <p className="mb-4">
            Kaspa is a trailblazing blockchain platform that implements the GhostDAG protocol, leveraging a Directed
            Acyclic Graph (DAG) structure. Unlike traditional blockchains with linear progression, GhostDAG allows
            multiple blocks to be added in parallel, dramatically increasing scalability and transaction throughput.
            Despite its advanced performance characteristics, Kaspa retains strong commitments to decentralization and
            security, making it a strong foundation for scalable blockchain applications.
          </p>
          <p>For more information, see the official documentation on the GhostDAG protocol.</p>
        </section>

        <section className="mb-10 bg-yellow-900/20 border border-yellow-600/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Problem Statement</h2>
          <p className="mb-4">
            Kaspa's original mining algorithm was designed to be ASIC-friendly. While this design choice maximized
            performance, it unintentionally led to the centralization of mining power in large-scale industrial farms.
          </p>
          <p className="mb-4">
            These ASIC farms, equipped with specialized hardware, outperform individual miners, concentrating power in
            the hands of a few and undermining the network's democratic and decentralized foundations. This poses
            several risks:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Loss of network neutrality</li>
            <li>Increased vulnerability to 51% attacks</li>
            <li>Exclusion of small-scale or home miners</li>
            <li>Erosion of blockchain's foundational ideals</li>
          </ul>
        </section>

        <section className="mb-10 bg-green-900/20 border border-green-600/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Solution</h2>
          <p className="mb-4">
            The KOBRADAG (KODA) project proposes a paradigm shift: replacing ASIC dominance with a GPU- centric mining
            algorithm. This makes mining more accessible to a wider population, re-democratizing the network and
            realigning with decentralization ideals.
          </p>
          <p className="mb-4">
            By leveraging GPUs, which are more affordable and readily available, KODA reopens the network to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Hobbyists</li>
            <li>Independent miners</li>
            <li>Small mining cooperatives</li>
          </ul>
        </section>

        <section className="mb-10 bg-blue-900/20 border border-blue-600/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Key Benefits of GPU Mining</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Mining Democracy:</strong> GPUs are common in personal computers, empowering anyone to join the
              mining ecosystem.
            </li>
            <li>
              <strong>Decentralization & Security:</strong> Mining power is more evenly distributed, reducing reliance
              on central authorities and mitigating 51% attack vectors.
            </li>
            <li>
              <strong>Inclusivity & Sustainability:</strong> Broader participation encourages a stronger, more resilient
              network while maintaining energy efficiency.
            </li>
            <li>
              <strong>Resistance to Monopolization:</strong> By discouraging ASIC dependence, KODA protects its network
              from industrial control and hardware-based gatekeeping.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Conclusion</h2>
          <p className="mb-4">
            By shifting to GPU mining, KOBRADAG takes a firm stand for the future of decentralized infrastructure. It
            offers a scalable, secure, and fair ecosystem that truly reflects the original promise of blockchain
            technology — one that is open, participatory, and resilient against centralization.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Appendices</h2>
          <h3 className="text-xl font-bold mb-2 text-white">• Figure 1: ASIC vs. GPU Mining Efficiency</h3>
          <p className="mb-4">
            A comparative graph visualizing mining hardware efficiency across key criteria such as accessibility, cost,
            decentralization, and energy use.
          </p>
          <p className="mb-4 text-white">
            ✅ Highlights the superiority of GPU mining in fostering a more democratic and accessible mining landscape.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">• Table 1: Current Mining Power Distribution</h3>
          <p className="mb-4">
            A data table presenting the existing power imbalance in mining ecosystems, showcasing how ASIC farms
            dominate the majority of the network's hashrate.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">• Figure 2: Projected Distribution Post-GPU Adoption</h3>
          <p className="mb-4">
            A forecasted distribution model displaying how GPU-centric mining can reclaim decentralization, boosting the
            participation of individual and small-scale miners across the globe.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Project Goals</h2>
          <h3 className="text-xl font-bold mb-2 text-white">1. Decentralization</h3>
          <p className="mb-4">GPU mining actively strengthens decentralization in the network through:</p>
          <p className="mb-4">
            <strong>Broader Mining Distribution</strong>
            <br />
            GPUs are widely available and affordable, making it viable for individuals worldwide to participate. This
            naturally decentralizes the hashrate and reduces dependency on institutional farms.
          </p>
          <p className="mb-4">
            <strong>Mitigation of Centralization Risk</strong>
            <br />
            With ASIC mining, control can centralize in a few powerful entities. KOBRADAG's GPU focus democratizes
            mining by lowering economic and technical barriers to entry.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">2. Accessibility</h3>
          <p className="mb-4">GPU-based mining drastically reduces the obstacles faced by new participants:</p>
          <p className="mb-4">
            <strong>Affordability</strong>
            <br />
            GPUs come in various price points and are far cheaper than custom ASIC rigs, lowering the financial barrier
            for miners.
          </p>
          <p className="mb-4">
            <strong>Availability</strong>
            <br />
            Unlike ASICs, GPUs are found in mainstream consumer devices, from gaming PCs to workstations — making it
            easier for users to start mining.
          </p>
          <p className="mb-4">
            <strong>Versatility</strong>
            <br />
            GPUs are multi-functional: aside from mining, they support gaming, 3D rendering, and AI workloads. This
            means users can switch between purposes without dedicating a device solely for mining — increasing
            flexibility and long-term value.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Network Security</h2>
          <p className="mb-4">
            GPU-based mining significantly enhances the security of the KOBRADAG network by enabling decentralization,
            increasing participant diversity, and improving adaptability.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">1. Resistance to 51% Attacks</h3>
          <p className="mb-4">
            A decentralized GPU mining model makes it far more difficult for any single entity to gain majority control
            of the network's hashrate.
          </p>
          <p className="mb-4">
            This effectively mitigates the risk of 51% attacks, in which a dominant miner could manipulate block
            validation or reverse transactions.
          </p>
          <p className="mb-4">
            By distributing mining power across thousands of individual nodes, network integrity remains intact.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">2. Diverse Participant Base</h3>
          <p className="mb-4">
            The accessibility of GPU mining allows a wide range of participants — from hobbyists to small collectives —
            to contribute to the network.
          </p>
          <p className="mb-4">
            This diversity ensures that no single group holds disproportionate influence, and that the ecosystem
            benefits from the collective vigilance of its community.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">3. Adaptability & Resilience</h3>
          <p className="mb-4">
            GPUs are not locked into a single algorithm, unlike ASICs. This flexibility means the network can:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Rapidly pivot to new hashing algorithms</li>
            <li>Introduce protocol upgrades</li>
            <li>Respond to emerging threats</li>
          </ul>
          <p className="mb-4">...all without requiring massive hardware reinvestments from participants.</p>
          <p className="mb-4">This adaptive capacity strengthens long-term network resilience and security.</p>

          <p className="mb-4 text-white">
            ✅ In conclusion, GPU mining is not only a tool for decentralization — it is a critical pillar of security.
            It fortifies the network against malicious attacks, expands the ecosystem's diversity, and empowers it to
            evolve with changing technological demands.
          </p>
          <p className="mb-4">
            This approach is deeply aligned with blockchain's original mission: open, inclusive, and secure systems for
            all.
          </p>
        </section>

        <section className="mb-10 bg-blue-900/20 border border-blue-600/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Technical Specifications</h2>
          <h3 className="text-xl font-bold mb-2 text-white">Algorithm: KODAHASH (formerly BLAKE3)</h3>
          <p className="mb-4">
            KOBRADAG (KODA) originally utilized the BLAKE3 hashing algorithm, chosen for its exceptional speed,
            simplicity, and efficiency across general-purpose hardware like CPUs and GPUs.
          </p>
          <p className="mb-4">
            However, as part of the project's evolution, KODAHASH — a custom-designed hashing algorithm exclusive to
            KODA — was introduced to further strengthen resistance against ASIC optimization and enhance performance on
            modern GPUs.
          </p>

          <p className="mb-4">
            <strong>KODAHASH Advantages:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              <strong>ASIC Resistance</strong>
              <br />
              Developed in-house, KODAHASH was designed to prevent hardware monopolies by avoiding characteristics that
              allow ASICs to easily optimize for it.
            </li>
            <li>
              <strong>Parallelism and Speed</strong>
              <br />
              The algorithm supports multi-threaded, high-parallel computation — ideal for GPU-based mining.
            </li>
            <li>
              <strong>General Hardware Optimization</strong>
              <br />
              Similar to BLAKE3, KODAHASH is built to perform efficiently on widely available consumer- grade hardware,
              making mining more inclusive.
            </li>
          </ol>
          <p className="mb-4">
            KODAHASH builds on the foundation of fast hashing algorithms, with modifications to ensure long- term
            adaptability and decentralized mining viability.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Tokenomics</h2>
          <h3 className="text-xl font-bold mb-2 text-white">Launch and Distribution</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Launch Date: 28 May 2024</li>
            <li>Pre-Sale: None — ensuring fair launch and distribution</li>
            <li>Initial Supply: 0 (pure PoW emission model)</li>
          </ul>

          <h3 className="text-xl font-bold mb-2 mt-4 text-white">Emission Schedule</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Follows a monthly halving model</li>
            <li>Monthly reductions implemented gradually for smoother transitions</li>
            <li>First halving scheduled: june 2024</li>
          </ul>

          <h3 className="text-xl font-bold mb-2 mt-4 text-white">Block Rewards</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Current Reward: 10 KODA per block</li>
            <li>Block Time: Consistent with Kaspa DAG-based architecture</li>
            <li>Mining Reward Adjustment: Dynamically adjusted based on halving schedule</li>
          </ul>

          <h3 className="text-xl font-bold mb-2 mt-4 text-white">Supply and Market Info</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Maximum Supply: 445,000,000 KODA</li>
            <li>Initial Max Supply (v1): 500,000,000 KODA</li>
            <li>Listing: Now officially listed on XEGGEX</li>
            <li>
              Market Cap: Based on community valuation and circulating supply; live metrics available via
              explorer.k0bradag.com
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-800 pb-2">Links & Resources</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Website:{" "}
              <a
                href="https://www.k0bradag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.k0bradag.com
              </a>
            </li>
            <li>
              GitHub Repository:{" "}
              <a
                href="https://github.com/kobradag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://github.com/kobradag
              </a>
            </li>
            <li>
              Explorer:{" "}
              <a
                href="https://explorer.k0bradag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://explorer.k0bradag.com
              </a>
            </li>
            <li>
              Web Wallet:{" "}
              <a
                href="https://wallet.k0bradag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://wallet.k0bradag.com
              </a>
            </li>
            <li>
              Twitter:{" "}
              <a
                href="https://twitter.com/k0bracurrency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://twitter.com/k0bracurrency
              </a>
            </li>
            <li>
              Discord:{" "}
              <a
                href="https://discord.gg/BeNxna8YZ2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://discord.gg/BeNxna8YZ2
              </a>
            </li>
            <li>
              Telegram:{" "}
              <a
                href="https://t.me/k0bradag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://t.me/k0bradag
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10 bg-blue-900/20 border border-blue-600/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Technical Note: Why BLAKE3 Resists ASIC Centralization</h2>
          <p className="mb-4">
            Although KOBRADAG now utilizes the custom KODAHASH, understanding BLAKE3's properties offers context for the
            network's original ASIC-resistant foundation.
          </p>

          <h3 className="text-xl font-bold mb-2 text-white">Why BLAKE3 Was a Strong Choice Initially:</h3>
          <p className="mb-4">
            <strong>ASIC Specialization Barrier</strong>
            <br />
            ASICs are built for massively deployed algorithms like SHA-256 or Ethash. Since BLAKE3 is relatively new and
            niche, there was little incentive to develop dedicated ASICs for it.
          </p>

          <p className="mb-4">
            <strong>High Development Overhead</strong>
            <br />
            ASIC creation demands significant engineering and financial resources. For an algorithm without widespread
            adoption like BLAKE3, ASIC manufacturers are unlikely to invest in its development.
          </p>

          <p className="mb-4">
            <strong>General-Purpose Hardware Optimization</strong>
            <br />
            BLAKE3 performs exceptionally well on CPUs and GPUs, using modern SIMD instructions and multithreading. This
            makes specialized hardware redundant for achieving high performance.
          </p>

          <p className="mb-4">
            <strong>Conclusion:</strong> BLAKE3's design inherently resists ASIC optimization — a philosophy carried
            forward and enhanced by KODAHASH in KOBRADAG's current implementation.
          </p>
        </section>

        <div className="mt-12 mb-8 text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-black">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
