"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is KODA?",
    answer:
      "KODA is a revolutionary cryptocurrency built on the BLOCKDAG network. It offers fast transactions, enhanced security, and a robust platform for decentralized applications and financial services.",
  },
  {
    question: "How is KODA different from other cryptocurrencies?",
    answer:
      "KODA stands out due to its use of BLOCKDAG technology, which allows for faster transactions and improved scalability. It also features the unique KODAHASH mining algorithm, promoting decentralization and eco-friendly mining.",
  },
  {
    question: "What are the benefits of using KODA?",
    answer:
      "KODA offers lightning-fast transactions, enhanced security, a scalable infrastructure for global adoption, energy-efficient mining, cross-chain compatibility, and regulatory compliance.",
  },
  {
    question: "How can I buy KODA?",
    answer:
      "KODA can be purchased on various cryptocurrency exchanges. Visit our 'Get KODA' page for a list of supported exchanges and detailed instructions on how to buy KODA.",
  },
  {
    question: "What is the future roadmap for KODA?",
    answer:
      "KODA's roadmap includes expanding its DeFi ecosystem, launching an enterprise blockchain solution, implementing cross-chain interoperability, and continually improving its core technology for faster and more secure transactions.",
  },
]

export function KodaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Frequently Asked Questions about KODA</h2>
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
    </section>
  )
}
