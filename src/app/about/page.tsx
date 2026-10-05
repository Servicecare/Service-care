import { businessConfig } from "@/config/business";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: `About Us | ${businessConfig.companyName}`,
  description: "Learn more about our authentic company story, values, and commitment to providing premium care.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <AnimatedSection className="bg-brand-surface-blue pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-text-primary text-balance">About Us</h1>
            <p className="text-lg text-text-secondary text-balance">
              Discover the story and the heart behind {businessConfig.companyName}.
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="prose prose-lg prose-brand max-w-prose text-text-secondary">
            <p>
              We are an authentic, dedicated team providing premium care in {businessConfig.serviceAreas[0]} and surrounding areas.
            </p>
            <div className="bg-brand-surface-blue p-6 rounded-xl border border-brand-border my-8">
              <p className="text-sm text-brand-primary-dark font-medium m-0">
                [CLIENT TO CONFIRM: Add specific founder experience, staff qualifications, and history here.]
              </p>
            </div>
            <p>
              Our mission is to empower individuals to live their lives to the fullest, offering support that respects their dignity and choices. We believe in a holistic approach to wellbeing.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
