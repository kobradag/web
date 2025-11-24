"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DetailedInfo() {
  return (
    <Card className="bg-black/50 border-[#FFD700] gold-border">
      <CardHeader>
        <CardTitle className="gold-text text-right" dir="rtl">
          מידע מפורט
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black text-right"
              dir="rtl"
            >
              סקירה כללית
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black text-right"
              dir="rtl"
            >
              מידע טכני
            </TabsTrigger>
            <TabsTrigger
              value="network"
              className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black text-right"
              dir="rtl"
            >
              רשת
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 mt-4"
            >
              <div className="grid gap-4">
                <div className="bg-black/50 p-4 rounded-lg border border-[#FFD700]/30 text-right" dir="rtl">
                  <h3 className="font-bold mb-2 text-[#FFD700]">תיאור</h3>
                  <p className="text-[#FFD700]/80">
                    מטבע קריפטוגרפי מתקדם המבוסס על טכנולוגיית בלוקצ׳יין חדשנית. מציע מהירות עסקאות גבוהה ועמלות נמוכות.
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
          {/* Similar styling for other tab contents */}
        </Tabs>
      </CardContent>
    </Card>
  )
}
