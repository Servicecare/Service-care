import { businessConfig } from "@/config/business";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: `Our Services | ${businessConfig.companyName}`,
  description: "Explore our premium In-Home Support, Community Access, and Capacity Building services.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <AnimatedSection className="bg-brand-50 pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-text-primary text-balance">Our Services</h1>
            <p className="text-lg text-text-secondary text-balance">
              Tailored support to empower your independence and enhance your quality of life.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="prose prose-brand text-text-secondary">
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">In-Home Support</h2>
              <p>
                Assistance with daily living activities in the comfort of your own home, ensuring you can live safely and independently.
              </p>
              <ul className="list-none p-0 mt-6 space-y-3">
                {["Personal care", "Meal preparation", "Household tasks"].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center m-0">
                     <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-brand text-text-secondary" id="community-access">
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">Community Access</h2>
              <p>
                Support to engage in social, recreational, and community activities, helping you build meaningful connections.
              </p>
              <ul className="list-none p-0 mt-6 space-y-3">
                {["Social outings", "Transport assistance", "Hobby groups"].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center m-0">
                     <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-brand text-text-secondary">
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">Capacity Building</h2>
              <p>
                Skill development and training to enhance your independence and support you in achieving your personal goals.
              </p>
              <ul className="list-none p-0 mt-6 space-y-3">
                {["Life skills training", "Budgeting assistance", "Travel training"].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center m-0">
                     <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-16 bg-brand-50 p-6 rounded-xl border border-brand-100 max-w-3xl">
             <p className="text-sm text-brand-700 font-medium m-0">
                [CLIENT TO CONFIRM: Add exact service list, NDIS item numbers, and any specific limitations here.]
             </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
