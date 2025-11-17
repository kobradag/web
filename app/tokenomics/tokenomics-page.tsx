"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const tokenomicsData = [
  { name: "Mining Rewards", value: 70 },
  { name: "Development Fund", value: 15 },
  { name: "Community Incentives", value: 10 },
  { name: "Team Allocation", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function TokenomicsClientPage() {
  const [investmentAmount, setInvestmentAmount] = useState("")

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12 vibrant-gradient">KODA Tokenomics</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tokenomicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tokenomicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Key Tokenomics Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Launch Date: May 25, 2023</li>
                <li>Max Supply: 445 Million KODA</li>
                <li>Block Reward: 10 KODA (factor 1^2 1^12)</li>
                <li>Block Time: 1 second</li>
                <li>Distribution: Fair launch with no pre-sales, ensuring equitable distribution from the start</li>
                <li>Mining Algorithm: KODAHASH (GPU-optimized)</li>
                <li>Deflationary Mechanism: Transaction fee burning</li>
              </ul>
              <h3 className="text-xl font-bold mt-8 mb-4">Token Utility</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Governance voting rights</li>
                <li>Staking rewards</li>
                <li>Access to premium features in the KODA ecosystem</li>
                <li>Discounted fees on KODA-powered DeFi platforms</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Investment Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter investment amount in KODA"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
                <Button onClick={() => {}}>Calculate Returns</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
