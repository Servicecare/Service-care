import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business";
import { CheckCircle2, Heart, Users, Home, MapPin, ArrowRight } from "lucide-react";
import { AnimatedHero, AnimatedHeroItem } from "@/components/ui/AnimatedHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-brand-50 pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <AnimatedHero className="max-w-2xl lg:w-1/2">
            <AnimatedHeroItem>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-text-primary text-balance mb-6">
                Empowering your independence with premium care.
              </h1>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <p className="mt-4 text-lg leading-8 text-text-secondary text-balance mb-8 max-w-xl">
                {businessConfig.companyName} provides high-quality, personalised support to help you live life with confidence in {businessConfig.serviceAreas[0]} and surrounding areas.
              </p>
            </AnimatedHeroItem>
            <AnimatedHeroItem>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="rounded-full bg-brand-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all active:scale-[0.98]"
                >
                  Get Started
                </Link>
                <Link 
                  href="/services" 
                  className="rounded-full border border-brand-200 bg-white px-8 py-3.5 text-center text-sm font-semibold text-text-primary hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </AnimatedHeroItem>
          </AnimatedHero>
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-square max-h-[500px] w-full bg-gray-200">
              <Image 
                src="/images/hero.jpg"
                alt="A warm, professional Australian healthcare worker smiling and assisting an elderly person in a bright living room"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Section */}
      <AnimatedSection type="fade" className="bg-white py-6 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3 bg-brand-50 px-5 py-2.5 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-brand-600" />
              <span className="text-sm font-semibold text-text-primary">{businessConfig.ndisStatus}</span>
            </div>
            <div className="flex items-center gap-3 bg-brand-50 px-5 py-2.5 rounded-full">
              <MapPin className="h-5 w-5 text-brand-600" />
              <span className="text-sm font-semibold text-text-primary">Servicing {businessConfig.serviceAreas[0]}</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Core Services Section */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl text-center mx-auto mb-12 lg:mb-16">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading">
              Support tailored to you
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "In-Home Support", desc: "Assistance with daily living activities in the comfort of your own home.", icon: Home },
              { title: "Community Access", desc: "Support to engage in social, recreational, and community activities.", icon: Users },
              { title: "Capacity Building", desc: "Skill development to enhance your independence and achieve your goals.", icon: Heart },
            ].map((service, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1} className="relative group rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mb-6 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-base leading-7 text-text-secondary mb-6">
                  {service.desc}
                </p>
                <Link href="/services" className="text-sm font-semibold leading-6 text-brand-600 flex items-center gap-1 group-hover:gap-2 transition-all focus-visible:outline-none focus-visible:underline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Care Approach Section */}
      <AnimatedSection className="py-16 lg:py-24 bg-brand-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3] bg-gray-200 shadow-xl max-h-[500px]">
               <Image 
                  src="/images/care.jpg"
                  alt="Close-up of two hands holding warmly, conveying trust and care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading mb-6">
                A holistic approach to your wellbeing
              </h2>
              <p className="text-lg leading-8 text-text-secondary mb-8">
                At {businessConfig.companyName}, we believe that genuine care goes beyond physical support. We take a holistic approach that considers your emotional, social, and physical wellbeing. 
              </p>
              <ul className="space-y-4">
                {[
                  "Respect for your choices and dignity",
                  "Consistent, reliable support teams",
                  "Focus on building long-term independence",
                  "Culturally safe and inclusive practices"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-center">
                    <CheckCircle2 className="h-5 w-5 text-brand-600 flex-shrink-0" />
                    <span className="text-text-primary font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Community Access / Independence */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-col-reverse lg:flex-row-reverse">
            <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3] bg-gray-200 shadow-xl max-h-[500px]">
               <Image 
                  src="/images/community.jpg"
                  alt="Two people, one in a wheelchair, enjoying a sunny day outdoors in a beautiful park"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl font-heading mb-6">
                Engage with your community
              </h2>
              <p className="text-lg leading-8 text-text-secondary mb-8">
                Being an active part of the community is essential for everyone. We provide the support necessary for you to pursue your interests, attend events, and maintain meaningful social connections across {businessConfig.serviceAreas[0]}.
              </p>
              <Link 
                href="/services#community-access" 
                className="rounded-full bg-brand-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-all inline-block active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Discover Community Access
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Referral CTA */}
      <AnimatedSection type="fade" className="bg-brand-900 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
            Make a Referral
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-brand-100">
            Whether you are referring yourself, a family member, or a participant, our streamlined process ensures support starts as smoothly as possible.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/referrals"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all active:scale-[0.98]"
            >
              Start a Referral
            </Link>
          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
