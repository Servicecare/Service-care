import { businessConfig } from "@/config/business";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: `Contact Us | ${businessConfig.companyName}`,
  description: "Get in touch with our team for general enquiries.",
};

export default function ContactPage() {
  const isPhoneConfigured = businessConfig.contact.phone && !businessConfig.contact.phone.includes("[CLIENT TO CONFIRM]");
  const isEmailConfigured = businessConfig.contact.email && !businessConfig.contact.email.includes("[CLIENT TO CONFIRM]");

  return (
    <div className="flex flex-col min-h-[70vh]">
      <AnimatedSection className="bg-brand-surface-blue pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-text-primary text-balance">Contact Us</h1>
            <p className="text-lg text-text-secondary text-balance">
               Reach out to us directly or fill in the form below. We aim to respond to all enquiries within 24 hours.
            </p>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-8 text-text-primary">Get in Touch</h2>
              <ul className="space-y-8 text-text-primary">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-surface-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <strong className="block font-heading text-lg mb-1">Email</strong>
                    {isEmailConfigured ? (
                      <a href={`mailto:${businessConfig.contact.email}`} className="text-text-secondary hover:text-brand-primary transition-colors">
                        {businessConfig.contact.email}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Email not yet provided</span>
                    )}
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-surface-blue flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <strong className="block font-heading text-lg mb-1">Phone</strong>
                    {isPhoneConfigured ? (
                      <a href={`tel:${businessConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-text-secondary hover:text-brand-primary transition-colors">
                        {businessConfig.contact.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Phone not yet provided</span>
                    )}
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-surface-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <strong className="block font-heading text-lg mb-1">Address</strong>
                    <address className="not-italic text-text-secondary whitespace-pre-line">
                      {businessConfig.address.fullAddress}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
