import { PartnershipCarousel } from "./partnership-carousel"
import { PartnershipMilestones } from "./partnership-milestones"

export function PartnershipSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-deep-purple/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Our Partnerships & Milestones</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1">
            <PartnershipMilestones />
          </div>
          <div className="lg:col-span-2">
            <PartnershipCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
