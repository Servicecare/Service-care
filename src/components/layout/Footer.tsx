"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { businessConfig } from "@/config/business";
import Image from "next/image";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }
  
  return (
    <footer className="bg-brand-primary-dark text-brand-warm-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">
              <span className="sr-only">{businessConfig.companyName}</span>
              <Image 
                src="/brand/service-for-life-care-logo.png" 
                alt={`${businessConfig.companyName} Logo`}
                width={200}
                height={58}
                className="h-12 w-auto object-contain brightness-0 invert"
                priority={false}
              />
            </Link>
            <p className="text-sm leading-6 text-brand-surface-blue opacity-90 max-w-xs">
              Nurse Led Healthcare Services
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/about" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">About</Link></li>
                  <li><Link href="/services" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Services</Link></li>
                  <li><Link href="/referrals" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Referrals</Link></li>
                  <li><Link href="/contact" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Contact</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/privacy" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Terms of Service</Link></li>
                  <li><Link href="/accessibility" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Accessibility</Link></li>
                  <li><Link href="/complaints" className="text-sm leading-6 hover:text-brand-surface-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-md">Complaints & Feedback</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact Us</h3>
                <ul role="list" className="mt-4 space-y-3 text-sm leading-6">
                  {businessConfig.contact.phone && !businessConfig.contact.phone.includes("[CLIENT TO CONFIRM]") && (
                    <li>{businessConfig.contact.phone}</li>
                  )}
                  {businessConfig.contact.email && !businessConfig.contact.email.includes("[CLIENT TO CONFIRM]") && (
                    <li>{businessConfig.contact.email}</li>
                  )}
                  {businessConfig.address.fullAddress && (
                    <li className="whitespace-pre-line">{businessConfig.address.fullAddress}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 sm:mt-16 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-brand-surface-blue opacity-80">
            &copy; {currentYear} {businessConfig.legalName}. All rights reserved. ABN: {businessConfig.abn}.
          </p>
          <div className="flex gap-4">
             {/* Render Socials ONLY if configured */}
             {businessConfig.socialLinks?.facebook && !businessConfig.socialLinks.facebook.includes("[CLIENT TO CONFIRM]") && (
                <a href={businessConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-surface-blue opacity-80 hover:opacity-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus rounded-sm">Facebook</a>
             )}
          </div>
        </div>
      </div>
    </footer>
  );
}
