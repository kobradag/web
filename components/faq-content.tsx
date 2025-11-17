"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is KODA?",
    answer:
      "KODA (KOBRADAG) is a GPU-centric fork of the Kaspa blockchain, designed to enhance decentralization and accessibility in cryptocurrency mining. It's the first meme coin on the BLOCKDAG network, offering fast transactions, enhanced security, and real utility.",
  },
  {
    question: "What makes KODA unique?",
    answer:
      "KODA combines the viral nature of meme coins with advanced blockchain technology. It offers lightning-fast transactions, enhanced security, and a level of scalability that sets it apart in the cryptocurrency market. KODA also uses the innovative KODAHASH algorithm, which is optimized for GPU mining.",
  },
  {
    question: "What is BLOCKDAG?",
    answer:
      "BLOCKDAG is the network on which KODA operates. It's a revolutionary blockchain technology that allows for faster transactions and improved scalability compared to traditional blockchain networks.",
  },
  {
    question: "When will KODA be launched?",
    answer: "According to the roadmap, KODA is set to hit the blockchain in May 2024.",
  },
  {
    question: "What is the total supply of KODA?",
    answer: "The maximum supply of KODA is 500 Million tokens.",
  },
  {
    question: "How can I mine KODA?",
    answer:
      "KODA is designed for GPU mining, making it more accessible to individual miners. You can join mining pools to start mining KODA. More detailed mining instructions will be available closer to the launch date.",
  },
  {
    question: "What is KODAHASH?",
    answer:
      "KODAHASH is KODA's innovative mining algorithm designed to optimize performance and security in the KOBRADAG network. It's highly efficient for GPU mining, resistant to ASIC dominance, and optimized for energy efficiency.",
  },
  {
    question: "Where can I buy KODA?",
    answer:
      "Once launched, KODA will be available on various cryptocurrency exchanges. The specific exchanges will be announced closer to the launch date. Keep an eye on our official channels for updates.",
  },
  {
    question: "What are the use cases for KODA?",
    answer:
      "KODA aims to be more than just a meme coin. It can be used for fast and secure transactions, and there are plans for DeFi integration, smart contracts, and an NFT marketplace in the future.",
  },
  {
    question: "How can I stay updated on KODA's progress?",
    answer:
      "You can follow KODA's official channels including Telegram, Twitter, GitHub, and Discord. Links to these platforms are available on the website.",
  },
  {
    question: "Is there a KODA wallet?",
    answer:
      "Yes, KODA has a web wallet available at wallet.k0bradag.com. Mobile wallets are planned for future development.",
  },
  {
    question: "How does KODA ensure network security?",
    answer:
      "KODA uses advanced cryptographic techniques and the KODAHASH algorithm to ensure network security. The focus on GPU mining also helps to maintain a more decentralized and secure network.",
  },
  {
    question: "What is the block reward for KODA?",
    answer: "The initial block reward for KODA is 10 KODA (factor 1^2 1^12).",
  },
  {
    question: "When is the first halving for KODA?",
    answer: "The first halving for KODA is scheduled for June 2024.",
  },
  {
    question: "How can I contribute to the KODA project?",
    answer:
      "You can contribute to KODA's development by participating in the community, providing feedback, and potentially contributing to the open-source code on GitHub. You can also support the project financially through the methods outlined in the Support section of the website.",
  },
]

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-black/50 border border-primary/20 rounded-lg overflow-hidden"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-bold text-primary">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${openIndex === index ? "transform rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4"
              >
                <p className="text-white/80">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
