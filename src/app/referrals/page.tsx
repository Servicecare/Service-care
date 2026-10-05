import { businessConfig } from "@/config/business";
import { ReferralForm } from "@/components/forms/ReferralForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";

export const metadata = {
  title: `Make a Referral | ${businessConfig.companyName}`,
  description: "Securely submit a referral for our support services.",
};

export default function ReferralsPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <AnimatedSection className="bg-brand-surface-blue pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-text-primary text-balance">Make a Referral</h1>
            <p className="text-lg text-text-secondary text-balance">
              Please fill out our secure referral form below. Our intake team will review the information and contact you to discuss how {businessConfig.companyName} can assist.
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 hidden lg:block sticky top-28">
              <Image 
                src="/images/referral.jpg" 
                alt="Healthcare professional having a reassuring discussion with a family member" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 relative">
                <ReferralForm />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
