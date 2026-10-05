"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { businessConfig } from "@/config/business";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }
  
  return (
    <footer className="bg-brand-900 text-brand-50 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6">
            <Link href="/" className="font-heading text-2xl font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md">
              {businessConfig.companyName}
            </Link>
            <p className="text-sm leading-6 text-brand-100 max-w-sm">
              Delivering premium, compassionate, and personalized care services to empower independence and enhance your quality of life. {businessConfig.ndisStatus}.
            </p>
            <div className="flex space-x-5">
              <a href={businessConfig.socialLinks?.facebook || "#"} className="text-brand-200 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessConfig.socialLinks?.instagram || "#"} className="text-brand-200 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessConfig.socialLinks?.linkedin || "#"} className="text-brand-200 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/about" className="text-sm leading-6 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/services" className="text-sm leading-6 hover:text-white transition-colors">Our Services</Link></li>
                  <li><Link href="/referrals" className="text-sm leading-6 hover:text-white transition-colors">Referrals</Link></li>
                  <li><Link href="/blog" className="text-sm leading-6 hover:text-white transition-colors">Blog & News</Link></li>
                  <li><Link href="/faq" className="text-sm leading-6 hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/privacy" className="text-sm leading-6 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm leading-6 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/accessibility" className="text-sm leading-6 hover:text-white transition-colors">Accessibility</Link></li>
                  <li><Link href="/complaints" className="text-sm leading-6 hover:text-white transition-colors">Complaints & Feedback</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact Us</h3>
                <ul role="list" className="mt-4 space-y-4 text-sm leading-6">
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 text-brand-300 shrink-0" />
                    <span>{businessConfig.contact.phone && !businessConfig.contact.phone.includes("[CLIENT TO CONFIRM]") ? businessConfig.contact.phone : "1300 XXX XXX"}</span>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 text-brand-300 shrink-0" />
                    <span>{businessConfig.contact.email && !businessConfig.contact.email.includes("[CLIENT TO CONFIRM]") ? businessConfig.contact.email : "hello@serviceforlifecare.com"}</span>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-brand-300 shrink-0" />
                    <span className="whitespace-pre-line">{businessConfig.address.fullAddress}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 sm:mt-16 flex flex-col justify-center items-center gap-4 text-center">
          <p className="text-xs leading-5 text-brand-300">
            &copy; {currentYear} {businessConfig.legalName}. All rights reserved. {businessConfig.abn && !businessConfig.abn.includes("[CLIENT") ? `ABN: ${businessConfig.abn}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
